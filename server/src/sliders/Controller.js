const SliderActions = require('./Actions');

module.exports = {
    sliderItems(request, response) {
        let actions = new SliderActions();
        actions.getSliderItems(request.params.key, request.query.lang).then(data => {
            response.json(data)
        }).catch(err => response.status(500).send(err))
    },
};
