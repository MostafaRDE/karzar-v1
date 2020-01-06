const {SliderModel} = require('../../../Models/SliderModel');

class SliderActions {
    getSliders() {
        return new Promise((resolve, reject) => {
            let sliderModel = new SliderModel();
            sliderModel.fetch_all('*').then(data => resolve(data)).catch(err => reject(err))
        })
    }

    store(name) {
        return new Promise(async (resolve, reject) => {
            try {
                let sliderModel = new SliderModel();
                await sliderModel.insertSync(['name'], [name]);
                return resolve({status: true});
            } catch (e) {
                reject(e);
            }
        });
    }
}

module.exports = SliderActions;
