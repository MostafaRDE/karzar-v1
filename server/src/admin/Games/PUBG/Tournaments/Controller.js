const Actions = require('./Actions');

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.lang || null, request.query.search, request.query.page, request.query.size).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    store(request, response) {
        let actions = new Actions();
        actions.store(
            request.body.title,
            request.body.description,
            request.body.capacity,
            request.body.startDate,
            request.body.rewardValue,
            request.body.fee,
            request.body.status,
            request.body.youtubeLink,
            request.body.mapId,
            request.body.groupCapacity
        ).then(res => response.json(res)).catch(err => response.send(err))
    },

    show(request, response) {
        let actions = new Actions();
        actions.show(request.params.id, request.query.lang || null).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    update(request, response) {
        let actions = new Actions();

        actions.update(
            request.query.lang || null,
            request.params.id,
            request.body.title,
            request.body.description,
            request.body.capacity,
            request.body.startDate,
            request.body.rewardValue,
            request.body.fee,
            request.body.status,
            request.body.youtubeLink,
            request.body.mapId,
            request.body.groupCapacity,
            request.body.username,
            request.body.password
        ).then(res => response.json(res)).catch(err => response.send(err))
    },

    setWinnerTeam(request, response) {
        let actions = new Actions();

        actions.setWinnerTeam(
            request.params.id,
            request.body.group_number
        ).then(res => response.json(res)).catch(err => response.send(err))
    },

    players(request, response) {
        let actions = new Actions();

        actions.players(
            request.params.id
        ).then(res => response.json(res)).catch(err => response.send(err))
    },

    updatePlayers(request, response) {
        let actions = new Actions();

        actions.updatePlayers(
            request.params.id,
            request.body
        ).then(res => response.json(res)).catch(err => response.send(err))
    },

    addAuthenticationRoomToGroupPlayers(request, response) {
        let actions = new Actions();

        actions.addAuthenticationRoomToGroupPlayers(
            request.params.player_id
        ).then(res => response.json(res)).catch(err => response.send(err))
    },

    removeAuthenticationRoomToGroupPlayers(request, response) {
        let actions = new Actions();

        actions.removeAuthenticationRoomToGroupPlayers(
            request.params.player_id
        ).then(res => response.json(res)).catch(err => response.send(err))
    },

    end(request, response) {
        // if (authorize('users.block', request.user_data)) {
            let actions = new Actions();

            actions.end(
                request.params.id
            ).then(res => response.json(res)).catch(err => response.status(500).send(err))
        // } else {
        //     response.status(403).json({status: false, msg: __('messages').you_have_not_access_to_this_section})
        // }
    },

    clearEnd(request, response) {
        // if (authorize('users.unblock', request.user_data)) {
            let actions = new Actions();

            actions.clearEnd(
                request.params.id
            ).then(res => response.json(res)).catch(err => response.send(err))
        // } else {
        //     response.status(403).json({status: false, msg: __('messages').you_have_not_access_to_this_section})
        // }
    },

    destroy(request, response) {
        let actions = new Actions();
        actions.destroy(request.params.id).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    }
};
