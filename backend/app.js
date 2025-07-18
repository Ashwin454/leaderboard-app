const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const userRouter = require("./routes/userRoutes.js");
const historyRouter = require("./routes/historyRoutes.js");
app.set('trust proxy', true);

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.json());

app.use("/api/v1/users", userRouter);
app.use('/api/v1/history', historyRouter);

module.exports = app;