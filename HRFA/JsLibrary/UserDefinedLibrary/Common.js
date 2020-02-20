FilteredJson = function (jsonData) {
    var data = [];

    for (var i in jsonData) {

        if (jsonData[i].Action == "A" || jsonData[i].Action == "E") {
            data.push(jsonData[i]);
        }
    }
    return data;
};


waitMsg = function (title) {
    
    title = title == "" ? "Please Wait" : title;
    title += " ...";

    $("#loaderTitle").text(title);
}

waitMsg.show = function () {

    $("#outerLoader").show();
    $("#loader").show();
}

waitMsg.hide = function () {

    $("#outerLoader").hide();
    $("#loader").hide();
}

//----------------------------------------------------------------------------
//NB:function that allows only numbers[0-9] and dot in a textbox
//----------------------------------------------------------------------------
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    } else {
        return true;
    }
};


//----------------------------------------------------------------------------
// NB: Validate if User exits
//----------------------------------------------------------------------------

ValidateSession = function () {
    $.ajax({
        dataType: "json",
        cache: false,
        async: false,
        url: '/Handlers/SECURITY/LoginHandler.ashx',
        data: { 'method': 'ValidateUser' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (!result.IsSucess) {
                window.location = "/Modules/SECURITY/Login.aspx";
            }
            else {
                var values = result.Message.split('.');
                var user = values[0];
                var offcode = values[1];
               // alert(user);
                $("#user").text(user);
                $("#offcode").text(offcode)
                console.log('offcodes by shanjeev', user + offcode);
                $("#token").text(result.Token);

            }
        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE", null, ClearSession);

        }
    });
}

PortalValidateSession = function () {
    $.ajax({
        dataType: "json",
        cache: false,
        async: false,
        url: '/Handlers/SECURITY/LoginHandler.ashx',
        data: { 'method': 'ValidatePortal' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (!result.IsSucess) {
                window.location = "/Modules/COMMON/PortalLogin.aspx";
            }
            else {
                $("#token").val(result.Token);
                var msg = result.Message.split(',');
                $("#user").text(msg[0]);
                $("#BFIID").text(msg[1]);                
                // $("#ssid").text(msg[2]);
            }
        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE", null, ClearSession);

        }
    })
}




ClearSession = function () {
    $.ajax({
        dataType: "json",
        cache: false,
        async: false,
        url: '/Handlers/SECURITY/LoginHandler.ashx', 

        data: { 'method': 'ClearSession' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.IsSucess) {
                window.location = "/Modules/SECURITY/Login.aspx";
            }
            else {
                window.location = "/Modules/SECURITY/Login.aspx";
            }
        },
        error: function (err) {
            // msg(err.status + " - " + err.statusText, "WARNING");
        }
    });
}



ClearSessionPortal = function () {
    $.ajax({
        dataType: "json",
        cache: false,
        async: false,
        url: '/Handlers/COMMON/PortalLoginHandler.ashx',
        data: { 'method': 'PortalSignOut' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (result.IsSucess) {
                window.location = "/PortalHome.aspx";
            }

            else {
                window.location = "/PortalHome.aspx";
            }
        },
        error: function (err) {
        }
    });
}


//----------------------------------------------------------------------------
//NB:function to Validate Nepali  Date
//----------------------------------------------------------------------------
function valNepDate(date) {
    var errDate = "";
    var dateElement = date.split(".");

    if (dateElement.length == 3) {
        day = dateElement[2];
        month = dateElement[1];
        year = dateElement[0];

        if ((isNaN(year) === true))
            errDate = "Enter numeric for year(YYYY.MM.DD)";
        else if (isNaN(month) === true)
            errDate = "Enter numeric for month(YYYY.MM.DD)";
        else if (isNaN(day) === true)
            errDate = "Enter numeric for day(YYYY.MM.DD)";
        else if (year.length !== 4)
            errDate = "Enter year of four characters (YYYY.MM.DD)";
        else if (month.length !== 2)
            errDate = "Enter month of two characters (YYYY.MM.DD)";
        else if (day.length !== 2)
            errDate = "Enter day of two characters (YYYY.MM.DD)";
        else if (month < 1 || month > 12)
            errDate = "Enter month between 1 to 12 ";
        else if (day < 1 || day > 32)
            errDate = " Enter day between 1 to 32";
    }
    else
        errDate = "Enter date in YYYY.MM.DD format";


    return errDate;

}

