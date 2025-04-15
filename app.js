import express from 'express';

import { PORT } from './config/env.js'

const app = express();
// const PORT = process.env.PORT
app.get('/', (req, res)=>{
    res.send('Welcome to the Subscription Tracker API!');
})

//debug console to check the port number after importing in the app.js
console.log('PORT value in app.js is:', PORT); // 👀

app.listen(Number(PORT) || 3000, ()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
})

export default app;