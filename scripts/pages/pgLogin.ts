import PgLoginDesign from 'generated/pages/pgLogin';
import Color from "sf-core/ui/color";
import KeyboardType from 'sf-core/ui/keyboardtype';

export default class PgLogin extends PgLoginDesign {
    router: any;
    username = '';
    password = '';
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnLogin.onPress = () => {
            this.router.push("/pages/pgPeopleList");
        };
    }
    initText() {
        this.headerBar.title = global.lang.login;
        this.btnLogin.text = global.lang.login;
    }
    initMaterialTextBox() {
        this.mtbUsername.options = {
            hint: global.lang.username
        };
        this.mtbUsername.materialTextBox.keyboardType = KeyboardType.DEFAULT;
        this.mtbPassword.options = {
            hint: global.lang.password,
            isPassword: true
        };
        this.mtbPassword.materialTextBox.keyboardType = KeyboardType.NUMBER;
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
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initText();
    this.initMaterialTextBox();
}
