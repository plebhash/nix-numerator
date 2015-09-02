/**
 * Created by Anthony on 02/06/2015.
 */
(function () {
	'use strict';
	angular
		.module('calculator', [])
		.controller('HomeCtrl', HomeCtrl);
	function HomeCtrl($scope, $log, $mdToast, $animate, $http, $locale) {
		// Init object with default value
		$scope.user = {};
		$scope.earnings = {};
		$scope.network = {
			hashrate: 0,
			blockTime: 0,
			ethPrice: 1.0
		};
		$scope.gpus = [];
		$scope.userCurrency = $locale.NUMBER_FORMATS.CURRENCY_SYM;

		$scope.onClick = function (points, evt) {
			console.log(points, evt);
		};

		$scope.showSimpleToast = function (message) {
			$mdToast.show(
				$mdToast.simple()
					.content(message)
					.position('bottom right')
					.hideDelay(3000)
			);
		};

		$scope.computeProfits = function () {
			var userRatio = $scope.user.gpu.hashrate * 1e6 / ($scope.network.hashrate * 1e9);
			var blocksPerMin = 60.0 / $scope.network.blockTime;
			var ethPerMin = blocksPerMin * 5.0;
			// Calculate all earnings
			var minute = userRatio * ethPerMin;
			var hour = minute * 60;
			var day = hour * 24;
			var week = day * 7;
			var month = day * 30;
			// Put them in an array to ng-repeat
			$scope.earnings.tab = [];
			$scope.earnings.tab.push({
				label: 'Per hour',
				eth: hour
			});
			$scope.earnings.tab.push({
				label: 'Per day',
				eth: day
			});
			$scope.earnings.tab.push({
				label: 'Per week',
				eth: week
			});
			$scope.earnings.tab.push({
				label: 'Per month',
				eth: month,
				// Avoid looking for last element and slow page
				last: true
			});
		};

		$scope.loadGPUs = function () {
			// Fill list of GPUs
			$http.get("./assets/json/gpus.json")
				.success(function (data) {
					$scope.gpus = data;
				}).error(function (data, status) {
					console.log("And we just got hit by a " + status + " !!!");
				});
		};

		$scope.resetGPU = function () {
			var tmp = $scope.user.gpu.hashrate;
			$scope.user.gpu = {
				hashrate: tmp
			};
		};

		$scope.init = function () {
			$http.get("http://coinmarketcap-nexuist.rhcloud.com/api/eth")
				.success(function (data) {
					$scope.network.market = data;
					fillPrices(data.price);
				}).error(function (data, status) {
					console.log("And we just got hit by a " + status + " !!!");
				});
			$http.get("https://etherchain.org/api/basic_stats")
				.success(function (resp) {
					var sumBlocktime = 0;
					var sumDifficulty = 0;
					var arrayLength= resp.data.blocks.length;
					for (var i = 0; i < arrayLength; i++) {
						sumBlocktime += resp.data.blocks[i].blockTime;
						sumDifficulty += resp.data.blocks[i].difficulty;
					}
					// Calculate average
					$scope.network.blockTime = sumBlocktime / arrayLength;
					$scope.network.hashrate = 1e-9 * sumDifficulty / arrayLength;
				}).error(function (data, status) {
					console.log("And we just got hit by a " + status + " HTTP status !!!");
					//DEV
					$scope.network.blockTime = 1;
					$scope.network.hashrate = 2;
				});
		};

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
			$scope.showSimpleToast('Hashrate reset');
		};
	}
})();