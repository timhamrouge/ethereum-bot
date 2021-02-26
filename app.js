const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();
require('dotenv').config();

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)
    const channel = client.channels.cache.find((x) => x.name === "bot-playground" && x.type === 'text')
    // console.log(channel)
    axios.get('http://api.coincap.io/v2/rates/ethereum')
        .then(res => {
            const eth = res;
            axios.get('https://api.exchangeratesapi.io/latest?base=USD').then(res => {
                console.log(res.data, eth.data.data.rateUsd)
                const priceInGbp = +res.data.rates.GBP * eth.data.data.rateUsd
                console.log(priceInGbp)
                channel.send(`the current price of ethereum in GBP is: £${priceInGbp.toFixed(2)}`)
            })
        })
});

client.login(process.env.BOT_SECRET_TOKEN);