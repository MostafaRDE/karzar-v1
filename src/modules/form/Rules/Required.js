import i18n from "../../../i18n";

export default class Required {
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
        switch (typeof value) {
            case 'boolean':
                return value;

            case 'object':
                if (Array.isArray(value))
                     return value.length > 0;
                else
                    return Object.keys(value).length > 0;

            case 'string':
                return value.trim().length > 0;

            default:
                return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    message() {
        return i18n.t('messages.rules.required')
    }
}