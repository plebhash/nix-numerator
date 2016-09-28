# Numerator
### A better bitcoin mining calculator.
Calculate mining profitability given various equipment and network assumptions.

## Mining inception
Yo Dawg! I heard you like forks, so I forked your fork of an ethereum mining calculator! This was due to the poor state of bitcoin calculators available :weary:.

The original can be found [here](https://github.com/anthonygraignic/ethereum-mining-calculator).

## Live version
[Github hosted snapshot here](https://decentralvan.github.io/numerator/).

## Local Development Install
Requires `npm`, `bower` & `gulp` to be globally installed for CLI use.

```
git clone https://github.com/DecentralVan/numerator.git
cd numerator
npm install
bower install
cp bower_components/rickshaw/{package,bower}.json
gulp serve
```

## Usage
- First, choose a starting scenario (group of assumptions).
- Second, choose a miner model from the dropdown [list](app/assets/json/asics.json) to have some performance numbers populated automatically.
- Third, set your local parameters such as electricity prices and startup costs. The graphs update in realtime.
- Fourth, click _Save Scenario_ to save the numbers in browser local-storage for later recall, these will survive a browser restart and should be available to select from the scenario menu.

If your miner is not in the list ~~you're probably going to lose money~~, open an issue or preferably add the specs directly to [the list](https://github.com/DecentralVan/numerator/blob/bitcoin/src/assets/json/asics.json) via a pull request. If the brand is not already shown, this may require also adding a new menu filter in the html menu [here](https://github.com/DecentralVan/numerator/blob/bitcoin/src/index.html).

## Features

- ROI chart: This shows the overall return on investment (y axis) until the first cash-flow-negative cycle.
- Profit convexity chart: This shows final ROI (y axis) across a range of possible average bitcoin prices.

### External Network Requests
- Block height from [blockexplorer.com](https://blockexplorer.com/api/status?q=getBlockCount).
- Difficulty from [blockexplorer.com](https://blockexplorer.com/api/status?q=getDifficulty).
- XBT/USD from [coinmarketcap.com](https://coinmarketcap-nexuist.rhcloud.com/api/btc)

# Original author(s) notes

## Build tools
This project was built on the [starter Angular Material project](https://github.com/angular/material-start) and took some cool stuff from this [Yeoman Gulp generator](https://github.com/Swiip/generator-gulp-angular).
Files present in the gh-pages branch are generated using gulp and the ``build`` task. Generated files can be found in dist folder.

## Credits
* [Badmofo](https://github.com/badmofo/ethereum-mining-calculator) for starting this calculator.
* [GPU Mining bench scores](http://forum.ethereum.org/discussion/2134/gpu-mining-is-out-come-and-let-us-know-of-your-bench-scores)

Others calculators:

* [Badmofo's original calculator](http://badmofo.github.io/ethereum-mining-calculator/)
* [Etherscan's one](http://etherscan.io/ether-mining-calculator)
* [Ethereum GPU Efficiencies by o0ragman0o](https://docs.google.com/spreadsheets/d/1s5SaThZ5eOSAiVMpmuIjz-_YjIlcxttAzKuWKAbczds/edit#gid=0)
