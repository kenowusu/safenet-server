
//require .env
require('dotenv').config();


const devBrowserClient = process.env.devBrowserClient;
const devBrowserClientTwo = process.env.devBrowserClientTwo;
const proBrowserClient = process.env.proBrowserClient;


export const corsOptions = {
    origin:[proBrowserClient,devBrowserClient,devBrowserClientTwo],
    credentials:true
}

