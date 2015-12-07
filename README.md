# Mining Calculator
Calculate your mining profitability based on network and performance parameters.

First choose a miner model from the dropdown [list](app/assets/json/asics.json) and let the magic happen!

To enjoy all the features, we recommend that you select your GPU.
If your GPU is not in the list, open an issue or post it on [GPU Mining bench scores](http://forum.ethereum.org/discussion/2134/gpu-mining-is-out-come-and-let-us-know-of-your-bench-scores).


## Features
### Network stats
Network hashrate & blocktime are calculated over the last 64 blocks from [Etherchain.org](https://etherchain.org/api/basic_stats)

### Price calculation
XBT/USD from [CoinMarketCap](http://coinmarketcap.com/currencies/bitcoin/)

### GPU Power consumption
In our calculation we suppose that the Miner is at its rated max power consumption.

Note: for cloud instances, power consumption is included in the instance price. This section is therefore disabled for cloud mining.

#### Electricity price
Adjust to suit your location. This section is also disabled for cloud miner selections as costs are included in hourly prices.

### ROI
The simulation ends after the first non-profitable cycle or 6 years, whichever is the sooner.

## Todo
* Average network stats on more blocks (>64) to get stable value
* Possibility to choose several GPU for designing a mining rig ([Chips?](https://material.angularjs.org/latest/#/demo/material.components.chips))
* Import script from sheet
* Charts
* Get GPU card's price from Ebay
* Use $watch (problems with undefined values :-/)

## Build
This project was built on the [starter Angular Material project](https://github.com/angular/material-start) and took some cool stuff from this [Yeoman Gulp generator](https://github.com/Swiip/generator-gulp-angular).
Files present in the gh-pages branch are generated using gulp and the ``build`` task. Generated files can be found in dist folder.

Just get dependencies with ``npm install && bower install``

## Credits
* [Badmofo](https://github.com/badmofo/ethereum-mining-calculator) for starting this calculator.
* [GPU Mining bench scores](http://forum.ethereum.org/discussion/2134/gpu-mining-is-out-come-and-let-us-know-of-your-bench-scores)

Others calculators:

* [Badmofo's original calculator](http://badmofo.github.io/ethereum-mining-calculator/)
* [Etherscan's one](http://etherscan.io/ether-mining-calculator)
* [Ethereum GPU Efficiencies by o0ragman0o](https://docs.google.com/spreadsheets/d/1s5SaThZ5eOSAiVMpmuIjz-_YjIlcxttAzKuWKAbczds/edit#gid=0)