valFutureDate = function (obj, futureDate, focus) {
    var nepDate = obj.value;
    var errDate = "";
    var data = "";
    var callback = null;

    if (nepDate == "") {
        return true;
    }

    if (focus) {
        callback = function () {
            obj.focus();
        }
    }

    errDate = valNepDate(nepDate);

    if (errDate == "") {
        //        data = { 'method': 'ValidateNepDate', nepDate: nepDate, futureDate: futureDate };

        //        $.ajax({
        //            dataType: "json",
        //            cache: false,
        //            url: '../Handlers/Common/DateHandler.ashx',
        //            data: data,
        //            contentType: "application/json; charset=utf-8",
        //            async: false,
        //            success: function (result) {

        //                if (!result.IsSucess) {

        //                    errDate = result.message;
        //                }

        //            },
        //            error: function (err) {
        //                msg(err.status + " - " + err.statusText, "FAILURE");

        //            }
        //        });

    }


    if (errDate != "") {
        msg(errDate, "WARNING", "Warning", callback);

        return false;
    }
    else {
        return true;
    }
}


//----------------------------------------------------------------------------
//NB:functions to get Current Nepali Date
//----------------------------------------------------------------------------
function GetNepaliDate(callback) {
    var nepaliDate = '';

    $.ajax({
        dataType: "json",
        cache: false,
        async: false,
        url: '/Handlers/COMMON/DateHandler.ashx',
        data: { 'method': 'GetDates' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result.IsSucess) {

                var nepDate = getNumUnicode(result.ResponseData.NepaliDate);
                
                $("#currNepDate").text(nepDate);
            }
        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE", null, ClearSession);

        }
    });


}


//----------------------------------------------------------------------------
//NB:functions to Convert english to unicode
//----------------------------------------------------------------------------

function getNumUnicode(val) {

    var newVal = "";
    for (i = 0; i < val.length; i++) {
        newVal += unicode(val.charAt(i));

    }

    return newVal;
}

function unicode(val) {
    var text = val.replace("0", "०");
    text = text.replace("1", "१");
    text = text.replace("2", "२");
    text = text.replace("3", "३");
    text = text.replace("4", "४");
    text = text.replace("5", "५");
    text = text.replace("6", "६ ");
    text = text.replace("7", "७");
    text = text.replace("8", "८");
    text = text.replace("9", "९");
    text = text.replace(" ", "");
    text = text.replace(".", ".");

    return text;
}


//----------------------------------------------------------------------------
//NB:functions to Convert unicode to english
//----------------------------------------------------------------------------
function getNumEng(val) {

    var newVal = "";
    for (i = 0; i < val.length; i++) {
        newVal += unicodeToEng(val.charAt(i));

    }

    return newVal;
}

function unicodeToEng(val) {
    var text = val.replace("०", "0");
    text = text.replace("१", "1");
    text = text.replace("२", "2");
    text = text.replace("३", "3");
    text = text.replace("४", "4");
    text = text.replace("५", "5");
    text = text.replace("६", "6");
    text = text.replace("७", "7");
    text = text.replace("८", "8");
    text = text.replace("९", "9");
    text = text.replace(" ", "");
    text = text.replace(".", ".");

    return text;
}

getUrlParamVal = function (key) {

    var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
};

//----------------------------------------------------------------------------
//NB:function that does not allow spaces in a textbox(for password)
//----------------------------------------------------------------------------

function isPasswordKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode == 32) {
        return false;
    } else {
        return true;
    }
}



//----------------------------------------------------------------------------
//NB:function that does not allow zero in a textbox(for contact priority)
//----------------------------------------------------------------------------

function isZero(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode == 48) {
        return false;
    } else {
        return true;
    }
}

