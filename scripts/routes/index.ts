import buildExtender from "sf-extension-utils/lib/router/buildExtender";
import {
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route
} from "@smartface/router";
import "sf-extension-utils/lib/router/goBack"; // Implements onBackButtonPressed
import System from 'sf-core/device/system';

import BackClose from 'sf-extension-utils/lib/router/back-close'
import Image from "sf-core/ui/image";

BackClose.setDefaultBackStyle({ image: Image.createFromFile("images://close.png"), hideTitle: '' });

BackClose.dissmissBuilder = () => {
    return {
        image: Image.createFromFile("images://close.png"),
        position: "left"
    };
};

const androidModalDismiss = (router, route) => {
    const { view, action } = route.getState();
    if (System.OS === "Android" && view && action === "POP") {
        view.onShow && view.onShow();
    }
};

const router = Router.of({
    path: "/",
    to: '/pages',
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            to: "/pages/pgPeopleList",
            routes: [
                Route.of({
                    path: "/pages/pgPeopleList",
                    build: buildExtender({
                        getPageClass: () => require("pages/pgPeopleList").default,
                        headerBarStyle: { visible: true }
                    }),
                    routeDidEnter: androidModalDismiss
                }),
                StackRouter.of({
                    path: "/pages/pgSettings",
                    to: "/pages/pgSettings/main",
                    modal: true,
                    routes: [
                        Route.of({
                            path: "/pages/pgSettings/main",
                            build: buildExtender({
                                getPageClass: () => require("pages/pgSettings").default,
                                headerBarStyle: { visible: true }
                            })
                        }),
                    ]
                }),
                Route.of({
                    path: "/pages/pgPeopleDetail",
                    build: buildExtender({
                        getPageClass: () => require("pages/pgPeopleDetail").default,
                        headerBarStyle: { visible: true }
                    })
                }),
                Route.of({
                    path: "/pages/pgPeopleLinkDetail",
                    build: buildExtender({
                        getPageClass: () => require("pages/pgPeopleLinkDetail").default,
                        headerBarStyle: { visible: true }
                    })
                }),
            ]
        })
    ]
});

export default router;
