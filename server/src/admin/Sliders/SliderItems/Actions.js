const {SliderItemModel} = require('../../../../Models/SliderModel');
const {microtime} = require('./../../../../util/helper/functions');
const translateStore = require('../../../../util/glossary').store;

class SliderItemActions {
    getSliderItems(id) {
        return new Promise((resolve, reject) => {
            let slider = new SliderItemModel();
            slider.fetch_all('*', ['slider_id'], [id]).then(data => {
                resolve(data)
            }).catch(reject)
        })
    }

    storeSliderItem(sliderId, mediaId, link, titles, descriptions, linkTexts) {
        return new Promise(async (resolve, reject) => {
            try {
                let slider = new SliderItemModel();

                const translateKeyTitle = `sliders_${sliderId}_title_${microtime()}`;
                const translateKeyDescription = `sliders_${sliderId}_description_${microtime()}`;
                const translateKeyLinkText = `sliders_${sliderId}_link_text_${microtime()}`;

                await slider.insertSync(['link', 'glossary_key_title', 'glossary_key_description', 'glossary_key_link_text', 'media_id', 'slider_id'], [link, translateKeyTitle, translateKeyDescription, translateKeyLinkText, mediaId, sliderId]);

                let languages = Object.keys(titles);
                for (let i = 0; i < languages.length; i++) {
                    await translateStore(translateKeyTitle, titles[languages[i]], languages[i])
                }
                languages = Object.keys(descriptions);
                for (let i = 0; i < languages.length; i++) {
                    await translateStore(translateKeyDescription, descriptions[languages[i]], languages[i])
                }
                languages = Object.keys(linkTexts);
                for (let i = 0; i < languages.length; i++) {
                    await translateStore(translateKeyLinkText, linkTexts[languages[i]], languages[i])
                }

                resolve({status: true})
            } catch (e) {
                reject(e)
            }
        })
    }
}

module.exports = SliderItemActions;
