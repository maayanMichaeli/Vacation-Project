const { myQuery } = require('../dataConfig');
const { onlyAdmin } = require('../helpers/onlyAdmin');

const router = require('express').Router();

router.post('/add', onlyAdmin, async (req, res) => {
    try {
        const { title, description, destination, img, arrDate, retDate, price } = req.body;
        await myQuery(`INSERT INTO vacations (title,description,destination,img,arrDate,retDate,price) VALUES ("${title}","${description}","${destination}","${img}","${arrDate}","${retDate}",${price})`);
        if (!title || !description || !destination || !img || !arrDate || !retDate || !price) {
            res.status(401).send({ err: "Miising Some Info" });
        }
        res.status(200).send({ msg: "vacation added successfuly" });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.delete('/:id', onlyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await myQuery(`DELETE FROM followingUsers WHERE vacationID = ${id}`);
        await myQuery(`DELETE FROM vacations WHERE id = ${id}`);
        res.status(200).send({ msg: "vacation deleted successfuly" });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.get('/stats', onlyAdmin, async (req, res) => {
    try {
        const stats = await myQuery('SELECT COUNT(userID) as following ,vacations.destination FROM followingUsers INNER JOIN vacations on vacations.id = followingUsers.vacationID GROUP BY vacationID');
        res.status(200).send(stats);
    } catch (error) {
        res.status(500).send(err);
        console.log(err);
    }
});


router.put('/:id', onlyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, destination, img, arrDate, retDate, price } = req.body;
        const edit = await myQuery(`UPDATE vacations SET title = "${title}",description = "${description}", destination = "${destination}", img = "${img}", arrDate = "${arrDate}", retDate = "${retDate}", price = ${price} WHERE id = ${id}`);
        res.status(200).send({ msg: `vacation updated successfully the new details are: ${edit}` });
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

router.get('/', onlyAdmin, async (req, res) => {
    try {
        const vac = await myQuery(`SELECT vacations.title, vacations.description, vacations.destination, vacations.img, vacations.arrDate, vacations.retDate, vacations.price FROM vacations`);
        res.status(200).send(vac);
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
});

module.exports = router;




