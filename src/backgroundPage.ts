import { browser, Runtime } from "webextension-polyfill-ts";
import MessageSender = Runtime.MessageSender;

// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener(
    (r: { urls: string[] }, req: MessageSender) => {
        const queryStr = r.urls.join("&url_short=");
        const tabId = req.tab?.id;
        return new Promise<boolean>((resolve, reject) => {
            fetch(
                `http://api.t.sina.com.cn/short_url/expand.json?url_short=${queryStr}`,
            )
                .then(response => {
                    const urls = response.json();
                    console.log(urls, tabId);
                    if (tabId) {
                        chrome.tabs.sendMessage(tabId, urls);
                    }
                    resolve(urls);
                })
                .catch(() => {
                    reject();
                });
        });
    },
);

browser.webNavigation.onDOMContentLoaded.addListener((object: any) => {
    console.log(object);
});
