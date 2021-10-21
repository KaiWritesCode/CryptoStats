
window.addEventListener('load', () => {
    const orderedList = document.querySelector('.ordered-list')
    const fullList = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true`
    const marketData = `https://api.coingecko.com/api/v3/coins/categories`
    const gasApi = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=IXBHG7VU8CZR6FICMDSJ3BFDEI6EJP4T7R`
    const coinMarket = `https://kaiscorsproxy.herokuapp.com/https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`

    fetch(fullList)
        .then(response => {
            return response.json();
        })
        .then(data => {
            for (let i = 0; i < 100; i++) {
                const { market_cap_rank, image, symbol, name, current_price, price_change_percentage_24h, market_cap, sparkline_in_7d } = data[i];
                const chart1 = sparkline_in_7d.price
                let borderColor = ''
                let li = document.createElement('li')
                li.classList.add('row-li')
                let rankSpan = document.createElement('span')
                let imgSpan = document.createElement('img')
                let nameDiv = document.createElement('div')
                let namesDiv = document.createElement('div')
                let nameSpan = document.createElement('span')
                let symbolSpan = document.createElement('span')
                let priceSpan = document.createElement('span')
                let percentSpan = document.createElement('span')
                let marketCapSpan = document.createElement('span')
                let graphSpan = document.createElement('img')

                rankSpan.classList.add('rank')
                imgSpan.classList.add('coin-img')
                imgSpan.classList.add('test')
                nameDiv.classList.add('img-name')
                namesDiv.classList.add('name-symbol')
                nameSpan.classList.add('name')
                symbolSpan.classList.add('symbol')
                priceSpan.classList.add('price')
                graphSpan.classList.add('graph-test')
                marketCapSpan.classList.add('market-cap')

                rankSpan.textContent = market_cap_rank;
                imgSpan.src = image;
                nameSpan.textContent = name;
                symbolSpan.textContent = symbol.toUpperCase();
                priceSpan.textContent = `$${current_price}`.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                percentSpan.textContent = `${price_change_percentage_24h}`.slice(0, 5) + '%'
                marketCapSpan.textContent = `$${market_cap}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                graphSpan.textContent = 'GRAPH';

                if (price_change_percentage_24h < 0) {
                    percentSpan.classList.add('percent-change-red')
                    borderColor = 'red'
                }
                else {
                    percentSpan.classList.add('percent-change-green')
                    borderColor = 'green'
                }
                graphSpan.src = `https://quickchart.io/chart?c={type:'sparkline',data:{datasets:[{fill:false,borderColor:'${borderColor}',data:[${chart1}]}]}}`

                li.appendChild(rankSpan)
                nameDiv.appendChild(imgSpan)
                nameDiv.appendChild(namesDiv)
                namesDiv.appendChild(nameSpan)
                namesDiv.appendChild(symbolSpan)
                li.appendChild(nameDiv)
                li.appendChild(priceSpan)
                li.appendChild(percentSpan)
                li.appendChild(marketCapSpan)
                li.appendChild(graphSpan)

                orderedList.appendChild(li)




                if (price_change_percentage_24h < 0) {
                    percentSpan.classList.add('percent-change-red')
                    borderColor = 'red'
                }
                else {
                    percentSpan.classList.add('percent-change-green')
                    borderColor = 'green'
                }

            }

        })

    fetch(gasApi)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const gasPrice = document.querySelector('.gwei')
            const { SafeGasPrice } = data.result
            gasPrice.textContent = SafeGasPrice + ' gwei'
        })
    fetch(marketData)
        .then(response => {
            return response.json();
        })
        .then(data => {
            const solanaChange = document.querySelector('.solana-change')
            const polygonChange = document.querySelector('.polygon-change')
            const nftChange = document.querySelector('.nft-change')
            const pteChange = document.querySelector('.pte-change')

            const solana = data[6]
            const polygon = data[8]
            const nft = data[14]
            const playToEarn = data[30]

            solanaChange.textContent = `${solana.market_cap_change_24h}`.slice(0, 5) + '%'
            polygonChange.textContent = `${polygon.market_cap_change_24h}`.slice(0, 5) + '%'
            nftChange.textContent = `${nft.market_cap_change_24h}`.slice(0, 5) + '%'
            pteChange.textContent = `${playToEarn.market_cap_change_24h}`.slice(0, 5) + '%'

            if (solana.market_cap_change_24h < 0) {
                solanaChange.classList.add('percent-change-red')
            } else {
                solanaChange.classList.add('percent-change-green')
            }
            if (polygon.market_cap_change_24h < 0) {
                polygonChange.classList.add('percent-change-red')
            } else {
                polygonChange.classList.add('percent-change-green')
            }
            if (nft.market_cap_change_24h < 0) {
                nftChange.classList.add('percent-change-red')
            } else {
                nftChange.classList.add('percent-change-green')
            }
            if (playToEarn.market_cap_change_24h < 0) {
                pteChange.classList.add('percent-change-red')
            } else {
                pteChange.classList.add('percent-change-green')
            }
        })
    fetch(coinMarket, {
        headers: {
            'X-CMC_PRO_API_KEY': '7046b5af-5836-4f47-8edd-30a9e8fe3992'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            const activeCrypto = document.querySelector('.active-coins')
            const atMarketCap = document.querySelector('.at-market-cap')
            const btcDominance = document.querySelector('.btc-dominance')
            const ethDominance = document.querySelector('.eth-dominance')
            const { active_cryptocurrencies, btc_dominance, eth_dominance } = data.data;
            const { total_market_cap } = data.data.quote.USD;

            activeCrypto.textContent = active_cryptocurrencies
            atMarketCap.textContent = `$${total_market_cap}`.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            btcDominance.textContent = `${btc_dominance}`.slice(0, 6) + '%'
            ethDominance.textContent = `${eth_dominance}`.slice(0, 6) + '%'
        })

    const searchBar = document.getElementById('searchBar')
    searchBar.addEventListener('keyup', (e) => {
        const term = e.target.value.toUpperCase();
        for (let i = 0; i < 100; i++) {
            let li = document.querySelectorAll('.row-li')
            txtValue = li[i].textContent || li[i].innerText
            if (txtValue.toUpperCase().indexOf(term) > -1) {
                li[i].style.display = '';
            } else {
                li[i].style.display = 'none'
            }
        }
    })



})


