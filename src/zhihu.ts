import { monitor } from '@/utils';
import { Patterns, SiteKeys, Splitters } from '@/constants/patterns';
import { browser } from 'webextension-polyfill-ts';

browser.storage.sync.get([SiteKeys.ZHI_HU]).then(s => {
    const config = s[SiteKeys.ZHI_HU];
    if (config === undefined || config) {
        monitor(document, Patterns.ZHI_HU, Splitters.ZHI_HU);
    }
});
