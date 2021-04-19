import Page2Design from 'generated/pages/page2';
import HeaderBarItem from "sf-core/ui/headerbaritem";
import touch from "sf-extension-utils/lib/touch";
import Image from "sf-core/ui/image";
import PageTitleLayout from "components/PageTitleLayout";
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import Color from "sf-core/ui/color";
import System from "sf-core/device/system";
import { People } from 'services/types/people';

export default class Page2 extends Page2Design {
    people: People;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initLabels() {
        this.lblName.text = this.people.name;
        this.lblHairColor.text = `Hair Color: ${this.people.hair_color}`;
        this.lblSkinColor.text = `Skin Color: ${this.people.skin_color}`;
        this.lblHeight.text = `Height: ${this.people.height}`;
        this.lblBirthDay.text = `Birth Year: ${this.people.birth_year}`;
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(superOnShow: () => void) {
    superOnShow();
    this.headerBar.titleLayout.applyLayout();
    if (this.routeData) {
        this.people = this.routeData.people;
        this.initLabels();
    }
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    let headerBar;
    this.headerBar.titleLayout = new PageTitleLayout();
    componentContextPatch(this.headerBar.titleLayout, "titleLayout");
    this.headerBar.setItems([new HeaderBarItem({
        title: "Option",
        onPress: () => {
            console.warn("You pressed Option item!");
        }
    })]);
    if (System.OS === "Android") {
        headerBar = this.headerBar;
        headerBar.setLeftItem(new HeaderBarItem({
            onPress: () => {
                this.router.goBack();
            },
            image: Image.createFromFile("images://arrow_back.png")
        }));
    }
    else {
        headerBar = this.parentController.headerBar;
    }
    headerBar.itemColor = Color.WHITE;
}

