const { Router } = require('express');
const router = Router();
const Comic = require('../models/comic');

router.get('/', async (req, res) => {
    const comic = await Comic.get();
    res.render('index', { comic });
});

router.get('/:id', async (req, res) => {

    if (Number(req.params.id)) {

        const comic = await Comic.get(req.params.id);

        if (comic) {
            res.render('index', { comic });
        } else {
            res.status(404).render('404');
        }

    } else {
        res.status(404).render('404');
    }

});

router.get('*', function(req, res){
    res.status(404).render('404');
});

module.exports = router;
