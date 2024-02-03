import app from '@/routes/index';
import { config } from '@config/index';
import dbConnect from '@/db/dbConnect';
import { logintoBot } from './discord';
import { LoadCommands } from './discord/loader';

app.onStart(() => {
    if (config.env.NODE_ENV === 'devlopment') {
        fetch('http://localhost:3001/restart');
        console.log('🦊 Triggering Live Reload');
    }
})
    .onStart(() => {
        config.healthCheck();
        dbConnect();
        LoadCommands('1185950578745028629');
        logintoBot();
    })
    .listen(config.env.PORT, () =>
        console.log(`Server started at ${config.env.PORT}`),
    );
/**
 * 
app.onStart(() => {
    if (config.env.NODE_ENV === 'devlopment') {
        fetch('http://localhost:3001/restart');
        console.log('🦊 Triggering Live Reload');
    }
})
    .onStart(() => {
        config.healthCheck();
    })
    .listen(3000, () => console.log('STARTED: 3000'));
 *
 * */
