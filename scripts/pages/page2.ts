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
    details: [string, any];
    peopleName: string;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initLabels() {
        console.log('details', this.details);
    }
    initHeader() {
        this.headerBar.title = this.peopleName;
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(superOnShow: () => void) {
    superOnShow();
    if (this.routeData) {
        const people: People = this.routeData.people;
        this.peopleName = people.name;
        this.details = Object.entries(people).filter((value) => ['string', 'number', 'boolean'].includes(typeof value[1]))
        this.initLabels();
        this.initHeader();
    }
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
}

