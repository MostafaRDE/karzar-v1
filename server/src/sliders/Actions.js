const {SliderModel} = require('../../Models/SliderModel');
const mediaGetFile = require('../../util/media').getFile;
const translate = require('../../util/glossary').translate;

class SliderActions {
    getSliderItems(key, lang = 'en') {
        return new Promise((resolve, reject) => {
            let slider = new SliderModel();
            slider.fetch_all_custom(`SELECT slider_items.id, slider_items.link, slider_items.glossary_key_link_text, slider_items.glossary_key_title, slider_items.glossary_key_description, slider_items.media_id FROM sliders INNER JOIN slider_items ON(sliders.id = slider_items.slider_id) WHERE sliders.name = '${key}' ORDER BY position`).then(async data => {
                let response = {
                    result: [],
                    total: data.total,
                };

                for (let i = 0; i < data.total; i++) {
                    let title = await translate(data.result[i].glossary_key_title, lang),
                        description = await translate(data.result[i].glossary_key_description, lang),
                        link_text = await translate(data.result[i].glossary_key_link_text, lang);

                    response.result[i] = {
                        id: data.result[i].id,
                        link: data.result[i].link,
                        glossary_key_title: data.result[i].glossary_key_title,
                        glossary_key_description: data.result[i].glossary_key_description,
                        glossary_key_link_text: data.result[i].glossary_key_link_text,
                        title,
                        description,
                        link_text,
                        media: await mediaGetFile(data.result[i].media_id),
                    }
                }

                resolve(response)
            }).catch(err => {
                console.log(`Get slider items ( KEY = '${key}' ) => `, err);
                reject({
                    status: false,
                    msg: __('messages').internal_server_error
                })
            })
        })
    }
}

module.exports = SliderActions;
