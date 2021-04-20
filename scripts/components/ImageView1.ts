import ImageView1Design from 'generated/my-components/ImageView1';

export default class ImageView1 extends ImageView1Design {
	pageName?: string | undefined;
	constructor(props?: any, pageName?: string) {
		// Initalizes super class for this scope
		super(props);
		this.pageName = pageName;
	}
}
