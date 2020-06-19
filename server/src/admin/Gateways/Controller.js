const Actions = require('./Actions');
const storage = require('../../../util/multer/image-identity-storage');
const mediaSaveFile = require('../../../util/media').saveFile;

module.exports = {
    index(request, response) {
        let actions = new Actions();
        actions.index(request.query.lang || null, request.params.type).then(data => {
            response.json(data)
        }).catch(error => {
            response.send(error)
        })
    },

    store(request, response) {
        let actions = new Actions(),
            name = request.body.name,
            isActive = JSON.parse(request.body.is_active),
            isDeposit = JSON.parse(request.body.is_deposit),
            isWithdrawal = JSON.parse(request.body.is_withdrawal),
            key1Deposit = JSON.parse(request.body.key1_deposit),
            key2Deposit = JSON.parse(request.body.key2_deposit),
            key1Withdrawal = JSON.parse(request.body.key1_deposit),
            key2Withdrawal = JSON.parse(request.body.key2_deposit),
            image = request.files[0];

        storage.array('file')(request, response, function (err) {
            if (err)
                response.status(500).end("Something went wrong:(");

            mediaSaveFile(image).then(media => {
                actions.store(name, isActive, isDeposit, isWithdrawal, key1Deposit, key2Deposit, key1Withdrawal, key2Withdrawal, media.id)
                    .then(res => response.json(res)).catch(err => response.send(err))
            });
        })
    },

    update(request, response) {
        let actions = new Actions(),
            name = request.body.name,
            isActive = JSON.parse(request.body.is_active),
            isDeposit = JSON.parse(request.body.is_deposit),
            isWithdrawal = JSON.parse(request.body.is_withdrawal),
            key1Deposit = JSON.parse(request.body.key1_deposit),
            key2Deposit = JSON.parse(request.body.key2_deposit),
            key1Withdrawal = JSON.parse(request.body.key1_deposit),
            key2Withdrawal = JSON.parse(request.body.key2_deposit),
            image = request.files[0];

        if (image) {
            storage.array('file')(request, response, function (err) {
                if (err)
                    response.status(500).end("Something went wrong:(");

                mediaSaveFile(image).then(media => {
                    actions.update(request.params.id, name, isActive, isDeposit, isWithdrawal, key1Deposit, key2Deposit, key1Withdrawal, key2Withdrawal, media.id)
                        .then(res => response.json(res)).catch(err => response.send(err))
                });
            })
        } else {
            actions.update(request.params.id, name, isActive, isDeposit, isWithdrawal, key1Deposit, key2Deposit, key1Withdrawal, key2Withdrawal)
                .then(res => response.json(res)).catch(err => response.send(err))
        }
    },
};
