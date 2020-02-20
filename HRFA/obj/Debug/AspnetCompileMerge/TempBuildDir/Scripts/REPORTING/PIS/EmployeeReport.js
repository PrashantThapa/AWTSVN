﻿function EmployeeDet(data) {
    if (data != undefined) {
        var self = this;
        self.SYMBOL_NO = ko.observable(data.SYMBOL_NO);
        self.CIT_NO = ko.observable(data.CIT_NO);
        self.EMP_ID = ko.observable(data.EMP_ID);
        self.IDENTITY_MARK = ko.observable(data.IDENTITY_MARK);
        self.PROVIDENT_FUND_NO = ko.observable(data.PROVIDENT_FUND_NO);
        self.IMAGE_FILE = ko.observable(data.IMAGE_FILE);
        self.ALERT_SOURCE = ko.observable(data.ALERT_SOURCE);
        self.ALT_SOURCE_VAL = ko.observable(data.ALT_SOURCE_VAL);
        self.COUNTRY_CODE = ko.observable(data.COUNTRY_CODE);
        self.DOB = ko.observable(data.DOB);
        self.GENDER = ko.observable(data.GENDER);
        self.REL_ID = ko.observable(data.REL_ID);
        self.P_ID = ko.observable(data.P_ID);
        self.EMP_NAME_NEP = ko.observable(data.EMP_NAME_NEP);
        self.EMP_NAME_ENG = ko.observable(data.EMP_NAME_ENG);
        self.MARST_ID = ko.observable(data.MARST_ID);
        self.MARST_NAME = ko.observable(data.MARST_NAME);
        self.COUNTRY_NAME = ko.observable(data.COUNTRY_NAME);
        self.REL_NAME = ko.observable(data.REL_NAME);
        self.OFFICE_NAME_NEPALI = ko.observable(data.OFFICE_NAME_NEPALI);
        self.POST_DESC = ko.observable(data.POST_DESC);
        self.POST_DESC_ENG = ko.observable(data.POST_DESC_ENG);
        self.POST_ID = ko.observable(data.POST_ID);
        self.FROM_DATE = ko.observable(data.FROM_DATE);
        self.DECISION_DATE = ko.observable(data.DECISION_DATE);
    }
}

function EmployeeQual(data) {
    if (data != undefined) {
        var self = this;
        self.P_ID = ko.observable(data.P_ID);
        self.COUNTRY_CD = ko.observable(data.COUNTRY_CD);
        self.EDUCATION_EQUIVALENCE = ko.observable(data.EDUCATION_EQUIVALENCE);
        self.FROM_DATE = ko.observable(data.FROM_DATE);
        self.GRADE = ko.observable(data.GRADE);
        self.INSTITUTE = ko.observable(data.INSTITUTE);
        self.MAJOR_SUBJECT = ko.observable(data.MAJOR_SUBJECT);
        self.OPTIONAL_SUBJECT = ko.observable(data.OPTIONAL_SUBJECT);
        self.PERCENTAGE = ko.observable(data.PERCENTAGE);
        self.REMARKS = ko.observable(data.REMARKS);
        self.TITLE = ko.observable(data.TITLE);
        self.TO_DATE = ko.observable(data.TO_DATE);
        self.QUAL_ID = ko.observable(data.QUAL_ID);
        self.QUAL_NAME = ko.observable(data.QUAL_NAME);
        self.COUNTRY_NAME = ko.observable(data.COUNTRY_NAME);
    }
}

function EmployeePost(data) {
    if (data != undefined) {
        var self = this;
        self.SYMBOL_NO = ko.observable(data.SYMBOL_NO);
        self.EMP_ID = ko.observable(data.EMP_ID);
        self.POST_ID = ko.observable(data.POST_ID);
        self.POST_DESC = ko.observable(data.POST_DESC);
        self.POST_DESC_ENG = ko.observable(data.POST_DESC_ENG);
        self.POSTING_TYPE_ID = ko.observable(data.POSTING_TYPE_ID);
        self.JOINING_DATE = ko.observable(data.JOINING_DATE);
        self.FROM_DATE = ko.observable(data.FROM_DATE);
        self.DECISION_DATE = ko.observable(data.DECISION_DATE);

       
    }
}

