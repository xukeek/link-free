export enum Patterns {
    ZHI_HU = 'a[href*="link.zhihu.com/?target="]',
    JIAN_SHU = 'a[href*="link.jianshu.com?t="]',
    WEI_BO = 'a[href*="http://t.cn/"]',
}

export enum Splitters {
    ZHI_HU = "?target=",
    JIAN_SHU = "?t=",
}
