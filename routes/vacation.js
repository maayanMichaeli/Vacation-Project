const { myQuery } = require('../dataConfig');
const { onlyAdmin } = require('../helpers/onlyAdmin');
const { onlyLoggedUsers } = require('../helpers/onlyLoggedUsers');
const { onlyUsers } = require('../helpers/onlyUsers');

const router = require('express').Router();

router.get('/', onlyLoggedUsers, async (req, res) => {
    try {
        const { id } = req.session.user;
        const vac = await myQuery(`SELECT vacations.id, vacations.title, vacations.description, vacations.destination, vacations.img, vacations.arrDate, vacations.retDate, vacations.price
        FROM vacations LEFT JOIN followingusers ON vacations.id = followingUsers.vacationID WHERE userID = ${id}
        UNION
        SELECT vacations.id, vacations.title, vacations.description, vacations.destination, vacations.img, vacations.arrDate, vacations.retDate, vacations.price
        FROM vacations LEFT JOIN followingusers ON vacations.id = followingUsers.vacationID
        GROUP BY vacations.id`);
        const followedArr = await myQuery(`SELECT vacations.id FROM vacations LEFT JOIN followingusers ON vacations.id = followingUsers.vacationID WHERE userID = ${id}`);
        const followedIdArr = followedArr.map(f => f.id);
        for (const vacation of vac) {
            vacation.follow = followedIdArr.includes(vacation.id);
        }
        console.log(vac[2].arrDate);
        res.status(200).send(vac);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }

});

router.post('/search', onlyLoggedUsers, async (req, res) => {
    try {
        const { destination } = req.body;
        const vac = await myQuery(`SELECT * FROM vacations WHERE destination LIKE "%${destination}%"`);
        if (!vac.length) res.status(401).send({ msg: "No Vacation Found" });
        else if (!destination) res.status(401).send({ msg: "You Need To Insert a Value" });
        res.status(200).send(vac);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});





module.exports = router;


