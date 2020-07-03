const Actions = require('./Actions');

module.exports = {
    index(request, response) {
        const actions = new Actions();
        actions.index(request.query.lang || null, request.query.page, request.query.size).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    played(request, response) {
        const actions = new Actions();
        actions.played(request.query.lang || null, request.query.page, request.query.size).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    top10(req, res) {
        const actions = new Actions();
        actions.top10(req.query.days).then(data => {
            res.json(data)
        }).catch(error => {
            res.status(500).send(error)
        })
    },

    last(request, response) {
        const actions = new Actions();
        actions.last(request.query.lang).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    runningTournaments(request, response) {
        const actions = new Actions();
        actions.runningTournaments(request.query.lang, request.isAuthenticated(), request.user ? request.user.id : undefined).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    characters(request, response) {
        const actions = new Actions();
        actions.characters(request.query.character, request.user ? request.user.id : null).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    storeCharacter(request, response) {
        const actions = new Actions();
        actions.storeCharacter(request.body.id, request.body.name, request.user.id).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    updateCharacter(request, response) {
        const actions = new Actions();
        actions.updateCharacter(request.params.id, request.body.name, request.user.id, request.body.id).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    players(request, response) {
        const actions = new Actions();
        actions.players(request.query.lang, request.params.id).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },

    enter(request, response) {
        const actions = new Actions();
        let characters = request.body.characters;
        if (characters) {

            let characterIds = characters.split(',');
            characterIds = characterIds.map(char => char.trim());
            characterIds = characterIds.filter(char => char !== '');

            if (characterIds.length > 0) {
                if (characterIds.length === 1) {
                    actions.enter(request.query.lang, request.params.id, request.user.id, characterIds[0]).then(data => {
                        response.send(data)
                    }).catch(error => {
                        response.status(500).send(error)
                    })
                } else {
                    actions.enterMultiPlayer(request.query.lang, request.params.id, request.user.id, characterIds).then(data => {
                        response.send(data)
                    }).catch(error => {
                        response.status(500).send(error)
                    })
                }
            } else {
                response.status(500).send({status: false})
            }
        } else {
            response.status(500).send({status: false})
        }
    },

    myTournaments(request, response) {
        const actions = new Actions();
        actions.myTournaments(request.query.lang, request.user.id, request.query.page, request.query.size).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(500).send(error)
        })
    },
};
