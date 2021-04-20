import Simple_listviewitemDesign from 'generated/my-components/Simple_listviewitem';
import Image from "sf-core/ui/image";
import ImageView from "sf-core/ui/imageview";

export default class Simple_listviewitem extends Simple_listviewitemDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get titleText(): string {
        return this.lblTitle.text || '';
    }
    set titleText(value: string) {
        this.lblTitle.text = value;
    }
    get image(): string | Image {
        return this.imageView1.image;
    }
    set image(value: string | Image) {
        this.imageView1.image = value;
    }
    static getHeight(): number {
        return 80;
    }
}
