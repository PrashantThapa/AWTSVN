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
                var empid = "";
                var user = values[0];
                var offcode = values[1];
                empid = values[2];
                $("#user").text(user);
                $("#offcode").text(offcode);
				$("#offName").text(values[3]);				
                $("#EmployeeID").text(values[2]);
				$("#token").text(empid);
				
                var IsAllowed = false;
                $.each(result.ResponseData, function () {                    
                    if (window.location.pathname.trim() === $(this)[0].Url.trim())
						IsAllowed = true;					
                });              
                var callBack = function () {
                    window.location = "/AdminHome.aspx";
                }
                if (!IsAllowed && window.location.pathname != "/AdminHome.aspx") {
                    window.location = "/AdminHome.aspx";
                }
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
                window.location = "/Modules/COMMON/Login.aspx";
            }
            else {
                $("#token").val(result.Token);
                var msg = result.Message.split(',');
                $("#empID").text(msg[0]);
                $("#officeCD").text(msg[1]);
				$("#userID").text(msg[2]);
				$("#UserName").text(msg[3]);
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
// Get Fiscal Year
function GetFyscalYear(obj) {
    var date = obj;
    var fy = "";
    var dateElement = date.split(".");

    day = dateElement[2];
    month = dateElement[1];
    year = dateElement[0];
    if (month <= 3) {
        fy = year - 1;
        fy = fy + "." + year.substring(1, 4);
    }
    else {
        fy = String(parseInt(year) + 1);

        fy = year + "." + fy.substring(1, 4);
    }
    return fy;

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
        data = { 'method': 'ValidateNepDate', nepDate: nepDate, futureDate: futureDate };

        $.ajax({
            dataType: "json",
            cache: false,
            url: '/Handlers/COMMON/DateHandler.ashx',
            data: data,
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (result) {

                if (!result.IsSucess) {

                    errDate = result.Message;
                }

            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });

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
            debugger;
            if (result.IsSucess) {
                debugger;
                var EngsDate = result.ResponseData.NepaliDate;
                var nepDate = getNumUnicode(result.ResponseData.NepaliDate);
                
                $("#currNepDate").text(nepDate);
                $("#currEngsDate").text(EngsDate);

            }
            debugger;
        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE", null, ClearSession);

        }
    });


}

