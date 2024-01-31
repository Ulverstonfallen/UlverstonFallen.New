document.addEventListener("DOMContentLoaded", function(){
    eid = document.getElementById("map-ww1-not-available");
    if (eid != null)
    {
        eid.className = "visible";
    }
    eid = document.getElementById("map-ww1-available");
    if (eid != null)
    {
        eid.className = "hidden";
    }
});