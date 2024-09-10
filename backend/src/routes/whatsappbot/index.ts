const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
import axios from "axios";


const client = new Client();

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', (qr: any) => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', async (message: {
    fromMe: boolean;
    reply(arg0: string): unknown; 
    body: string; 
    from: any; 
}) => {
    if (message.fromMe) {
        return;
    }

    if (message.body === 'ping') {
        client.sendMessage(message.from, 'pong');
    } else if (message.body === 'Hello') {
        message.reply('Hi from bhism whatsapp bot. Please ask me anything related to BHISM.');
    } else {
        try {
            const response = await axios.post('http://localhost:5000/process-query', {
                query: message.body
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            message.reply(response.data.response);
        } catch (error) {
            console.error('Error processing query:', error);
            message.reply('Sorry, I could not process your request.');
        }
    }
});
client.initialize();