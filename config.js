const PRODUCTION = process.env.NODE_ENV == 'production'; // eslint-disable-line

module.exports = {};

module.exports.PRODUCTION = PRODUCTION;
module.exports.hmrEnabled = true;
module.exports.shouldCompressImages = PRODUCTION;