//----------------------------------------------------------------------------
//NB:functions to GET general Values
//----------------------------------------------------------------------------

function getDate() {
    var engDate = getNumEng($("#currNepDate").text());
    return engDate;
}

function getUser() {
    return $("#user").text();
}

function getToken() {
    return $("#token").text();
}

//----------------------------------------------------------------------------
//NB:function for PCS-NEPALI
//----------------------------------------------------------------------------

function charCodeForPCSFont(e, input) {
    
    var unicode  = false; 
	if (e.charCode) 
	{
	  unicode = e.charCode;
	}
	var ch = input.value.substring(input.value.length -1,input.value.length).charCodeAt(0);
	//console.log('ch',ch,input.value.length);
	if ((ch === "NaN") || (((ch <=255) && (ch >32)) &&
	(!((ch == 40) || (ch == 41) || (ch == 44) || (ch == 46)||(ch == 61)))))
	{
		input.value = input.value.substring(0,input.value.length-1);
    }
    
	switch (unicode) 
	{	
	    case 33: input.value = input.value + 'ज्ञ'; return false; break; 
		case 34: input.value = input.value + 'ू'; return false; break; 
		case 35: input.value = input.value + 'घ'; return false; break;
		case 36: input.value = input.value + 'द्ध'; return false; break;
		case 37: input.value = input.value + 'छ'; return false; break;
		case 38: input.value = input.value + 'ठ'; return false; break;
		case 39: input.value = input.value + 'ु'; return false; break;
		case 40: input.value = input.value + 'ढ'; return false; break;
		case 41: input.value = input.value + 'ण्'; return false; break;
		case 42: input.value = input.value + 'ड'; return false; break;
		case 43: input.value = input.value + 'ं'; return false; break; 
		//case 44: input.value = input.value + ',';return false; break;
		case 45: input.value = input.value + ')'; return false; break; 
		case 46: input.value = input.value + '।'; return false; break; 
		case 47: input.value = input.value + 'र'; return false; break; 
		case 48: input.value = input.value + '०'; return false; break; 
	    case 49: input.value = input.value + '१'; return false; break; 
		case 50: input.value = input.value + '२'; return false; break; 
		case 51: input.value = input.value + '३'; return false; break; 
		case 52: input.value = input.value + '४'; return false; break; 
		case 53: input.value = input.value + '५'; return false; break; 
		case 54: input.value = input.value + '६'; return false; break;
		case 55: input.value = input.value + '७'; return false; break; 
		case 56: input.value = input.value + '८'; return false; break; 
		case 57: input.value = input.value + '९'; return false; break; 
		case 58: input.value = input.value + 'स्'; return false; break;
		case 59: input.value = input.value + 'स'; return false; break; 
		case 60: input.value = input.value + '्र'; return false; break; 		
		case 61: input.value = input.value + '.'; return false; break;  
		case 62: input.value = input.value + 'श्र'; return false; break;  
		case 63: input.value = input.value + 'रु'; return false; break;
		case 64:  input.value = input.value + 'द्द'; return false; break;
		case 65: input.value = input.value + 'ब्'; return false; break;  
		case 66: input.value = input.value + 'द्म'; return false; break;    
		case 67: input.value = input.value + 'र्'; return false; break;   
		case 68: input.value = input.value + 'म्'; return false; break;    
		case 69: input.value = input.value + 'भ्'; return false; break;  
		case 70: input.value = input.value + 'ा'; return false; break;   
		case 71: input.value = input.value + 'न्'; return false; break;  
		case 72: input.value = input.value + 'ज्'; return false; break;   
		case 73: input.value = input.value + 'क्ष्'; return false; break;  
		case 74: input.value = input.value + 'व्'; return false; break;  
		case 75: input.value = input.value + 'प्'; return false; break;   
		case 76: input.value = input.value + 'ी'; return false; break;   
		case 77: input.value = input.value + 'ः'; return false; break;   
		case 78: input.value = input.value + 'ल्'; return false; break;    
		case 79: input.value = input.value + 'य'; return false; break;    
		case 80: input.value = input.value + 'ए'; return false; break;     
		case 81: input.value = input.value + 'त्त'; return false; break;     
		case 82: input.value = input.value + 'च्'; return false; break;
	    case 83: input.value = input.value + 'क्'; return false; break;    
		case 84: input.value = input.value + 'त्'; return false; break;    
		case 85: input.value = input.value + 'ग्'; return false; break;    
		case 86: input.value = input.value + 'ख्'; return false; break;    
		case 87: input.value = input.value + 'ध्'; return false; break;    
		case 88: input.value = input.value + 'ह्'; return false; break;    
		case 89: input.value = input.value + 'थ्'; return false; break;    
		case 90: input.value = input.value + 'श्'; return false; break; 
		case 91: input.value = input.value + 'ृ'; return false; break;
		case 92: input.value = input.value + '्'; return false; break;
      	case 93: input.value = input.value + 'े'; return false; break;
		case 94: input.value = input.value + 'ट'; return false; break;
		case 95: input.value = input.value + '('; return false; break;
		case 96: input.value = input.value + 'ञ्'; return false; break;
		case 97: input.value = input.value + 'ब'; return false;  break;  
		case 98: input.value = input.value + 'द'; return false; break;
		case 99: input.value = input.value + 'अ'; return false; break;
		case 100: input.value = input.value + 'म'; return false; break;
		case 101: input.value = input.value + 'भ'; return false; break;
		case 102: input.value = input.value + 'ा'; return false; break;
		case 103: input.value = input.value + 'न'; return false; break;
		case 104: input.value = input.value + 'ज'; return false; break;
		case 105: input.value = input.value + 'ष्'; return false; break;
		case 106: input.value = input.value + 'व'; return false; break;
		case 107: input.value = input.value + 'प'; return false; break;
		case 108: input.value = input.value + 'ि';return false; break;
		case 109: input.value = input.value + 'फ'; return false; break;
		case 110: input.value = input.value + 'ल'; return false; break;
		case 111: input.value = input.value + 'इ'; return false; break;
		case 112: input.value = input.value + 'उ'; return false; break;
		case 113: input.value = input.value + 'त्र'; return false; break;
		case 114: input.value = input.value + 'च'; return false; break;
		case 115: input.value = input.value + 'क'; return false; break;
		case 116: input.value = input.value + 'त'; return false; break;
		case 117: input.value = input.value + 'ग'; return false; break;
		case 118: input.value = input.value + 'ख'; return false; break;
		case 119: input.value = input.value + 'ध'; return false; break;
		case 120: input.value = input.value + 'ह'; return false; break;
		case 121: input.value = input.value + 'थ'; return false; break;
		case 122: input.value = input.value + 'श'; return false; break;
		case 123: input.value = input.value + 'र्'; return false; break;
		case 124: input.value = input.value + '्र'; return false; break;   
		case 125: input.value = input.value + 'ै'; return false; break;
		case 126: input.value = input.value + 'ङ'; return false; break;
	    case 160: input.value = input.value + ''; return false; break;
		case 161: input.value = input.value + 'ञ्'; return false; break;
		case 162: input.value = input.value + 'द्ध'; return false; break;
		case 163: input.value = input.value + 'घ्'; return false; break;
		case 164: input.value = input.value + 'ँ'; return false; break;
		case 165: input.value = input.value + 'ऋ'; return false; break;
		case 167: input.value = input.value + 'ट्ट'; return false; break;
		case 169: input.value = input.value + '?'; return false; break;
		case 170: input.value = input.value + 'ञ'; return false; break;
		case 174: input.value = input.value + '+'; return false; break;
		case 176: input.value = input.value + 'ङ्क'; return false; break;
		case 177: input.value = input.value + 'ऊ'; return false; break;
		case 180: input.value = input.value + 'झ'; return false; break;
		case 183: input.value = input.value + 'ठ्ठ'; return false; break;
		case 187: input.value = input.value + '...'; return false; break;
		case 191: input.value = input.value + 'रु'; return false; break;
		case 198: input.value = input.value + '”'; return false; break;
		case 210: input.value = input.value + 'ू'; return false; break;
		case 212: input.value = input.value + 'क्ष'; return false; break;
		case 216: input.value = input.value + 'य'; return false; break;
		case 217: input.value = input.value + 'ह'; return false; break;
		case 218: input.value = input.value + 'ु'; return false; break;
		case 223: input.value = input.value + 'द्म'; return false; break;
		case 229: input.value = input.value + 'द्व'; return false; break;
		case 230: input.value = input.value + '“'; return false; break;
		case 231: input.value = input.value + 'ॐ'; return false; break;
		case 233: input.value = input.value + 'ङ्ग'; return false; break;
		case 237: input.value = input.value + 'ष'; return false; break;
		case 241: input.value = input.value + 'ङ'; return false; break;
		case 247: input.value = input.value + '/'; return false; break;
		case 250: input.value = input.value + 'ू'; return false; break;
	}
}


