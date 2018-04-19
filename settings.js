export default {
    urls: {
        login: 'https://theacademist.herokuapp.com/api/v1/user/login',
        get_user: 'https://theacademist.herokuapp.com/api/v1/user/{user_id}',
        register: 'https://theacademist.herokuapp.com/api/v1/user/register',
        update_user: 'https://theacademist.herokuapp.com/api/v1/user/{user_id}',
        forgot: 'https://theacademist.herokuapp.com/api/v1/user/forgot-password',
        update_password: 'https://cardpayment.herokuapp.com/api/v1/user/update-password',
        stripe_pay: 'https://theacademist.herokuapp.com/services/stripe_pay/{user_id}',
        paypal_pay: 'https://theacademist.herokuapp.com/services/paypal/{user_id}',
        list_transactions: 'https://theacademist.herokuapp.com/api/v1/transaction/list/{user_id}',
    }
};