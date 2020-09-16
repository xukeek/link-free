import { browser } from "webextension-polyfill-ts";
import {Patterns, SiteKeys, Splitters} from "@src/constants/patterns";
import {monitor} from "@src/utils";

const URL_CACHE = new Map();

function replaceLinks(): void {
    const links = document.querySelectorAll(Patterns.WEI_BO);
    const urls: string[] = [];
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.getAttribute("href");
        if (href != null) {
            if (!URL_CACHE.has(href)) {
                urls.push(href);
                URL_CACHE.set(href, undefined);
            } else if (URL_CACHE.get(href)) {
                link.setAttribute("href", URL_CACHE.get(href));
            }
        }
    }
    if (urls.length > 0) {
        const requestNum =
            Math.floor(urls.length / 20) + (urls.length % 20 === 0 ? 0 : 1);
        for (let i = 0; i < requestNum; i++) {
            const requestUrls = urls.splice(0, 20);
            browser.runtime.sendMessage({ urls: requestUrls }).then(urls => {
                for (let i = 0; i < urls.length; i++) {
                    const url = urls[i];
                    URL_CACHE.set(url.url_short, url.url_long);
                    console.log(url.url_short, url.url_long, url.type);
                    document
                        .querySelectorAll(`a[href="${url.url_short}"]`)
                        .forEach(l => {
                            l.setAttribute("href", url.url_long);
                        });
                }
            });
        }
    }
}

browser.runtime.onMessage.addListener(
    (urls: { url_short: string; url_long: string; type: number }[]) => {
        console.log("message back");
        if (urls) {
        }
    },
);

browser.storage.sync.get([SiteKeys.WEI_BO]).then(s => {
    const config = s[SiteKeys.WEI_BO];
    if (config === undefined || config) {
        replaceLinks();
        new MutationObserver(mutations => {
            mutations.forEach(() => {
                replaceLinks();
            });
        }).observe(document, { childList: true, subtree: true });
    }
});
