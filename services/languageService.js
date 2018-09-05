import I18n from "./../i18n/translate";
import { getLocale, setLocale } from "./StorageService";

export async function initLocaleService() {
    const localeRes = await getLocale();
    if (localeRes != null) {
        I18n.locale = localeRes.locale;
    } else {
        I18n.locale = 'zh';
    }
}

export async function setLocaleService(_locale) {
    await setLocale(_locale);
}