//keypress
function UnicodeKeyPress(e,input) {
    return charCodeForPCSFont(e,input)
}


//keyup
function UnicodeKeyUp(e, input) {

    if (input.value.substring(0, 9) === "undefined") {

        input.value = input.value.substring(9, input.value.length + 8);
    }
    else {
        if ((e.keyCode >= 8 && e.keyCode <= 27) || (e.keyCode >= 32 && e.keyCode <= 46) || e.keyCode === 91 || e.keyCode == 93 || e.keyCode === 144 || e.keyCode === 145 || (e.keyCode >= 112 && e.keyCode <= 123) || e.keyCode === 190 || e.keyCode === 188 || e.keyCode === 61) {

            //alert("if");
            input.value = input.value.substring(0, input.value.length);
        }
        else if (e.keyCode >= 96 && e.keyCode <= 105) {
        //alert("else");
            input.value = input.value.substring(0, input.value.length - 1);
        }
        else {
            //alert("else only !!!");
            input.value = input.value.substring(0, input.value.length - 1);
        }
    }
   
}


//change
function UnicodeChange(e,input) {
    var ch = input.value.substring(input.value.length - 1, input.value.length).charCodeAt(0);

    if ((ch === "NaN") || (((ch <= 255) && (ch > 32)) && (!((ch === 40) || (ch === 41) || (ch === 44) || (ch === 46) || (ch === 61))))) {
        input.value = input.value.substring(0, input.value.length - 1);
    }

    var ch1 = input.value.substring(input.value.length - 2, input.value.length - 1).charCodeAt(0);

    var ch2 = input.value.substring(input.value.length - 3, input.value.length - 2).charCodeAt(0);
    
    if ((ch1 === 46) && (ch === 61)) {
        input.value = input.value.substring(0, input.value.length - 1);
    }
    if ((ch1 === 2404) && (ch === 46)) {
        input.value = input.value.substring(0, input.value.length - 1);
    }

    if ((ch1 === 2366) && (ch === 93)) {
        input.value =input.value.substring(0, input.value.length - 2) + "ो";
    }
    if ((ch1 === 2366) && (ch === 125)) {
        input.value =input.value.substring(0, input.value.length - 2) + "ौ";
    }
    if ((ch1 === 2309) && (ch === 102)) {
        input.value =input.value.substring(0, input.value.length - 2) + "आ";
    }

    if ((ch1 === 2310) && (ch === 93)) {
        input.value =input.value.substring(0, input.value.length - 2) + "ओ";
    }
    if ((ch1 === 2310) && (ch === 125)) {
        input.value =input.value.substring(0, input.value.length - 2) + "औ";
    }
    if ((ch2 === 2311) && (ch === 123)) {
        input.value =input.value.substring(0, input.value.length - 3) + "ई";
    }
    if ((ch1 === 2319) && (ch === 93)) {
        input.value =input.value.substring(0, input.value.length - 2) + "ऐ";
    }
    if ((ch1 === 2338) && (ch === 40)) {
        input.value =input.value.substring(0, input.value.length - 3) + "ढ";
    }
    if ((ch2 === 2339) && (ch === 41)) {
        input.value =input.value.substring(0, input.value.length - 3) + "ण्";
    }
    if ((ch2 === 2339) && (ch === 102)) {
        input.value =input.value.substring(0, input.value.length - 3) + "ण";
    }
}

