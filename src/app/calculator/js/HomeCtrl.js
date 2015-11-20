/**
 * Created by Anthony on 31/08/2015.
 */
(function () {
	'use strict';
	// Prepare the 'calculator' module for subsequent registration of controllers and delegates
	angular.module('calculator', [ 'ngMaterial' ]);

	angular
		.module('calculator', [])
		.controller('HomeCtrl', HomeCtrl);
	function HomeCtrl($scope, $mdToast, $mdDialog, $http, $locale) {
		// Init object with default value
		$scope.user = {};
		$scope.roi = {
			startDate : new Date()
		};
		$scope.earnings = {};
		$scope.electricity = {price: 0.09};
		$scope.network = {
			hashrate: 0,
			blockTime: 600,
			ethPrice: 300.0
		};
		$scope.gpus = [];
		$scope.currency = $locale.NUMBER_FORMATS.CURRENCY_SYM;
		$scope.currencies = [
			{
				name: 'USD',
				sym: $locale.NUMBER_FORMATS.CURRENCY_SYM
			}
		];

		$scope.showSimpleToast = function (message) {
			$mdToast.show(
				$mdToast.simple()
					.content(message)
					.position('bottom right')
					.hideDelay(3000)
			);
		};

		$scope.selectGPU = function () {
			// Update init capital
			if ($scope.user.gpu.price) {
				//Get GPU price
				$scope.roi.capital = getGpuPriceFromEbay($scope.user.gpu.name);
				// Failed to get price from ebay
				if ($scope.roi.capital === 0) {
					$scope.roi.capital = $scope.user.gpu.price;
				}
			}
			// Compute profits
			$scope.computeProfits();
		};

		/**
		 * Compute profits
		 */
		$scope.computeProfits = function () {
      var reward = 50 * Math.pow(0.5, Math.floor($scope.network.nowBlock/210000));
      var winWait = $scope.network.difficulty * Math.pow(2,32) / ($scope.user.gpu.hashrate * 1e9);
      var blocksPerMin = 60 / winWait;
			// Calculate all earnings
			var minuteEth = blocksPerMin * reward;
			var hourEth = minuteEth * 60;
			var dayEth = hourEth * 24;
			var weekEth = dayEth * 7;
			var monthEth = dayEth * 30;

			// Convert ETH to USD
			var hourPrice = hourEth * $scope.user.price.usd;
			// If cloud, subtract instance hourly price
			if ($scope.user.gpu.costs) {
				hourPrice = hourPrice - $scope.user.gpu.costs;
			}
			var dayPrice = hourPrice * 24;
			var weekPrice = dayPrice * 7;
			var monthPrice = dayPrice * 30;

			// Put them in an array to ng-repeat
			$scope.earnings.tab = [];
			$scope.earnings.tab.push({
				label: 'Per hour',
				eth: hourEth,
				price: hourPrice
			});
			$scope.earnings.tab.push({
				label: 'Per day',
				eth: dayEth,
				price: dayPrice
			});
			$scope.earnings.tab.push({
				label: 'Per week',
				eth: weekEth,
				price: weekPrice
			});
			$scope.earnings.tab.push({
				label: 'Per month',
				eth: monthEth,
				price: monthPrice,
				// Avoid looking for last element and slow page
				last: true
			});

			// Compute ROI if needed
			$scope.computeRoi();
		};

		/**
		 * Async load of GPU list
		 */
		$scope.loadGPUs = function () {
			// Fill list of GPUs
			$http.get("./assets/json/asics.json")
				.success(function (data) {
					$scope.gpus = data;
				}).error(function (data, status) {
					console.log("And we just got hit by a " + status + " !!!");
				});
		};

		/**
		 * Convert Watts to KWh for a given time (in hours)
		 * @param watts
		 * @param hours
		 * @returns {number}
		 */
		var convertWtoKWh = function (watts, hours) {
			return hours * watts / 1000;
		};

		/**
		 * Compute energy costs
		 */
		$scope.computeEnergyCosts = function () {
			// Avoid unnecessary calculation if no GPU selected
			if ($scope.user.gpu) {
				if ($scope.user.electricity && $scope.user.gpu.power) {
					$scope.user.gpu.costs = convertWtoKWh($scope.electricity.price, 1) * $scope.user.gpu.power;
				} else {
					$scope.user.gpu.costs = undefined;
				}
				// Compute profits again
				$scope.computeProfits();
			}
		};
		/**
		 * Compute ROI
		 */
		$scope.computeRoi = function () {
			if ($scope.roi.capital) {
				$scope.roi.date = new Date(moment($scope.roi.startDate).add($scope.roi.capital / $scope.earnings.tab[1].price, 'days').calendar());
			}
		};

		/**
		 * Get best price from Ebay
		 * @param name
		 * @returns {number}
		 */
		var getGpuPriceFromEbay = function (name) {
			return 0;
			// TODO http://developer.ebay.com/Devzone/finding/Concepts/MakingACall.html
			//$http.post("http://coinmarketcap-nexuist.rhcloud.com/api/eth", {
			//	"tns.findItemsByKeywordsRequest": {"keywords": name}
			//}).success(function (data) {
			//	return 0;
			//}).error(function (data, status) {
			//	console.log("And we just got hit by a " + status + " !!!");
			//	return 0;
			//});
		};

		/**
		 * Reset GPU selection
		 */
		$scope.resetGPU = function () {
			var tmp = $scope.user.gpu.hashrate;
			$scope.user.gpu = {
				hashrate: tmp
			};
		};

		/**
		 * Get all useful data
		 */
      // TODO: refactor get requests into function call.
      //
      // function multiCall(requests) {
      //   for (var i=0; i <requests.length; i++) {
      //     var request = requests[i];
      //     $http.get(request.url)
      //       .success(function (data) {
      //         $scope.network[request.field] = data;
      //         fillPrices(data.price);
      //
      //       }).error(function (data, status) {
      //         $scope.showSimpleToast("Failed to load Network data from " + request.url);
      //         console.log("And we just got hit by a " + status + " !!!");
      //         $scope.network[request.field] = 0;
      //       });
      //    }
      // }
      // function clearUserField(name) {
      //   $scope.user[name] = 0;
      //   }
      // 
      // var requests = [ {url:"foo", field:"price"},
      //                  {url:"bar", field:"difficulty"},
      //                  {url:"baz", field:"blockcount"}
      //                ]
      //
      // multiCall(requests);
      //
      //
		$scope.init = function () {
			$http.get("http://coinmarketcap-nexuist.rhcloud.com/api/btc")
				.success(function (data) {
					$scope.network.market = data;
					fillPrices(data.price);
				}).error(function (data, status) {
					$scope.showSimpleToast("Failed to load Network data from coinmarketcap-nexuist.rhcloud.com :-/");
					console.log("And we just got hit by a " + status + " !!!");
					$scope.user.price.usd = 0;
				});
			$http.get("https://blockexplorer.com/api/status?q=getDifficulty")
				.success(function (resp) {
					$scope.network.difficulty = resp.difficulty;
				}).error(function (data, status) {
					$scope.showSimpleToast("Failed to load Network data from blockexplorer.com :-/");
					console.log("And we just got hit by a " + status + " HTTP status !!!");
					//DEV
					$scope.network.blockTime = 1;
					$scope.network.difficulty = 2;
				});
			$http.get("https://blockexplorer.com/api/status?q=getBlockCount")
				.success(function (resp) {
					$scope.network.nowBlock = resp.blockcount;
				}).error(function (data, status) {
					$scope.showSimpleToast("Failed to load Network data from blockexplorer.com :-/");
					console.log("And we just got hit by a " + status + " HTTP status !!!");
          $scope.network.nowBlock = 1;
				});
		};

		/**
		 * Fill prices (str -> float)
		 * @param price
		 */
		var fillPrices = function (price) {
			$scope.user.price = {};
			$scope.user.price.usd = parseFloat(price.usd, 10);
		};

		/**
		 * Reset inputs
		 */
		$scope.reset = function () {
			$scope.user = {};
			fillPrices($scope.network.market.price);
			$scope.showSimpleToast('Parameters reset');
		};

		$scope.showAdvanced = function (ev) {
			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'src/calculator/html/powersupply.tmpl.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				locals: {
					gpu: $scope.user.gpu
				}
			})
				.then(function (power) {
					$scope.user.gpu.power = power;
					$scope.computeEnergyCosts();
					$scope.status = 'You said the information was "' + power + '".';
				}, function () {
					$scope.status = 'You cancelled the dialog.';
				});
		};
		function DialogController($scope, $mdDialog, gpu) {
			$scope.gpu = gpu;

			$scope.hide = function () {
				$mdDialog.hide($scope.gpu.power);
			};
			$scope.cancel = function () {
				$mdDialog.cancel();
			};
		}
	}
})();
