// importing express
const express = require('express');
require('dotenv').config();
const DoctorRouter = require('./routers/DoctorRouter');
const PatientRouter = require('./routers/Patient')
const cors = require('cors');

// initialize express
const app = express();

const port = process.env.PORT || 5000;

//middlewares

app.use(cors({
    origin: '*'
}))
app.use(express.json());
app.use('/user', PatientRouter);
app.use('/doctor', DoctorRouter);

// endpoints or routes
app.get('/', (req, res) => {
    res.send('response from express');
})

app.get('/add', (req, res) => {
    res.send('response from add');
})

// getall
// delete
// update

// starting the server
app.listen(port, () => {
    console.log('server started');
});