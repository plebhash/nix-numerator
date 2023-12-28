# nix-numerator
Calculate mining profitability given various equipment and network assumptions.

## Live version
https://todo

## Nix
```
$ git clone https://github.com/plebhash/nix-numerator
$ NIXPKGS_ALLOW_INSECURE=1 nix-build # todo: fix the need for this flag
$ // todo: start the numerator service
```

## Features

- ROI chart: This shows the overall return on investment (y axis) until the first cash-flow-negative cycle.
- Profit convexity chart: This shows final ROI (y axis) across a range of possible average bitcoin prices.

### External Network Requests
- Block height from [blockexplorer.com](https://blockexplorer.com/api/status?q=getBlockCount).
- Difficulty from [blockexplorer.com](https://blockexplorer.com/api/status?q=getDifficulty).
- XBT/USD from [coinmarketcap.com](https://coinmarketcap-nexuist.rhcloud.com/api/btc)

# Original author(s) notes

## Build tools

[`node2nix`](https://github.com/svanderburg/node2nix) is used to generate a `nix` environment from the `nodeJS` project structure.

The inner nix-env is built on the [starter Angular Material project](https://github.com/angular/material-start) and took some cool stuff from this [Yeoman Gulp generator](https://github.com/Swiip/generator-gulp-angular).
Files present in the gh-pages branch are generated using gulp and the ``build`` task. Generated files can be found in dist folder.

## Credits
* [Badmofo](https://github.com/badmofo/ethereum-mining-calculator) for starting this calculator.
* [findkiko](https://github.com/findkiko/numerator) for forking `Badmofo`.

Others calculators:

* [Badmofo's original calculator](http://badmofo.github.io/ethereum-mining-calculator/)
* [Etherscan's one](http://etherscan.io/ether-mining-calculator)
* [Ethereum GPU Efficiencies by o0ragman0o](https://docs.google.com/spreadsheets/d/1s5SaThZ5eOSAiVMpmuIjz-_YjIlcxttAzKuWKAbczds/edit#gid=0)
