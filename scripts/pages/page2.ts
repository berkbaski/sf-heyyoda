import Page2Design from 'generated/pages/page2';
import HeaderBarItem from "sf-core/ui/headerbaritem";
import touch from "sf-extension-utils/lib/touch";
import Image from "sf-core/ui/image";
import PageTitleLayout from "components/PageTitleLayout";
import Simple_listviewitem_1 from '../components/Simple_listviewitem_1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import Color from "sf-core/ui/color";
import System from "sf-core/device/system";
import { People } from 'services/types/people';
import moment from 'moment'
import store from 'duck/store';

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
    initHeader() {
        this.headerBar.title = this.peopleName;
    }
    initListView() {
        this.listView2.rowHeight = Simple_listviewitem_1.getHeight();
        this.listView2.onRowBind = (listViewItem: Simple_listviewitem_1, index: number) => {            
            listViewItem.keyText = this.details[index][0];
            listViewItem.valueText =
                moment.isDate(this.details[index][1]) ?
                    moment(new Date(this.details[index][1]), 'MM.DD.YYYY') :
                    this.details[index][1];
        };
        this.listView2.refreshEnabled = false;
    }
    refreshListView() {
        this.listView2.itemCount = this.details.length;
        this.listView2.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(superOnShow: () => void) {
    superOnShow();
    if (this.routeData) {
        const people: People = store.getState().people.peopleList[this.routeData.peopleIndex];
        this.peopleName = people.name;
        this.details = Object.entries(people).filter((value) => ['string', 'number', 'boolean'].includes(typeof value[1]))
        this.initHeader();
        this.initListView();
        this.refreshListView();
    }
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
}

