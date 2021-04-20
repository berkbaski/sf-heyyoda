import Page1Design from 'generated/pages/page1';

import Simple_listviewitem from 'components/Simple_listviewitem';

import * as peopleService from 'services/people';

import store from 'duck/store';

export default class Page1 extends Page1Design {
    unsubsribe: ReturnType<typeof store.subscribe> = () => { };

    router: any;
    page = 0;
    servicePage = 0;
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
        // Overrides super.onHide method
        this.onHide = onHide.bind(this, this.onHide && this.onHide.bind(this));
    }
    async fetchPeople() {
        try {
            this.page++;
            await peopleService.getAll(this.page);
            this.servicePage++;
            this.refreshListView();
        } catch (error) {
            console.log('fetchPeopleError', error)
        }
    }
    initListView() {
        this.listView1.rowHeight = Simple_listviewitem.getHeight();
        this.listView1.onRowBind = (listViewItem: Simple_listviewitem, index: number) => {
            listViewItem.titleText = store.getState().people.peopleList[index].name;
            if (index + 1 < store.getState().people.peopleList.length) {
                return; // Don't call service when scroll isn't at the bottom
            }
            if (this.page !== this.servicePage) {
                return; // Prevent concurrent calls
            }

            this.fetchPeople();
        };
        this.listView1.onRowSelected = (_item: Simple_listviewitem, index: number) => {
            this.router.push("/pages/page2", { peopleIndex: index });
        }
        this.listView1.refreshEnabled = false;
    }
    refreshListView() {
        this.listView1.itemCount = store.getState().people.peopleList.length;
        this.listView1.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 */
function onShow(superOnShow: () => void) {
    superOnShow();

    this.unsubscribe = store.subscribe(() => {
        this.refreshListView();
    })
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

function onHide(superOnHide: () => void) {
    superOnHide && superOnHide();
    this.unsubsribe();
}
