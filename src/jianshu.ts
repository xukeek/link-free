import { monitor } from "@src/utils";
import { Patterns, Splitters, SiteKeys } from "@src/constants/patterns";
import { browser } from "webextension-polyfill-ts";

browser.storage.sync.get([SiteKeys.JIAN_SHU]).then(s => {
    const config = s[SiteKeys.JIAN_SHU];
    if (config === undefined || config) {
        monitor(document, Patterns.JIAN_SHU, Splitters.JIAN_SHU);
    }
});
