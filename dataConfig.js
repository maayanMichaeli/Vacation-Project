const mysql = require('mysql');
const con = mysql.createConnection({
    host: 'eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    user: 'wek1ofn8znkyultf',
    password: 'do5hiyy0l4dlz8l7',
    database: 'ocfmefz3841mz3yt'
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