import i18n from "../../../i18n";

export default class ConfirmedPassword {
    /**
     * Get all data for custom check
     *
     * @param data
     */
    constructor(data) {
        this.data = data;
        this.length = 0;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  value
     * @param  length
     * @return boolean
     */
    passes(value, length) {
        this.valueType = typeof value;
        this.length = length;

        switch (typeof value) {
            case "number":
            case "bigint":
                return value >= length;

            case "string":
                return value.length >= length;

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
        switch (this.valueType) {
            case "number":
            case "bigint":
                return i18n.t('messages.rules.min.number', {number: this.length});

            case "string":
                return i18n.t('messages.rules.min.string', {count: this.length});

            default:
                return '';
        }
    }
}