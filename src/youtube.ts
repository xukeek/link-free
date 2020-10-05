import { monitor } from '@/utils';
import { Patterns, Splitters, SiteKeys } from '@/constants/patterns';
import { browser } from 'webextension-polyfill-ts';

browser.storage.sync.get([SiteKeys.YOUTUBE]).then(s => {
    debugger;
    const config = s[SiteKeys.YOUTUBE];
    if (config === undefined || config) {
        monitor(document, Patterns.YOUTUBE, Splitters.YOUTUBE);
    }
});
