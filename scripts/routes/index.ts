import buildExtender from "sf-extension-utils/lib/router/buildExtender";
import {
    NativeRouter as Router,
    NativeStackRouter as StackRouter,
    Route
} from "@smartface/router";
import "sf-extension-utils/lib/router/goBack"; // Implements onBackButtonPressed

import BackClose from 'sf-extension-utils/lib/router/back-close'

BackClose.setDefaultBackStyle({ image: null, hideTitle: '' })

const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        StackRouter.of({
            path: "/pages",
            routes: [
                Route.of({
                    path: "/pages/pgPeopleList",
                    build: buildExtender({
                        getPageClass: () => require("pages/pgPeopleList").default,
                        headerBarStyle: { visible: true }
                    })
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
                Route.of({
                    path: "/pages/pgSettings",
                    build: buildExtender({
                        getPageClass: () => require("pages/pgSettings").default,
                        headerBarStyle: { visible: true }
                    })
                }),
            ]
        })
    ]
});

export default router;
