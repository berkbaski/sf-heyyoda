import PgLoginDesign from 'generated/pages/pgLogin';
import KeyboardType from 'sf-core/ui/keyboardtype';
import VMasker from 'vanilla-masker';

export default class PgLogin extends PgLoginDesign {
    router: any;
    formValid = false;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        this.btnLogin.onPress = () => {
            if (this.mtbUsername.materialTextBox.text.length < 6) {
                this.mtbUsername.materialTextBox.errorMessage = global.lang.minCharError;
                this.formValid = false;
            }
            if (this.mtbPassword.materialTextBox.text.length < 6) {
                this.mtbPassword.materialTextBox.errorMessage = global.lang.minCharError;
                this.formValid = false;
            }

            if (this.formValid) {
                this.router.push("/pages/pgPeopleList");
            }
        };
    }
    initText() {
        this.headerBar.title = global.lang.login;
        this.btnLogin.text = global.lang.login;
    }
    initMaterialTextBox() {
        this.mtbUsername.options = {
            hint: global.lang.username,
            onTextChanged: () => {
                const maskedText = VMasker.toPattern(this.mtbUsername.materialTextBox.text, "AAAAAAAAAA");
                this.mtbUsername.materialTextBox.text = maskedText;

                const errorMessage = this.mtbUsername.materialTextBox.errorMessage;
                this.mtbUsername.materialTextBox.errorMessage = maskedText.length >= 6 ? "" : errorMessage;
                this.formValid = maskedText.length >= 6;
            }
        };
        this.mtbUsername.materialTextBox.keyboardType = KeyboardType.DEFAULT;

        this.mtbPassword.options = {
            hint: global.lang.password,
            isPassword: true,
            onTextChanged: () => {
                const maskedText = VMasker.toPattern(this.mtbPassword.materialTextBox.text, "9999999999");
                this.mtbPassword.materialTextBox.text = maskedText;

                const errorMessage = this.mtbPassword.materialTextBox.errorMessage;
                this.mtbPassword.materialTextBox.errorMessage = maskedText.length >= 6 ? "" : errorMessage;
                this.formValid = maskedText.length >= 6;
            }
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
