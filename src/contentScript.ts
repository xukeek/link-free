import $ from "jquery";

const isNotFreeLink =
    $("p.desc")
        .text()
        .trim() === "如需浏览，请长按网址复制后使用浏览器访问";
if (isNotFreeLink) {
    console.info("not");
    window.location.href = $("p.link").text();
}
