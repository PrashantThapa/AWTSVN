function Office(data) {
    var self = this;
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    self.OfficeCode = ko.observable(data.OfficeCode);
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

function Salary(data) {
    var self = this;
    if (data != undefined) {
        self.EmpID = ko.observable(data.EmpID);
        self.PostID = ko.observable(data.PostID);
        self.PostDesc = ko.observable(data.PostDesc);
        self.DepartmentID = ko.observable(data.DepartmentID);
        self.DepartmentDesc = ko.observable(data.DepartmentDesc);
        self.SalaryYear = ko.observable(data.SalaryYear);
        self.SalaryMonth = ko.observable(data.SalaryMonth);
        self.OfficeCode = ko.observable(data.OfficeCode);
        //self.Amount = ko.observable(data.Amount);
        //self.EditedAmount = ko.observable(data.EditedAmount);
        self.PF = ko.observable(data.PF);
        self.TAXABLEINCOME = ko.observable(data.TAXABLEINCOME);
        self.ALLOWANCE = ko.observable(data.ALLOWANCE);
        self.INSURANCE = ko.observable(data.INSURANCE);
        self.BASIC_SALARY = ko.observable(data.BASIC_SALARY);
        self.INCOMETAX = ko.observable(data.INCOMETAX);
        self.LUNCH = ko.observable(data.LUNCH);
        self.ADVANCE = ko.observable(data.ADVANCE);
        self.SalaryItemDesc = ko.observable(data.SalaryItemDesc);
        self.FNAME_ENG = ko.observable(data.FNAME_ENG);
        
    }
}


function Post(data) {
    var self = this;
    if (data != undefined) {
        self.PostID = ko.observable(data.PostID);
        self.PostDesc = ko.observable(data.PostDesc);
    }
}
function PayrollReportViewModel() {
    var self = this;

    self.SelectedOffice = ko.observable([]);
    self.PostDesc = ko.observable();
    self.Posts = ko.observableArray([]);
    self.SelectedPost = ko.observable();
    self.SelectedMonth = ko.observable();
    self.SelectedFiscalYear = ko.observable();
    self.EmployeeName = ko.observable();

    self.SelectedMonth.subscribe(function (value) {
        if (value !== undefined && self.SelectedFiscalYear() !== undefined) {
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
    self.Year = ko.observable();
    self.FiscalYears = ko.observableArray([]);
    self.Salaries = ko.observableArray([]);
    //self.SelectedFiscalYear = ko.observableArray([]);
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

    self.ReportTypes = ko.observableArray([
        { 'ReportTypeID': '1', 'ReportTypeName': 'Employee Salary' },
        { 'ReportTypeID': '2', 'ReportTypeName': 'Salary Sheet Generation' },
        { 'ReportTypeID': '3', 'ReportTypeName': 'Salary Sheet Adjustment' },
        { 'ReportTypeID': '4', 'ReportTypeName': 'Salary Sheet Payment' }

    ]);
    self.SelectedReportType = ko.observable();
    self.SelectedCostCenter = ko.observable();

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

    self.OfficeArray = ko.observableArray([]);
    //self.CostCenters = ko.observable([]);
    self.CostCenters = ko.observable([]);

    self.GetOffice = function () {
        waitMsg("Loading");
        waitMsg.show();
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
            data: { 'method': 'GetAllOffice', 'args': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {

                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new Office(item)

                });
                self.OfficeArray(mappedTask);

                waitMsg.hide();

            },
			error: function (err) {
				msg("Oops! error occured while obtaining office code !!!", "WARNING");		
               // msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    };
    self.GetOffice();

    self.GetPost = function () {
        $.ajax({
            dataType: "json",
            url: '../../../Handlers/COMMON/PostHandler.ashx',
            data: { 'method': 'GetPost', 'postID': null },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {

                    return new Post(item)

                });
                self.Posts(mappedTask);


            },
            error: function (err) {
                //msg(err.status + " - " + err.statusText);
                msg("Oops! error occured while obtaining posts!!!", "WARNING");	
            }
        });
    }
    self.GetPost();


    self.Validation = function () {
        var errMsg = "";
        var val = self.SelectedReportType();
        //if (Validate.empty(val)) {
        //    errMsg += "Please select Report Type!!\n";
        //}
        if (Validate.empty(self.SelectedOffice())) {
            errMsg += "Please select office!!!\n";
        }
        if (Validate.empty(self.Year())) {
            errMsg += "Please select year!!\n";
        }
        if (Validate.empty(self.SelectedMonth())) {
            errMsg += "Please select month!\n";
        }

        if (errMsg == "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    self.GetValue = function () {
        self.ClearForm();

        $(".dropdown-selects").removeAttr('disabled');
        $("#ddlmonth").removeAttr('disabled');
        $('.reportForm').show();
        var val = self.SelectedReportType();
        if (Validate.empty(val)) {
            $('.reportForm').hide();
        }
        if (val == 1) {
            $('.yearmonth').show();
            $('.inPost').hide();
        }
        else {
            $('.yearmonth').show();
            $('.inPost').hide();
        }
        $('#btnCancel').show();
    }

    self.ViewReport = function () {
        
        var data;
        var url;
        if (self.Validation()) {
            //var val = self.SelectedReportType();
            var office = self.SelectedOffice().OfficeCode();
            //var costCenter = (self.SelectedCostCenter() == undefined) ? null : self.SelectedCostCenter().CostCenterID();
            //var post = (self.SelectedPost() == undefined) ? null : self.SelectedPost().PostID();
           
            data = {
                OfficeCode: office,
                //Year: self.Year(),
                Year: ko.toJS(self.SelectedFiscalYear()).FiscalYearName,
                Month: self.SelectedMonth().MonthID
                };
            console.log(data);
          
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/FAMS/SalarySheetHandler.ashx',
                data: {
                    'method': 'GetSalary', 'officeCode': office, 'year': ko.toJS(self.SelectedFiscalYear()).FiscalYearName, 'month': self.SelectedMonth().MonthID},
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    
                    var mappedTask = $.map(data.ResponseData, function (item) {
                        return new Salary(item)
                    });
                    
                    self.Salaries(mappedTask);
                    console.log(ko.toJS(mappedTask));
                },
                error: function (err) {
                    debugger;
                    //msg(err.status + " - " + err.statusText);
                    msg("Oops! error occured while obtaining posts!!!", "WARNING");
                }
            });

        }
        return false;
    }

    self.CancelReport = function () {
        self.SelectedOffice('');
        self.SelectedCostCenters('');
        //self.SelectedReportType('');
        self.Year('');
        self.SelectedMonth('');
        $('.inPost').show();
        $('.yearmonth').show();
    }

    self.ClearForm = function () {
        self.SelectedOffice('');
        self.Year('');
        self.SelectedMonth('');
    }
}
$(document).ready(function () {
    ValidateSession();
    $('.reportForm').hide();
    $(".dropdown-selects").attr('disabled', 'disabled');
    $("#ddlmonth").attr('disabled', 'disabled');
    $('#btnCancel').hide();
    ko.applyBindings(new PayrollReportViewModel());
});
