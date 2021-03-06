import PgPeopleLinkDetailDesign from 'generated/pages/pgPeopleLinkDetail';
import LviProperty from 'components/LviProperty';
import { execute } from 'services/people'

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
        } catch (error) {
            console.log(error)
        }
    }
    initListView() {
        this.lvProperties.rowHeight = LviProperty.getHeight();
        this.lvProperties.onRowBind = (listViewItem: LviProperty, index: number) => {
            listViewItem.keyText = this.data[index][0];
            listViewItem.valueText = this.data[index][1];
        };
        this.lvProperties.refreshEnabled = false;
    }
    refreshListView() {
        this.lvProperties.itemCount = this.data.length;
        this.lvProperties.refreshData();
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
