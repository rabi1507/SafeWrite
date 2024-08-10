const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("DB connected");
    } catch (error) {
        console.error("Issue found while connecting to DB");
        console.error(error);
        process.exit(1);
    }
};

module.exports = {
    connect
};
