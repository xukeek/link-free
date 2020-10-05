const descList = document.querySelectorAll('p.desc');
const linkList = document.querySelectorAll('p.link');
if (
    descList &&
    linkList &&
    descList.length > 0 &&
    descList[0].textContent &&
    descList[0].textContent.trim() === '如需浏览，请长按网址复制后使用浏览器访问' &&
    linkList.length > 0 &&
    linkList[0].textContent
) {
    window.location.href = linkList[0].textContent.trim();
}
