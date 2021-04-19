import Simple_listviewitemDesign_1 from 'generated/my-components/Simple_listviewitem_1';

export default class Simple_listviewitem_1 extends Simple_listviewitemDesign_1 {
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
