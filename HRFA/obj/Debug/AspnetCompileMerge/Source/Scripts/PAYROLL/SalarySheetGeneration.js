function Office(data) {
    var self = this;
    if (data != undefined) {
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

var SalarySheetGenerationViewModel = function () {

    var self = this;
    self.Year = ko.observable();
    
    self.FiscalYears = ko.observableArray([]);
    self.SelectedFiscalYear = ko.observable();    
    self.SelectedOffice = ko.observable();
    self.SelectedMonth = ko.observable();
    self.EmpID = ko.observable();
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
            self.Year(YearFromFisclaYear);          
        }
    })

    self.SelectedCostCenter = ko.observable();
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
    self.Offices = ko.observableArray([]);
    self.Months = ko.observableArray([
        { 'MonthID': 1, 'MonthName': 'Baisakh' },
        { 'MonthID': 2, 'MonthName': 'Jestha' },
        { 'MonthID': 3, 'MonthName': 'Ashad' },
        { 'MonthID': 4, 'MonthName': 'Shrawan' },
        { 'MonthID': 5, 'MonthName': 'Bhadra' },
        { 'MonthID': 6, 'MonthName': 'Aaswin' },
        { 'MonthID': 7, 'MonthName': 'Kartik' },
        { 'MonthID': 8, 'MonthName': 'Mangsir' },
        { 'MonthID': 9, 'MonthName': 'Poush' },
        { 'MonthID': 10, 'MonthName': 'Magh' },
        { 'MonthID': 11, 'MonthName': 'Falgun' },
        { 'MonthID': 12, 'MonthName': 'Chaitra' }
    ]);

    self.SalarySheets = ko.observableArray([]);
    var entryby = $("#user").text();
    self.EntryBy = ko.observable(entryby);

    //Load Office
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
        data: { 'method': 'GetAllOffice', 'officeCode': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Office(item)

            });
            self.Offices(mappedTask);

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText);
        }
    });


    self.GenerateSalarySheet = function () {
        if (self.Validation()) {
            if (ko.toJS(self.SelectedOffice) == undefined) {

            }
            else {
                var office = ko.toJS(self.SelectedOffice);
                var officeCode = office.OfficeCode;
                //var empID = ko.toJS(self.EmpID);
                //var costCenterID= costcenter.CostCenterID;
                var month = ko.toJS(self.SelectedMonth);
                //var year = ko.toJS(self.SelectedFiscalYear).FiscalYearName;
                var monthid = month.MonthID;
                //debugger;
                $.ajax({
                    dataType: "json",
                    url: '../../Handlers/FAMS/SalarySheetHandler.ashx',
                    data: {
                        'method': 'GenerateSalary', 'officeCode': officeCode,
                        //'CostCenterID': costCenterID,
                        'year': ko.toJS(self.SelectedFiscalYear).FiscalYearName, 'month': monthid
                        //, 'empID': empID

                    },
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    success: function (data) {
                        var test = data;
                        if (data.IsSucess) {
                            if (data.ResponseData.length > 0) {
                                self.SaveSalarySheet(data.ResponseData);
                            }

                            else {
								msg("Required data not found.");                                
                            }
                        }
                        else {
                            msg(data.Message);
                            self.Year('');
                            self.SelectedMonth('');
                        }
                    },
                    error: function (err) {
                        msg(err.status + " - " + err.statusText);
                    }
                });
            }
        } 
	}
	
    self.SaveSalarySheet = function (data) {
        for (var i = 0; i < data.length; i++) {
            var salarysheet =
            {
                EmpID: data[i].EmpID,
                //IncomeTaxAmount: data[i].IncomeTaxAmount,
                //BasicSalary: data[i].BasicSalary,
                //CIT: data[i].CIT,
                //PF: data[i].PF,
                //Insurance: data[i].Insurance,
                //Gender: data[i].Gender,
                //AttendedDays: data[i].AttendedDays,
                //GradeAmount: data[i].GradeAmount,
                //TaxIncome: data[i].TaxIncome,
                //TotalSalary: data[i].TotalSalary,
                //Allowance: data[i].Allowance,
                OfficeCode: data[i].OfficeCode,
                PostID: data[i].PostID,
                DepartmentID: data[i].DepartmentID,
                SalaryYear: data[i].SalaryYear,
                SalaryMonth: data[i].SalaryMonth,
                SalaryItemID: data[i].SalaryItemID,
                Amount: data[i].Amount,
                EditedAmount: data[i].EditedAmount,
                EntryBy: self.EntryBy(),
                EntryDate: "",
                RStatus: "F",
                Action: "A"
            };

                self.SalarySheets.push(salarysheet);
		}
		
        var url = "../../Handlers/FAMS/SalarySheetHandler.ashx";
        var method = "SaveSalarySheet";

        var data = { 'method': method, 'args': JSON.stringify(ko.toJS(self.SalarySheets)) };
        $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
                                            msg(obj.Message);
                                            self.ClearControls();
                                        }
                                        else {
                                            msg(obj.Message, "WARNING");
                                        }

                                    });
        self.SalarySheets([]);
    }

    self.PrintSalarySheet = function () {
        if (self.Validation()) {
            var data = {
                OfficeCode: ko.toJS(self.SelectedOffice).OfficeCode,
                CostCenterID:  ko.toJS(self.SelectedCostCenter).CostCenterID,
                Year: self.Year(),
                Month: ko.toJS(self.SelectedMonth).MonthID
            }
            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);
            var url = "../../../Reporting/PAYROLL/ReportHandlers/SalarySheetReportHandler.ashx";
            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);
        }
    }

    self.Validation = function () {
        var errMsg = "";

        if (self.SelectedOffice() == undefined) {
            errMsg += "Please select office!!<br>";
        }
        if (Validate.empty(self.Year())) {
            errMsg += "Please fill year !!!<br>";
        }
        if (self.SelectedMonth() == undefined) {
            errMsg += "Please select month !!!<br>";
        }

        if (self.SelectedFiscalYear() != undefined && self.Year().length < 4) {
            errMsg += "Please select Fiscal Year!!!<br>. Year value: " + self.Year();
        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }
    }

    self.ClearControls = function () {
        self.SelectedOffice('');
        self.Year('');
        self.SelectedMonth('');
    }
}

$(document).ready(function () {

    ValidateSession();
    var ssgvm = new SalarySheetGenerationViewModel();
    ko.applyBindings(ssgvm);

    $('#txtYear').keydown(function (e) {
        if ($('#txtYear').val().length >= 4) {
            if (e.keyCode != 8)
                e.preventDefault();
        }
    });
});