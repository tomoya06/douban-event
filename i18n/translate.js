import I18n from "react-native-i18n";

import zh from "./zh";

I18n.defaultLocale = 'zh';
I18n.fallbacks = true;
I18n.translations = {
    zh,
}

export default I18n;