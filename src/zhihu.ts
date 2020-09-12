import { replaceLinks } from "@src/utils";
import { Patterns, Splitors } from "@src/constants/patterns";

replaceLinks(document, Patterns.ZHI_HU, Splitors.ZHI_HU);

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.hasChildNodes()) {
                replaceLinks(node as HTMLElement, Patterns.ZHI_HU, Splitors.JIAN_SHU);
            }
        });
    });
});
observer.observe(document, { childList: true, subtree: true });
