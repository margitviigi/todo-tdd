require('dotenv').config(); 

const app = require('./app');
const mongodb = require('./mongodb/mongodb.connect');

async function start() {
    await mongodb.connect();
    app.listen(3015, () => {
        console.log('Server is running on port 3015');
    });
}

start().catch((error) => {
    console.error('Failed to start server:', error);
    process.exitCode = 1;
});
