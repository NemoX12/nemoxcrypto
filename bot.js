require('dotenv').config();
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');

let top10Coins = [];

// Fetch the top 10 coins from the API
axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    .then(res => {
        top10Coins = res.data.map(coin => ({
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            priceUSD: (coin.current_price * 0.012).toFixed(2),
            marketCap: (coin.market_cap * 0.012).toFixed(2),
            volume: (coin.total_volume * 0.012).toFixed(2),
            priceChange24h: coin.price_change_percentage_24h.toFixed(2)
        }));
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
    ctx.reply(
        `Welcome, ${ctx.message.from.first_name}! What would you like to do?`,
        Markup.keyboard([
            ['Show Top 10 Coins'],
            ['Search Coin'],
            ['About']
        ]).resize()
    );
});

bot.hears('Show Top 10 Coins', (ctx) => {
    if (top10Coins.length > 0) {
        let message = 'Top 10 Coins:\n\n';
        top10Coins.forEach((coin, index) => {
            message += `${index + 1}. ${coin.name} (${coin.symbol})\nPrice: $${coin.priceUSD}\nMarket Cap: $${coin.marketCap}\nVolume: $${coin.volume}\n24h Change: ${coin.priceChange24h}%\n\n`;
        });
        ctx.reply(message);
    } else {
        ctx.reply('Coin data is not available at the moment.');
    }
});

bot.hears('Search Coin', (ctx) => {
    ctx.reply('Please enter the name or symbol of the coin you want to search for:');
    bot.on('text', async (ctx) => {
        const query = ctx.message.text.trim().toLowerCase();
        try {
            const res = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                params: {
                    vs_currency: 'INR',
                    ids: query // Search by coin id (symbol or name)
                }
            });

            if (res.data && res.data.length > 0) {
                const coin = res.data[0];
                const message = `Coin: ${coin.name} (${coin.symbol.toUpperCase()})\nPrice: $${(coin.current_price * 0.012).toFixed(2)}\nMarket Cap: $${(coin.market_cap * 0.012).toFixed(2)}\nVolume: $${(coin.total_volume * 0.012).toFixed(2)}\n24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%`;
                ctx.reply(message);
            } else {
                ctx.reply('Coin not found. Please check the name or symbol and try again.');
            }
        } catch (error) {
            console.error('Error searching for coin:', error);
            ctx.reply('An error occurred while searching for the coin. Please try again later.');
        }
    });
});

bot.hears("About", (ctx) => {
    ctx.reply(`NemoXCrypto - a simple bot that shows different data about crypto tokens.\n\nCredits:\nAPI: www.coingecko.com\nAuthor: @n3m0xxx`)
});

bot.help((ctx) => {
    ctx.reply("To get started, choose an option from the menu.")
})

bot.launch();

console.log('bot started');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
