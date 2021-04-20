import ServiceCall from "sf-extension-utils/lib/service-call";
export const sc = new ServiceCall({
    baseUrl: "https://swapi.dev/api",
    logEnabled: true,
});
export const scEmpty = new ServiceCall({
    baseUrl: '',
    logEnabled: true
});
