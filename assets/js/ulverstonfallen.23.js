"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Securso;
(function (Securso) {
    function SetupCookieAcceptMessage() {
        try {
            var em = document.getElementById("cookiesMessage");
            if (em == null)
                return;
            var ec = document.getElementById("cookiesMessageClose");
            if (ec == null)
                throw new Error("The 'cookiesMessageClose' html element does not exist.");
            var a = em.getAttribute("data-acn");
            if (a == null)
                throw new Error("The 'data-acn' attribute does not exist on the 'cookiesMessage' html element.");
            if (GetCookie(a) != null) {
                SetCookieExpiryDays(a, "", 365);
            }
            else {
                var el_1 = em;
                var cn_1 = a;
                em.style.display = "block";
                ec.addEventListener("click", function (ev) { HideCookieMessage(ev, el_1, cn_1); });
            }
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "SetupCookieAcceptMessage", err, null, null);
        }
    }
    Securso.SetupCookieAcceptMessage = SetupCookieAcceptMessage;
    function SetCookieExpirySeconds(name, value, count) {
        SetCookie(name, value, count * 1000);
    }
    function SetCookieExpiryMinutes(name, value, count) {
        SetCookie(name, value, count * 60 * 1000);
    }
    function SetCookieExpiryHours(name, value, count) {
        SetCookie(name, value, count * 60 * 60 * 1000);
    }
    function SetCookieExpiryDays(name, value, count) {
        SetCookie(name, value, count * 24 * 60 * 60 * 1000);
    }
    function DeleteCookie(name) {
        SetCookie(name, "", -2000);
    }
    function SetCookie(n, v, c) {
        var d = new Date();
        d.setTime(d.getTime() + c);
        document.cookie = n + "=" + encodeURIComponent(v) + "; expires=" + d.toUTCString() + "; path=/";
    }
    function GetCookie(name) {
        var c = document.cookie;
        if (c.length == 0)
            return null;
        for (var _i = 0, _a = c.split(";"); _i < _a.length; _i++) {
            var s = _a[_i];
            var v = s.split("=");
            if (v[0].trim() == name) {
                return v[1];
            }
        }
        return null;
    }
    function HideCookieMessage(ev, el, cn) {
        try {
            el.style.display = "none";
            SetCookieExpiryDays(cn, "", 365);
            ev.preventDefault();
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "HideCookieMessage", err, null, null);
        }
    }
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var InputHtml = (function () {
        function InputHtml(e, v, eMes, dMes) {
            this._eVis = false;
            this._initFocus = true;
            this._el = e;
            this._var = v;
            this._eMes = eMes;
            this._eDef = dMes;
        }
        Object.defineProperty(InputHtml.prototype, "Variable", {
            get: function () {
                return this._var;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputHtml.prototype, "HtmlElement", {
            get: function () {
                return this._el;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputHtml.prototype, "InitialFocus", {
            get: function () {
                return this._initFocus;
            },
            enumerable: false,
            configurable: true
        });
        InputHtml.prototype.SetNotInitialFocus = function () {
            this._initFocus = false;
        };
        InputHtml.prototype.ValueReset = function () {
            this._var.ResetValue();
            this.ValueSet(this._var.Value);
        };
        InputHtml.prototype.ShowError = function () {
            if (this._eDef < 0)
                return;
            var s = this.Variable.State;
            if (s == Securso.varValid) {
                if (!this._eVis)
                    return;
                this._eVis = false;
                for (var _i = 0, _a = this._eMes; _i < _a.length; _i++) {
                    var em = _a[_i];
                    em[1].style.display = 'none';
                }
                return;
            }
            this._eVis = true;
            var md = false;
            for (var _b = 0, _c = this._eMes; _b < _c.length; _b++) {
                var em = _c[_b];
                if (em[0] != s) {
                    em[1].style.display = 'none';
                }
                else {
                    em[1].style.display = 'block';
                    md = true;
                }
            }
            if (!md)
                this._eMes[this._eDef][1].style.display = 'block';
        };
        InputHtml.prototype.HideError = function () {
            if (this._eDef < 0)
                return;
            if (!this._eVis)
                return;
            this._eVis = false;
            for (var _i = 0, _a = this._eMes; _i < _a.length; _i++) {
                var em = _a[_i];
                em[1].style.display = 'none';
            }
        };
        Object.defineProperty(InputHtml.prototype, "ErrorVisible", {
            get: function () {
                return this._eVis;
            },
            enumerable: false,
            configurable: true
        });
        InputHtml.prototype.SetStateAfterAjaxCall = function (newState, newValue) {
            var v = this.Variable;
            v.SetValueAndState(newValue, newState);
            if (newState != Securso.varValid)
                v.AddInvalid(newValue);
        };
        return InputHtml;
    }());
    Securso.InputHtml = InputHtml;
    var MarkStateCallType;
    (function (MarkStateCallType) {
        MarkStateCallType[MarkStateCallType["ShowDialogFirst"] = 0] = "ShowDialogFirst";
        MarkStateCallType[MarkStateCallType["ShowDialogSubsequent"] = 1] = "ShowDialogSubsequent";
        MarkStateCallType[MarkStateCallType["Submit"] = 2] = "Submit";
        MarkStateCallType[MarkStateCallType["Filter"] = 3] = "Filter";
        MarkStateCallType[MarkStateCallType["AjaxCallReply"] = 4] = "AjaxCallReply";
        MarkStateCallType[MarkStateCallType["FocusGet"] = 5] = "FocusGet";
        MarkStateCallType[MarkStateCallType["FocusBlur"] = 6] = "FocusBlur";
    })(MarkStateCallType = Securso.MarkStateCallType || (Securso.MarkStateCallType = {}));
    var MarkStateDialog;
    (function (MarkStateDialog) {
        MarkStateDialog[MarkStateDialog["Unchanged"] = 0] = "Unchanged";
        MarkStateDialog[MarkStateDialog["Hide"] = 1] = "Hide";
        MarkStateDialog[MarkStateDialog["Show"] = 2] = "Show";
    })(MarkStateDialog = Securso.MarkStateDialog || (Securso.MarkStateDialog = {}));
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var InputHtmlInput = (function (_super) {
        __extends(InputHtmlInput, _super);
        function InputHtmlInput(element, variable, errorMessages, errorDefault) {
            var _this = _super.call(this, element, variable, errorMessages, errorDefault) || this;
            _this._elm = element;
            return _this;
        }
        InputHtmlInput.prototype.SetFocus = function () {
            this._elm.focus();
        };
        InputHtmlInput.prototype.ValueDisplay = function () {
            this._elm.value = this.Variable.Value;
        };
        InputHtmlInput.prototype.ValueGet = function () {
            var v = this.Variable;
            v.Validate(this._elm.value);
            return v.Valid;
        };
        InputHtmlInput.prototype.ValueSet = function (value) {
            var v = this.Variable;
            v.Validate(value);
            this._elm.value = value;
            return v.Valid;
        };
        InputHtmlInput.prototype.Select = function () {
            this._elm.select();
        };
        return InputHtmlInput;
    }(Securso.InputHtml));
    Securso.InputHtmlInput = InputHtmlInput;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var InputHtmlSelect = (function (_super) {
        __extends(InputHtmlSelect, _super);
        function InputHtmlSelect(element, variable, errorMessages, errorDefault) {
            var _this = _super.call(this, element, variable, errorMessages, errorDefault) || this;
            _this._elm = element;
            return _this;
        }
        InputHtmlSelect.prototype.SetFocus = function () {
            this._elm.focus();
        };
        InputHtmlSelect.prototype.ValueDisplay = function () {
            this._elm.value = this.Variable.Value;
        };
        InputHtmlSelect.prototype.ValueGet = function () {
            var v = this.Variable;
            v.Validate(this._elm.value);
            return v.Valid;
        };
        InputHtmlSelect.prototype.ValueSet = function (value) {
            var v = this.Variable;
            v.Validate(value);
            this._elm.value = value;
            return v.Valid;
        };
        InputHtmlSelect.prototype.Select = function () {
            return;
        };
        return InputHtmlSelect;
    }(Securso.InputHtml));
    Securso.InputHtmlSelect = InputHtmlSelect;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var InputHtmlTextArea = (function (_super) {
        __extends(InputHtmlTextArea, _super);
        function InputHtmlTextArea(element, variable, errorMessages, errorDefault, maxLengthElement, remLengthElement) {
            var _this = _super.call(this, element, variable, errorMessages, errorDefault) || this;
            _this._elm = element;
            var ml = variable.MaxLen;
            if (ml > 0) {
                _this._elm.maxLength = ml;
                if (maxLengthElement != null) {
                    maxLengthElement.innerText = ml.toString();
                }
                if (remLengthElement != null) {
                    _this._elmc = remLengthElement;
                    {
                        var inp_1 = element.id;
                        var rem_1 = remLengthElement.id;
                        var max_1 = ml;
                        _this._elm.addEventListener("input", function (e) { TextAreaInput(e, inp_1, rem_1, max_1); });
                    }
                }
                else {
                    _this._elmc = null;
                }
            }
            else {
                _this._elmc = null;
            }
            return _this;
        }
        InputHtmlTextArea.prototype.SetFocus = function () {
            this._elm.focus();
        };
        InputHtmlTextArea.prototype.ValueDisplay = function () {
            var v = this.Variable;
            var s = v.Value;
            this._elm.value = s;
            if (this._elmc != null)
                this._elmc.innerText = (v.MaxLen - s.length).toString();
        };
        InputHtmlTextArea.prototype.ValueGet = function () {
            var v = this.Variable;
            var s = this._elm.value;
            v.Validate(s);
            if (this._elmc != null)
                this._elmc.innerText = (v.MaxLen - s.length).toString();
            return v.Valid;
        };
        InputHtmlTextArea.prototype.ValueSet = function (value) {
            var v = this.Variable;
            v.Validate(value);
            this._elm.value = value;
            if (this._elmc != null)
                this._elmc.innerText = value.length.toString();
            return v.Valid;
        };
        InputHtmlTextArea.prototype.Select = function () {
            this._elm.select();
        };
        return InputHtmlTextArea;
    }(Securso.InputHtml));
    Securso.InputHtmlTextArea = InputHtmlTextArea;
    function TextAreaInput(e, inp, rem, max) {
        try {
            var hi = document.getElementById(inp);
            if (hi == null)
                return;
            var hv = hi;
            var i = max - hv.value.length;
            var hr = document.getElementById(rem);
            if (hr == null)
                return;
            hr.innerText = i.toString();
            e.preventDefault();
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.Error, "unhandled error", "InputHtmlTextArea.TextAreaInput", err, null, null);
        }
    }
    Securso.TextAreaInput = TextAreaInput;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var RuntimeState;
    (function (RuntimeState) {
        RuntimeState[RuntimeState["OK"] = 0] = "OK";
        RuntimeState[RuntimeState["ErrorInit"] = 1] = "ErrorInit";
        RuntimeState[RuntimeState["Error"] = 2] = "Error";
    })(RuntimeState = Securso.RuntimeState || (Securso.RuntimeState = {}));
    var Logger = (function () {
        function Logger() {
        }
        Object.defineProperty(Logger, "Site", {
            set: function (site) {
                site = site.trim();
                if (site.length == 0)
                    this._s_sit = "unknown";
                else
                    this._s_sit = site;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Logger, "LoggingUrl", {
            set: function (url) {
                url = url.trim();
                if (url.length == 0)
                    this._s_lUrl = "";
                    //this._s_lUrl = "/securso/java-script-error";
                else
                    this._s_lUrl = url;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Logger, "ErrorUrl", {
            get: function () {
                return this._s_eUrl;
            },
            set: function (url) {
                url = url.trim();
                if (url.length == 0)
                    this._s_eUrl = "/securso/unexpected-error-page";
                else
                    this._s_eUrl = url;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Logger, "State", {
            get: function () {
                return this._s_ste;
            },
            enumerable: false,
            configurable: true
        });
        Logger.LogError = function (state, message, location, error, info, aid) {
            if (typeof this._s_lUrl == undefined)
                return;
            if (this._s_lUrl == null)
                return;
            if (this._s_lurl == "")
                return;
            alert("Logger.LogError: " + this._s_lurl.toString());
            if (error == undefined)
                return;
            var j = {
                "site": this._s_sit,
                "mess": message,
                "loc": location,
                "err": {
                    "mess": error.message,
                    "name": error.name,
                    "stack": error.stack
                },
                "inf": info,
                "aid": aid
            };
            var req = new XMLHttpRequest();
            req.open('POST', this._s_lUrl, true);
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Accept", "application/json; charset=utf-8");
            req.send(JSON.stringify(j));
        };
        Logger.LogMessage = function (state, message, location, info, aid) {
            if (typeof this._s_lUrl == undefined)
                return;
            if (this._s_lUrl == null)
                return;
            if (this._s_lurl == "")
                return;
            alert("Logger.LogMessage: " + this._s_lurl.toString());
            var inf; 
            this._s_ste = state;
            if (info == null) {
                inf = 'null';
            }
            else if (typeof info == 'string') {
                inf = '"' + info + '"';
            }
            else {
                inf = '"' + info.join("; ") + '"';
            }
            if (aid == null)
                aid = 'null';
            else
                aid = '"' + aid + '"';
            var j = '{"sit":"' + this._s_sit + '","mess":"' + message + '","loc":"' + location + '","info":' + inf + ',"aid":' + aid + '"}';
            var req = new XMLHttpRequest();
            req.open('POST', this._s_lUrl, true);
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Accept", "application/json; charset=utf-8");
            req.send(j);
        };
        Logger._s_sit = "unknown";
        Logger._s_ste = RuntimeState.OK;
        Logger._s_lUrl = "";
        //Logger._s_lUrl = "/securso/java-script-error";
        Logger._s_eUrl = "/securso/unexpected-error-page";
        return Logger;
    }());
    Securso.Logger = Logger;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    Securso.filterAll = -2;
    Securso.filterUnknown = -1;
    var List = (function () {
        function List(name, list, json) {
            this._lfil = null;
            this._lall = null;
            this._dall = null;
            this._dsom = null;
            this._dnon = null;
            this._mess = null;
            this._prev = false;
            this._filt = false;
            this._fcnt = 175;
            this._mcnt = 29;
            var i;
            var j;
            var l;
            var c;
            var d;
            var v;
            this._name = name;
            this._url = Securso.JsonPropString(json.baseUrl, "baseUrl", null);
            d = Securso.JsonPropString(json.elementDet, "elementDet", "");
            if (d.length == 0) {
                if (!List._s_extern)
                    throw new Error("The list is not external, an 'elementDet' html element must be specified.");
                this._elem_det = null;
            }
            else {
                if (List._s_extern)
                    throw new Error("The list is external, an 'elementDet' html element must not be specified.");
                this._elem_det = document.getElementById(d);
                if (this._elem_det == null)
                    throw new Error("The list is not external, html element 'elementDet' does not exist.");
            }
            d = Securso.JsonPropString(json.elementNav, "elementNav", "");
            if (d.length == 0)
                this._elem_nav = null;
            else
                this._elem_nav = document.getElementById(d);
            d = Securso.JsonPropString(json.keyTagDialogPrefix, "keyTagDialogPrefix", null);
            this._key_names = Securso.JsonPropStringArray(json.keys, "keys", []);
            if (this._key_names.length == 0)
                throw new Error("No keys have been specified for the list.");
            this._key_dlg = [];
            l = this._key_names.length;
            for (i = 0; i < l; i++) {
                this._key_dlg.push(Securso.ModalDialog.GetModalDialog(d + this._key_names[i]));
            }
            this._tag_name = Securso.JsonPropString(json.tag, "tag", "");
            if (this._tag_name.length == 0)
                this._tag_dlg = null;
            else
                this._tag_dlg = Securso.ModalDialog.GetModalDialog(d + this._tag_name);
            this._fip = Securso.JsonPropString(json.filterIdPrefix, "filterIdPrefix", null);
            l = json.filterValues.length;
            c = 0;
            this._elm_id = [];
            this._elm_key_val = [];
            this._elm_tag_val = [];
            this._elm_sel = [];
            for (i = 0; i < l; i++) {
                v = json.filterValues[i];
                j = Securso.JsonPropNumber(v.id, "id", null);
                this._elm_id.push(j);
                this._elm_key_val.push(Securso.JsonPropNumberArray(v.valKey, "valKey", null));
                this._elm_tag_val.push(Securso.JsonPropNumberArray(v.valTag, "valTag", null));
                this._elm_sel.push(true);
                c++;
            }
            if (c == 0)
                throw new Error("No filter values have been specified.");
            this._cur = 0;
            this._prev = false;
            for (var _i = 0, _a = this._key_dlg; _i < _a.length; _i++) {
                var md = _a[_i];
                if (md.IsFilterSelectionFromPreviousVisit) {
                    this._prev = true;
                    break;
                }
            }
            if (!this._prev && this._tag_dlg.IsFilterSelectionFromPreviousVisit)
                this._prev = true;
            this._mess = document.getElementById(name + 'Mess');
            this._lfil = document.getElementById(name + 'LFiltered');
            this._lall = document.getElementById(name + 'LAll');
            this._dall = document.getElementById(name + 'DAll');
            this._dsom = document.getElementById(name + 'DSome');
            this._dnon = document.getElementById(name + 'DNone');
        }
        List.GetListByName = function (name) {
            for (var _i = 0, _a = this._s_lists; _i < _a.length; _i++) {
                var l = _a[_i];
                if (l.Name == name)
                    return l;
            }
            throw new Error("List does not exist; name: " + name);
        };
        List.SetupExtenalFilter = function (initialDisplay, redisplayListBegin, redisplayListEnd, redisplayListId) {
            List._s_d_init = initialDisplay;
            List._s_rd_beg = redisplayListBegin;
            List._s_rd_end = redisplayListEnd;
            List._s_rd_id = redisplayListId;
            this._s_extern = true;
        };
        List.InitialDisplay = function () {
            if (List._s_d_init == null)
                return;
            List._s_d_init();
        };
        Object.defineProperty(List, "IsExternal", {
            get: function () {
                return this._s_extern;
            },
            enumerable: false,
            configurable: true
        });
        List.Create = function (json) {
            var n = "";
            var d;
            var v;
            var e;
            try {
                if (json.lists == undefined)
                    return;
                var l = json.lists.length;
                for (var i = 0; i < l; i++) {
                    v = json.lists[i];
                    n = Securso.JsonPropString(v.name, "name", null).trim();
                    if (n.length == 0)
                        continue;
                    if (List._s_d_init == null) {
                        e = document.getElementById(n);
                        if (e == null)
                            continue;
                    }
                    else {
                        e = null;
                    }
                    d = new List(n, e, v);
                    this._s_lists.push(d);
                }
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "List.Create", err, n, null);
            }
        };
        List.Complete = function () {
            var n = "";
            try {
                for (var _i = 0, _a = this._s_lists; _i < _a.length; _i++) {
                    var l = _a[_i];
                    n = l.Name;
                    l.CompleteSetup();
                }
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "List.Complete", err, n, null);
            }
        };
        List.prototype.CompleteSetup = function () {
            var s;
            var e;
            if (this._elem_nav != null) {
                this._elem_nav.style.visibility = "visible";
                s = this._elem_nav.id;
                e = document.getElementById(s + '-f');
                if (e != null) {
                    var n_1 = this._name;
                    e.addEventListener("click", function (e) { ListNavigation(e, n_1, -1, ListNavigationType.First); });
                }
                e = document.getElementById(s + '-b');
                if (e != null) {
                    var n_2 = this._name;
                    e.addEventListener("click", function (e) { ListNavigation(e, n_2, -1, ListNavigationType.Back); });
                }
                e = document.getElementById(s + '-n');
                if (e != null) {
                    var n_3 = this._name;
                    e.addEventListener("click", function (e) { ListNavigation(e, n_3, -1, ListNavigationType.Next); });
                }
                e = document.getElementById(s + '-l');
                if (e != null) {
                    var n_4 = this._name;
                    e.addEventListener("click", function (e) { ListNavigation(e, n_4, -1, ListNavigationType.Last); });
                }
            }
            if (!List._s_extern) {
                var l = this._elm_id.length;
                var _loop_1 = function (i) {
                    s = this_1._fip + "c" + this_1._elm_id[i].toString();
                    e = document.getElementById(s);
                    if (e == null)
                        throw new Error("List item click html element does not exist: " + s);
                    {
                        var nm_1 = this_1.Name;
                        var id_1 = i;
                        e.addEventListener("click", function (e) { ListNavigation(e, nm_1, id_1, ListNavigationType.ElementClicked); });
                    }
                };
                var this_1 = this;
                for (var i = 0; i < l; i++) {
                    _loop_1(i);
                }
            }
        };
        Object.defineProperty(List.prototype, "Name", {
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(List.prototype, "Filtered", {
            get: function () {
                return this._filt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(List.prototype, "AllDisplayed", {
            get: function () {
                if (this._fcnt > 0 && this._mcnt == 0)
                    return true;
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(List.prototype, "SomeDisplayed", {
            get: function () {
                if (this._fcnt > 0 && this._mcnt > 0 && this._mcnt != this._fcnt)
                    return true;
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(List.prototype, "NoneDisplayed", {
            get: function () {
                if (this._fcnt == 0)
                    return true;
                if (this._mcnt == this._fcnt)
                    return true;
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(List.prototype, "IsFilterSelectionFromPreviousVisit", {
            get: function () {
                var b = this._prev;
                this._prev = false;
                return b;
            },
            enumerable: false,
            configurable: true
        });
        List.prototype.DisplayMessage = function () {
            var b = false;
            if (this._filt) {
                if (this._lfil != null) {
                    if (this._lfil.tagName == 'SPAN')
                        this._lfil.style.display = 'inline';
                    else
                        this._lfil.style.display = 'block';
                    b = true;
                }
                if (this._lall != null) {
                    this._lall.style.display = 'none';
                }
            }
            else {
                if (this._lfil != null) {
                    this._lfil.style.display = 'none';
                }
                if (this._lall != null) {
                    if (this._lall.tagName == 'SPAN')
                        this._lall.style.display = 'inline';
                    else
                        this._lall.style.display = 'block';
                    b = true;
                }
            }
            if (this.AllDisplayed) {
                if (this._dall != null) {
                    if (this._dall.tagName == 'SPAN')
                        this._dall.style.display = 'inline';
                    else
                        this._dall.style.display = 'block';
                    b = true;
                }
                if (this._dsom != null) {
                    this._dsom.style.display = 'none';
                }
                if (this._dnon != null) {
                    this._dnon.style.display = 'none';
                }
            }
            else if (this.SomeDisplayed) {
                if (this._dall != null) {
                    this._dall.style.display = 'none';
                }
                if (this._dsom != null) {
                    if (this._dsom.tagName == 'SPAN')
                        this._dsom.style.display = 'inline';
                    else
                        this._dsom.style.display = 'block';
                    b = true;
                }
                if (this._dnon != null) {
                    this._dnon.style.display = 'none';
                }
            }
            else if (this.NoneDisplayed) {
                if (this._dall != null) {
                    this._dall.style.display = 'none';
                }
                if (this._dsom != null) {
                    this._dsom.style.display = 'none';
                }
                if (this._dnon != null) {
                    if (this._dnon.tagName == 'SPAN')
                        this._dnon.style.display = 'inline';
                    else
                        this._dnon.style.display = 'block';
                    b = true;
                }
            }
            if (this._mess != null) {
                if (b)
                    this._mess.style.display = 'block';
                else
                    this._mess.style.display = 'none';
            }
        };
        List.prototype.GetKeyIndex = function (key) {
            if (key == this._tag_name)
                return -1;
            for (var i = 0; i < this._key_names.length; i++) {
                if (this._key_names[i] == key)
                    return i;
            }
            throw new Error("The 'GetKeyIndex' name is unknown: " + key);
        };
        List.prototype.ResetAll = function () {
            for (var _i = 0, _a = this._key_dlg; _i < _a.length; _i++) {
                var f = _a[_i];
                f.FilterSelect(Securso.FilterSelectOperationType.ResetFull);
            }
            if (this._tag_dlg != null)
                this._tag_dlg.FilterSelect(Securso.FilterSelectOperationType.ResetFull);
        };
        List.prototype.FilterList = function (test) {
            var cc = 0;
            var ci = -1;
            var dlg;
            var elm;
            if (List._s_extern)
                List._s_rd_beg();
            if (!test) {
                this._filt = false;
                this._fcnt = 0;
                this._mcnt = 0;
            }
            var l1 = this._elm_id.length;
            for (var i1 = 0; i1 < l1; i1++) {
                var key = this._elm_key_val[i1];
                var tag = this._elm_tag_val[i1];
                var b = true;
                var l2 = this._key_dlg.length;
                for (var i2 = 0; i2 < l2; i2++) {
                    dlg = this._key_dlg[i2];
                    if (!dlg.IsKeyValueFiltered(key[i2])) {
                        b = false;
                        break;
                    }
                }
                if (b && this._tag_dlg != null) {
                    b = this._tag_dlg.IsTagValueFiltered(tag);
                }
                if (!test) {
                    if (!List._s_extern) {
                        var si = this._elm_id[i1].toString();
                        var st = this._fip + "b" + si;
                        elm = document.getElementById(st);
                        if (elm == null) {
                            st = this._fip + "c" + si.toString();
                            elm = document.getElementById(st);
                            if (elm == null)
                                throw new Error("Could not locate list element for hide/show: " + st);
                        }
                    }
                    if (b) {
                        this._fcnt++;
                        if (List._s_extern) {
                            if (!List._s_rd_id(this._elm_id[i1]))
                                this._mcnt++;
                        }
                        else {
                            elm.style.display = "block";
                        }
                        this._elm_sel[i1] = true;
                        cc++;
                        if (ci < 0)
                            ci = i1;
                    }
                    else {
                        this._filt = true;
                        if (!List._s_extern) {
                            elm.style.display = "none";
                        }
                        this._elm_sel[i1] = false;
                    }
                }
                else {
                    if (b)
                        cc++;
                }
            }
            if (!test) {
                this._cur = ci;
                if (List._s_extern)
                    List._s_rd_end();
                else
                    this.LoadDetail(this._cur);
            }
            return cc;
        };
        List.prototype.SetCurrentById = function (id) {
            var i;
            var l = this._elm_id.length;
            for (i = 0; i < l; i++) {
                if (this._elm_id[i] == id) {
                    this._cur = i;
                    return;
                }
            }
            this._cur = 0;
        };
        List.prototype.LoadFirst = function () {
            var i;
            var l = this._elm_sel.length;
            for (i = 0; i < l; i++) {
                if (this._elm_sel[i]) {
                    this.LoadDetail(i);
                    break;
                }
            }
        };
        List.prototype.LoadBack = function () {
            var i;
            var l = this._elm_sel.length;
            for (i = this._cur - 1; i >= 0; i--) {
                if (this._elm_sel[i]) {
                    this.LoadDetail(i);
                    break;
                }
            }
        };
        List.prototype.LoadNext = function () {
            var i;
            var l = this._elm_sel.length;
            for (i = this._cur + 1; i < l; i++) {
                if (this._elm_sel[i]) {
                    this.LoadDetail(i);
                    break;
                }
            }
        };
        List.prototype.LoadLast = function () {
            var i;
            var l = this._elm_sel.length;
            for (i = l - 1; i >= 0; i--) {
                if (this._elm_sel[i]) {
                    this.LoadDetail(i);
                    break;
                }
            }
        };
        List.prototype.LoadDetail = function (index) {
            var _this = this;
            try {
                var nm_2 = this._name;
                this._cur = index;
                var req_1 = new XMLHttpRequest();
                var url_1 = this._url + this._elm_id[index];
                req_1.open('GET', url_1, true);
                req_1.setRequestHeader("Accept", "text/html; charset=utf-8");
                req_1.onload = function () {
                    try {
                        try {
                            var s = void 0;
                            if (req_1.status != 200)
                                throw new Error("Response http status code is not 200.");
                            var t = req_1.getResponseHeader("Content-Type");
                            if (t == null)
                                throw new Error("Response contact type not specified");
                            if (t.indexOf("text/html") < 0)
                                throw new Error("Response contact type is not 'text/html': " + t);
                            _this._elem_det.innerHTML = req_1.responseText;
                            var e = document.getElementById("securso-list");
                            if (e != null)
                                s = e.getAttribute("data-title");
                            else
                                s = null;
                            if (s == null)
                                throw new Error("Response cannot find the meta title");
                            document.title = s;
                            _this._elem_det.style.display = "block";
                            if (List._s_d_init == null) {
                                var fs = document.getElementById("fallenSection");
                                if (fs != null)
                                    window.scrollTo(0, 0);
                            }
                            if (_this._elem_nav != null) {
                                _this._elem_nav.style.visibility = "visible";
                                s = _this._elem_nav.id;
                                var en = document.getElementById(s + '-f');
                                if (en != null) {
                                    var n_5 = _this._name;
                                    en.addEventListener("click", function (e) { ListNavigation(e, n_5, -1, ListNavigationType.First); });
                                }
                                en = document.getElementById(s + '-b');
                                if (en != null) {
                                    var n_6 = _this._name;
                                    en.addEventListener("click", function (e) { ListNavigation(e, n_6, -1, ListNavigationType.Back); });
                                }
                                en = document.getElementById(s + '-n');
                                if (en != null) {
                                    var n_7 = _this._name;
                                    en.addEventListener("click", function (e) { ListNavigation(e, n_7, -1, ListNavigationType.Next); });
                                }
                                en = document.getElementById(s + '-l');
                                if (en != null) {
                                    var n_8 = _this._name;
                                    en.addEventListener("click", function (e) { ListNavigation(e, n_8, -1, ListNavigationType.Last); });
                                }
                            }
                        }
                        finally {
                            Securso.ModalDialog.HideWaitDialog();
                        }
                    }
                    catch (err) {
                        if (err instanceof Error)
                            Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "List.LoadDetail (onload)", err, [nm_2, index.toString(), req_1.status.toString(), url_1], null);
                    }
                };
                req_1.onerror = function () {
                    Securso.ModalDialog.HideWaitDialog();
                    Securso.Logger.LogMessage(Securso.RuntimeState.Error, "unexpected error", "List.LoadDetail onerror)", [nm_2, index.toString(), req_1.status.toString(), req_1.statusText], null);
                };
                req_1.send();
                Securso.ModalDialog.ShowWaitDialog();
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "List.LoadDetail.LoadDetail", err, this._name, null);
            }
        };
        List._s_lists = [];
        List._s_d_init = null;
        List._s_rd_beg = null;
        List._s_rd_end = null;
        List._s_rd_id = null;
        List._s_extern = false;
        return List;
    }());
    Securso.List = List;
    function ListNavigation(e, name, index, op) {
        try {
            var l = List.GetListByName(name);
            switch (op) {
                case ListNavigationType.First:
                    l.LoadFirst();
                    break;
                case ListNavigationType.Back:
                    l.LoadBack();
                    break;
                case ListNavigationType.Next:
                    l.LoadNext();
                    break;
                case ListNavigationType.Last:
                    l.LoadLast();
                    break;
                case ListNavigationType.ElementClicked:
                    l.LoadDetail(index);
                    break;
                default:
                    return;
            }
            e.preventDefault();
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "List.LoadDetail", err, [name, op.toString()], null);
        }
    }
    Securso.ListNavigation = ListNavigation;
    var ListNavigationType;
    (function (ListNavigationType) {
        ListNavigationType[ListNavigationType["First"] = 0] = "First";
        ListNavigationType[ListNavigationType["Back"] = 1] = "Back";
        ListNavigationType[ListNavigationType["Next"] = 2] = "Next";
        ListNavigationType[ListNavigationType["Last"] = 3] = "Last";
        ListNavigationType[ListNavigationType["ElementClicked"] = 4] = "ElementClicked";
    })(ListNavigationType = Securso.ListNavigationType || (Securso.ListNavigationType = {}));
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var ModalDialog = (function () {
        function ModalDialog(name, json) {
            var e;
            this._nam = name;
            this._sids = json.showIds;
            ModalDialog._s_adlgs.insertAdjacentHTML('beforeend', json.html.join(""));
            this._dlg = Securso.GetHTMLElement(name);
            e = Securso.GetHTMLElement(name + "Close");
            {
                var n_9 = name;
                e.addEventListener("click", function (e) { DialogOperation(e, n_9, DialogOperationType.Close); });
            }
            return;
        }
        ModalDialog.Create = function (json) {
            var n = "";
            var t = "";
            try {
                ModalDialog._s_adlgs = Securso.GetHTMLElement("dialogs");
                ModalDialog._s_adlgs.insertAdjacentHTML('beforeend', json.waitDialog.join(""));
                ModalDialog._s_wait = Securso.GetHTMLElement("waitDialog");
                ModalDialog._s_wait.style.zIndex = "9999";
                var j = void 0;
                var m = void 0;
                var l = json.dialogs.length;
                for (var i = 0; i < l; i++) {
                    j = json.dialogs[i];
                    n = j.name;
                    t = j.type;
                    switch (t) {
                        case "ajaxDetail":
                            m = new Securso.ModalDialogAjaxDetail(n, j);
                            break;
                        case "message":
                            m = new Securso.ModalDialogMessage(n, j);
                            break;
                        case "submit":
                            m = new Securso.ModalDialogSubmit(n, j);
                            break;
                        case "filter":
                            m = new Securso.ModalDialogFilter(n, j);
                            break;
                        case "filterCheckbox":
                            m = new Securso.ModalDialogFilterCheckbox(n, json.dialogs[i]);
                            break;
                        default:
                            throw new Error("The dialog type is invalid or not implemented.");
                    }
                    this._s_mdlgs.push(m);
                }
                var s = "";
                for (var _i = 0, _a = this._s_mdlgs; _i < _a.length; _i++) {
                    var d = _a[_i];
                    s = s + d.Name + "; ";
                }
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "ModalDialog.Create", err, [n, t], null);
            }
        };
        ModalDialog.Complete = function (json) {
            var n = "";
            try {
                for (var _i = 0, _a = this._s_mdlgs; _i < _a.length; _i++) {
                    var d = _a[_i];
                    n = d.Name;
                    d.CompleteSetup();
                }
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "ModalDialog.Complete", err, n, null);
            }
        };
        ModalDialog.prototype.CompleteSetup = function () {
            var _loop_2 = function (s) {
                var e = document.getElementById(s);
                if (e != null) {
                    var n_10 = this_2._nam;
                    e.addEventListener("click", function (e) { DialogOperation(e, n_10, DialogOperationType.Show); });
                }
            };
            var this_2 = this;
            for (var _i = 0, _a = this._sids; _i < _a.length; _i++) {
                var s = _a[_i];
                _loop_2(s);
            }
        };
        Object.defineProperty(ModalDialog.prototype, "Name", {
            get: function () {
                return this._nam;
            },
            enumerable: false,
            configurable: true
        });
        ModalDialog.prototype.Show = function () {
            if (ModalDialog._s_mdisp.length > 0) {
                var e = ModalDialog._s_mdisp[ModalDialog._s_mdisp.length - 1];
                e.style.display = "none";
            }
            ModalDialog._s_zInd++;
            this._dlg.style.zIndex = (ModalDialog._s_zInd).toString();
            this._dlg.style.display = "block";
            ModalDialog._s_mdisp.push(this._dlg);
        };
        ModalDialog.prototype.ShowWithAjaxDetail = function (urlAppend) {
            throw new Error(this._nam + ": the 'ShowWithInfo' method has not been implemented.");
        };
        ModalDialog.prototype.Close = function () {
            var e = ModalDialog._s_mdisp.pop();
            if (e == undefined)
                throw new Error(this._nam + ": close dialog called when no dialogs to close.");
            ModalDialog._s_zInd--;
            e.style.display = "none";
            if (ModalDialog._s_mdisp.length > 0) {
                e = ModalDialog._s_mdisp[ModalDialog._s_mdisp.length - 1];
                e.style.display = "block";
            }
        };
        ModalDialog.ShowWaitDialog = function () {
            this._s_wait.style.display = "block";
        };
        ModalDialog.HideWaitDialog = function () {
            this._s_wait.style.display = "none";
        };
        ModalDialog.GetModalDialog = function (name) {
            var s = "";
            for (var _i = 0, _a = this._s_mdlgs; _i < _a.length; _i++) {
                var d = _a[_i];
                s = s + d.Name + "; ";
                if (d.Name == name)
                    return d;
            }
            throw new Error(name + ": dialog does not exist.");
        };
        Object.defineProperty(ModalDialog.prototype, "HasSubmit", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        ModalDialog.prototype.Submit = function () {
            throw new Error(this.Name + ": dialog is not submit.");
        };
        ModalDialog.prototype.InputGetsFocus = function (iputIndex) {
            throw new Error(this.Name + ": dialog is not input.");
        };
        ModalDialog.prototype.InputLoosesFocus = function (iputIndex) {
            throw new Error(this.Name + ": dialog is not input.");
        };
        ModalDialog.prototype.InputSet = function (inputIndex) {
            throw new Error(this.Name + ": dialog is not input.");
        };
        ModalDialog.prototype.InputReset = function (inputIndex) {
            throw new Error(this.Name + ": dialog is not input.");
        };
        Object.defineProperty(ModalDialog.prototype, "HasFilterMain", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        ModalDialog.prototype.FilterMain = function (op) {
            throw new Error(this.Name + ": dialog is not filterr main.");
        };
        Object.defineProperty(ModalDialog.prototype, "IsFilterSelectionFromPreviousVisit", {
            get: function () {
                throw new Error(this.Name + ": dialog is not filter select.");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ModalDialog.prototype, "HasFilterSelect", {
            get: function () {
                return false;
            },
            enumerable: false,
            configurable: true
        });
        ModalDialog.prototype.FilterSelect = function (op) {
            throw new Error(this.Name + ": dialog is not filter select.");
        };
        ModalDialog.prototype.IsKeyValueFiltered = function (value) {
            throw new Error(this.Name + ": dialog is not filter select.");
        };
        ModalDialog.prototype.IsTagValueFiltered = function (values) {
            throw new Error(this.Name + ": dialog is not filter select.");
        };
        ModalDialog._s_zInd = 9000;
        ModalDialog._s_wait = null;
        ModalDialog._s_adlgs = null;
        ModalDialog._s_mdlgs = [];
        ModalDialog._s_mdisp = [];
        return ModalDialog;
    }());
    Securso.ModalDialog = ModalDialog;
    function DialogOperation(e, name, op) {
        try {
            var d = ModalDialog.GetModalDialog(name);
            switch (op) {
                case DialogOperationType.Show:
                    d.Show();
                    break;
                case DialogOperationType.Close:
                    d.Close();
                    break;
                case DialogOperationType.Submit:
                    d.Submit();
                    break;
                default:
                    return;
            }
            e.preventDefault();
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.Error, "unhandled error", "ModalDialog.DialogOperation", err, [name, op.toString()], null);
        }
    }
    Securso.DialogOperation = DialogOperation;
    var DialogOperationType;
    (function (DialogOperationType) {
        DialogOperationType[DialogOperationType["Show"] = 0] = "Show";
        DialogOperationType[DialogOperationType["Close"] = 1] = "Close";
        DialogOperationType[DialogOperationType["Submit"] = 2] = "Submit";
    })(DialogOperationType = Securso.DialogOperationType || (Securso.DialogOperationType = {}));
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    Securso.varNotSet = 0;
    Securso.varValid = 1;
    Securso.varInvalid = 2;
    Securso.varMissing = 3;
    Securso.varRepeatDifferent = 4;
    Securso.varRepeatMissing = 5;
    Securso.varTooShort = 6;
    Securso.varTooLong = 7;
    Securso.varNotAllowed = 8;
    Securso.varInvalidCharacters = 9;
    Securso.varServerRejected = 10;
    Securso.numericAll = -2;
    Securso.numericUnknown = -1;
    var Variable = (function () {
        function Variable(dt, vt, n, j) {
            this._def = "";
            this._val = "";
            this._ste = Securso.varNotSet;
            this._vInt = undefined;
            this._vBln = undefined;
            this._dTyp = dt;
            this._vTyp = vt;
            this._name = n;
            this._mand = Securso.JsonPropBoolean(j.mandatory, "mandatory", false);
            this._trim = Securso.JsonPropBoolean(j.trim, "trim", false);
            this._tolc = Securso.JsonPropBoolean(j.lowerCase, "lowerCase", false);
            this._touc = Securso.JsonPropBoolean(j.upperCase, "upperCase", false);
            this._minl = Securso.JsonPropNumber(j.minLength, "minLength", 0);
            this._maxl = Securso.JsonPropNumber(j.maxLength, "maxLength", 0);
            this._str = Securso.JsonPropBoolean(j.store, "store", false);
            this._inv = [];
            var d;
            var s;
            if (this._str) {
                try {
                    s = localStorage.getItem(n);
                }
                catch (_a) {
                    s = null;
                }
            }
            else {
                s = null;
            }
            if (s == null)
                d = Securso.JsonPropString(j.default, "default", "");
            else
                d = s;
            if (!this.ValidateBasic(d))
                return;
            if (!this.ValidateDataType())
                return;
            this.ValidateVariableType();
        }
        Variable.Create = function (json) {
            var v;
            var n = "?";
            var t = "?";
            try {
                var i = void 0;
                var l = json.variables.length;
                for (i = 0; i < l; i++) {
                    v = json.variables[i];
                    n = Securso.JsonPropString(v.name, "name", null);
                    t = Securso.JsonPropString(v.type, "type", null);
                    switch (t) {
                        case "name":
                            Securso.VariableName.CreateInstance(n, v);
                            break;
                        case "emailAddress":
                            Securso.VariableEmailAddress.CreateInstance(n, v);
                            break;
                        case "phoneNumber":
                            Securso.VariablePhoneNumber.CreateInstance(n, v);
                            break;
                        case "message":
                            Securso.VariableMessage.CreateInstance(n, v);
                            break;
                        default:
                            throw new Error("The variable type is invalid or not implemented.");
                    }
                    n = "";
                }
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "Variable.Create", err, [n, t], null);
            }
        };
        Variable.GetVariable = function (name) {
            for (var _i = 0, _a = this._vars; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.VarName == name)
                    return v;
            }
            throw new Error("Variable does not exist: " + name + ".");
        };
        Variable.AddVar = function (v) {
            this._vars.push(v);
        };
        Variable.prototype.EndConstructor = function () {
            this._def = this._val;
        };
        Object.defineProperty(Variable.prototype, "VarName", {
            get: function () {
                return this._name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Variable.prototype, "MinLen", {
            get: function () {
                return this._minl;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Variable.prototype, "MaxLen", {
            get: function () {
                return this._maxl;
            },
            enumerable: false,
            configurable: true
        });
        Variable.prototype.AddInvalid = function (value) {
            for (var _i = 0, _a = this._inv; _i < _a.length; _i++) {
                var iv = _a[_i];
                if (value == iv)
                    return;
            }
            this._inv.push(value);
        };
        Variable.prototype.CheckHtmlInputTagValid = function (type) {
            switch (this._vTyp) {
                case VariableType.Message:
                case VariableType.Name:
                case VariableType.Subject:
                    break;
                case VariableType.EmailAddress:
                    if (type == "email")
                        return true;
                    break;
                case VariableType.PhoneNumber:
                    if (type == "tel")
                        return true;
                    break;
                case VariableType.RadioButton:
                    if (type == "radio")
                        return true;
                    return false;
                case VariableType.CheckBox:
                    if (type == "checkbox")
                        return true;
                    return false;
                default:
                    return false;
            }
            if (type == "text")
                return true;
            return false;
        };
        Variable.prototype.CheckHtmlTextAreaValid = function () {
            if (this._vTyp != VariableType.Message)
                return false;
            return true;
        };
        Variable.prototype.CheckHtmlSelectValid = function () {
            if (this._vTyp != VariableType.DropDownListOption)
                return false;
            return true;
        };
        Variable.prototype.ResetValue = function () {
            this.Validate(this._def);
        };
        Variable.prototype.Validate = function (v) {
            if (!this.ValidateBasic(v))
                return false;
            if (!this.ValidateDataType())
                return false;
            if (!this.ValidateVariableType())
                return false;
            if (!this.ValidateInherited())
                return false;
            if (this._str) {
                try {
                    localStorage.setItem(this._name, this._val);
                }
                catch (_a) {
                }
            }
            return true;
        };
        Variable.prototype.ValidateBasic = function (v) {
            if (this._trim)
                v = v.trim();
            if (this._tolc)
                v = v.toLowerCase();
            else if (this._touc)
                v = v.toUpperCase();
            this._val = v;
            var l = v.length;
            if (l == 0) {
                if (this._mand) {
                    this._ste = Securso.varMissing;
                    return false;
                }
            }
            if (l < this._minl) {
                this._ste = Securso.varTooShort;
                return false;
            }
            if (this._maxl > 0 && l > this._maxl) {
                this._ste = Securso.varTooLong;
                return false;
            }
            for (var _i = 0, _a = this._inv; _i < _a.length; _i++) {
                var iv = _a[_i];
                if (v == iv) {
                    this._ste = Securso.varServerRejected;
                    return false;
                }
            }
            this._ste = Securso.varValid;
            return true;
        };
        Variable.prototype.ValidateDataType = function () {
            switch (this._dTyp) {
                case DataType.Integer: {
                    this._vInt = Securso.ConvertStringToInteger(this._val);
                    if (this._vInt != undefined)
                        return true;
                    break;
                }
                case DataType.Boolean: {
                    switch (this._val) {
                        case "0":
                        case "false": {
                            this._vBln = false;
                            return true;
                        }
                        case "1":
                        case "true": {
                            this._vBln = true;
                            return true;
                        }
                    }
                    break;
                }
                default:
                    return true;
            }
            this._ste = Securso.varInvalid;
            return false;
        };
        Variable.prototype.ValidateVariableType = function () {
            var s;
            switch (this._vTyp) {
                case VariableType.EmailAddress: {
                    if (Securso.ValidateEmailAddress(this._val))
                        return true;
                    this._ste = Securso.varInvalid;
                    return false;
                }
                case VariableType.Name:
                case VariableType.Message:
                case VariableType.Subject:
                    if (!this._mand)
                        return true;
                    s = this._val.trim();
                    if (s.length == 0) {
                        this._ste = Securso.varMissing;
                        return false;
                    }
                    return true;
                default:
                    return true;
            }
        };
        Variable.prototype.ValidateInherited = function () {
            return true;
        };
        Object.defineProperty(Variable.prototype, "Value", {
            get: function () {
                return this._val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Variable.prototype, "ValueInteger", {
            get: function () {
                if (this._vInt == undefined)
                    throw new Error("Varaiable value is not integer: " + this._name);
                return this._vInt;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Variable.prototype, "ValueBoolean", {
            get: function () {
                if (this._vBln == undefined)
                    throw new Error("Varaiable value is not boolean: " + this._name);
                return this._vBln;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Variable.prototype, "State", {
            get: function () {
                return this._ste;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Variable.prototype, "StateAsText", {
            get: function () {
                switch (this._ste) {
                    case 0:
                        return "Not set";
                    case 1:
                        return "Valid";
                    case 2:
                        return "Invalid";
                    case 3:
                        return "Missing";
                    case 4:
                        return "Repeat different";
                    case 5:
                        return "Repeat missing";
                    case 6:
                        return "Too short";
                    case 7:
                        return "Too long";
                    case 8:
                        return "Not allowed";
                    case 9:
                        return "Invalid characters";
                    case 10:
                        return "Server rejected";
                    default:
                        return this._ste.toString();
                }
            },
            enumerable: false,
            configurable: true
        });
        Variable.prototype.SetValue = function (v) {
            this._val = v;
        };
        Variable.prototype.SetState = function (s) {
            this._ste = s;
        };
        Variable.prototype.SetValueAndState = function (v, s) {
            this._val = v;
            this._ste = s;
        };
        Object.defineProperty(Variable.prototype, "Valid", {
            get: function () {
                if (this._ste == Securso.varValid)
                    return true;
                return false;
            },
            enumerable: false,
            configurable: true
        });
        Variable._vars = [];
        return Variable;
    }());
    Securso.Variable = Variable;
    var VariableType;
    (function (VariableType) {
        VariableType[VariableType["Undefined"] = 0] = "Undefined";
        VariableType[VariableType["Name"] = 1] = "Name";
        VariableType[VariableType["EmailAddress"] = 2] = "EmailAddress";
        VariableType[VariableType["PhoneNumber"] = 3] = "PhoneNumber";
        VariableType[VariableType["Subject"] = 4] = "Subject";
        VariableType[VariableType["Message"] = 5] = "Message";
        VariableType[VariableType["DropDownListOption"] = 6] = "DropDownListOption";
        VariableType[VariableType["RadioButton"] = 7] = "RadioButton";
        VariableType[VariableType["CheckBox"] = 8] = "CheckBox";
    })(VariableType = Securso.VariableType || (Securso.VariableType = {}));
    var DataType;
    (function (DataType) {
        DataType[DataType["Undefined"] = 0] = "Undefined";
        DataType[DataType["String"] = 1] = "String";
        DataType[DataType["Integer"] = 2] = "Integer";
        DataType[DataType["Boolean"] = 3] = "Boolean";
    })(DataType = Securso.DataType || (Securso.DataType = {}));
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var ModalDialogInput = (function (_super) {
        __extends(ModalDialogInput, _super);
        function ModalDialogInput(name, json) {
            var _this = _super.call(this, name, json) || this;
            _this._show1 = true;
            _this._msf = ModalDialogInput.GetMarkStateFunction(json.msf);
            _this._inp = ModalDialogInput.GetInputs(name, json.inputs);
            _this._ivm = Securso.GetHTMLElement(name + "InvalidMessage");
            return _this;
        }
        ModalDialogInput.SetMarkStateFunctions = function (msf) {
            this._s_msf = msf;
        };
        ModalDialogInput.GetMarkStateFunction = function (name) {
            for (var i = 0; i < this._s_msf.length; i++) {
                if (this._s_msf[i][0] == name)
                    return this._s_msf[i][1];
            }
            throw new Error(name + ": the mark state function does not exist.");
        };
        ModalDialogInput.GetInputs = function (name, inputs) {
            var ips = [];
            var eMes = [];
            var eDef = -1;
            var iHtml;
            var i;
            var l = inputs.length;
            var _loop_3 = function () {
                var n = inputs[i].name;
                var e = Securso.GetHTMLElement(n);
                var v = Securso.Variable.GetVariable(inputs[i].var);
                switch (e.tagName) {
                    case "INPUT":
                        var e1 = e;
                        var t = e1.getAttribute("type");
                        if (t == null)
                            throw new Error(n + ": attribute 'type' missing for html element.");
                        if (!v.CheckHtmlInputTagValid(t))
                            throw new Error(n + ": attribute 'type' invalid.");
                        iHtml = new Securso.InputHtmlInput(e1, v, eMes, eDef);
                        break;
                    case "TEXTAREA":
                        var e2 = e;
                        if (!v.CheckHtmlTextAreaValid())
                            throw new Error(n + ": TextArea input not allowed.");
                        var m = document.getElementById(n + "MaxChars");
                        var c = document.getElementById(n + "RemChars");
                        iHtml = new Securso.InputHtmlTextArea(e2, v, eMes, eDef, m, c);
                        break;
                    case "SELECT":
                        var e3 = e;
                        if (!v.CheckHtmlSelectValid())
                            throw new Error(n + "Select input not allowed.");
                        iHtml = new Securso.InputHtmlSelect(e3, v, eMes, eDef);
                        break;
                    default:
                        throw new Error(n + ": not allowed for input.");
                }
                {
                    var i_1 = ips.length;
                    var nm_3 = name;
                    e.addEventListener("blur", function (e) { InputFocusOperation(e, nm_3, i_1, FocusOperationType.Blur); });
                    e.addEventListener("focus", function (e) { InputFocusOperation(e, nm_3, i_1, FocusOperationType.Focus); });
                    ips.push(iHtml);
                }
            };
            for (i = 0; i < l; i++) {
                _loop_3();
            }
            if (ips.length == 0)
                throw new Error("No inputs specified.");
            return ips;
        };
        ModalDialogInput.prototype.ShowInputs = function () {
            var msd = Securso.MarkStateDialog.Unchanged;
            if (this._show1) {
                this._show1 = false;
                for (var _i = 0, _a = this._inp; _i < _a.length; _i++) {
                    var ip = _a[_i];
                    ip.ValueDisplay();
                    msd = ModalDialogInput.ResetMarkStateDialog(msd, this._msf(ip, Securso.MarkStateCallType.ShowDialogFirst));
                }
            }
            else {
                for (var _b = 0, _c = this._inp; _b < _c.length; _b++) {
                    var ip = _c[_b];
                    msd = ModalDialogInput.ResetMarkStateDialog(msd, this._msf(ip, Securso.MarkStateCallType.ShowDialogSubsequent));
                }
            }
            this.InputDialogInvalidMessageReset(msd);
        };
        ModalDialogInput.prototype.SetFocus = function (ind) {
            this._inp[ind].SetFocus();
        };
        ModalDialogInput.prototype.InputDialogInvalidMessageReset = function (ns) {
            if (this._ivm != null) {
                switch (ns) {
                    case Securso.MarkStateDialog.Hide:
                        this._ivm.style.visibility = "hidden";
                        this._ivm.style.display = "none";
                        break;
                    case Securso.MarkStateDialog.Show:
                        this._ivm.style.display = "block";
                        this._ivm.style.visibility = "visible";
                        break;
                    case Securso.MarkStateDialog.Unchanged:
                        break;
                }
                ;
            }
        };
        ModalDialogInput.prototype.InputGetsFocus = function (index) {
            this.InputCommon(index, Securso.MarkStateCallType.FocusGet);
        };
        ModalDialogInput.prototype.InputLoosesFocus = function (index) {
            this.InputCommon(index, Securso.MarkStateCallType.FocusBlur);
        };
        ModalDialogInput.prototype.InputCommon = function (ind, ct) {
            var inp = this._inp[ind];
            var msd = Securso.MarkStateDialog.Unchanged;
            var msct;
            switch (ct) {
                case Securso.MarkStateCallType.FocusGet:
                    msct = Securso.MarkStateCallType.FocusGet;
                    break;
                case Securso.MarkStateCallType.FocusBlur:
                    inp.ValueGet();
                    inp.SetNotInitialFocus();
                    msct = Securso.MarkStateCallType.FocusBlur;
                    break;
                default:
                    return;
            }
            msd = ModalDialogInput.ResetMarkStateDialog(msd, this._msf(inp, msct));
            this.InputDialogInvalidMessageReset(msd);
        };
        ModalDialogInput.prototype.ButtonClickValidateInput = function () {
            var inp = null;
            var msd = Securso.MarkStateDialog.Unchanged;
            for (var _i = 0, _a = this._inp; _i < _a.length; _i++) {
                var input = _a[_i];
                if (!input.ValueGet()) {
                    if (inp == null)
                        inp = input;
                }
                msd = ModalDialogInput.ResetMarkStateDialog(msd, this._msf(input, Securso.MarkStateCallType.Submit));
            }
            this.InputDialogInvalidMessageReset(msd);
            if (inp != null) {
                inp.SetFocus();
                return false;
            }
            else {
                return true;
            }
        };
        ModalDialogInput.prototype.ButtonClickInputAsJson = function () {
            var data = {};
            for (var _i = 0, _a = this._inp; _i < _a.length; _i++) {
                var input = _a[_i];
                var variable = input.Variable;
                data[variable.VarName] = variable.Value;
            }
            return JSON.stringify(data);
        };
        ModalDialogInput.prototype.ButtonClickAjaxReplyInvalidData = function (retval) {
            var msd = Securso.MarkStateDialog.Unchanged;
            for (var i = 0; i < retval.variables.length; i++) {
                var n = retval.variables[i].name;
                var v = retval.variables[i].value;
                var s = retval.variables[i].state;
                var l = false;
                for (var x = 0, y = this._inp.length; x < y; x++) {
                    var input = this._inp[x];
                    if (input.Variable.VarName != n)
                        continue;
                    l = true;
                    input.SetStateAfterAjaxCall(s, v);
                    msd = ModalDialogInput.ResetMarkStateDialog(msd, this._msf(input, Securso.MarkStateCallType.AjaxCallReply));
                    break;
                }
                if (!l)
                    throw new Error(n + ": submit reply invalid, could not find the variable associated with an invalid input.");
            }
            this.InputDialogInvalidMessageReset(msd);
            var invalidIndex = -1;
            for (var x = 0, y = this._inp.length; x < y; x++) {
                var input = this._inp[x];
                if (input.Variable.State != Securso.varValid) {
                    invalidIndex = x;
                    break;
                }
            }
            if (invalidIndex < 0) {
                throw new Error(this.Name + ": submit reply invalid, could not find an invalid input");
            }
            return invalidIndex;
        };
        ModalDialogInput.ResetMarkStateDialog = function (cs, ns) {
            switch (ns) {
                case Securso.MarkStateDialog.Show:
                    return Securso.MarkStateDialog.Show;
                case Securso.MarkStateDialog.Hide:
                    if (cs == Securso.MarkStateDialog.Unchanged)
                        return Securso.MarkStateDialog.Hide;
                    break;
                default:
                    break;
            }
            return cs;
        };
        ModalDialogInput.prototype.InputSet = function (index) {
            this.ModalDialogSetResetCommon(index, false);
        };
        ModalDialogInput.prototype.InputReset = function (index) {
            this.ModalDialogSetResetCommon(index, true);
        };
        ModalDialogInput.prototype.ModalDialogSetResetCommon = function (ind, reset) {
            var input;
            for (var x = 0, y = this._inp.length; x < y; x++) {
                if (ind < 0 || ind == x) {
                    input = this._inp[x];
                    if (reset) {
                        input.ValueReset();
                        continue;
                    }
                    var e = document.getElementById("variable-" + input.Variable.VarName);
                    if (e == null)
                        continue;
                    var s = e.getAttribute("data-value");
                    if (s == null)
                        continue;
                    input.ValueSet(s);
                }
            }
        };
        ModalDialogInput._s_msf = [];
        return ModalDialogInput;
    }(Securso.ModalDialog));
    Securso.ModalDialogInput = ModalDialogInput;
    function InputFocusOperation(e, name, index, op) {
        try {
            var d = Securso.ModalDialog.GetModalDialog(name);
            switch (op) {
                case FocusOperationType.Focus:
                    d.InputGetsFocus(index);
                    break;
                case FocusOperationType.Blur:
                    d.InputLoosesFocus(index);
                    break;
                default:
                    return;
            }
            e.preventDefault();
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.Error, "undexpected error", "ModalDialog.InputFocusOperation", err, [name, op.toString()], null);
        }
    }
    Securso.InputFocusOperation = InputFocusOperation;
    var FocusOperationType;
    (function (FocusOperationType) {
        FocusOperationType[FocusOperationType["Focus"] = 0] = "Focus";
        FocusOperationType[FocusOperationType["Blur"] = 1] = "Blur";
    })(FocusOperationType = Securso.FocusOperationType || (Securso.FocusOperationType = {}));
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var ModalDialogAjaxDetail = (function (_super) {
        __extends(ModalDialogAjaxDetail, _super);
        function ModalDialogAjaxDetail(name, json) {
            var _this = _super.call(this, name, json) || this;
            _this._bUrl = Securso.JsonPropString(json.baseUrl, "baseUrl", null);
            _this._dNone = Securso.JsonPropStringArray(json.displayNone, "displayNone", []);
            _this._dBlck = Securso.JsonPropStringArray(json.displayBlock, "displayBlock", []);
            return _this;
        }
        ModalDialogAjaxDetail.prototype.Show = function () {
            throw new Error("The 'Show' method is not allowed for the dialog, use 'ShowWithInfo' instead: " + this.Name);
        };
        ModalDialogAjaxDetail.prototype.ShowWithAjaxDetail = function (urlAppend) {
 
            var _this = this;
            var url = this._bUrl + urlAppend;
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.setRequestHeader("Accept", "text/html; charset=utf-8");
            req.onload = function () {
                try {
                    try {
                        _super.prototype.Show.call(_this);
                        if (req.status != 200)
                            throw new Error("Response http status code is not 200.");
                        var t = req.getResponseHeader("Content-Type");
                        if (t == null)
                            throw new Error("Response content type not specified");
                        if (t.indexOf("text/html") < 0)
                            throw new Error("Response content type is not 'text/html': " + t);
                        var n = _this.Name + 'Body';
                        var b = document.getElementById(n);
                        if (b == null)
                            throw new Error(n + ": html element does not exist.");
                        b.innerHTML = req.responseText;
                        for (var _i = 0, _a = _this._dBlck; _i < _a.length; _i++) {
                            var s = _a[_i];
                            var e = document.getElementById(s);
                            if (e != null)
                                e.style.display = "block";
                        }
                        for (var _b = 0, _c = _this._dNone; _b < _c.length; _b++) {
                            var s = _c[_b];
                            var e = document.getElementById(s);
                            if (e != null)
                                e.style.display = "none";
                        }
                    }
                    finally {
                        Securso.ModalDialog.HideWaitDialog();
                    }
                }
                catch (err) {
                    if (err instanceof Error)
                        Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "ModalDialogAjaxDetail.ShowWithAjaxDetail (onload)", err, [_this.Name, url, req.status.toString()], null);
                }
            };
            req.onerror = function () {
                Securso.ModalDialog.HideWaitDialog();
                Securso.Logger.LogMessage(Securso.RuntimeState.Error, "unexpected error", "ModalDialogAjaxDetail.ShowWithAjaxDetail (onerror)", [_this.Name, url, req.status.toString(), req.responseText], null);
            };
            req.send();
            Securso.ModalDialog.ShowWaitDialog();
        };
        return ModalDialogAjaxDetail;
    }(Securso.ModalDialog));
    Securso.ModalDialogAjaxDetail = ModalDialogAjaxDetail;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var ModalDialogFilter = (function (_super) {
        __extends(ModalDialogFilter, _super);
        function ModalDialogFilter(name, json) {
            var _this = _super.call(this, name, json) || this;
            _this._list = null;
            _this._prevElem = null;
            _this._ln = Securso.JsonPropString(json.list, "list", null);
            _this.AddFilterMainOp(json.reset, "reset", FilterMainOperationType.ResetAll);
            _this.AddFilterMainOp(json.apply, "apply", FilterMainOperationType.Apply);
            _this._prevElem = document.getElementById(_this.Name + "Prev");
            return _this;
        }
        ModalDialogFilter.prototype.CompleteSetup = function () {
            _super.prototype.CompleteSetup.call(this);
            this._list = Securso.List.GetListByName(this._ln);
        };
        ModalDialogFilter.prototype.AddFilterMainOp = function (val, nam, op) {
            if (val == undefined)
                throw new Error("Main filter form - '" + nam + "' property does not exist.");
            if (typeof val != 'string')
                throw new Error("Main filter form - '" + nam + "' property is not a string.");
            var e = document.getElementById(val);
            if (e == null)
                throw new Error("Main filter form - '" + nam + "' property is not an html element.");
            var n = this.Name;
            e.addEventListener("click", function (e) { FilterMainOperation(e, n, op); });
        };
        ModalDialogFilter.prototype.Show = function () {
            if (this._prevElem != null) {
                if (!this._list.IsFilterSelectionFromPreviousVisit)
                    this._prevElem.style.display = "none";
            }
            _super.prototype.Show.call(this);
        };
        ModalDialogFilter.prototype.Close = function () {
            if (this._prevElem != null)
                this._prevElem.style.display = "none";
            _super.prototype.Close.call(this);
        };
        Object.defineProperty(ModalDialogFilter.prototype, "HasFilterMain", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        ModalDialogFilter.prototype.FilterMain = function (op) {
            switch (op) {
                case FilterMainOperationType.Apply:
                    this._list.FilterList(false);
                    this._list.DisplayMessage();
                    this.Close();
                    break;
                case FilterMainOperationType.ResetAll:
                    this._list.ResetAll();
                    break;
                default:
                    return;
            }
        };
        return ModalDialogFilter;
    }(Securso.ModalDialog));
    Securso.ModalDialogFilter = ModalDialogFilter;
    function FilterMainOperation(e, name, op) {
        try {
            var d = Securso.ModalDialog.GetModalDialog(name);
            d.FilterMain(op);
            e.preventDefault();
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "ModalDialog.FilterMainOperation", err, [name, op.toString()], null);
        }
    }
    Securso.FilterMainOperation = FilterMainOperation;
    var FilterMainOperationType;
    (function (FilterMainOperationType) {
        FilterMainOperationType[FilterMainOperationType["Apply"] = 0] = "Apply";
        FilterMainOperationType[FilterMainOperationType["ResetAll"] = 1] = "ResetAll";
    })(FilterMainOperationType = Securso.FilterMainOperationType || (Securso.FilterMainOperationType = {}));
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var ModalDialogFilterCheckbox = (function (_super) {
        __extends(ModalDialogFilterCheckbox, _super);
        function ModalDialogFilterCheckbox(name, json) {
            var _this = _super.call(this, name, json) || this;
            _this._elm = [];
            _this._cid = [];
            _this._chk = [];
            _this._rst = [];
            _this._none = null;
            _this._zero = null;
            _this._list = null;
            _this._all = true;
            _this._prev = false;
            var n;
            var e;
            var c;
            var s;
            _this._ln = Securso.JsonPropString(json.list, "list", null);
            _this._keyn = json.key;
            _this._tagn = json.tag;
            if (_this._keyn == undefined) {
                if (_this._tagn == undefined)
                    throw new Error("Checkbox filter form does not specify a 'key' or 'tag' properties.");
                n = _this._tagn;
            }
            else {
                if (_this._tagn != undefined)
                    throw new Error("Checkbox filter form specifies both a 'key' and a 'tag' property.");
                n = _this._keyn;
            }
            c = 0;
            for (;;) {
                s = n + "-" + c.toString();
                e = document.getElementById(s);
                if (e == null) {
                    if (c == 0) {
                        c = 1;
                        continue;
                    }
                    if (c == 1) {
                        throw new Error("Checkbox filter form has no check boxes");
                    }
                    break;
                }
                var el = e;
                if (el == null)
                    throw new Error("Checkbox filter form - checkbox is not an input html element: " + s);
                if (el.tagName != "INPUT")
                    throw new Error("Checkbox filter form - checkbox tag name is not 'INPUT': " + s);
                var atr = el.getAttribute("type");
                if (atr == null)
                    throw new Error("Checkbox filter form - checkbox does not have a type attribute: " + s);
                if (atr != "checkbox")
                    throw new Error("Checkbox filter form - checkbox type attribute is not 'checkbox': " + s);
                el.checked = true;
                _this._elm.push(el);
                atr = el.getAttribute("value");
                if (atr == null)
                    throw new Error("Checkbox filter form - checkbox does not have a value attribute: " + s);
                var i = Securso.ConvertStringToInteger(atr);
                if (i == undefined)
                    throw new Error("Checkbox filter form - checkbox does not have a positive numeric value attribute: " + s);
                if (i < 0)
                    throw new Error("Checkbox filter form - checkbox does not have a positive numeric value attribute: " + s);
                _this._cid.push(i);
                _this._chk.push(true);
                _this._rst.push(true);
                c++;
            }
            _this._none = Securso.JsonPropHtmlElement(json.none, "none");
            _this._zero = Securso.JsonPropHtmlElement(json.zero, "zero");
            _this._show = Securso.JsonPropHtmlElement(json.showSel, "showSel");
            _this._s_all = json.sall;
            _this._s_fil = json.sfil;
            _this.AddFilterSelOp(json.set, "set", FilterSelectOperationType.Set);
            _this.AddFilterSelOp(json.apply, "apply", FilterSelectOperationType.Apply);
            _this.AddFilterSelOp(json.clear, "clear", FilterSelectOperationType.Clear);
            _this.AddFilterSelOp(json.reset, "reset", FilterSelectOperationType.Reset);
            for (;;) {
                try {
                    var v = localStorage.getItem(name);
                    if (v == null)
                        break;
                    var b = v.split(",");
                    if (b.length != _this._chk.length)
                        break;
                    c = 0;
                    var i = 0;
                    var a = true;
                    for (var _i = 0, b_1 = b; _i < b_1.length; _i++) {
                        var bs = b_1[_i];
                        if (bs == "1") {
                            _this._chk[i] = true;
                            c++;
                        }
                        else {
                            _this._chk[i] = false;
                            a = false;
                        }
                        i++;
                    }
                    if (c == 0) {
                        a = true;
                        for (i = 0; i < _this._chk.length; i++) {
                            _this._chk[i] = true;
                        }
                    }
                    if (a) {
                        _this._show.innerHTML = _this._s_all;
                        _this._all = true;
                        _this._prev = false;
                    }
                    else {
                        _this._show.innerHTML = _this._s_fil;
                        _this._all = false;
                        _this._prev = true;
                    }
                    break;
                }
                catch (_a) {
                    break;
                }
            }
            return _this;
        }
        ModalDialogFilterCheckbox.prototype.CompleteSetup = function () {
            _super.prototype.CompleteSetup.call(this);
            this._list = Securso.List.GetListByName(this._ln);
        };
        ModalDialogFilterCheckbox.prototype.AddFilterSelOp = function (val, nam, op) {
            if (val == undefined)
                return;
            if (typeof val != 'string')
                throw new Error("Checkbox filter form - '" + nam + "' property is not a string.");
            var e = document.getElementById(val);
            if (e == null)
                throw new Error("Checkbox filter form - '" + nam + "' property is not an html element.");
            var n = this.Name;
            e.addEventListener("click", function (e) { FilterSelectOperation(e, n, op); });
        };
        Object.defineProperty(ModalDialogFilterCheckbox.prototype, "IsFilterSelectionFromPreviousVisit", {
            get: function () {
                var b = this._prev;
                this._prev = false;
                return b;
            },
            enumerable: false,
            configurable: true
        });
        ModalDialogFilterCheckbox.prototype.Show = function () {
            this._none.style.display = "none";
            this._zero.style.display = "none";
            var i;
            var l = this._chk.length;
            for (i = 0; i < l; i++) {
                var b = this._chk[i];
                this._rst[i] = b;
                this._elm[i].checked = b;
            }
            _super.prototype.Show.call(this);
        };
        ModalDialogFilterCheckbox.prototype.Close = function () {
            var i;
            var l = this._chk.length;
            this.FilterSelect(FilterSelectOperationType.Reset);
            if (this._all)
                this._show.innerHTML = this._s_all;
            else
                this._show.innerHTML = this._s_fil;
            _super.prototype.Close.call(this);
        };
        Object.defineProperty(ModalDialogFilterCheckbox.prototype, "HasFilterSelect", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        ModalDialogFilterCheckbox.prototype.FilterSelect = function (op) {
            var b;
            var i;
            var l = this._chk.length;
            var s;
            var ls;
            switch (op) {
                case FilterSelectOperationType.Clear:
                    for (i = 0; i < l; i++) {
                        this._chk[i] = false;
                        this._elm[i].checked = false;
                    }
                    this._all = false;
                    break;
                case FilterSelectOperationType.Set:
                    for (i = 0; i < l; i++) {
                        this._chk[i] = true;
                        this._elm[i].checked = true;
                    }
                    this._all = true;
                    break;
                case FilterSelectOperationType.Reset:
                    this._all = true;
                    for (i = 0; i < l; i++) {
                        b = this._rst[i];
                        this._chk[i] = b;
                        this._elm[i].checked = b;
                        if (!b)
                            this._all = false;
                    }
                    break;
                case FilterSelectOperationType.ResetFull:
                    ls = [];
                    for (i = 0; i < l; i++) {
                        ls.push("1");
                        this._chk[i] = true;
                        this._rst[i] = true;
                        this._elm[i].checked = true;
                    }
                    this._all = true;
                    this._show.innerText = this._s_all;
                    try {
                        var s_1 = ls.join(",");
                        localStorage.setItem(this.Name, s_1);
                    }
                    catch (_a) {
                    }
                    break;
                case FilterSelectOperationType.Apply:
                    var c = 0;
                    ls = [];
                    this._all = true;
                    for (i = 0; i < l; i++) {
                        if (this._elm[i].checked) {
                            ls.push("1");
                            this._chk[i] = true;
                            c++;
                        }
                        else {
                            ls.push("0");
                            this._chk[i] = false;
                            this._all = false;
                        }
                    }
                    if (c == 0) {
                        this._none.style.display = "block";
                        return;
                    }
                    this._none.style.display = "none";
                    if (this._list.FilterList(true) == 0) {
                        this._zero.style.display = "block";
                        return;
                    }
                    this._zero.style.display = "none";
                    if (this._all)
                        this._show.innerHTML = this._s_all;
                    else
                        this._show.innerHTML = this._s_fil;
                    try {
                        var s_2 = ls.join(",");
                        localStorage.setItem(this.Name, s_2);
                    }
                    catch (_b) {
                    }
                    _super.prototype.Close.call(this);
                    break;
                default:
                    return;
            }
        };
        ModalDialogFilterCheckbox.prototype.IsKeyValueFiltered = function (value) {
            if (this._keyn == null)
                throw new Error(this.Name + ": the filter is not a key filter.");
            if (this._all)
                return true;
            var i;
            var l = this._chk.length;
            for (i = 0; i < l; i++) {
                if (this._cid[i] == value)
                    return this._chk[i];
            }
            return false;
        };
        ModalDialogFilterCheckbox.prototype.IsTagValueFiltered = function (values) {
            if (this._tagn == null)
                throw new Error(this.Name + ": the filter is not a tag filter.");
            if (this._all)
                return true;
            var b = false;
            var i;
            var l = this._chk.length;
            var i2;
            var l2 = values.length;
            for (i2 = 0; i2 < l2; i2++) {
                var v = values[i2];
                for (i = 0; i < l; i++) {
                    if (this._cid[i] == v) {
                        if (this._chk[i]) {
                            b = true;
                            break;
                        }
                    }
                }
                if (b)
                    break;
            }
            return b;
        };
        return ModalDialogFilterCheckbox;
    }(Securso.ModalDialog));
    Securso.ModalDialogFilterCheckbox = ModalDialogFilterCheckbox;
    function FilterSelectOperation(e, name, op) {
        try {
            var d = Securso.ModalDialog.GetModalDialog(name);
            d.FilterSelect(op);
            e.preventDefault();
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "ModalDialogFilterCheckbox.FilterSelectOperation", err, [name, op.toString()], null);
        }
    }
    Securso.FilterSelectOperation = FilterSelectOperation;
    var FilterSelectOperationType;
    (function (FilterSelectOperationType) {
        FilterSelectOperationType[FilterSelectOperationType["Apply"] = 0] = "Apply";
        FilterSelectOperationType[FilterSelectOperationType["Set"] = 1] = "Set";
        FilterSelectOperationType[FilterSelectOperationType["Clear"] = 2] = "Clear";
        FilterSelectOperationType[FilterSelectOperationType["Reset"] = 3] = "Reset";
        FilterSelectOperationType[FilterSelectOperationType["ResetFull"] = 4] = "ResetFull";
    })(FilterSelectOperationType = Securso.FilterSelectOperationType || (Securso.FilterSelectOperationType = {}));
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var ModalDialogMessage = (function (_super) {
        __extends(ModalDialogMessage, _super);
        function ModalDialogMessage(name, json) {
            return _super.call(this, name, json) || this;
        }
        return ModalDialogMessage;
    }(Securso.ModalDialog));
    Securso.ModalDialogMessage = ModalDialogMessage;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var ModalDialogSubmit = (function (_super) {
        __extends(ModalDialogSubmit, _super);
        function ModalDialogSubmit(name, json) {
            var _this = _super.call(this, name, json) || this;
            var e = Securso.GetHTMLElement(name + "Submit");
            _this._url = json.submitUrl;
            _this._suc = json.submitSuccessDialog;
            {
                var n_11 = name;
                e.addEventListener("click", function (e) { Securso.DialogOperation(e, n_11, Securso.DialogOperationType.Submit); });
            }
            return _this;
        }
        ModalDialogSubmit.prototype.Show = function () {
            _super.prototype.ShowInputs.call(this);
            _super.prototype.Show.call(this);
            _super.prototype.SetFocus.call(this, 0);
        };
        Object.defineProperty(ModalDialogSubmit.prototype, "HasSubmit", {
            get: function () {
                return true;
            },
            enumerable: false,
            configurable: true
        });
        ModalDialogSubmit.prototype.Submit = function () {
            var _this = this;
            if (!_super.prototype.ButtonClickValidateInput.call(this))
                return;
            var req = new XMLHttpRequest();
            req.open('POST', this._url, true);
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Accept", "application/json; charset=utf-8");
            req.onload = function () {
                var aid = null;
                try {
                    try {
                        if (req.status != 200)
                            throw new Error(_this.Name + ": http status code is not 200.");
                        var s = req.getResponseHeader("Content-Type");
                        if (s == null)
                            throw new Error(_this.Name + ": response content type not specified.");
                        if (s.indexOf("application/json") < 0)
                            throw new Error(_this.Name + ": response content type not 'application/json; type.");
                        var j = JSON.parse(req.responseText);
                        if (typeof j.aid == "string")
                            aid = j.aid;
                        switch (j.result) {
                            case "input-invalid": {
                                var i = _this.ButtonClickAjaxReplyInvalidData(j);
                                _this.SetFocus(i);
                                return;
                            }
                            case "success": {
                                _this.Close();
                                Securso.ModalDialog.GetModalDialog(_this._suc).Show();
                                return;
                            }
                            default: {
                                throw new Error(_this.Name + ": response orinvalid or not implemented.");
                            }
                        }
                    }
                    finally {
                        Securso.ModalDialog.HideWaitDialog();
                    }
                }
                catch (err) {
                    if (err instanceof Error)
                        Securso.Logger.LogError(Securso.RuntimeState.Error, "unexpected error", "ModalDialogSubmit.Submit (onload)", err, [_this.Name, _this._url, req.status.toString(), req.responseText], aid);
                }
            };
            req.onerror = function () {
                Securso.ModalDialog.HideWaitDialog();
                Securso.Logger.LogMessage(Securso.RuntimeState.Error, "unexpected error", "ModalDialogSubmit.Submit (onerror)", [_this.Name, _this._url, req.status.toString(), req.responseText], null);
            };
            req.send(this.ButtonClickInputAsJson());
            Securso.ModalDialog.ShowWaitDialog();
        };
        return ModalDialogSubmit;
    }(Securso.ModalDialogInput));
    Securso.ModalDialogSubmit = ModalDialogSubmit;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    function SetupMoreOrLessSwitchInline() {
        var el;
        var i;
        var h;
        var s;
        var nm = "";
        var nms;
        try {
            el = document.getElementById("more-less-inline-ids");
            if (el == null)
                return;
            s = el.getAttribute("data-ids");
            if (s == null)
                throw new Error("The 'data-ids' attribute does not exist on the 'more-less-inline-ids' html element.");
            nms = s.split(";");
            var _loop_4 = function () {
                nm = nms[i].trim();
                if (nm.length == 0)
                    return "continue";
                if (nm[0] == "-") {
                    h = true;
                    nm = nm.substring(1);
                }
                else {
                    h = false;
                    if (nm[0] == "+")
                        nm = nm.substring(1);
                }
                var et = document.getElementById(nm + "-text");
                if (et == null)
                    throw new Error("The '-text' element does not exist for a more/less element.");
                var em = document.getElementById(nm + "-more");
                if (em == null)
                    throw new Error("The '-more' element does not exist for a more/less element.");
                var el_2 = document.getElementById(nm + "-less");
                if (el_2 == null)
                    throw new Error("The '-less' element does not exist for a more/less element.");
                if (h) {
                    et.style.display = "none";
                    em.style.display = "inline";
                }
                else {
                    et.style.display = "block";
                    em.style.display = "none";
                }
                var emv = em;
                var etv = et;
                em.addEventListener("click", function (e) { ShowMoreClicked(e, emv, etv); });
                em.addEventListener("click", function (e) { ShowLessClicked(e, emv, etv); });
            };
            for (i = 0; i < nms.length; i++) {
                _loop_4();
            }
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "SetupMoreOrLessSwitchInline", err, nm, null);
        }
    }
    Securso.SetupMoreOrLessSwitchInline = SetupMoreOrLessSwitchInline;
    function ShowMoreClicked(ev, ec, et) {
        try {
            ec.style.display = "none";
            et.style.display = "block";
            ev.preventDefault();
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "ShowMoreClicked", err, ec.id, null);
        }
    }
    function ShowLessClicked(ev, ec, et) {
        try {
            ec.style.display = "inline";
            et.style.display = "none";
            ev.preventDefault();
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "ShowLessClicked", err, ec.id, null);
        }
    }
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var pllf;
    function LazyLoadJavaScriptFunctionality(json, preLazyLoadProcessing, postLazyLoadProcessing) {
        try {
            if (preLazyLoadProcessing != null)
                preLazyLoadProcessing();
            if (json == null || json.length == 0) {
                if (postLazyLoadProcessing != null)
                    postLazyLoadProcessing();
                return;
            }
            pllf = postLazyLoadProcessing;
            var req_2 = new XMLHttpRequest();
            req_2.open('GET', json, true);
            req_2.setRequestHeader("Accept", "application/json; charset=utf-8");
            req_2.onload = function () {
                try {
                    if (req_2.status != 200)
                        throw new Error("Http status code is not 200.");
                    var t = req_2.getResponseHeader("Content-Type");
                    if (t == null)
                        throw new Error("Content type not specified");
                    if (t.indexOf("application/json") < 0)
                        throw new Error("Content type is not 'application/json': " + t);
                    var json_1 = JSON.parse(req_2.responseText);
                    var ws = void 0;
                    if (json_1.webSite == undefined)
                        ws = "undefined";
                    else
                        ws = json_1.webSite;
                    Securso.Logger.Site = ws;
                    Securso.Variable.Create(json_1);
                    Securso.ModalDialog.Create(json_1);
                    Securso.List.Create(json_1);
                    if (pllf != null) {
                        pllf();
                        pllf = null;
                    }
                    if (Securso.Logger.State != Securso.RuntimeState.ErrorInit)
                        Securso.ModalDialog.Complete(json_1);
                    if (Securso.Logger.State != Securso.RuntimeState.ErrorInit)
                        Securso.List.Complete();
                }
                catch (err) {
                    if (err instanceof Error)
                        Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "LazyLoadJavaScriptFunctionality (onload)", err, [req_2.status.toString(), req_2.responseURL], null);
                }
                return;
            };
            req_2.onerror = function () {
                Securso.Logger.LogMessage(Securso.RuntimeState.ErrorInit, "unexpected error", "LazyLoadJavaScriptFunctionality (onerror)", [req_2.status.toString(), req_2.responseURL, req_2.responseText], null);
                return;
            };
            req_2.send();
        }
        catch (err) {
            if (err instanceof Error)
                Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "LazyLoadJavaScriptFunctionality", err, json, null);
        }
    }
    Securso.LazyLoadJavaScriptFunctionality = LazyLoadJavaScriptFunctionality;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var _regInt = new RegExp("^[+,-]?[0-9]+$");
    function ConvertStringToInteger(value) {
        if (value.length == 0)
            return 0;
        if (value == "+")
            return 0;
        if (value == "-")
            return 0;
        if (!_regInt.test(value))
            return undefined;
        var i = parseInt(value, 10);
        if (isNaN(i))
            return undefined;
        return i;
    }
    Securso.ConvertStringToInteger = ConvertStringToInteger;
    var _regEmailAdd = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$", "\i");
    function ValidateEmailAddress(value) {
        if (!_regEmailAdd.test(value))
            return false;
        return true;
    }
    Securso.ValidateEmailAddress = ValidateEmailAddress;
    function GetHTMLElement(id) {
        var e = document.getElementById(id);
        if (e == null)
            throw new Error("The html element '" + id + "' does not exist.");
        return e;
    }
    Securso.GetHTMLElement = GetHTMLElement;
    function JsonPropString(val, nam, def) {
        if (val == undefined) {
            if (def == null)
                throw new Error("The json does not specify a '" + nam + "' property.");
            return def;
        }
        if (typeof val != 'string')
            throw new Error("The json property '" + nam + "' must be a string.");
        return val;
    }
    Securso.JsonPropString = JsonPropString;
    function JsonPropBoolean(val, nam, def) {
        if (val == undefined) {
            if (def == null)
                throw new Error("The json does not specify a '" + nam + "' property.");
            return def;
        }
        if (typeof val != 'boolean')
            throw new Error("The json property '" + nam + "' must be a boolean.");
        return val;
    }
    Securso.JsonPropBoolean = JsonPropBoolean;
    function JsonPropNumber(val, nam, def) {
        if (val == undefined) {
            if (def == null)
                throw new Error("The json does not specify a '" + nam + "' property.");
            return def;
        }
        if (typeof val != 'number')
            throw new Error("The json property '" + nam + "' must be a number.");
        return val;
    }
    Securso.JsonPropNumber = JsonPropNumber;
    function JsonPropHtmlElement(val, nam) {
        if (val == undefined)
            throw new Error("The json does not specify a '" + nam + "' property.");
        if (typeof val != 'string')
            throw new Error("The json property '" + nam + "' must be a string.");
        var e = document.getElementById(val);
        if (e == null)
            throw new Error("The json property '" + nam + "' must specify an html element.");
        return e;
    }
    Securso.JsonPropHtmlElement = JsonPropHtmlElement;
    function JsonPropStringArray(val, nam, def) {
        if (val == undefined) {
            if (def == null)
                throw new Error("The json does not specify a '" + nam + "' property.");
            return def;
        }
        return val;
    }
    Securso.JsonPropStringArray = JsonPropStringArray;
    function JsonPropNumberArray(val, nam, def) {
        if (val == undefined) {
            if (def == null)
                throw new Error("The json does not specify a '" + nam + "' property.");
            return def;
        }
        return val;
    }
    Securso.JsonPropNumberArray = JsonPropNumberArray;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var VariableBoolean = (function (_super) {
        __extends(VariableBoolean, _super);
        function VariableBoolean(n, j) {
            var _this = _super.call(this, Securso.DataType.Boolean, Securso.VariableType.CheckBox, n, j) || this;
            _this.EndConstructor();
            return _this;
        }
        VariableBoolean.CreateInstance = function (name, json) {
            try {
                Securso.Variable.AddVar(new VariableBoolean(name, json));
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "VariableBoolean.Create", err, name, null);
            }
        };
        return VariableBoolean;
    }(Securso.Variable));
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var VariableDropDownList = (function (_super) {
        __extends(VariableDropDownList, _super);
        function VariableDropDownList(n, j) {
            var _this = _super.call(this, Securso.DataType.Integer, Securso.VariableType.DropDownListOption, n, j) || this;
            _this._vals = Securso.JsonPropNumberArray(j, "values", null);
            if (_this._vals.length == 0)
                throw new Error("At least one list value must be specified.");
            _this.ValidateInherited();
            _this.EndConstructor();
            return _this;
        }
        VariableDropDownList.CreateInstance = function (name, json) {
            try {
                Securso.Variable.AddVar(new VariableDropDownList(name, json));
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "VariableDropDownList.Create", err, name, null);
            }
        };
        VariableDropDownList.prototype.ValidateInherited = function () {
            var i = this.ValueInteger;
            for (var _i = 0, _a = this._vals; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v == i)
                    return true;
            }
            throw new Error("The drop down list option is invalid: " + this.VarName);
        };
        return VariableDropDownList;
    }(Securso.Variable));
    Securso.VariableDropDownList = VariableDropDownList;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var VariableEmailAddress = (function (_super) {
        __extends(VariableEmailAddress, _super);
        function VariableEmailAddress(n, j) {
            var _this = _super.call(this, Securso.DataType.String, Securso.VariableType.EmailAddress, n, j) || this;
            _this.EndConstructor();
            return _this;
        }
        VariableEmailAddress.CreateInstance = function (name, json) {
            try {
                Securso.Variable.AddVar(new VariableEmailAddress(name, json));
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "VariableEmailAddress.Create", err, name, null);
            }
        };
        Object.defineProperty(VariableEmailAddress.prototype, "EmailAddress", {
            get: function () {
                return this.Value;
            },
            enumerable: false,
            configurable: true
        });
        return VariableEmailAddress;
    }(Securso.Variable));
    Securso.VariableEmailAddress = VariableEmailAddress;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var VariableMessage = (function (_super) {
        __extends(VariableMessage, _super);
        function VariableMessage(n, j) {
            var _this = _super.call(this, Securso.DataType.String, Securso.VariableType.Message, n, j) || this;
            _this.EndConstructor();
            return _this;
        }
        VariableMessage.CreateInstance = function (name, json) {
            try {
                Securso.Variable.AddVar(new VariableMessage(name, json));
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "VariableMessage.Create", err, name, null);
            }
        };
        Object.defineProperty(VariableMessage.prototype, "Message", {
            get: function () {
                return this.Value;
            },
            enumerable: false,
            configurable: true
        });
        return VariableMessage;
    }(Securso.Variable));
    Securso.VariableMessage = VariableMessage;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var VariableName = (function (_super) {
        __extends(VariableName, _super);
        function VariableName(n, j) {
            var _this = _super.call(this, Securso.DataType.String, Securso.VariableType.Name, n, j) || this;
            _this.EndConstructor();
            return _this;
        }
        VariableName.CreateInstance = function (name, json) {
            try {
                Securso.Variable.AddVar(new VariableName(name, json));
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "VariableName.Create", err, name, null);
            }
        };
        Object.defineProperty(VariableName.prototype, "Name", {
            get: function () {
                return this.Value;
            },
            enumerable: false,
            configurable: true
        });
        return VariableName;
    }(Securso.Variable));
    Securso.VariableName = VariableName;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var VariablePhoneNumber = (function (_super) {
        __extends(VariablePhoneNumber, _super);
        function VariablePhoneNumber(n, j) {
            var _this = _super.call(this, Securso.DataType.String, Securso.VariableType.PhoneNumber, n, j) || this;
            _this.EndConstructor();
            return _this;
        }
        VariablePhoneNumber.CreateInstance = function (name, json) {
            try {
                Securso.Variable.AddVar(new VariablePhoneNumber(name, json));
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "VariablePhoneNumber.Create", err, name, null);
            }
        };
        Object.defineProperty(VariablePhoneNumber.prototype, "PhoneNumber", {
            get: function () {
                return this.Value;
            },
            enumerable: false,
            configurable: true
        });
        return VariablePhoneNumber;
    }(Securso.Variable));
    Securso.VariablePhoneNumber = VariablePhoneNumber;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var VariableRadioButton = (function (_super) {
        __extends(VariableRadioButton, _super);
        function VariableRadioButton(n, j) {
            var _this = _super.call(this, Securso.DataType.Integer, Securso.VariableType.RadioButton, n, j) || this;
            _this._cnt = Securso.JsonPropNumber(j, "buttonCount", null);
            if (_this._cnt < 2)
                throw new Error("Min number of radio buttons is 2.");
            if (_this._cnt > 99)
                throw new Error("Max number of radio buttons is 99.");
            _this.ValidateInherited();
            _this.EndConstructor();
            return _this;
        }
        VariableRadioButton.CreateInstance = function (name, json) {
            try {
                Securso.Variable.AddVar(new VariableRadioButton(name, json));
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "VariableRadioButton.Create", err, name, null);
            }
        };
        Object.defineProperty(VariableRadioButton.prototype, "RadioButton", {
            get: function () {
                return this.ValueInteger;
            },
            enumerable: false,
            configurable: true
        });
        VariableRadioButton.prototype.ValidateInherited = function () {
            var i = this.ValueInteger;
            if (i >= 0 && i < this._cnt)
                return true;
            this.SetState(Securso.varInvalid);
            return false;
        };
        return VariableRadioButton;
    }(Securso.Variable));
    Securso.VariableRadioButton = VariableRadioButton;
})(Securso || (Securso = {}));
var Securso;
(function (Securso) {
    var VariableSubject = (function (_super) {
        __extends(VariableSubject, _super);
        function VariableSubject(n, j) {
            var _this = _super.call(this, Securso.DataType.String, Securso.VariableType.Subject, n, j) || this;
            _this.EndConstructor();
            return _this;
        }
        VariableSubject.CreateInstance = function (name, json) {
            try {
                Securso.Variable.AddVar(new VariableSubject(name, json));
            }
            catch (err) {
                if (err instanceof Error)
                    Securso.Logger.LogError(Securso.RuntimeState.ErrorInit, "unexpected error", "VariableSubject.Create", err, name, null);
            }
        };
        Object.defineProperty(VariableSubject.prototype, "Subject", {
            get: function () {
                return this.Value;
            },
            enumerable: false,
            configurable: true
        });
        return VariableSubject;
    }(Securso.Variable));
    Securso.VariableSubject = VariableSubject;
})(Securso || (Securso = {}));
var WebsiteUlverstonFallen;
(function (WebsiteUlverstonFallen) {
    function AddDocumentLoadCompleteProcessing(dialogsJsonFile) {
        window.addEventListener('load', function () {
            Securso.LazyLoadJavaScriptFunctionality(dialogsJsonFile, PreLazyLoadProcessing, PostLazyLoadProcessing);
        });
    }
    WebsiteUlverstonFallen.AddDocumentLoadCompleteProcessing = AddDocumentLoadCompleteProcessing;
    function PreLazyLoadProcessing() {
        Securso.ModalDialogInput.SetMarkStateFunctions([["contact", MarkInputStateContact]]);
    }
    function MarkInputStateContact(input, callType) {
        var valid = input.Variable.Valid;
        var showBorderShadow = false;
        var state = Securso.MarkStateDialog.Unchanged;
        switch (callType) {
            case Securso.MarkStateCallType.ShowDialogFirst:
                valid = true;
                input.HideError();
                state = Securso.MarkStateDialog.Hide;
                break;
            case Securso.MarkStateCallType.Submit:
            case Securso.MarkStateCallType.Filter:
            case Securso.MarkStateCallType.AjaxCallReply:
            case Securso.MarkStateCallType.ShowDialogSubsequent:
                input.ShowError();
                if (valid)
                    state = Securso.MarkStateDialog.Hide;
                else
                    state = Securso.MarkStateDialog.Show;
                break;
            case Securso.MarkStateCallType.FocusGet:
                if (input.InitialFocus)
                    valid = true;
                showBorderShadow = true;
                break;
            case Securso.MarkStateCallType.FocusBlur:
                break;
            default: {
                throw new Error("The 'MarkInputFieldState' method was called with an invalid or not implemented value for the call type; " + input.Variable.VarName);
            }
        }
        var element = input.HtmlElement;
        if (valid) {
            element.style.border = "1px solid rgb(41, 112, 74)";
            element.style.color = "rgb(73, 80, 87)";
            element.style.fontWeight = "normal";
        }
        else {
            element.style.border = "1px solid darkred";
            element.style.color = "darkred";
            element.style.fontWeight = "normal";
        }
        if (showBorderShadow) {
            if (valid)
                element.style.boxShadow = "0 0 0.3em 0.30em rgba(41, 112, 74, 0.35)";
            else
                element.style.boxShadow = "0 0 0.3em 0.30em rgba(139, 0, 0, 0.35)";
        }
        else {
            element.style.boxShadow = "none";
        }
        return state;
    }
    function PostLazyLoadProcessing() {
        var e;
        Securso.List.InitialDisplay();
        var lsec = document.getElementById("securso-list");
        if (lsec == null)
            return;
        var s = lsec.getAttribute("data-list");
        if (s == null)
            throw Error("The 'securso-list' html element does not have the 'data-list' attribute.");
        var list = Securso.List.GetListByName(s);
        s = lsec.getAttribute("data-type");
        if (s == null)
            throw Error("The 'securso-list' html element does not have the 'data-type' attribute.");
        switch (s) {
            case "single-page":
                if (Securso.List.IsExternal)
                    throw Error("The 'securso-list' html element specifies a data-type 'single-page', the list must not be external.");
                s = lsec.getAttribute("data-id");
                if (s == null)
                    throw Error("The 'securso-list' html element does not have the 'data-id' attribute for a 'single-page' list.");
                var i = Securso.ConvertStringToInteger(s);
                if (i == undefined)
                    throw Error("The 'securso-list' html element has a non-numeric value for the 'data-id'.");
                list.SetCurrentById(i);
                e = document.getElementById('filterButtons');
                if (e == null)
                    throw Error("The 'filterButtons' HTML element is missing.");
                e.style.top = (window.innerHeight - e.clientHeight).toString() + 'px';
                e.style.width = e.offsetWidth.toString() + 'px';
                e.style.visibility = "visible";
                fdlProcessing();
                window.addEventListener('resize', FilterListResized, true);
                break;
            case "external":
                if (!Securso.List.IsExternal)
                    throw Error("The 'securso-list' html element specifies a data-type 'single-page', the list must be external.");
                e = document.getElementById('filterButtons');
                if (e == null)
                    throw Error("The 'filterButtons' HTML element is missing.");
                e.style.top = (window.innerHeight - e.clientHeight).toString() + 'px';
                e.style.width = e.offsetWidth.toString() + 'px';
                e.style.visibility = "visible";
                fdlProcessing();
                window.addEventListener('resize', FilterListResized, true);
                break;
            default:
                throw Error("The 'securso-list' html element 'data-type' attribute is not implemented/invalid.");
        }
        s = window.location.href;
        if (s.indexOf('?applyFilter') >= 0) {
            list.FilterList(false);
        }
        if (s.indexOf('world-war-one/map-of-fallen') >= 0) {
            var bmhd = void 0;
            try {
                bmhd = localStorage.getItem('mapHelpDisplayed');
            }
            catch (_a) {
                bmhd = null;
            }
            if (bmhd == null) {
                var ls = Securso.ModalDialog.GetModalDialog('MapHelp');
                if (ls != null) {
                    ls.Show();
                }
                try {
                    localStorage.setItem('mapHelpDisplayed', "1");
                }
                catch (_b) {
                }
            }
        }
        list.DisplayMessage();
        return;
    }
    function FilterListResized() {
        var e = document.getElementById('filterButtons');
        e.style.top = (window.innerHeight - e.clientHeight).toString() + 'px';
        e.style.width = e.offsetWidth.toString() + 'px';
        fdlProcessing();
    }
    function fdlProcessing() {
        var e = document.getElementById('fallenDetailList');
        if (e != null) {
            var s = e.getAttribute("data-list-width");
            if (s == null)
                throw Error("The 'fallenDetailList' html element attribute 'data-list-width' does not exist.");
            var i = Securso.ConvertStringToInteger(s);
            if (i == undefined)
                throw Error("The 'fallenDetailList' html element attribute 'data-list-width' is not an integer.");
            e.style.zIndex = "8999";
            if (window.innerWidth >= i) {
                e.style.display = 'none';
                e = document.getElementById('fallenDetailDet');
                if (e != null)
                    e.style.display = 'block';
            }
            else {
                e.onclick = FilterListClicked;
                e.style.display = 'block';
            }
        }
        e = document.getElementById('fallenDetailShow');
        if (e != null) {
            e.style.zIndex = "8999";
        }
    }
    function FilterListClicked() {
        var e = document.getElementById('fallenDetailDet');
        if (e != null) {
            e.style.display = 'none';
            document.location.href = "#BeforeHeaderMenu";
        }
    }
})(WebsiteUlverstonFallen || (WebsiteUlverstonFallen = {}));
