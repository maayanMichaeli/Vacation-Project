const { myQuery } = require('../dataConfig');
const { onlyUsers } = require('../helpers/onlyUsers');

const router = require('express').Router();

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) return res.status(400).send({ err: "missing username or password" });
        const user = await myQuery(`select * from users where userName = "${userName}" and password = "${password}" `);
        if (!user.length) return res.status(401).send({ err: true, msg: "wrong username or password" });

        req.session.user = user[0];
        res.send(user);

    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }

});

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, userName, password } = req.body;
        if (!firstName || !lastName || !userName || !password) return res.status(400).send({ err: "missing some details" });
        const user = await myQuery(`SELECT * FROM users WHERE userName = "${userName}" AND password = "${password}" `);
        if (user.length) return res.status(401).send({ err: true, msg: "user already exist!" });
        await myQuery(`INSERT INTO users (firstName,lastName,userName,password) VALUES ("${firstName}","${lastName}","${userName}","${password}") `);
        res.status(201).send({ err: false, msg: "User Added Successfully" });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.delete('/logout', (req, res) => {
    req.session.destroy();
    res.send({ err: false, msg: "Logged out successfully" });

});

router.post('/follow/:vacationID', onlyUsers, async (req, res) => {
    try {
        const { id } = req.session.user;
        const { vacationID } = req.params;
        const follow = await myQuery(`SELECT * FROM followingUsers WHERE userID = ${id} AND vacationID = ${vacationID} `);
        if (follow.length) return res.status(401).send('you already follow this vacation');
        await myQuery(`INSERT INTO followingUsers (userID,vacationID) VALUES (${id},${vacationID})`);
        const vac = await myQuery(`SELECT vacations.id, vacations.title, vacations.description, vacations.destination, vacations.img, vacations.arrDate, vacations.retDate, vacations.price
        FROM vacations LEFT JOIN followingusers ON vacations.id = followingUsers.vacationID WHERE userID = ${id}
        UNION
        SELECT vacations.id, vacations.title, vacations.description, vacations.destination, vacations.img, vacations.arrDate, vacations.retDate, vacations.price
        FROM vacations LEFT JOIN followingusers ON vacations.id = followingUsers.vacationID
        GROUP BY vacations.id`);
        res.status(200).send(vac);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.delete('/unfollow/:vacationID', onlyUsers, async (req, res) => {
    try {
        const { id } = req.session.user;
        const { vacationID } = req.params;
        await myQuery(`DELETE FROM followingUsers WHERE userID = ${id} AND vacationID = ${vacationID}`);
        const vac = await myQuery(`SELECT vacations.id, vacations.title, vacations.description, vacations.destination, vacations.img, vacations.arrDate, vacations.retDate, vacations.price
        FROM vacations LEFT JOIN followingusers ON vacations.id = followingUsers.vacationID WHERE userID = ${id}
        UNION
        SELECT vacations.id, vacations.title, vacations.description, vacations.destination, vacations.img, vacations.arrDate, vacations.retDate, vacations.price
        FROM vacations LEFT JOIN followingusers ON vacations.id = followingUsers.vacationID
        GROUP BY vacations.id`);
        res.status(200).send(vac);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});


module.exports = router;



