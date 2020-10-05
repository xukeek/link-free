import React, { FunctionComponent, useEffect, useState } from 'react';
import '@/scss/app.scss';
import { browser } from 'webextension-polyfill-ts';
import { Site, SITE_LIST } from '@/constants/patterns';

interface SiteProps {
    site: Site;
}

const SiteOption: FunctionComponent<SiteProps> = (props: SiteProps) => {
    const [a, setA] = useState(false);
    const [checked, setCheck] = useState<boolean>(false);
    useEffect(() => {
        browser.storage.sync.get([props.site.key]).then(s => {
            setA(true);
            const config = s[props.site.key];
            setCheck(config === undefined || config);
        });
    }, [a]);
    useEffect(() => {
        if (a) {
            browser.storage.sync.set({ [props.site.key]: checked }).then(s => console.log(s));
        }
    }, [checked]);

    return (
        <span className="inline-block text-gray-700 text-center bg-gray-400 px-4 py-2">
            {props.site.name}
            <input
                type="checkbox"
                checked={checked}
                onChange={() => {
                    setCheck(p => !p);
                }}
            />
        </span>
    );
};

export const Popup: FunctionComponent = () => {
    // Renders the component tree
    return (
        <div className="container">
            <div className="bg-gray-200 p-4">
                {SITE_LIST.map(k => (
                    <SiteOption site={k} key={k.key} />
                ))}
            </div>
        </div>
    );
};
