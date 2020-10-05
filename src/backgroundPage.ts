import { browser, Runtime } from 'webextension-polyfill-ts';
import { version } from '@/manifest.json';
import MessageSender = Runtime.MessageSender;

// Listen for messages sent from other parts of the extension
browser.runtime.onMessage.addListener((r: { urls: string[] }, req: MessageSender) => {
    const queryStr = r.urls.join('&url_short=');
    const tabId = req.tab?.id;
    return new Promise<boolean>((resolve, reject) => {
        fetch(`http://api.t.sina.com.cn/short_url/expand.json?url_short=${queryStr}`)
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
});

/**
 * @summary 插件第一次安装时设置初始值
 */
browser.runtime.onInstalled.addListener(reason => {
    if (reason.reason !== 'update') {
    } else {
        browser.notifications
            .clear('updateInfo')
            .then(() => {
                browser.notifications
                    .create('updateInfo', {
                        type: 'basic',
                        iconUrl: browser.runtime.getURL('icon38.png'),
                        title: `${version} 更新：`,
                        message: require('@/changelog.json')[version] || '点击查看更新内容',
                        priority: 2,
                        eventTime: Date.now() + 100000,
                    })
                    .then(r => console.log(r))
                    .catch(e => console.log(e));
            })
            .catch(r => console.log(r));
    }
});
