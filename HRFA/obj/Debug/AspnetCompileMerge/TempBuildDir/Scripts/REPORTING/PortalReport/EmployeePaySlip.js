function EmployeePaySlip() {
    if (data != undefined) {
        var self = this;
        self.OFFICE_CD = ko.observable(data.OFFICE_CD);
        self.OFFICE_NAME_NEPALI = ko.observable(data.OFFICE_NAME_NEPALI);
        self.SAL_YEAR = ko.observable(data.SAL_YEAR);
        self.SAL_MONTH = ko.observable(data.SAL_MONTH);
        self.EMP_ID = ko.observable(data.EMP_ID);
        self.EMP_NAME = ko.observable(data.EMP_NAME);
        self.SALARY = ko.observable(data.SALARY);
        self.GRADE_AMOUNT = ko.observable(data.GRADE_AMOUNT);
        self.PF = ko.observable(data.PF);
        self.BARSIK_UTSAB_ALLOWANCE = ko.observable(data.BARSIK_UTSAB_ALLOWANCE);
        self.WATER_AND_SEWAGE = ko.observable(data.WATER_AND_SEWAGE);
        self.DRESS_ALLOWANCE = ko.observable(data.DRESS_ALLOWANCE);
        self.SAWARI_TAX = ko.observable(data.SAWARI_TAX);
        self.RESIDENCE_TAX = ko.observable(data.RESIDENCE_TAX);
        self.DEARNESS_ALLOWANCE = ko.observable(data.DEARNESS_ALLOWANCE);
        self.NLK = ko.observable(data.NLK);
        self.SSF = ko.observable(data.SSF);
        self.INCOME_TAX = ko.observable(data.INCOME_TAX);
        self.KHAJA = ko.observable(data.KHAJA);
        self.YATAYAT = ko.observable(data.YATAYAT);
        self.A = ko.observable(data.A);
        self.D = ko.observable(data.D);
        self.POST_DESC = ko.observable(data.POST_DESC);
        self.GRADE_MONTH = ko.observable(data.GRADE_MONTH);
        self.GRADE_NUMBER = ko.observable(data.GRADE_NUMBER);
        self.PF_NUMBER = ko.observable(data.PF_NUMBER);
        self.CIT_NUMBER = ko.observable(data.CIT_NUMBER);
        self.ACCOUNT_NO = ko.observable(data.ACCOUNT_NO);
        self.BANK = ko.observable(data.BANK);
        self.ATTENDANCE_DAYS = ko.observable(data.ATTENDANCE_DAYS);
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

function EmployeePaySlipViewModel() {
	var self = this;
	self.SelectedMonth = ko.observable();
    self.Year = ko.observable();
    self.SelectedFiscalYear = ko.observable();
    self.FiscalYears = ko.observableArray([]);
    self.ShowReport = ko.observable(false);
    self.EmployeePaySlips = ko.observableArray([]);
    self.Salaries = ko.observableArray([]);

	self.Months = ko.observableArray([
		{ 'MonthID': 1, 'MonthName': 'Baisakh' },
		{ 'MonthID': 2, 'MonthName': 'Jestha' },
		{ 'MonthID': 3, 'MonthName': 'Ashad' },
		{ 'MonthID': 4, 'MonthName': 'Shrawan' },
		{ 'MonthID': 5, 'MonthName': 'Bhadra' },
		{ 'MonthID': 6, 'MonthName': 'Aashwin' },
		{ 'MonthID': 7, 'MonthName': 'Kartik' },
		{ 'MonthID': 8, 'MonthName': 'Mangsir' },
		{ 'MonthID': 9, 'MonthName': 'Poush' },
		{ 'MonthID': 10, 'MonthName': 'Magh' },
		{ 'MonthID': 11, 'MonthName': 'Falgun' },
		{ 'MonthID': 12, 'MonthName': 'Chaitra' }
    ]);

    function FiscalYear(data) {
        var self = this;
        if (data != undefined) {
            self.FiscalYearID = ko.observable(data.FiscalYearID);//FISCAL_YR_ID
            self.FiscalYearName = ko.observable(data.FiscalYearName);//FISCAL_YEAR
            self.IsActive = ko.observable(data.IsActive);//ISACTIVE      
            self.Action = ko.observable(data.Action);
        }
    }

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

	self.ViewReport = function () {
		if (self.Validation()) {

            self.officeCD = $("#officeCD").text();
            self.empID = $("#empID").text();
            var selMonth = self.SelectedMonth();
            var selYear = self.Year();


            debugger;
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/FAMS/SalarySheetHandler.ashx',
                data: {
                    'method': 'GetSalary', 'officeCode': self.officeCD, 'year': ko.toJS(self.SelectedFiscalYear()).FiscalYearName, 'month': self.SelectedMonth().MonthID, 'empID': self.empID
                },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {

                    var mappedTask = $.map(data.ResponseData, function (item) {
                        return new Salary(item)
                    });

                    self.Salaries(mappedTask);
                    self.ShowReport(true);
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
		}
	};


	self.Validation = function () {
		var ErrMsg = '';

        if (!self.SelectedFiscalYear()) {
			ErrMsg += 'Please Enter Year<br>';
		}
		if (!self.SelectedMonth()) {
			ErrMsg += 'Please Select Month<br>';
		}
		if (ErrMsg) {
			msg(ErrMsg, "WARNING");
			return false;
		} else {
			return true;
		}
	};

	self.Cancel = function () {
		self.Year(null);
        self.SelectedMonth(null);
	};
}


$(document).ready(function () {
	PortalValidateSession();
	ko.applyBindings(new EmployeePaySlipViewModel());
});