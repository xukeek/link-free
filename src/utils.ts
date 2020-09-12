export function replaceLinks(root: ParentNode, pattern: string, splitor: string): void {
    const links = root.querySelectorAll(pattern);
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.getAttribute("href");
        if (href != null) {
            link.setAttribute(
                "href",
                decodeURIComponent(href.split(splitor)[1]),
            );
        }
    }
}
