import Regex from "../../../util/regex.js"
import i18n from "../../../i18n";

export default class Password {
    /**
     * Get all data for custom check
     *
     * @param data
     */
    constructor(data) {
        this.data = data
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  value
     * @return boolean
     */
    passes(value) {
        return Regex.PASSWORD.test(value)
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    message() {
        return i18n.t('messages.rules.password')
    }
}