function GetNepalisDate(callback) {
    var nepalisDate = '';

    $.ajax({
        dataType: "json",
        cache: false,
        async: false,
        url: '/Handlers/COMMON/DateHandler.ashx',
        data: { 'method': 'GetDates' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result.IsSucess) {
                var nepsDate = getNumUnicode(result.ResponseData.NepaliDate);

                $("#currNepsDate").text(nepsDate);
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
    //debugger;
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
//function GetMenus() {
//    $.ajax({
//        //UseSubmitBehavior="false",

//        dataType: "json",
//        cache: false, 
//        async: false,
//        //alert:false,
//        url: '/Handlers/SECURITY/Menu.ashx',
//        data: { 'method': 'GetMenus' },
//        contentType: "application/json; charset=utf-8",
//        success: function (result) {
//            if (result.IsSucess) {
//                var ul = $("<ul />", { class: "sidebar-menu tree" }).appendTo($(".sidebar"));
//                var li = "";
//                var anchor = "";
//                var ulChild = "";
//                var liChild = "";
//                var ulLeaf = "";
//                var liLeaf = "";
//                var icon = "";
//                var childicon = "";
//                var childanchor = "";

//               $.each(result.ResponseData, function (index, item) {

//                   if (item.Level == 1) {

//                       li = "";
//                       anchor = "";
//                       ulChild = "";
//                       liChild = "";
//                       ulLeaf = "";
//                       liLeaf = "";
//                       span = "";
//                       icon = "";
//                       spans = "";
//                       childicon = "";
//                       childanchor = "";


//                       li = $("<li />", { class: "treeview"}).appendTo(ul);
//                       anchor = $("<a />", { href: "#" }).appendTo(li);
//                       icon = $("<i />", { class: "fa fa-th" }).appendTo(anchor);
//                       span = $("<span />", { href: "#", text: item.MenuName }).appendTo(anchor);
//                       icons = $("<i />", { class: "fa fa-angle-left pull-right" }).appendTo(anchor);

                      
//                       //li.append(anchor);

//                       if (item.HasChild == true) {
                          

//                           ulChild = $("<ul />", { class: "treeview-menu" }).appendTo(li);
//                           //ulChild.append(anchor);
//                       }
//                       else {
//                           ulChild = "";
//                       }
//                   }
//                   else if (item.Level == 2) {

//                       ulLeaf = "";
//                       liLeaf = "";

//                       liChild = $("<li />").appendTo(ulChild);
//                       anchor = $("<a />", { href: item.Url }).appendTo(liChild);
//                       icon = $("<i />", { class: "fa fa-circle-o" }).appendTo(anchor);
//                       span = $("<span />", { href: "#", text: item.MenuName }).appendTo(anchor);

//                       //loadSubMenu(item, liChild);
                       
//                       if (item.HasChild == true) {

//                           ulLeaf = $("<ul />").appendTo(liChild);

//                       }

//                   }
//                   else if (item.Level == 3) {

//                       liLeaf = $("<li />").appendTo(ulLeaf);
//                       anchor = $("<a />", { href: "#" }).appendTo(liLeaf);
//                       icon = $("<i />", { class: "fa fa-circle-o" }).appendTo(anchor);
//                       span = $("<span />", { href: "#", text: item.MenuName }).appendTo(anchor);
//                       //loadSubMenu(item, liLeaf);
//                   }

//                });


               
//            }

//        },
//        error: function (err) {
//            msg(err.status + " - " + err.statusText, "FAILURE", null, ClearSession);

//        }
//    });
//}

function GetMenus() {
    $.ajax({
        //UseSubmitBehavior="false",
        
        dataType: "json",
        cache: false,
        async: false,
        //alert:false,
        url: '/Handlers/SECURITY/Menu.ashx',
        data: { 'method': 'GetMenus' },
        contentType: "application/json; charset=utf-8",
        success: function (result)
        {
            if (result.IsSucess) {
                var ul = $("<ul />", { class: "sidebar-menu tree" }).appendTo($(".sidebar"));
                var li = "";
                var anchor = "";
                var ulChild = "";
                var liChild = "";
                var ulLeaf = "";
                var liLeaf = "";
                var icon = "";
                var childicon = "";
                var childanchor = "";

                $.each(result.ResponseData, function (index, item) {
                    if (item.Level == 1) {

                        li = "";
                        anchor = "";
                        ulChild = "";
                        liChild = "";
                        ulLeaf = "";
                        liLeaf = "";
                        span = "";
                        icon = "";
                        spans = "";
                        childicon = "";
                        childanchor = "";


                        li = $("<li />", { class: "treeview" }).appendTo(ul);
                        anchor = $("<a />", { href: "#" }).appendTo(li);
                        icon = $("<i />", { class: "fa fa-th" }).appendTo(anchor);
                        span = $("<span />", { href: "#", text: item.MenuName }).appendTo(anchor);
                        icons = $("<i />", { class: "fa fa-angle-left pull-right" }).appendTo(anchor);


                        //li.append(anchor);

                        if (item.HasChild == true) {


                            ulChild = $("<ul />", { class: "treeview-menu" }).appendTo(li);
                            //ulChild.append(anchor);
                        }
                        else {
                            ulChild = "";
                        }
                    }
                    else if (item.Level == 2) {

                        ulLeaf = "";
                        liLeaf = "";

                        liChild = $("<li />").appendTo(ulChild);
                        anchor = $("<a />", { href: item.Url }).appendTo(liChild);
                        icon = $("<i />", { class: "fa fa-circle-o" }).appendTo(anchor);
                        span = $("<span />", { href: "#", text: item.MenuName }).appendTo(anchor);

                        //loadSubMenu(item, liChild);

                        if (item.HasChild == true) {

                            ulLeaf = $("<ul />").appendTo(liChild);

                        }

                    }
                    else if (item.Level == 3) {

                        liLeaf = $("<li />").appendTo(ulLeaf);
                        anchor = $("<a />", { href: "#" }).appendTo(liLeaf);
                        icon = $("<i />", { class: "fa fa-circle-o" }).appendTo(anchor);
                        span = $("<span />", { href: "#", text: item.MenuName }).appendTo(anchor);
                        //loadSubMenu(item, liLeaf);
                    }

                });
               
            }

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE", null, ClearSession);

        }
    });
}
function GetPortalMenu() {
    $.ajax({
        //UseSubmitBehavior="false",

        dataType: "json",
        cache: false,
        async: false,
        //alert:false,
        url: '/Handlers/SECURITY/Menu.ashx',
        data: { 'method': 'GetPortalMenu' },
        contentType: "application/json; charset=utf-8",
        success: function (result) {

            if (result.IsSucess) {
                var ul = $("<ul />", { class: "sidebar-menu tree" }).appendTo($(".sidebar"));
                var li = "";
                var anchor = "";

                $.each(result.ResponseData, function (index, item) {

                  

                        li = "";
                        anchor = "";
                        ulChild = "";
                        liChild = "";
                        ulLeaf = "";
                        liLeaf = "";
                        span = "";
                        icon = "";
                        spans = "";
                        childicon = "";
                        childanchor = "";


                        li = $("<li />").appendTo(ul);
                        anchor = $("<a />", { href: item.Url }).appendTo(li);
                        icon = $("<i />", { class: "fa fa-th" }).appendTo(anchor);
                        span = $("<span />", { href: item.Url, text: item.MenuName }).appendTo(anchor);
                });


            }

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE", null, ClearSession);

        }
    });
}


function loadSubMenu(item, li) {

    //li.append($("<a />", { href: item.Url, text: item.MenuName, title: item.ToolTip }));
    //if(item.Url == )
}



function convert_to_unicode(item) {
    // alert(item.value);

    var array_one = new Array(

    //	"ç", "˜", ".", "'m", "]m", "Fmf", "Fm",

            "ç", "˜", ".", "m", "'m", "]m", "Fmf", "Fm",

			"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",

			"k|m", "em", "km", "Qm", "qm", "N˜",
			"¡", "¢", "!", "@", "$", ">", "?", "B", "I", "Q", "ß",
			"q", "„", "‹", "•", "›", "§", "°", "¶", "¿", "Å",
			"Ë", "Ì", "Í", "Î", "Ý", "å",
			"6«", "7«", "8«", "9«",

			"Ø", "|",

			"8Þ", "9Þ",

			"S", "s", "V", "v", "U", "u", "£", "#", "ª",
			"R", "r", "%", "H", "h", "‰", "´", "~", "`",

			"^", "&", "*", "(", ")",
			"T", "t", "Y", "y", "b", "W", "w", "G", "g",

			"K", "k", "ˆ", "A", "a", "E", "e", "D", "d",
			"o", "/", "N", "n", "J", "j", "Z", "z", "i", ":", ";", "X", "x",

			"cf‘", "c‘f", "cf}", "cf]", "cf", "c", "O{", "O", "pm", "p", "C", "P]", "P",

			"f‘", "\"", "'", "+", "f", "[", "\\", "]", "}", "F", "L", "M",

			"्ा", "्ो", "्ौ", "अो", "अा", "आै", "आे", "ाो", "ाॅ", "ाे",
			"ंु", "ेे", "अै", "ाे", "अे", "ंा", "अॅ", "ाै", "ैा", "ंृ",
			"ँा", "ँू", "ेा", "ंे")     // Remove typing mistakes in the original file

    //"_","Ö","Ù","Ú","Û","Ü","Þ","Æ","±","-","<","=")    // Punctuation marks

    var array_two = new Array(

    //	"ॐ", "ऽ", "।", "m'", "m]", "mfF", "mF",
        "ॐ", "ऽ", "।", "फ", "m'", "m]", "mfF", "mF",

		"०", "१", "२", "३", "४", "५", "६", "७", "८", "९",

		"फ्र", "झ", "फ", "क्त", "क्र", "ल",
		"ज्ञ्", "द्घ", "ज्ञ", "द्द", "द्ध", "श्र", "रु", "द्य", "क्ष्", "त्त", "द्म",
		"त्र", "ध्र", "ङ्घ", "ड्ड", "द्र", "ट्ट", "ड्ढ", "ठ्ठ", "रू", "हृ",
		"ङ्ग", "त्र", "ङ्क", "ङ्ख", "ट्ठ", "द्व",
		"ट्र", "ठ्र", "ड्र", "ढ्र",

		"्य", "्र",

		"ड़", "ढ़",

		"क्", "क", "ख्", "ख", "ग्", "ग", "घ्", "घ", "ङ",
		"च्", "च", "छ", "ज्", "ज", "झ्", "झ", "ङ", "ञ्",

		"ट", "ठ", "ड", "ढ", "ण्",
		"त्", "त", "थ्", "थ", "द", "ध्", "ध", "न्", "न",

		"प्", "प", "फ्", "ब्", "ब", "भ्", "भ", "म्", "म",
		"य", "र", "ल्", "ल", "व्", "व", "श्", "श", "ष्", "स्", "स", "ह्", "ह",

		"ऑ", "ऑ", "औ", "ओ", "आ", "अ", "ई", "इ", "ऊ", "उ", "ऋ", "ऐ", "ए",

		"ॉ", "ू", "ु", "ं", "ा", "ृ", "्", "े", "ै", "ँ", "ी", "ः",

		"", "े", "ै", "ओ", "आ", "औ", "ओ", "ो", "ॉ", "ो",
		"ुं", "े", "अ‍ै", "ो", "अ‍े", "ां", "अ‍ॅ", "ौ", "ौ", "ृं",
		"ाँ", "ूँ", "ो", "ें")     // Remove typing mistakes in the original file 

    //  ")","=", ";", "’","!","%",".","”","+","(","?",".")       // Punctuation marks

    //**************************************************************************************
    // The following two characters are to be replaced through proper checking of locations:
    //**************************************************************************************
    //  "l", 
    //  "ि",
    //
    // "{"
    // "र्" (reph) 
    //**************************************************************************************

    var array_one_length = array_one.length;

    //if (  (document.getElementById("text_or_html")).selectedIndex == 0 )  // if the input is plain text
    //{ 
    //document.getElementById("unicode_text").value = "You have chosen SIMPLE TEXT in Preeti to convert into Unicode."  ;  

    var modified_substring = item.value;

    //****************************************************************************************
    //  Break the long text into small bunches of max. max_text_size  characters each.
    //****************************************************************************************
    var text_size = item.value.length;

    var processed_text = '';  //blank

    //**********************************************
    //    alert("text size = "+text_size);
    //**********************************************

    var sthiti1 = 0; var sthiti2 = 0; var chale_chalo = 1;

    var max_text_size = 6000;

    while (chale_chalo == 1) {
        sthiti1 = sthiti2;

        if (sthiti2 < (text_size - max_text_size)) {
            sthiti2 += max_text_size;
            while (item.value.charAt(sthiti2) != ' ') { sthiti2--; }
        }
        else { sthiti2 = text_size; chale_chalo = 0 }

        //   alert(" sthiti 1 = "+sthiti1); alert(" sthit 2 = "+sthiti2) 

        var modified_substring = item.value.substring(sthiti1, sthiti2);

        Replace_Symbols();

        processed_text += modified_substring;


        //****************************************************************************************
        //  Breaking part code over
        //****************************************************************************************
        //  processed_text = processed_text.replace( /mangal/g , "SUCHI-DEV-708 " ) ;   

        //document.getElementById("unicode_text").value = processed_text  ;
        item.value = processed_text;
    }

    //}

    //else    // if input is HTML then

    //{

    //document.getElementById("unicode_text").value = "You have chosen HTML TEXT in SUCHI-DEV-708  to convert into Unicode."  ;  

    var remaining_text = item.value;
    var processed_text = "";  //blank initially

    var position_of_current_opening_bracket = 0;
    var position_of_next_closing_bracket = 1;

    var idx = remaining_text.indexOf("<p ")  // search starting from paragraphs. then search for sanskrit 99.
    idx = remaining_text.indexOf("Sanskrit 99", idx)
    var idx2 = 0  //  position_of_current_opening_bracket  ">"
    var idx3 = 0  //  position of "/span"
    var idx4 = 0  //  postion of "span" only , ie span without "/"

    while (idx != -1)    // while-01 loop     ;  while "Sanskrit 99"  is found..
    {
        idx2 = remaining_text.indexOf(">", idx)
        idx3 = remaining_text.indexOf("/span", idx2)
        idx4 = remaining_text.indexOf("span", idx2)


        while (idx4 < idx3)     // this loop to take care of  nested span.
        {
            idx4 = remaining_text.indexOf("span", idx3 + 4);
            idx3 = remaining_text.indexOf("/span", idx3 + 4);
        }


        var modified_substring = remaining_text.substring(idx2, idx3);
        modified_substring = modified_substring.replace(/>/g, ">>");
        processed_text = processed_text + remaining_text.substring(0, idx2) + modified_substring + "/span";

        remaining_text = remaining_text.substring(idx3 + 5);  //remaining_text excludes "/span"
        idx = remaining_text.indexOf("Sanskrit 99");

    } //end of outermost while-01


    processed_text = processed_text + remaining_text;


    // -----------------------------

    //  This section for taking care of paragraphs marked class = MsoBodyText  or class = MsoBodyText

    remaining_text = processed_text;
    processed_text = "";  //blank initially

    var position_of_start_of_paragraph = 0;
    var position_of_end_of_paragraph = 1;

    position_of_start_of_paragraph = remaining_text.indexOf("<p ");


    while (position_of_start_of_paragraph != -1)  //search for <p  in the remaining_text
    {

        position_of_start_of_paragraph = remaining_text.indexOf("<p ");
        position_of_end_of_paragraph = remaining_text.indexOf("/p>");

        modified_substring = remaining_text.substring(position_of_start_of_paragraph + 3, position_of_end_of_paragraph);


        if (modified_substring.indexOf("MsoBodyText") != -1) {
            modified_substring = modified_substring.replace(/>/g, ">>");    // repace all ">" with ">>" in this paragraph

            idx = modified_substring.indexOf("font-family");  // in Mybodytext, whereever font-family is found, it means it is roman text.
            idx2 = 0;  // position of ">>"
            idx3 = 0;  // position of "/span"
            idx4 = 0;  // position of "span" only without "/"

            while (idx != -1)     // again change ">>" to ">" only those which occure immediately after font-family:"Times new Roman"
            {

                idx2 = modified_substring.indexOf(">>", idx);
                idx3 = modified_substring.indexOf("/span", idx2);
                idx4 = modified_substring.indexOf("span", idx2);


                while (idx4 < idx3) {
                    idx4 = modified_substring.indexOf("span", idx3 + 4);
                    idx3 = modified_substring.indexOf("/span", idx3 + 4);
                }

                modified_substring = modified_substring.substring(0, idx2) + (modified_substring.substring(idx2, idx3)).replace(/>>/g, ">") + modified_substring.substring(idx3);
                idx = modified_substring.indexOf("font-family", idx3);

            } // end of while inner loop
        } // end of if statement

        processed_text = processed_text + remaining_text.substring(0, position_of_start_of_paragraph + 3) + modified_substring + "/p>";
        remaining_text = remaining_text.substring(position_of_end_of_paragraph + 3);
        position_of_start_of_paragraph = remaining_text.indexOf("<p ");

    } // end of outer while loop

    processed_text = processed_text + remaining_text;


    // ------------------------

    // Now do actual font conversion  of text occuring between  all the  pairs  >>  and  <

    remaining_text = processed_text; processed_text = "";

    idx2 = remaining_text.indexOf(">>");



    while (idx2 != -1)    // while-01 loop (checks if ">>" is still present
    {

        position_of_current_opening_bracket = remaining_text.indexOf(">>", idx2)
        position_of_next_closing_bracket = remaining_text.indexOf("<", position_of_current_opening_bracket)

        modified_substring = remaining_text.substring(position_of_current_opening_bracket + 2, position_of_next_closing_bracket);

        processed_text = processed_text + remaining_text.substring(0, position_of_current_opening_bracket + 1);   // ">" included by using +1 here
        remaining_text = remaining_text.substring(position_of_next_closing_bracket + 1);  //remaining_text excludes the closing bracket


        Replace_Symbols();   // call the subroutine and replace the legacy symbols  with corresponding Unicode.


        processed_text = processed_text + modified_substring + "<";

        idx2 = remaining_text.indexOf(">>");


    } //end of outermost while-01



    processed_text = processed_text + remaining_text;



    // do follwing conversions which are still left  or  were done incorrectly due to unavoidable reasons.

    // processed_text = processed_text.replace( /Sanskrit 99/g , "mangal" ) ;   

    // processed_text = processed_text.replace( /ृलतष/g , "ं" )   ;  
    // processed_text = processed_text.replace( /ृटुखतष/g , "घ" )  ;
    // processed_text = processed_text.replace( /ृामपष/g , "ृ" )  ;
    // processed_text = processed_text.replace( /ृगतष/g , ":" )  ;
    // processed_text = processed_text.replace( /ृनबसपष/g , "/&nbsp" )  ; 
    // processed_text = processed_text.replace( /ाॅ/g , "ॉ" )  ; 


    // now put the processed text in the output box finally.

    //document.getElementById("unicode_text").value = processed_text  
    item.value = processed_text

    //} // end of else loop for HTML case


    // --------------------------------------------------


    function Replace_Symbols() {

        //substitute array_two elements in place of corresponding array_one elements

        if (modified_substring != "")  // if stringto be converted is non-blank then no need of any processing.
        {
            for (input_symbol_idx = 0; input_symbol_idx < array_one_length; input_symbol_idx++) {

                //  alert(" modified substring = "+modified_substring)

                //***********************************************************
                // if (input_symbol_idx==106) 
                //  { alert(" input_symbol_idx = "+input_symbol_idx);
                //    alert(" input_symbol_idx = "+input_symbol_idx)
                //; alert(" character =" + modified_substring.CharCodeAt(input_symbol_idx))
                //     alert(" character = "+modified_string.fromCharCode(input_symbol_idx)) 
                //   }
                // if (input_symbol_idx == 107) 
                //   { alert(" input_symbol_idx = "+input_symbol_idx);
                //    alert(" character = ",+string.fromCharCode(input_symbol_idx)) 
                //   }
                //***********************************************************
                idx = 0;  // index of the symbol being searched for replacement

                while (idx != -1) //while-00
                {

                    modified_substring = modified_substring.replace(array_one[input_symbol_idx], array_two[input_symbol_idx])
                    idx = modified_substring.indexOf(array_one[input_symbol_idx])

                } // end of while-00 loop
                // alert(" end of while loop")
            } // end of for loop
            // alert(" end of for loop")

            // alert(" modified substring2 = "+modified_substring)
            //*******************************************************
            var position_of_i = modified_substring.indexOf("l")

            while (position_of_i != -1)  //while-02
            {
                var charecter_next_to_i = modified_substring.charAt(position_of_i + 1)
                var charecter_to_be_replaced = "l" + charecter_next_to_i
                modified_substring = modified_substring.replace(charecter_to_be_replaced, charecter_next_to_i + "ि")
                position_of_i = modified_substring.search(/l/, position_of_i + 1) // search for i ahead of the current position.

            } // end of while-02 loop

            //**********************************************************************************
            // End of Code for Replacing four Special glyphs
            //**********************************************************************************

            // following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.

            var position_of_wrong_ee = modified_substring.indexOf("ि्")

            while (position_of_wrong_ee != -1)  //while-03
            {
                var consonent_next_to_wrong_ee = modified_substring.charAt(position_of_wrong_ee + 2)
                var charecter_to_be_replaced = "ि्" + consonent_next_to_wrong_ee
                modified_substring = modified_substring.replace(charecter_to_be_replaced, "्" + consonent_next_to_wrong_ee + "ि")
                position_of_wrong_ee = modified_substring.search(/ि्/, position_of_wrong_ee + 2) // search for 'wrong ee' ahead of the current position. 

            } // end of while-03 loop

            // following loop to eliminate 'chhotee ee kee maatraa' on half-letters as a result of above transformation.

            var position_of_wrong_ee = modified_substring.indexOf("िं्")

            while (position_of_wrong_ee != -1)  //while-03
            {
                var consonent_next_to_wrong_ee = modified_substring.charAt(position_of_wrong_ee + 3)
                var charecter_to_be_replaced = "िं्" + consonent_next_to_wrong_ee
                modified_substring = modified_substring.replace(charecter_to_be_replaced, "्" + consonent_next_to_wrong_ee + "िं")
                position_of_wrong_ee = modified_substring.search(/िं्/, position_of_wrong_ee + 3) // search for 'wrong ee' ahead of the current position. 

            } // end of while-03 loop


            // Eliminating reph "Ô" and putting 'half - r' at proper position for this.
            set_of_matras = "ा ि ी ु ू ृ े ै ो ौ ं : ँ ॅ"
            var position_of_R = modified_substring.indexOf("{")

            while (position_of_R > 0)  // while-04
            {
                probable_position_of_half_r = position_of_R - 1;
                var charecter_at_probable_position_of_half_r = modified_substring.charAt(probable_position_of_half_r)


                // trying to find non-maatra position left to current O (ie, half -r).

                while (set_of_matras.match(charecter_at_probable_position_of_half_r) != null)  // while-05
                {
                    probable_position_of_half_r = probable_position_of_half_r - 1;
                    charecter_at_probable_position_of_half_r = modified_substring.charAt(probable_position_of_half_r);

                } // end of while-05


                charecter_to_be_replaced = modified_substring.substr(probable_position_of_half_r, (position_of_R - probable_position_of_half_r));
                new_replacement_string = "र्" + charecter_to_be_replaced;
                charecter_to_be_replaced = charecter_to_be_replaced + "{";
                modified_substring = modified_substring.replace(charecter_to_be_replaced, new_replacement_string);
                position_of_R = modified_substring.indexOf("{");

            } // end of while-04

            // global conversion of punctuation marks
            //    "=","_","Ö","Ù","‘","Ú","Û","Ü","æ","Æ","±","-","<",  
            //    ".",")","=", ";","…", "’","!","%","“","”","+","(","?",

            modified_substring = modified_substring.replace(/=/g, ".");
            modified_substring = modified_substring.replace(/_/g, ")");
            modified_substring = modified_substring.replace(/Ö/g, "=");
            modified_substring = modified_substring.replace(/Ù/g, ";");
            modified_substring = modified_substring.replace(/…/g, "‘");
            modified_substring = modified_substring.replace(/Ú/g, "’");
            modified_substring = modified_substring.replace(/Û/g, "!");
            modified_substring = modified_substring.replace(/Ü/g, "%");
            modified_substring = modified_substring.replace(/æ/g, "“");
            modified_substring = modified_substring.replace(/Æ/g, "”");
            modified_substring = modified_substring.replace(/±/g, "+");
            modified_substring = modified_substring.replace(/-/g, "(");
            modified_substring = modified_substring.replace(/</g, "?");

        } // end of IF  statement  meant to  supress processing of  blank  string.

    } // end of the function  Replace_Symbols

} // end of legacy_to_unicode function

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