var EmployeePostViewModel = function () {

    var self = this;

    self.SymbolNo = ko.observable();
    self.EmployeeDets = ko.observableArray([]);
    self.EmployeeQuals = ko.observableArray([]);
    self.EmployeePosts = ko.observableArray([]);
    self.ShowReport = ko.observable(false);
    self.testUrl = ko.observable('');
    //self.mobile('981787382')
    self.Cancel = function () {
        self.SymbolNo("");
    }

    //self.ViewReport = function () {
    //	if (!self.ValidateSymbolNo()) return;
    //       var data = {
    //           SymbolNo: self.SymbolNo()
    //       }
    //       var hght = screen.height;
    //       var left = (screen.width / 2) - (900 / 2);
    //       var url = "/Reporting/PIS/ReportHandlers/EmployeeDetailsHandler.ashx";
    //       //var url = "/Reporting/PIS/ReportHandlers/EmployeeHandler.ashx";
    //       var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
    //       OpenWindowWithPost(url, winOption, "NewFile", data);       
    //       self.SymbolNo('');
    //   }
    self.GetEmployeeDetails = function () {
        if (!self.ValidateSymbolNo()) return;
        var data = {
            SymbolNo: self.SymbolNo()
        }

        $.ajax({
            dataType: "json",
            cache: false,
            url: '/Handlers/Reporting/PIS/ReportHandlers/EmployeeDetailsHandler.ashx',
            data: { 'method': 'GetEmployeeDetails', 'SymbolNo': self.SymbolNo() },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {
                    return new EmployeeDet(item)

                });
                //debugger;
                self.EmployeeDets(mappedTask);

                if (self.EmployeeDets !== null && self.EmployeeDets !== undefined && self.EmployeeDets()[0] && self.EmployeeDets()[0].P_ID) {
                    self.GetEmployeeQualification(self.EmployeeDets()[0].P_ID)
                }

                if (self.EmployeeDets !== null && self.EmployeeDets !== undefined && self.EmployeeDets()[0] && self.EmployeeDets()[0].SYMBOL_NO) {
                    self.GetEmployeePostHistory(self.EmployeeDets()[0].SYMBOL_NO)
                }

                self.ShowReport(true);

              

                //console.log('detail', ko.toJS(self.EmployeeDets()[0]).OFFICE_NAME_NEPALI);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }
    self.ValidateSymbolNo = function () {
        if (self.SymbolNo() === '') {
            msg("Symbol no should not be empty!", "FAILURE");
            return false;
        }
        return true;

    }


    self.GetEmployeeQualification = function () {
        //debugger;
        $.ajax({
            dataType: "json",
            cache: false,
            url: '/Handlers/Reporting/PIS/ReportHandlers/EmployeeDetailsHandler.ashx',
            data: { 'method': 'GetEmployeeQualification', 'pid': ko.toJS(self.EmployeeDets())[0].P_ID },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {
                    return new EmployeeQual(item)

                });
                //debugger;
                self.EmployeeQuals(mappedTask);
                //console.log('detail', self.EmployeeQuals());
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }

    self.GetEmployeePostHistory = function () {
        //debugger;
        //console.log(ko.toJS(self.EmployeeDets()));
        $.ajax({
            dataType: "json",
            cache: false,
            url: '/Handlers/Reporting/PIS/ReportHandlers/EmployeeDetailsHandler.ashx',
            data: { 'method': 'GetEmployeePostHistory', 'SymbolNo': ko.toJS(self.EmployeeDets())[0].SYMBOL_NO },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {
                    return new EmployeePost(item)

                });
                var test = ko.toJS(mappedTask);

                for (var i = 0; i < test.length; i++) {
                    if (test[i].POSTING_TYPE_ID != 'A') {
                        test[i].FROM_DATE = null;
                    }
                }
                self.EmployeePosts(test);
                //console.log('detail', self.EmployeePosts());
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }


    printDiv = function () {
        var printContents = document.getElementById('test').innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        location.reload();
    }

}

$(document).ready(function () {

    ValidateSession();

    var epvm = new EmployeePostViewModel();
    ko.applyBindings(epvm);

});







//function EmployeeReportDetailViewModel() {
//    var self = this;
//    self.Symbol = ko.observable();
//    self.ViewReport = function (data, event) {
//        if (self.Validation()) {
//            self.ShowReport();
//        }
//    }   
//    self.Cancel = function () {
//        self.Symbol("");
//    }
//    self.ShowReport = function () {
//        waitMsg("Loading");
//        waitMsg.show();
//        var data = {
//            SymbolNo: self.Symbol()
//            }
//        var hght = screen.height;
//        var left = (screen.width / 2) - (900 / 2);
//        var url = "/Reporting/PIS/ReportHandlers/EmployeeDetailsHandler.ashx";
//       // var url = "/Reporting/PIS/ReportHandlers/EmployeeHandler.ashx";
//        var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
//        OpenWindowWithPost(url, winOption, "NewFile", data);
//        self.Symbol("");

//        waitMsg.hide();
//    }

//    self.Validation = function () {
//        var errMsg = "";
//        var objFocus = null;
//        if (!self.Symbol()) {
//            errMsg += "कृपया संकेत नं भर्नुहोस् <br>";
//        }        
//        if (errMsg !== "") {
//             msg(errMsg,"WARNING");
//            return false;
//        }
//        else {
//            return true;
//        }
//    };


//}
//$(document).ready(function () {   
//   ValidateSession();
//    ko.applyBindings(new EmployeeReportDetailViewModel());
//});