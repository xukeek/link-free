function replaceLinks(root: ParentNode): void {
    const links = root.querySelectorAll('a[href*="link.zhihu.com/?target="]');
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.getAttribute("href");
        if (href != null) {
            link.setAttribute(
                "href",
                decodeURIComponent(href.split("target=")[1]),
            );
        }
    }
}

replaceLinks(document);
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.hasChildNodes()) {
                replaceLinks(node as HTMLElement);
            }
        });
    });
});
observer.observe(document, { childList: true, subtree: true });
