import PgSettingsDesign from 'generated/pages/pgSettings';
import Data from "sf-core/global/data";
import Application from 'sf-core/application';
import AttributedString from 'sf-core/ui/attributedstring';
import Menu from 'sf-core/ui/menu';
import MenuItem from 'sf-core/ui/menuitem';
import { ThemeService } from 'theme';
import { setLanguage } from 'lib/language-helper';

export default class PgSettings extends PgSettingsDesign {
    router: any;
    currentTheme: string;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));

        this.currentTheme = Data.getStringVariable('currentTheme');
        this.swTheme.toggle = this.currentTheme == 'darkTheme';

        this.swTheme.onToggleChanged = () => {
            this.currentTheme = this.currentTheme == 'darkTheme' ? 'baseTheme' : 'darkTheme';
            ThemeService.changeTheme(this.currentTheme);
            Data.setStringVariable('currentTheme', this.currentTheme);
        };
        this.initChangeButton();
    }
    initHeader() {
        this.headerBar.title = global.lang.settings;
    }
    initText() {
        this.lblLanguage.text = `${global.lang.language} - ${SMF.i18n.currentLang.toUpperCase()}`;
        this.lblTheme.text = global.lang.darkTheme;
    }
    initChangeButton() {
        const attributeString = new AttributedString();
        attributeString.string = global.lang.change;
        attributeString.link = global.lang.change;
        this.tvChange.attributedText = [attributeString];
        this.tvChange.onLinkClick = () => {
            const menu = new Menu();
            menu.headerTitle = global.lang.language;
            menu.items = [];

            ['en', 'tr', 'de'].forEach((lang: string) => {
                const menuItem = new MenuItem({
                    title: global.lang[lang],
                    onSelected: function () {
                        setLanguage(lang);
                        alert(SMF.i18n.languageKV[lang].langChanged);

                        setTimeout(() => {
                            Application.restart();
                        }, 1000);
                    }
                });
                menu.items.push(menuItem);
            });
            menu.show(this);
        }
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow: () => void) {
    superOnShow();
    this.initHeader();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initText();
}
