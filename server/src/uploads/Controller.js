const Actions = require('./Actions');
const storage = require('./../../util/multer/image-identity-storage');

module.exports = {
    getFile(request, response) {
        let actions = new Actions();
        if (request.query.id)
            actions.getFile(request.query.id).then(res => {
                response.send(res)
            }).catch(err => {
                response.send(err)
            })
    },

    getFileReally(request, response) {
        let actions = new Actions();
        if (request.query.id)
            actions.getFile(request.query.id).then(res => {
                response.setHeader('Content-Type', res.mimetype);
                response.download(res.url);
            }).catch(err => {
                response.send(err)
            })
    },

    upload(request, response) {
        storage.array('file')(request, response, function (err) {
            if (err)
                response.end("Something went wrong:(");

            let actions = new Actions();
            actions.upload(request.file).then(res => {
                return response.send('completed')
            }).catch(err => {
                console.log(err)
                return response.send('failed')
            })
        });
    }
};
