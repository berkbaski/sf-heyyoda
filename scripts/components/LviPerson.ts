import LviPersonDesign from 'generated/my-components/LviPerson';
import Image from "sf-core/ui/image";

export default class LviPerson extends LviPersonDesign {
    pageName?: string | undefined;
    constructor(props?: any, pageName?: string) {
        // Initalizes super class for this scope
        super(props);
        this.pageName = pageName;
    }
    get name(): string {
        return this.lblName.text || '';
    }
    set name(value: string) {
        this.lblName.text = value;
    }
    get image(): string | Image {
        return this.ivPerson.image;
    }
    set image(value: string | Image) {
        this.ivPerson.image = value;
    }
    static getHeight(): number {
        return 80;
    }
}
