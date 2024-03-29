const REST_PATH_AUTH = 'https://national-bank-of-megan.iem.pw.edu.pl:443/api/web'
const REST_PATH_ACCOUNT = 'https://national-bank-of-megan.iem.pw.edu.pl:443/api/account'
const REST_PATH_EXCHANGE = 'https://national-bank-of-megan.iem.pw.edu.pl:443/api/exchange'
const REST_PATH_TRANSFER = 'https://national-bank-of-megan.iem.pw.edu.pl:443/api/transfer'
const PASSWORD_MAX_LENGTH = 20
const PASSWORD_MIN_LENGTH = 10
const CODE_LENGTH = 6
const CURRENCIES = ['USD', 'PLN', 'CHF', 'GBP', 'EUR']
const DEFAULT_SELECTED_CURRENCY = 'PLN'
const TRANSFER_TYPE_RECEIVED = "RECEIVED"
const TRANSFER_TYPE_SENT = "SENT"
const BEARER_PREFIX = "Bearer "
const NOTIFICATION_EVENT_NAME = "transfer_notification"

export {
    REST_PATH_AUTH,
    REST_PATH_ACCOUNT,
    REST_PATH_EXCHANGE,
    REST_PATH_TRANSFER,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    CODE_LENGTH,
    CURRENCIES,
    DEFAULT_SELECTED_CURRENCY,
    TRANSFER_TYPE_RECEIVED,
    TRANSFER_TYPE_SENT,
    BEARER_PREFIX,
    NOTIFICATION_EVENT_NAME
}