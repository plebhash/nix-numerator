# ethereum-mining-calculator
Ethereum Mining Profitability Calculator

## Features
### Basic
#### Network stats
Network hashrate & blocktime are calculated over the last 64 blocks from [Etherchain.org](https://etherchain.org/api/basic_stats)

### Price calculation
ETH/USD from [CoinMarketCap](http://coinmarketcap.com/currencies/ethereum/)

### GPU Power consumption
In our calculation we suppose that the GPU is at its max power consumption.
Power is usually express in [Watt](https://en.wikipedia.org/wiki/Watt) unit. Voltage has nothing to do here as it's normalized at +12V.

[eXtreme Power Supply Calculator](http://outervision.com/power-supply-calculator)

Electricity price:

* In Europe [eurostat](http://ec.europa.eu/eurostat/statistics-explained/index.php/Energy_price_statistics)
* In America [eia.gov]( http://www.eia.gov/electricity/monthly/epm_table_grapher.cfm?t=epmt_5_6_a)

### Todo
* Average network stats on more blocks (>64) to get stable value
* Possibility to choose several GPU for designing a mining rig ([Chips?](https://material.angularjs.org/latest/#/demo/material.components.chips))
* Use $watch (problems with undefined values :-/)


## Credits
* [Badmofo](https://github.com/badmofo/ethereum-mining-calculator) for starting this calculator.
* [GPU Mining bench scores](http://forum.ethereum.org/discussion/2134/gpu-mining-is-out-come-and-let-us-know-of-your-bench-scores)

Others calculators:

* [Badmofo's original calculator](http://badmofo.github.io/ethereum-mining-calculator/)
* [Etherscan's one](http://etherscan.io/ether-mining-calculator)
