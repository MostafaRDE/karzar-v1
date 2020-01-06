const {SliderItemModel} = require('../../../../Models/SliderModel');
const {microtime} = require('./../../../../util/helper/functions');

class SliderItemActions {
    getSliderItems(id) {
        return new Promise((resolve, reject) => {
            let slider = new SliderItemModel();
            slider.fetch_all('*', ['slider_id'], [id]).then(data => {
                resolve(data)
            }).catch(reject)
        })
    }

    storeSliderItem(sliderId, mediaId, link) {
        return new Promise(async (resolve, reject) => {
            try {
                let slider = new SliderItemModel();
                await slider.insertSync(['link', 'glossary_key_title', 'glossary_key_description', 'media_id', 'slider_id'], [link, `sliders_${sliderId}_title_${microtime()}`, `sliders_${sliderId}_description_${microtime()}`, mediaId, sliderId]);
                resolve({status: true})
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = SliderItemActions;
