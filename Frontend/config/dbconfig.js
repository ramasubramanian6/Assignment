const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const DBURL= process.env.DBURL ;


const dbConfig = async () => {
    try {
        const status=await mongoose.connect(DBURL);
        if(status) console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
        
    }
}

module.exports = dbConfig;