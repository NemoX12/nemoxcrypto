# NemoXCrypto Bot

NemoXCrypto is a Telegram bot that provides real-time information about cryptocurrencies. It allows users to view the top 10 cryptocurrencies by market cap, search for specific coins, and get information about the bot itself.

## Features

- **Show Top 10 Coins**: Displays the top 10 cryptocurrencies by market capitalization.
- **Search Coin**: Allows users to search for specific cryptocurrencies by name.
- **About**: Provides information about the bot and its credits.

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/NemoX12/nemoxcrypto.git
   cd nemoxcrypto
   ```

2. **Install Dependencies**

   Ensure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory of the project and add your Telegram bot token:

   ```env
   BOT_TOKEN=your_telegram_bot_token
   ```

4. **Run the Bot**

   ```bash
   npm run dev
   ```

## Usage

- Start the bot by sending `/start` to your Telegram bot.
- Use the keyboard options to interact with the bot:
  - **Show Top 10 Coins**: Displays the top 10 cryptocurrencies.
  - **Search Coin**: Search for a specific cryptocurrency.
  - **About**: Provides information about the bot.

## API

The bot uses the [CoinGecko API](https://www.coingecko.com/) to fetch cryptocurrency data.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [CoinGecko API](https://www.coingecko.com/) for cryptocurrency data.
- [Telegraf](https://telegraf.js.org/) for the Telegram Bot API wrapper.