//focus
function UnicodeFocus(e,input) {
    var v = input.value;
    input.value = v;
}

//----------------------------------------------------------------------------
//function for comparing FromDate and ToDate
//----------------------------------------------------------------------------
function DateCompare(firstDate, secondDate) {

    if (firstDate > secondDate) {
        return false;
    }
    else
        return true;
};

//----------------------------------------------------------------------------
// Added by: Jayesh Shrestha
//----------------------------------------------------------------------------
function isAlphaNumberic(e) {

    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    specialKeys.push(9); //Tab
    specialKeys.push(46); //Delete
    specialKeys.push(36); //Home
    specialKeys.push(35); //End
    specialKeys.push(37); //Left
    specialKeys.push(39); //Right

    var keyCode = (e.which) ? e.which : e.keyCode;
    if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode)) {
        return true;
    } else {
        return false;
    }
};

//----------------------------------------------------------------------------
//NB:function that Dynamically Loads Menu
//----------------------------------------------------------------------------
function GetMenus() {

    $.ajax({
        dataType: "json",
        cache: false, 

        async: false,
        url: '/Handlers/SECURITY/Menu.ashx',
        data: { 'method': 'GetMenus' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result.IsSucess) {

                var ul = $("<ul />", { id: "main-menu", class: "sm sm-simple" }).appendTo($("#menu"));
                var li = "";
                var anchor = "";
                var ulChild = "";
                var liChild = "";
                var ulLeaf = "";
                var liLeaf = "";

                $.each(result.ResponseData, function (index, item) {

                    if (item.Level == 1) {

                        li = "";
                        anchor = "";
                        ulChild = "";
                        liChild = "";
                        ulLeaf = "";
                        liLeaf = "";

                        anchor = $("<a />", { href: item.Url, text: item.MenuName, title: item.ToolTip, class: "has-submenu" });

                        li = $("<li />").appendTo(ul);
                        li.append(anchor);

                        if (item.HasChild == true) {

                            ulChild = $("<ul />", { class: "sub_menu sm-nowrap scrollbox" }).appendTo(li);
                        }
                        else {
                            ulChild = "";
                        }
                    }
                    else if (item.Level == 2) {

                        ulLeaf = "";
                        liLeaf = "";

                        liChild = $("<li />").appendTo(ulChild);
                        loadSubMenu(item, liChild);

                        if (item.HasChild == true) {

                            ulLeaf = $("<ul />").appendTo(liChild);
                        }

                    }
                    else if (item.Level == 3) {

                        liLeaf = $("<li />").appendTo(ulLeaf);
                        loadSubMenu(item, liLeaf);
                    }

                });

                $('#main-menu').smartmenus({
                    subMenusSubOffsetX: 6,
                    subMenusSubOffsetY: -8
                });
            }

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE", null, ClearSession);

        }
    });
}

function loadSubMenu(item, li) {

    li.append($("<a />", { href: item.Url, text: item.MenuName, title: item.ToolTip }));

}


//----------------------------------------------------------------------------
//NB:function used for Crystal Report Preview
//----------------------------------------------------------------------------
function OpenWindowWithPost(url, windowoption, name, params) {
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", url);
    form.setAttribute("target", name);

    for (var i in params) {
        if (params.hasOwnProperty(i)) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = i;
            input.value = params[i];
            form.appendChild(input);
        }
    }
  
    document.body.appendChild(form);

    window.open("post.htm", name, windowoption);

    form.submit();

    document.body.removeChild(form);
}


ParseTest = function () {
    $.ajax({
        dataType: "json",
        cache: false,
        async: false,
        url: '../Handlers/DLISM/PremiumCollection.ashx',
        data: { 'method': 'ParseTest' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            if (!result.IsSucess) {
                window.location = "../Modules/COMMON/PortalLogin.aspx"; /// <reference path="../Handlers/DLISM/PremiumCollection.ashx" />

            }

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE", null, ClearSession);

        }
    })
}
