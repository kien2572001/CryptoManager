let mongoose = require('mongoose');
const mongo_url =  "mongodb+srv://PortfolioManager:kien0988742565@crypto-manager.eznss6v.mongodb.net/?retryWrites=true&w=majority" ;

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(mongo_url)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()