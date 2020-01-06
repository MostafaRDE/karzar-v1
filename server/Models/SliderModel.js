"use strict";

const pg_helper = require('../util/db/psql/pg_help');

class SliderModel extends pg_helper {
    constructor() {
        super('sliders')
    }
}

class SliderItemModel extends pg_helper {
    constructor() {
        super('slider_items')
    }
}

module.exports = {SliderModel, SliderItemModel};
