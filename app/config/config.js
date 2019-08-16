const config = {
    port: process.env.PORT || 10055,
    mongo_url: process.env.MONGO_URL,
    mongo_url_test: process.env.MONGO_URL,
    mongo_option: process.env.MONGO_URL_OPTIONS  || ''
};

module.exports = config;
