
//require .env
require('dotenv').config();


const browserClient = process.env.devBrowserClient || process.env.proBrowserClient 

if(!browserClient){
    console.log('client not defined');
}
export const corsOptions = {
    origin:[browserClient],
    credentials:true
}

