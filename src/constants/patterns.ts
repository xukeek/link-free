export enum Patterns {
    ZHI_HU = 'a[href*="link.zhihu.com/?target="]',
    JIAN_SHU = 'a[href*="link.jianshu.com?t="]',
    WEI_BO = 'a[href*="http://t.cn/"]',
}

export enum Splitters {
    ZHI_HU = '?target=',
    JIAN_SHU = '?t=',
}

export enum SiteKeys {
    ZHI_HU = 'zhihu',
    JIAN_SHU = 'jianshu',
    WEI_BO = 'weibo',
}

export class Site {
    public name: string;
    public key: string;

    public constructor(name: string, key: string) {
        this.name = name;
        this.key = key;
    }
}

export const SITE_LIST = [
    new Site('知乎', SiteKeys.ZHI_HU),
    new Site('新浪微博', SiteKeys.JIAN_SHU),
    new Site('简书', SiteKeys.WEI_BO),
];
