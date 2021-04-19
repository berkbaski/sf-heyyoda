import Page1Design from 'generated/pages/page1';
import componentContextPatch from "@smartface/contx/lib/smartface/componentContextPatch";
import PageTitleLayout from "components/PageTitleLayout";
import System from "sf-core/device/system";
import Simple_listviewitem from '../components/Simple_listviewitem'
import * as peopleService from '../services/people'
import { PeopleGetAll, People } from 'services/types/people';

export default class Page1 extends Page1Design {
    router: any;
    peopleList: People[];
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    async fetchPeople() {
        try {
            this.peopleList = await peopleService.getAll()
            this.refreshListView();
        } catch (error) {
            console.log('fetchPeopleError', error)
        }
    }
    initListView() {
        Simple_listviewitem
        this.listView1.rowHeight = Simple_listviewitem.getHeight();
        this.listView1.onRowBind = (listViewItem: Simple_listviewitem, index: number) => {
            listViewItem.titleText = this.peopleList[index].name; // Recommended way
        };
        this.listView1.onRowSelected = (item: Simple_listviewitem, index: number) => {
            this.router.push("/pages/page2", { people: this.peopleList[index] });
        }
        this.listView1.refreshEnabled = false;
    }
    refreshListView() {
        this.listView1.itemCount = this.peopleList.length;
        this.listView1.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(superOnShow: () => void) {
    superOnShow();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
    this.initListView();
    this.fetchPeople();
}
