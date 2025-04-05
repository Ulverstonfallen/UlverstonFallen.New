

WebsiteUlverstonFallen.AddDocumentLoadCompleteProcessing("/assets/html/dialog/ww2-filter-12.json");

document.addEventListener('DOMContentLoaded', function () {

    try
    {
        for (let i = 1; ; i++) {
            pxy = document.getElementById('fallen-' + i);
            if (pxy == null) {   
                break;
            }
            pxy.addEventListener('click', ShowDetail); 
        }
        
    }
    catch (err)
    {
        alert("DOMContentLoaded Line Number " + err.lineNumber + ": " + err.message);
    }
})

// --------------------------------------

function ShowDetail(e) {
    try {
        e.preventDefault();

        let s = e.target.id.substring(7);
        let id = ConvertStringToInteger(s);
        if (id === undefined) {
            return;
        }
        
        let dialog = Securso.ModalDialog.GetModalDialog('ajaxDetail');
        dialog.ShowWithAjaxDetail(id);
    }
    catch (err)
    {
        alert("ShowDetail Line Number " + err.lineNumber + ": " + err.message);
    }
}

// --------------------------------------

function ConvertStringToInteger(value) {
    try {
        let regInt = new RegExp("^[+,-]?[0-9]+$");
        if (value.length == 0)
            return 0;
        if (value == "+")
            return 0;
        if (value == "-")
            return 0;
        if (!regInt.test(value))
            return undefined;
        let i = parseInt(value, 10);
        if (isNaN(i))
            return undefined;
        return i;
    }    
    catch (err)
    {
        alert("ConvertStringToInteger Line Number " + err.lineNumber + ": " + err.message);
    }    
}
