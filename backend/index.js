// importing express
const express = require('express');
require('dotenv').config();
const DoctorRouter = require('./routers/DoctorRouter');
const PatientRouter = require('./routers/Patient')
const slotRouter = require('./routers/slotRouter')
const cors = require('cors');

// initialize express
const app = express();

const port = process.env.PORT || 5000;

//middlewares

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());
app.use('/user', PatientRouter);
app.use('/doctor', DoctorRouter);
app.use('/slot', slotRouter);

// endpoints or routes
app.get('/', (req, res) => {
    res.send('response from express');
});

// Add a simple ping endpoint for connection testing
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});

app.get('/add', (req, res) => {
    res.send('response from add');
});

// getall
// delete
// update

// starting the server
app.listen(port, () => {
    console.log('server started');
});