const Actions = require('./Actions');
const Zibal = require("../../../util/gateways/zibal");

module.exports = {
    index(req, res) {
        switch (req.params.gateway) {
            case 'zibal':
                switch (req.query.status) {

                    case '-1':
                        res.redirect('/callback/zibal/error?msg=' + __('messages').infos.awaiting_payment);
                        break;

                    case '-2':
                        res.redirect('/callback/zibal/error?msg=' + __('messages').errors.internal_error);
                        break;

                    case '2':
                        Zibal.verify(req.query.trackId)
                            .then(response => {
                                new Actions().chargeWallet(req.user.id, req.query.trackId, response.amount / 10).then(response => {
                                    res.redirect('/callback/zibal/success?msg=' + __('gateways').successes.payment_was_successful);
                                }).catch(error => {
                                    res.redirect('/callback/zibal/error?msg=' + __('gateways').errors.error_registering_payment__please_contact_support);
                                })
                            })
                            .catch(error => {
                                console.log(error);
                                res.redirect('/callback/zibal/error?msg=' + __('gateways').errors.your_payment_was_unsuccessful);
                            });
                        break;

                    case '1':
                        res.redirect('/callback/zibal/success?msg=' + __('gateways').successes.payment_was_successful);
                        break;

                    case '3':
                        res.redirect('/callback/zibal/error?msg=' + __('messages').infos.unsubscribed_by_the_user);
                        break;

                    case '4':
                        res.redirect('/callback/zibal/error?msg=' + __('messages').errors.the_card_number_is_invalid);
                        break;

                    case '5':
                        res.redirect('/callback/zibal/error?msg=‌' + __('messages').errors.the_account_balance_is_not_enough);
                        break;

                    case '6':
                        res.redirect('/callback/zibal/error?msg=' + __('messages').errors.the_password_entered_is_incorrect);
                        break;

                    case '7':
                        res.redirect('/callback/zibal/error?msg=' + __('messages').errors.the_number_of_requests_is_too_large);
                        break;

                    case '8':
                        res.redirect('/callback/zibal/error?msg=' + __('gateways').errors.the_number_of_online_payments_per_day_is_too_high);
                        break;

                    case '9':
                        res.redirect('/callback/zibal/error?msg=' + __('gateways').errors.the_amount_of_internet_payment_per_day_is_too_much);
                        break;

                    case '10':
                        res.redirect('/callback/zibal/error?msg=' + __('messages').errors.the_issuer_of_the_card_is_invalid);
                        break;

                    case '11':
                        res.redirect('/callback/zibal/error?msg' + __('messages').errors.switch_error);
                        break;

                    case '12':
                        res.redirect('/callback/zibal/error?msg=' + __('messages').errors.the_card_is_not_available);
                        break;
                }
                break;

            default:
                res.redirect('/callback/zibal/error?msg=' + __('gateways').errors.the_payment_gateway_is_unclear);
        }
    }
};
