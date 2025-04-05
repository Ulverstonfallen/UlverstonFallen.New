const markerInfoLat = 0;
const markerInfoLng = 1;
const markerInfoTitle = 2;
const markerInfoId = 3;

const popupTypeNone = 0;
const popupTypeInternal = 1;

var _filtered = false;
var _popupType = 1
var _popupLinkIsUrlPathPage = false;
var _markerInfo = [
    [54.196040, -3.092900, "Pioneer John Akister", 1],
    [54.199110, -3.098620, "Private Albert Askew", 2],
    [54.195410, -3.087650, "Private Nelson Athersmith", 3],
    [54.197940, -3.096600, "Private Isaac Atkinson", 5],
    [54.193860, -3.088240, "Private John Atkinson", 6],
    [54.195740, -3.084140, "Private Joseph Balderstone", 8]
];

// The following variables are global to all items added to the map.
// They are not added via the output create method.
var _swLat = 54.188078;
var _swLng = -3.118062;
var _neLat = 54.2044;
var _neLng = -3.078794;
var _centreLat = 54.196239;
var _centreLng = -3.098428;
var _minZoom = 15;
var _maxZoom = 18;
var _tileLayer = '/assets/images/map-ww1/{z}/{x}/{y}.jpg';
var _crs = L.CRS.EPSG3857;
var _icon = L.icon({ iconUrl: '/assets/images/map-ww1/marker-all.2.png', iconSize: [20, 20], iconAnchor: [10, 10] });
var map;

WebsiteUlverstonFallen.AddDocumentLoadCompleteProcessing("/assets/html/dialog/ww1-filter-12.json")

document.addEventListener('DOMContentLoaded', function () {
    try
    {
        let eid;
        eid = document.getElementById("map-ww1-available"); // assumed to exist.
        eid.className = "visible";

        let sw = L.latLng(_swLat, _swLng);
        let ne = L.latLng(_neLat, _neLng);
        let bounds = L.latLngBounds(sw, ne);
        let centre = L.latLng(_centreLat, _centreLng);
        map = L.map('map', {
            maxBounds: bounds,
            crs: _crs, 
            centre: centre,
            minZoom: _minZoom,
            maxZoom: _maxZoom,
            tms: false,
            attribution: '',
            zoomSnap: 0.1,
            zoomDelta: 0.1
        });
        L.tileLayer(_tileLayer).addTo(map);
        map.setView(centre, _minZoom);

        let markers = new L.FeatureGroup();
        for (let i = 0; i < _markerInfo.length; i++) {
            switch(_popupType)
            {
                case popupTypeNone:
                    AddMarkerNone(i, markers);
                    break;
                case popupTypeInternal:
                    let popups = document.getElementById('mapPopups');
                    if (popups == null) {
                        throw new Error("the html element 'mapPopups' does not exist.")
                    }
                    AddMarkerInternal(i, markers);
                    break;
            }
        };
        map.addLayer(markers);
    }
    catch (err)
    {
        alert("DOMContentLoaded Line Number " + err.lineNumber + ": " + err.message);
    }
})

// --------------------------------------

function AddMarkerNone(i, markers) { 
    try {
        let marker = L.marker([_markerInfo[i][markerInfoLat], _markerInfo[i][markerInfoLng]], { icon: _icon });
        markers.addLayer(marker);
    }
    catch (err)
    {
        alert("AddMarkerNone Line Number " + err.lineNumber + ": " + err.message);
    }
}

function AddMarkerInternal(i, markers) { 
    try {
        let id = _markerInfo[i][markerInfoId].toString();
        if (filtered(id)) {
            return;
        }

        let pxy = document.getElementById('map-mrk-' + id.toString());
        if (pxy == null) {
            return;
        }
        
        let pup = L.popup();
        pup.setContent(pxy);
        let marker = L.marker([_markerInfo[i][markerInfoLat], _markerInfo[i][markerInfoLng]], { icon: _icon });
        marker.bindPopup(pup);
        markers.addLayer(marker);

        if (!_popupLinkIsUrlPathPage) {
            pxy = document.getElementById('map-url-' + id);
            if (pxy != null) {   
                pxy.addEventListener('click', ShowDetail); 
            }
        }
        else
        {
        }
    }
    catch (err)
    {
        alert("AddMarkerInternal Line Number " + err.lineNumber + ": " + err.message);
    }
}

// --------------------------------------
    
function ShowDetail(e) {
    try {
        e.preventDefault();
        
                let s = e.target.id.substring(8);
        let id = ConvertStringToInteger(s);
        if (id === undefined) {
            return;
        }

        let ind = -1;
        for (let i = 0; i < _markerInfo.length; i++) {
            if (_markerInfo[i][markerInfoId] == id) {
                ind = i;
                break;
            }
        };
        if (ind < 0) {
            return;
        }

        let dialog = Securso.ModalDialog.GetModalDialog('ajaxDetail');
        dialog.ShowWithAjaxDetail(_markerInfo[ind][markerInfoId]);
        map.closePopup();
    }
    catch (err)
    {
        alert("ShowDetail Line Number " + err.lineNumber + ": " + err.message);
    }
}

// --------------------------------------

function filtered(id) {
    if (!_filtered) {
        return false;
    }
    return true;
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
