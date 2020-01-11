const Actions = require('./Actions');

module.exports = {
    index(request, response) {
        const actions = new Actions();
        actions.index(request.query.lang || null, request.query.page, request.query.size).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(422).send(error)
        })
    },

    last(request, response) {
        const actions = new Actions();
        actions.last(request.query.lang).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(422).send(error)
        })
    },

    players(request, response) {
        const actions = new Actions();
        actions.players(request.query.lang, request.params.id).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(422).send(error)
        })
    },

    enter(request, response) {
        const actions = new Actions();
        let characterName = request.body.character_name;
        if (characterName) {

            let characterNames = characterName.split(',');
            characterNames = characterNames.map(char => char.trim());
            characterNames = characterNames.filter(char => char !== '');

            if (characterNames.length > 0) {
                if (characterNames.length === 1) {
                    actions.enter(request.query.lang, request.params.id, request.user.id, characterNames[0]).then(data => {
                        response.send(data)
                    }).catch(error => {
                        response.status(422).send(error)
                    })
                } else {
                    actions.enterMultiPlayer(request.query.lang, request.params.id, request.user.id, characterNames).then(data => {
                        response.send(data)
                    }).catch(error => {
                        response.status(422).send(error)
                    })
                }
            } else {
                response.status(422).send({status: false})
            }
        } else {
            response.status(422).send({status: false})
        }
    },

    myTournaments(request, response) {
        const actions = new Actions();
        actions.myTournaments(request.query.lang, request.user.id, request.query.page, request.query.size).then(data => {
            response.send(data)
        }).catch(error => {
            response.status(422).send(error)
        })
    },
};
