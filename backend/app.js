const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const userRouter = require("./routes/userRoutes.js");
const historyRouter = require("./routes/historyRoutes.js");
app.set('trust proxy', true);

app.use(cors({
    origin: ['http://localhost:3000', 'https://leaderboard-app-1.netlify.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

// Ping endpoint to keep the service alive on render
app.get('/ping', (req, res) => {
    res.send('OK');
});

// Self-pinging mechanism
setInterval(() => {
    fetch('https://leaderboard-app-iq8m.onrender.com/ping')
        .catch(err => console.log('Ping failed:', err));
}, 600000);


app.use("/api/v1/users", userRouter);
app.use('/api/v1/history', historyRouter);

module.exports = app;