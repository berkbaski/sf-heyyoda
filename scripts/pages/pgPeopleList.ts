import PgPeopleListDesign from 'generated/pages/pgPeopleList';

import pushClassNames from "@smartface/contx/lib/styling/action/pushClassNames";
import removeClassName from "@smartface/contx/lib/styling/action/removeClassName";
import Image from "sf-core/ui/image";

import ListView from 'sf-core/ui/listview';
import LviPerson from 'components/LviPerson';
import HeaderBarItem from 'sf-core/ui/headerbaritem';
import * as peopleService from 'services/people';
import store from 'duck/store';

import Color from "sf-core/ui/color";

export default class PgPeopleList extends PgPeopleListDesign {
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
        this.lvPerson.rowHeight = LviPerson.getHeight();
        this.lvPerson.onRowBind = (listViewItem: LviPerson, index: number) => {
            listViewItem.name = store.getState().people.peopleList[index].name;
            listViewItem.image = "images://darthvader.png";

            listViewItem.flPersonWrapper.dispatch(
                pushClassNames(index % 2 === 1 ? '.sf-listViewItem-active' : '.sf-listViewItem-inactive')
            );

            if (index + 1 < store.getState().people.peopleList.length) {
                return; // Don't call service when scroll isn't at the bottom
            }
            if (this.page !== this.servicePage) {
                return; // Prevent concurrent calls
            }

            this.fetchPeople();
        };
        this.lvPerson.onRowSelected = (_item: LviPerson, index: number) => {
            this.router.push("/pages/pgPeopleDetail", { peopleIndex: index });
        }
        this.initListViewSwipe();
        this.lvPerson.refreshEnabled = false;
    }
    initListViewSwipe() {
        //@ts-ignore
        this.lvPerson.swipeEnabled = true;

        this.lvPerson.onRowCanSwipe = (index: number) => {
            return [ListView.SwipeDirection.LEFTTORIGHT, ListView.SwipeDirection.RIGHTTOLEFT];
        };
        this.lvPerson.onRowSwipe = (e: any): ListView.SwipeItem[] => {
            if (e.direction == ListView.SwipeDirection.LEFTTORIGHT) {
                const someItem = new ListView.SwipeItem();
                someItem.text = global.lang.someAction;
                someItem.backgroundColor = Color.BLUE;
                someItem.textColor = Color.WHITE;
                someItem.onPress = ({ index }) => {
                    this.lvPerson.refreshRowRange({ itemCount: 1, positionStart: index });
                };
                this.applyDimension(someItem);
                return [someItem];
            }
            else if (e.direction == ListView.SwipeDirection.RIGHTTOLEFT) {
                const detailItem = new ListView.SwipeItem();
                detailItem.text = global.lang.detail;
                detailItem.backgroundColor = Color.WHITE;
                detailItem.textColor = Color.BLACK;
                detailItem.onPress = ({ index }) => {
                    this.lvPerson.refreshRowRange({ itemCount: 1, positionStart: index });
                    this.router.push("/pages/pgPeopleDetail", { peopleIndex: index });
                };
                this.applyDimension(detailItem);
                return [detailItem];
            }
        };
    }
    applyDimension(item: any): void {
        item.android.paddingLeft = 15;
        item.android.paddingRight = 15;
    }
    refreshListView() {
        this.lvPerson.itemCount = store.getState().people.peopleList.length;
        this.lvPerson.refreshData();
    }
    initHeader() {
        this.headerBar.title = global.lang.starWarsCharacters;
        const rightItem = new HeaderBarItem({
            image: 'images://settings.png',
            onPress: () => {
                this.router.push("/pages/pgSettings/main");
            }
        });
        this.headerBar.setItems([rightItem]);

        this.swPerson.addToHeaderBar(this);
        this.swPerson.onTextChanged = () => {
            alert('search finished');
        }
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
    this.initHeader();
    this.fetchPeople();
}

function onHide(superOnHide: () => void) {
    superOnHide && superOnHide();
    this.unsubsribe();
}