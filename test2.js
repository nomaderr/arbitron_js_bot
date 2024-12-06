const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

const TOKEN = '';
const bot = new TelegramBot(TOKEN, { polling: true });

let lastMessageIds = [];


bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const imagePath = path.join(__dirname, 'telbot.jpg');

    // Sending the welcome image
    await bot.sendPhoto(chatId, imagePath, {
        caption: '🎉 Welcome dvs to $ARBITRON Bot! 🎉'
    });

    // Sending the welcome text
    await bot.sendMessage(chatId,
        "Arbitron's Telegram Bot is the central hub of the ecosystem, connecting you to real-time updates, insights, and revenue share.\n\n" +
        "Features\n" +
        "🔎 Dashboard\n" +
        "Get a comprehensive overview of the Arbitron ecosystem.\n\n" +
        "⚙️ Arbitrage\n" +
        "Stay updated with our current trades in the Arbitrage section.\n\n" +
        "💰 Revenue Share\n" +
        "Track your income with ease in the Revenue Share section.\n\n" +
        "🔁 Referral System\n" +
        "Currently under development."
    );

    // Display main menu after the welcome text
    showMainMenu(chatId);
});


async function showMainMenu(chatId) {
    deleteLastMessages(chatId);
    let sentMessage = await bot.sendMessage(chatId, 'Main Menu', {
        reply_markup: {
            keyboard: [
                ['dashboard'],
                ['revenue shares'],
                ['arbitrage'],
                ['referral system']
            ],
            resize_keyboard: true
        }
    });
    lastMessageIds.push(sentMessage.message_id);
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case 'dashboard':
            showDashboardMenu(chatId);
            break;
        case 'CLOSE':
            showMainMenu(chatId);
            break;
        // ... other cases ...
    }
});

async function showDashboardMenu(chatId) {
    deleteLastMessages(chatId);
    let sentMessage = await bot.sendMessage(chatId, 'Arbitron Token\n' +
        'Real-time Statistics for the Arbitron Token.\n' +
        '💰Price: 0$\n' +
        '📊Market Cap: 0$\n' +
        '👤Holders: 0\n' +
        '\n' +
        'Arbitron Bot\n' +
        'Real-time Statistics for the Arbitrage Bot.\n' +
        '💵Arbitrage Pool:\n' +
        '📈Total Volume: 0$\n' +
        '⚙️Trades: 0$', {
        reply_markup: {
            keyboard: [
                ['CLOSE']
            ],
            resize_keyboard: true
        }
    });
    lastMessageIds.push(sentMessage.message_id);
}

async function deleteLastMessages(chatId) {
    for (let messageId of lastMessageIds) {
        await bot.deleteMessage(chatId, messageId);
    }
    lastMessageIds = [];
}


bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case 'dashboard':
            showDashboardMenu(chatId);
            break;
        case 'revenue shares':
            showRevenueSharesMenu(chatId);
            break;
        case 'My revenue share':
            showMyRevenueShareMenu(chatId);
            break;
        case 'Claim':
            promptForClaimAmount(chatId);
            break;
        case 'CLOSE':
            showMainMenu(chatId);
            break;
        // ... other cases ...
    }
});

async function showRevenueSharesMenu(chatId) {
    deleteLastMessages(chatId);
    let sentMessage = await bot.sendMessage(chatId, 'Total Revenue:\n' +
        '24H Revenue:\n' +
        '0$\n' +
        'Total Revenue:\n' +
        '0$\n' +
        'Total Revenue Distributed:\n' +
        '0 ETH\n' +
        'Next Claim: 24:00:00', {
        reply_markup: {
            keyboard: [
                ['My revenue share'],
                ['CLOSE']
            ],
            resize_keyboard: true
        }
    });
    lastMessageIds.push(sentMessage.message_id);
}

async function showMyRevenueShareMenu(chatId) {
    deleteLastMessages(chatId);
    let sentMessage = await bot.sendMessage(chatId, 'Your Revenue Share Options:', {
        reply_markup: {
            keyboard: [
                ['Claim'],
                ['CLOSE']
            ],
            resize_keyboard: true
        }
    });
    lastMessageIds.push(sentMessage.message_id);
}

async function promptForClaimAmount(chatId) {
    deleteLastMessages(chatId);
    let sentMessage = await bot.sendMessage(chatId, "Press claim and enter your wallet address");
    lastMessageIds.push(sentMessage.message_id);
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case 'dashboard':
            showDashboardMenu(chatId);
            break;
        case 'CLOSE':
            showMainMenu(chatId);
            break;
        // ... other cases ...
    }
});

async function showDashboardMenu(chatId) {
    deleteLastMessages(chatId);
    let sentMessage = await bot.sendMessage(chatId, 'Arbitron Token\n' +
        'Real-time Statistics for the Arbitron Token.\n' +
        '💰Price: 0$\n' +
        '📊Market Cap: 0$\n' +
        '👤Holders: 0\n' +
        '\n' +
        'Arbitron Bot\n' +
        'Real-time Statistics for the Arbitrage Bot.\n' +
        '💵Arbitrage Pool:\n' +
        '📈Total Volume: 0$\n' +
        '⚙️Trades: 0$', {
        reply_markup: {
            keyboard: [
                ['CLOSE']
            ],
            resize_keyboard: true
        }
    });
    lastMessageIds.push(sentMessage.message_id);
}

async function deleteLastMessages(chatId) {
    for (let messageId of lastMessageIds) {
        await bot.deleteMessage(chatId, messageId);
    }
    lastMessageIds = [];
}

async function showArbitrageMenu(chatId) {
    deleteLastMessages(chatId);
    let sentMessage = await bot.sendMessage(chatId, 'Arbitron Arbitrage Info\n' +
        '📈 Active Trades: 0\n' +
        '💵 Total Profit: 0$\n' +
        '⚙️ Latest Trade: None', {
        reply_markup: {
            keyboard: [
                ['CLOSE']
            ],
            resize_keyboard: true
        }
    });
    lastMessageIds.push(sentMessage.message_id);
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case 'dashboard':
            showDashboardMenu(chatId);
            break;
        case 'arbitrage':
            showArbitrageMenu(chatId);
            break;
        case 'CLOSE':
            showMainMenu(chatId);
            break;
        // ... other cases ...
    }
});
