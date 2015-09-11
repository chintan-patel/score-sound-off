var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/nfl/games', getNFLGames);
router.get('/nfl/games/:id', getNFLGame);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getNFLGames(req, res, next) {
    res.status(200).send(data.nflGames);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}

function getNFLGame(req, res, next) {
    var id = +req.params.id;
    var nflGame = data.nflGames.filter(function(p) {
        return p.id === id;
    })[0];

    if (nflGame) {
        res.status(200).send(nflGame);
    } else {
        four0four.send404(req, res, 'NFL Game ' + id + ' not found');
    }
}