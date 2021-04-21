import PgPeopleDetailDesign from 'generated/pages/pgPeopleDetail';
import HeaderBarItem from "sf-core/ui/headerbaritem";
import touch from "sf-extension-utils/lib/touch";
import Image from "sf-core/ui/image";
import PageTitleLayout from "components/PageTitleLayout";
import Simple_listviewitem_1 from '../components/Simple_listviewitem_1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import Color from "sf-core/ui/color";
import AttributedString from 'sf-core/ui/attributedstring';
import System from "sf-core/device/system";
import { People } from 'services/types/people';
import moment from 'moment';
import store from 'duck/store';

export default class PgPeopleDetail extends PgPeopleDetailDesign {
    details: [string, any];
    peopleName: string;

    router: any;

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
            listViewItem.valueText = this.details[index][1];

            const isLink = this.checkIsLink(this.details[index][1]);
            if (isLink) {
                const attributeString = new AttributedString();
                attributeString.string = `Open ${this.details[index][0]} link`;
                attributeString.link = this.details[index][1];
                attributeString.underline = true;
                attributeString.underlineColor = Color.BLUE;
                attributeString.foregroundColor = Color.BLUE;
                listViewItem.lblValue.attributedText = [attributeString];
                listViewItem.lblValue.onLinkClick = () => {
                    this.router.push("/pages/pgPageLinkDetail", { key: this.details[index][0], value: this.details[index][1] });
                }
            }
        };
        this.listView2.refreshEnabled = false;
    }
    refreshListView() {
        this.listView2.itemCount = this.details.length;
        this.listView2.refreshData();
    }
    showImage() {
        this.imageView1.image = "images://smartface.png";
    }
    checkIsLink(value: string) {
        const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(value);
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
        this.showImage();
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

