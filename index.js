const express = require('express');
const session = require('express-session');
const port = process.env.PORT || 3000;
const path = require('path');


const app = express();

app.use(express.json());

app.use(session({
    secret: 'Alohomora',
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

app.use('/users', require('./routes/users.js'));
app.use('/admin', require('./routes/admin.js'));
app.use('/vacation', require('./routes/vacation.js'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));  // set static folder 
    //returning frontend for any route other than api 
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build',
            'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});