function Office(data) {
    var self = this;
    if (data !== undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function FiscalYear(data) {
    var self = this;
    if (data != undefined) {
        self.FiscalYearID = ko.observable(data.FiscalYearID);//FISCAL_YR_ID
        self.FiscalYearName = ko.observable(data.FiscalYearName);//FISCAL_YEAR
        self.IsActive = ko.observable(data.IsActive);//ISACTIVE      
        self.Action = ko.observable(data.Action);
    }
}

function CostCenter(data) {
    var self = this;
    if (data !== undefined) {
        self.CostCenterID = ko.observable(data.CostCenterID);
        self.CostCenterName = ko.observable(data.CostCenterName);
        self.CostCenterNameEng = ko.observable(data.CostCenterNameEng);
        self.Status = ko.observable(data.Status);
    }
}

function EmpDetOffice(data) {
    var self = this;
    self.EmpID = ko.observable(data.EMP_ID);
    self.EmpName = ko.observable(data.EMP_NAME);
    self.SN = ko.observable(data.SYMBOL_NO);
    self.PostID = ko.observable(data.POST_ID);
    self.PostDesc = ko.observable(data.POST_DESC);
    self.AttDays = ko.observable();
    self.WorkingDays = ko.observable();
    self.Action = ko.observable('A');
    self.OfficeCD = ko.observable();
    self.CostCenterID = ko.observable();
}

function Employee(data) {
    var self = this;
    self.SubmissionNo = ko.observable(data.SubmissionNo || null);
    self.SN = ko.observable(data.SN);
    self.EmpID = ko.observable(data.EmpID);
    self.EmployeeName = ko.observable(data.EmployeeName);
    self.OfficeCD = ko.observable(data.OfficeCD);
    self.CostCenterID = ko.observable(data.CostCenterID);
    self.Year = ko.observable(data.Year);
    self.Month = ko.observable(data.Month);
    self.PostDesc = ko.observable(data.PostDesc);
    self.WorkingDays = ko.observable(data.WorkingDays);
    self.AttDays = ko.observable(data.AttDays);
    self.RStatus = ko.observable(data.RStatus || 'F');
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.Action = ko.observable(data.Action);
    self.RejectRemarks = ko.observable(data.RejRemarks);
}

function CostCenter(data) {
    var self = this;
    if (data != undefined) {
        self.CostCenterID = ko.observable(data.CostCenterID);
        self.CostCenterName = ko.observable(data.CostCenterName);
        self.CostCenterNameEng = ko.observable(data.CostCenterNameEng);
        self.Status = ko.observable(data.Status);
    }
}

var EmployeeAttendanceFormViewModel = function () {
    var self = this;

    self.FiscalYears = ko.observableArray([]);
    self.SelectedFiscalYear = ko.observableArray([]);
    self.Year = ko.observable();
    self.Offices = ko.observableArray([]);
    self.SelectedOffice = ko.observable();
    self.SelectedCostCenter = ko.observable();
    self.SelectedMonth = ko.observable();
    self.SelectedMonth.subscribe(function (value) {
        if (value !== undefined) {
            var YearFromFisclaYear = '';
            var fisc = ko.toJS(self.SelectedFiscalYear()).FiscalYearName;
            if (value.MonthID <= 3) {
                YearFromFisclaYear = '20' + fisc.substring(6, 8);
            }
            else if (value.MonthID > 3) {
                YearFromFisclaYear = fisc.substring(0, 4);
            }
            //debugger;
            self.Year(YearFromFisclaYear);
        }
    })
    self.GetFiscalYears = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '/Handlers/CENTRALLOOKUP/FiscalYearHandler.ashx',

            data: { 'method': 'GetFiscalYear', 'fiscalYearID': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new FiscalYear(item)
                });
                self.FiscalYears(mappedTask);


            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }

    self.GetFiscalYears();
    self.EmployeeName = ko.observable();
    self.Employees = ko.observableArray([]);
    self.OfficeCD = ko.observable();
    self.CostCenterID = ko.observable();
    self.RStatus = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.SubmissionNo = ko.observable();
    self.WorkingDays = ko.observable();
    self.ShowTxtSubNo = ko.observable(false);

    self.Months = ko.observableArray([
        { 'MonthID': 1, 'MonthName': 'Baisakh' },
        { 'MonthID': 2, 'MonthName': 'Jestha' },
        { 'MonthID': 3, 'MonthName': 'Ashad' },
        { 'MonthID': 4, 'MonthName': 'Shrawan' },
        { 'MonthID': 5, 'MonthName': 'Bhadra' },
        { 'MonthID': 6, 'MonthName': 'Aswin' },
        { 'MonthID': 7, 'MonthName': 'Kartik' },
        { 'MonthID': 8, 'MonthName': 'Mangsir' },
        { 'MonthID': 9, 'MonthName': 'Poush' },
        { 'MonthID': 10, 'MonthName': 'Magh' },
        { 'MonthID': 11, 'MonthName': 'Falgun' },
        { 'MonthID': 12, 'MonthName': 'Chaitra' }
    ]);

    self.CostCenters = ko.observableArray([]);
    var entryby = $("#user").text();
    self.EntryBy = ko.observable(entryby);
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();


    /*******************************Load Office Start************************************************/
    $.ajax({
        dataType: "json",
        url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
        data: { 'method': 'GetAllOffice', 'OfficeCode': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        //        success: data=> self.Offices(data.ResponseData.map(item=>new office(item))),
        success: function (result) {
            //        console.log(ko.toJS(result));
            var mappedTask = $.map(result.ResponseData, function (item) {
                return new Office(item)
            });
            self.Offices(mappedTask);
        },
        error: err => msg("Oops! Error Occured While Obtaining Offices!!", "WARNING")

    });


    /*******************************Load Office End************************************************/

    /*******************************Cost Center Load Start*****************************************/

    self.GetCostCenter = function () {
        if (ko.toJS(self.SelectedOffice()) != undefined)
            var officeCD = ko.toJS(self.SelectedOffice()).OfficeCode;

        else
            officeCD = null;
        $.ajax({
            dataType: "json",
            url: '/Handlers/FAMS/CostCenterHandler.ashx',
            data: { 'method': 'GetCostCenter', 'officeCode': officeCD, 'CostCenterID': null },
            contentType: "application/json; charset=utf-8",
            async: false,
            cache: false,
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new CostCenter(item)
                });
                self.CostCenters(mappedTask);
            },
            error: function (err) {
                msg("Oops! Error Occured While Obtaining CostCenters!!", "WARNING")
            }
        });
    };

    self.GetEmpAttBySubmissionNo = function () {
        self.SubmissionNo(getUrlParamVal('SubmissionNumber') || self.SubmissionNo());
        var editable = getUrlParamVal('Editable');
        if (!self.SubmissionNo()) {
            return;
        } else {
            if (editable == 'Y') {
            }
            else {
                $('button').hide();
                $('form').find('input, select').attr('disabled', 'disabled');
            }

            $.ajax({
                dataType: "json",
                url: '../../../Handlers/PIS/EmployeeAttendanceHandler.ashx',
                data: { 'method': 'GetEmployeeDetBySubmissionNo', 'SubmissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (result) {
                    var res = result.ResponseData;
                    if (res.length > 0) {
                        var office = self.Offices().filter(x => x.OfficeCode() === res[0].OfficeCD)[0];
                        var costCenter = self.CostCenters().filter(x => x.CostCenterID() === res[0].CostCenterID)[0];
                        var month = self.Months().filter(x => x.MonthID === res[0].Month)[0];
                        console.log(res);
                        if (res[0].RStatus == 'T') {
                            msg("Data Verified Sucessfully !!!", "WARNING")
                        } else if (res[0].RejRemarks) {
                            var mssg = "Rejected For these Reasons!!!" + res[0].RejRemarks;
                            msg(mssg, "WARNING");
                        }
                        self.SelectedOffice(office);
                        self.GetCostCenter();
                        self.SelectedCostCenter(costCenter);
                        self.SelectedMonth(month);
                        self.Year(res[0].Year);
                        self.Employees(res.map(x => {
                            x.OfficeCD = x.OfficeCD || self.SelectedOffice().OfficeCode;
                            x.CostCenterID = self.SelectedCostCenter() ? self.SelectedCostCenter().CostCenterID : null;
                            x.RStatus = x.RStatus || 'F';
                            x.EntryBy = x.EntryBy || self.EntryBy();
                            x.EntryDate = x.EntryDate || self.EntryDate();
                            x.Action = x.AttDays ? 'N' : 'A';
                            return new Employee(x);
                        }));
                        if (getUrlParamVal('SubmissionNumber')) {
                            $('button').hide();
                        }
                    } else {
                        msg("Oops! Error Occured While Obtaining Employee Details!!!", "WARNING");
                    }
                },
                error: function (err) {
                    msg("Oops! Error Occured While Obtaining Employee Details!!!", "WARNING");
                }
            });
        }
    };

    self.GetEmpAttBySubmissionNo();

    /*******************************Cost Center Load End*****************************************/


    /*******************************Validation Check*********************************************/

    self.Validation = function () {
        var errMsg = "";
        if (!self.SelectedOffice()) {
            errMsg += "Please Select Office !!!<br>";
        }

        if (!self.Year()) {
            errMsg += "Please Enter Year !!!<br>";
        }

        if (!self.SelectedMonth()) {
            errMsg += "Please Select Month !!!<br>";
        }

        if (errMsg) {
            msg(errMsg, "WARNING");
            return false;
        } else {
            return true;
        }
    }
    /*******************************Validation Check End*********************************************/
    self.EditAttendance = function (data, e) {
        data.Action(data.Action() === 'A' ? 'A' : 'E');
        return true;
    };
    self.SetWorkingDaysasAttDay = function (data, e) {
        data.WorkingDays(data.AttDays());
    };
    self.SetWorkingDaysBasedOnLeaveDaysDeducted = function () {
        var url = '../../../Handlers/PIS/EmployeeAttendanceHandler.ashx';
        var data = {
            'method': 'GetWorkingDays',
            'Year': self.Year(),
            'MonthID': self.SelectedMonth().MonthID
        };
        $.get(url, data, function (result) {
            var obj = jQuery.parseJSON(result);
            if (obj.IsSucess) {
                console.log('Response Data', obj.ResponseData.Value);
                self.WorkingDays(obj.ResponseData.Value);
            }
            else {

                //msg("ओहो! !!!", "WARNING");
            }
        });
    }

    self.SaveAtt = function () {
        if (self.Validation()) {
            var costID = null;
            if (self.SelectedCostCenter()) {
                costID = ko.toJS(self.SelectedCostCenter()).CostCenterID;
            }
            console.log(ko.toJS(self.Employees()));
            var url = '../../../Handlers/PIS/EmployeeAttendanceHandler.ashx';
            var args = ko.toJS(ko.toJS(self.Employees()).map(x => new Employee(x)));
            var data = {
                'method': 'SaveEmpAttendance',
                'args': JSON.stringify(args),
                'Year': self.Year(),
                'MonthID': self.SelectedMonth().MonthID
            };
            $.post(url, data, function (result) {
                var obj = jQuery.parseJSON(result);
                if (obj.IsSucess) {
                    msg(obj.Message, "SUCCESS");
                    //self.ClearControls();
                }
                else {
                    msg("Oops Error Occured While Saving Employee Atendance Data!!!", "WARNING");
                }
            });
        }

    };

    self.ClearControls = function () {
        self.SelectedOffice('');
        self.Employees([]);
        self.Year(null);
        self.SelectedMonth(null);
        self.WorkingDays(null);
    };

    ko.computed(function () {
        return self.WorkingDays();
    }).subscribe(function (val) {
        if (val !== null && val !== undefined && val.length > 0) {
            self.Employees().forEach(emp => {
                emp.WorkingDays(val);
                //emp.AttDays(val);
                emp.Action(emp.Action() == 'A' ? 'A' : 'E');
            });
        }
        else {
            self.ShowEmployee();
        }
    });

    self.showWorkingDays = ko.computed(function () {
        return self.Employees().length > 0;
    });

    self.showSubmit = ko.computed(function () {
        return self.Employees().length > 0 && !getUrlParamVal('SubmissionNumber') && self.Employees()[0].RStatus() !== 'T';
    });

    self.SearchResult = function () {
        if (!self.ShowTxtSubNo()) {
            self.ShowTxtSubNo(!self.ShowTxtSubNo());
        } else {
            self.GetEmpAttBySubmissionNo();
        }
    }

    self.ShowEmployee = function () {
        if (self.Validation()) {
            var costID = null;
            if (self.SelectedCostCenter()) {
                costID = ko.toJS(self.SelectedCostCenter()).CostCenterID;
            }
            var data = {
                method: 'GetEmpAttendance',
                'officeCD': ko.toJS(self.SelectedOffice()).OfficeCode,
                'CostCenterID': costID,
                'Year': self.Year(),
                'MonthID': self.SelectedMonth().MonthID
            };
            var url = "../../../Handlers/PIS/EmployeeAttendanceHandler.ashx";
            $.ajax({
                dataType: "json",
                url,
                data,
                contentType: "application/json; charset=utf-8",
                async: false,
                cache: false,
                success: function (result) {
                    var res = result.ResponseData;
                    console.log(res);
                    if (res[0] !== undefined && res[0].RStatus === 'T') {
                        msg("This Data Already Verified !!!", "WARNING")
                    } //else {//if (res[0] !== undefined && res[0].RejRemarks) {
                    //	//var mssg = "यसले निम्न कारणको लागि अस्वीकार गर्यो  !!!" + res[0].RejRemarks;
                    //	// msg(mssg,"WARNING");
                    //	msg("कर्मचारिको वेतन प्राप्त गर्दा त्रुटिहरु देखिए ! ", "WARNING");
                    //                  }
                    self.Employees(res.map(x => {
                        x.OfficeCD = self.SelectedOffice().OfficeCode;
                        x.CostCenterID = self.SelectedCostCenter() ? self.SelectedCostCenter().CostCenterID : null;
                        x.RStatus = x.RStatus || 'F';
                        x.EntryBy = x.EntryBy || self.EntryBy();
                        x.EntryDate = x.EntryDate || self.EntryDate();
                        x.Action = x.Action || 'N';

                        return new Employee(x);
                    }));
                    self.Employees().forEach(emp => {
                        emp.WorkingDays(self.WorkingDays());
                    });
                },
                error: function (err) {
                    msg("Oops! Error Occured During Verification !!!", "WARNING");
                }
            });
        }
    }

    ko.bindingHandlers.numeric = {
        init: function (element, valueAccessor) {
            $(element).on("keydown", function (event) {
                // Allow: backspace, delete, tab, escape, and enter
                if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
                    // Allow: Ctrl+A
                    (event.keyCode == 65 && event.ctrlKey === true) ||
                    // Allow: . ,
                    (event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) ||
                    // Allow: home, end, left, right
                    (event.keyCode >= 35 && event.keyCode <= 39)) {
                    // let it happen, don't do anything
                    return;
                }
                else {
                    // Ensure that it is a number and stop the keypress
                    if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                        event.preventDefault();
                    }
                }
            });
        }
    };

};

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new EmployeeAttendanceFormViewModel());

});