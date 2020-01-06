import i18n from '../../../i18n'

export default class ConfirmPassword {
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
        return value === this.data['password']
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    message() {
        return i18n.t('messages.rules.confirm_password')
    }
}