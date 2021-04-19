const ServiceCall = require("sf-extension-utils/lib/service-call");
const sc = new ServiceCall({
    baseUrl: "https://swapi.dev/api",
    logEnabled: true,
});
module.exports = exports = sc;