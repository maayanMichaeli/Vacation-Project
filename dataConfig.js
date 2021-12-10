const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user: 'ny3fm141e5gyh96u',
    password: 'zpkooxtslwrfbkkt',
    database: 'xybsv96f6qve5xtr'
});

con.connect((err) => {
    if (err) console.log(err);
    else { console.log("Connected to MySql"); }
});

const myQuery = (q) => {
    return new Promise((resolve, reject) => {
        con.query(q, (err, results) => {
            if (err) {
                reject(err);
            } else { resolve(results); }
        });
    });
};

module.exports = { myQuery };