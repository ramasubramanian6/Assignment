const express= require('express');
const dotenv = require('dotenv');
const dbConfig = require('./config/dbconfig');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./router/router');


dotenv.config();



const app = express();
app.use(express.json());


//cookies
app.use(cookieParser());


const corsUrl = {
    origin: 'http://localhost:5173', // your frontend origin
    credentials: true
};
app.use(cors(corsUrl));






// Connect to the database
dbConfig ();




//ādd all Routes
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Backend and db connected successfully');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("http://localhost:" + PORT);
});
