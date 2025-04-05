function ChangeHtmlTagClass(tagId, className) {
    var eid = document.getElementById(tagId);
    alert("'" + tagId + "'; '" + className + "'");
    if (eid != null) {
        eid.className = className;
    }
}
export { ChangeHtmlTagClass };

//# sourceMappingURL=dom.js.map