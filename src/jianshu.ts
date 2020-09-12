import { replaceLinks } from "@src/utils";
import { Patterns, Splitors } from "@src/constants/patterns";

replaceLinks(document, Patterns.JIAN_SHU, Splitors.JIAN_SHU);

new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.hasChildNodes()) {
                replaceLinks(node as HTMLElement, Patterns.JIAN_SHU, Splitors.JIAN_SHU);
            }
        });
    });
}).observe(document, { childList: true, subtree: true });
