import LviPropertyDesign from 'generated/my-components/LviProperty';

export default class LviProperty extends LviPropertyDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get keyText(): string {
        return this.lblKey.text || '';
    }
    set keyText(value: string) {
        this.lblKey.text = value;
    }
    get valueText(): string {
        return this.lblValue.text || '';
    }
    set valueText(value: string) {
        this.lblValue.text = value;
    }
    static getHeight(): number {
        return 50;
    }
}
