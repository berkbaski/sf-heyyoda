import PgPeopleLinkDetailDesign from 'generated/pages/pgPeopleLinkDetail';
import { execute } from 'services/people'
import Simple_listviewitem_1 from 'components/Simple_listviewitem_1';

export default class PgPeopleLinkDetail extends PgPeopleLinkDetailDesign {
    key: string;
    value: string;
    data = [];
    constructor() {
        super();
        // Overrides super.onShow method
        this.onShow = onShow.bind(this, this.onShow.bind(this));
        // Overrides super.onLoad method
        this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
    }
    initHeader() {
        this.headerBar.title = this.key;
    }
    async fetchData() {
        try {
            const res = await execute(this.value);
            this.data = Object.entries(res).filter((value) => ['string', 'number', 'boolean'].includes(typeof value[1]))
            console.log(this.data)
        } catch (error) {
            console.log(error)
        }
    }
    initListView() {
        this.listView1.rowHeight = Simple_listviewitem_1.getHeight();
        this.listView1.onRowBind = (listViewItem: Simple_listviewitem_1, index: number) => {
            listViewItem.keyText = this.data[index][0];
            listViewItem.valueText = this.data[index][1];
        };
        this.listView1.refreshEnabled = false;
    }
    refreshListView() {
        this.listView1.itemCount = this.data.length;
        this.listView1.refreshData();
    }
}

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
async function onShow(superOnShow: () => void) {
    superOnShow();
    if (this.routeData) {
        this.key = this.routeData.key;
        this.value = this.routeData.value;
        await this.fetchData();
        this.initHeader();
        this.initListView();
        this.refreshListView();
    }
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad: () => void) {
    superOnLoad();
}
