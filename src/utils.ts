function replaceLinks(root: ParentNode, pattern: string, splitter: string): void {
    const links = root.querySelectorAll(pattern);
    for (let i = 0; i < links.length; i++) {
        const link = links[i];
        const href = link.getAttribute('href');
        if (href != null) {
            link.setAttribute('href', decodeURIComponent(href.split(splitter)[1]));
        }
    }
}

export function monitor(document: Document, pattern: string, splitter: string): void {
    replaceLinks(document, pattern, splitter);

    new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.hasChildNodes()) {
                    replaceLinks(node as HTMLElement, pattern, splitter);
                }
            });
        });
    }).observe(document, { childList: true, subtree: true });
}
