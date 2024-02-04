import app from '@/routes/index';
import { config } from '@config/index';
import dbConnect from '@/db/dbConnect';
import { logintoBot } from './discord';

app.onStart(() => {
    if (config.env.NODE_ENV === 'devlopment') {
        fetch('http://localhost:3001/restart');
        console.log('🦊 Triggering Live Reload');
    }
})
    .onStart(() => {
        config.healthCheck();
        dbConnect();
        logintoBot();
    })
    .listen(config.env.PORT, () =>
        console.log(`Server started at ${config.env.PORT}`),
    );
