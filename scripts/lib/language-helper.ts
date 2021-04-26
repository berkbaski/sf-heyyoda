import Data from "sf-core/global/data";

export function getLanguage(): string {
    return Data.getStringVariable('language');
}

export function setLanguage(lang: string): void {
    Data.setStringVariable('language', lang)
}