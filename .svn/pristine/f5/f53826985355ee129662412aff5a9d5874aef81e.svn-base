

function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function CostCenter(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.CostCenterID = ko.observable(data.CostCenterID);
        self.CostCenterName = ko.observable(data.CostCenterName);
        self.CostCenterNameEng = ko.observable(data.CostCenterNameEng);

        self.Status = ko.observable(data.Status);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Action = ko.observable(data.Action);
    }
}

function SalaryItem(data) {
    var self = this;
    if (data != undefined) {
        self.SalaryItemID = ko.observable(data.SalaryItemID);
        self.SalaryItemDesc = ko.observable(data.SalaryItemDesc);
    }
}


function EmpSalaryItem(data) {
    var self = this;
    if (data != undefined) {
        self.SubmissionNo = ko.observable(data.SubmissionNo);
        self.SalaryItemID = ko.observable(data.SalaryItem.SalaryItemID);
        self.SalaryItemDesc = ko.observable(data.SalaryItem.SalaryItemDesc);
        self.OrignalAmount = ko.observable(data.OrignalAmount);
        self.EditedAmount = ko.observable(data.EditedAmount);
        self.SalaryYear = ko.observable(data.SalaryYear);
        self.SalaryMonth = ko.observable(data.SalaryMonth);
        self.PostID = ko.observable(data.PostID);
        self.PFromDate = ko.observable(data.PFromDate);
        self.EFromDate = ko.observable(data.EFromDate);
    }
}

function Employee(data) {
    var self = this;
    if (data != undefined) {
        self.EmpID = ko.observable(data.EmpID);
        self.EmployeeName = ko.observable(data.EmployeeName);
        self.EmpSalaryItem = ko.observable(data.SalarySheet);
    }
}


var SalarySheetAdjustmentViewModel = function () {

    var self = this;

	self.Year = ko.observable();
	self.enableOffice = false;
	self.EnableMonth = function (value) {
		enableOffice = true;
		

	};
	
    self.Amount = ko.observable();
    self.SubmissionNo = ko.observable();
    self.EmpSubmissionNo = ko.observable();
    self.EmpFromDate = ko.observable();
    self.EmpPostID = ko.observable();
    self.EmpID = ko.observable();
    self.EmpYear = ko.observable();
    self.EmpMonth = ko.observable();

    self.SelectedOffice = ko.observable();
    self.SelectedMonth = ko.observable();
    self.SelectedEmployee = ko.observable();
    self.SelectedSalaryItem = ko.observable();
    self.SelectedEmpSalaryItem = ko.observable();
    self.SelectedCostCenter = ko.observable();

    self.Offices = ko.observableArray([]);
    self.Employees = ko.observableArray([]);
    self.SalaryItems = ko.observableArray([]);
    self.EmpSalaryItems = ko.observableArray([]);
    self.SalarySheets = ko.observableArray([]);
    self.SalarySheetDetails = ko.observableArray([]);
    self.CostCenters = ko.observableArray([]);
    self.Months = ko.observableArray([
        { 'MonthID': 1, 'MonthName': 'Baisakh' },
        { 'MonthID': 2, 'MonthName': 'Jestha' },
        { 'MonthID': 3, 'MonthName': 'Ashad' },
        { 'MonthID': 4, 'MonthName': 'Sharawan' },
        { 'MonthID': 5, 'MonthName': 'Bhadra' },
        { 'MonthID': 6, 'MonthName': 'Aaswin' },
        { 'MonthID': 7, 'MonthName': 'Kartik' },
        { 'MonthID': 8, 'MonthName': 'Mangsir' },
        { 'MonthID': 9, 'MonthName': 'Poush' },
        { 'MonthID': 10, 'MonthName': 'Magh' },
        { 'MonthID': 11, 'MonthName': 'Falgun' },
        { 'MonthID': 12, 'MonthName': 'Chaitra' }
    ]);

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


    //Load Salary Item
    $.ajax({
        dataType: "json",
        url: '../../Handlers/PAYROLL/SalaryItemHandler.ashx',
        data: { 'method': 'GetSalaryItem', 'SalaryItems': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new SalaryItem(item)

            });
            self.SalaryItems(mappedTask);

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText);
        }
    });

    self.GetData = function () {
        self.GetCostCenter();
        self.GetYearAndMonth();
        self.GetSalaryByOffice();
    };

    self.GetCostCenter = function () {
        if (ko.toJS(self.SelectedOffice()) != undefined) {
            var OfficeCD = ko.toJS(self.SelectedOffice()).OfficeCode;
        }
        else OfficeCD = null;
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '/Handlers/FAMS/CostCenterHandler.ashx',

            data: { 'method': 'GetCostCenter', 'officeCode': OfficeCD, 'CostCenterID': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new CostCenter(item)
                });
                self.CostCenters(mappedTask);


            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });

    }


    self.GetYearAndMonth = function () {
        if (ko.toJS(self.SelectedOffice) == undefined) {
            self.Employees([]);
            self.EmpSubmissionNo('');
            self.Year('');
            self.SelectedMonth('');
            self.Amount('');
            self.SelectedSalaryItem('');
        }
        else {
            var office = ko.toJS(self.SelectedOffice);
            var officeCode = office.OfficeCode;
            $.ajax({
                dataType: "json",
                url: '../../Handlers/FAMS/SalarySheetHandler.ashx',
                data: { 'method': 'GetYearAndMonth', 'officeCode': officeCode },
                contentType: "application/json; charset=utf-8",
                async: false,
				success: function (data) {

                    if (data == 'null') {
						msg('Salary sheet is not generated! Please generate!!');
                        return false;
                    }

                    if (data.ResponseData != null) {
                        self.Year(data.ResponseData.SalaryYear);
                        for (var i = 0; i < self.Months().length; i++) {
                            if (ko.toJS(self.Months)[i].MonthID == data.ResponseData.SalaryMonth) {
                                self.SelectedMonth(self.Months()[i]);
                            }
                        }
                        self.GetSalaryByOffice();
                    }
                    else {
                        self.Employees([]);
                        self.EmpSubmissionNo('');
                        self.Year('');
                        self.SelectedMonth('');
                        self.Amount('');
                        self.SelectedSalaryItem('');
                    }

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });
        }
    }




    self.GetSalaryItemByEmpID = function () {
        if (ko.toJS(self.SelectedEmployee) == undefined) {
            self.EmpSalaryItems([]);
        }
        else {
            for (var i = 0; i < self.Employees().length; i++) {
                if (self.Employees()[i].EmpID() == ko.toJS(self.SelectedEmployee).EmpID) {
                    var mappedTask = $.map(ko.toJS(self.Employees)[i].EmpSalaryItem, function (item) {

                        return new EmpSalaryItem(item)

                    });
                    self.EmpSalaryItems(mappedTask);
                }
            }

        }
    }


    self.GetSalaryDetails = function () {
        if (ko.toJS(self.SelectedEmpSalaryItem) == undefined) {
            self.Amount('');
        }

        else {
            var salaryitem = ko.toJS(self.SelectedEmpSalaryItem);
            var salaryitemid = salaryitem.SalaryItemID;

            for (var i = 0; i < self.EmpSalaryItems().length; i++) {
                if (ko.toJS(self.EmpSalaryItems)[i].SalaryItemID == salaryitemid) {
                    self.Amount(ko.toJS(self.EmpSalaryItems)[i].EditedAmount);
                }
            }
        }
    }

    self.GetSalaryByOffice = function () {
        if (ko.toJS(self.SelectedOffice) == undefined) {
            self.EmployeeSalaries([]);
        }
        else {
            var office = ko.toJS(self.SelectedOffice);
            var officecode = office.OfficeCode;
			var month = ko.toJS(self.SelectedMonth);
			
            var monthid = month.MonthID;
            var costCenter = self.SelectedCostCenter() ? self.SelectedCostCenter().CostCenterID() : null;
            $.ajax({
                dataType: "json",
                url: '../../Handlers/FAMS/SalarySheetHandler.ashx',
                data: { 'method': 'GetSalaryByOffice', 'officeCode': officecode, 'costCenterID': costCenter, 'year': self.Year(), 'month': monthid },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    console.log(data);

                    if (data.ResponseData.length > 0) {
                        var mappedTask = $.map(data.ResponseData, function (item) {

                            return new Employee(item)

                        });
                        self.Employees(mappedTask);
                        self.EmpSubmissionNo(data.ResponseData[0].SubmissionNo);
                    }
                    else {
                        self.Employees([]);
                        self.EmpSalaryItems([]);
                        self.EmpSubmissionNo('');
                    }

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });
        }
    }



    self.GetSalarySheetBySubNo = function () {
        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');
        if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
            return;
        }

        else {

            $.ajax({
                dataType: "json",
                url: '../../Handlers/FAMS/SalarySheetHandler.ashx',
                data: { 'method': 'GetSalarySheetBySubmissionNo', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    console.log(data.ResponseData);
                    if (data.ResponseData == null) {
                         msg("No data in Submission number","WARNING");
                        self.EmpSubmissionNo('');
                    }

                    else {
                        self.Year(data.ResponseData.SalaryYear);
                        for (var i = 0; i < self.Months().length; i++) {
                            if (data.ResponseData.SalaryMonth == self.Months()[i].MonthID) {
                                self.SelectedMonth(self.Months()[i]);
                            }
                        }
                        for (var i = 0; i < self.Offices().length; i++) {
                            if (data.ResponseData.Office.OfficeCode == self.Offices()[i].OfficeCode()) {
                                self.SelectedOffice(self.Offices()[i]);
                            }
                        }
                        $("#ddlOffice").attr("disabled", "disabled");

                        self.GetSalaryByOffice();
                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });

        }
    }

    self.GetSalarySheetBySubNo();


    self.InitiateVerification = function () {
        if (self.VerifyValidation()) {
            var url = "../../Handlers/FAMS/SalarySheetHandler.ashx";
            var method = "InitiateVerification";

            var appID = "FAMS";
            var modID = "EMPSAL";

            var verifylog = {
                'OldSubmissionNo': self.SubmissionNo(),
                'SubmissionNo': self.EmpSubmissionNo(),
                'EntryBy': self.EntryBy()
            }

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(verifylog)), 'appID': appID, 'modID': modID };
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
        }
    }


    self.AdjustSalarySheet = function () {
        if (self.Amount == null || self.Amount == "") {
            msg("Please fill amount !!!");
        }
        else if (ko.toJS(self.SelectedEmpSalaryItem) == undefined) {
            msg("Please select employee salary!!!");
        }
        else {
            var office = {
                OfficeCode: ko.toJS(self.SelectedOffice).OfficeCode,
                OfficeNameNep: ko.toJS(self.SelectedOffice).OfficeNameNep
            }

            var salaryitem = {
                SalaryItemID: ko.toJS(self.SelectedEmpSalaryItem).SalaryItemID,
                SalaryItemDesc: ko.toJS(self.SelectedEmpSalaryItem).SalaryItemDesc
            };

            var salarysheet = {
                SubmissionNo: ko.toJS(self.SelectedEmpSalaryItem).SubmissionNo,
                EmpID: ko.toJS(self.SelectedEmployee).EmpID,
                SalaryYear: ko.toJS(self.SelectedEmpSalaryItem).SalaryYear,
                SalaryMonth: ko.toJS(self.SelectedEmpSalaryItem).SalaryMonth,
                SalaryItem: salaryitem,
                OrignalAmount: ko.toJS(self.SelectedEmpSalaryItem).OrignalAmount,
                EditedAmount: self.Amount(),
                Office: office,
                PostID: ko.toJS(self.SelectedEmpSalaryItem).PostID,
                PFromDate: ko.toJS(self.SelectedEmpSalaryItem).PFromDate,
                EFromDate: ko.toJS(self.SelectedEmpSalaryItem).EFromDate,
                EntryBy: self.EntryBy(),
                EntryDate: "",
                RStatus: "F",
                Action: "E",
                CostCenter: self.SelectedCostCenter()
            };

            self.SalarySheets.push(salarysheet);

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
        }
    }


    self.SaveNewItem = function () {
        if (ko.toJS(self.SelectedEmployee) == undefined) {
            msg("Please select employee!!!");
        }
        else if (ko.toJS(self.SelectedSalaryItem) == undefined) {
            msg("Please select salary!!!");
        }
        else if (Validate.empty(self.Amount())) {
            msg("Please fill amount!!!");
        }

        else {
            for (var i = 0; i < ko.toJS(self.EmpSalaryItems).length; i++) {
                if (ko.toJS(self.EmpSalaryItems)[i].SalaryItemID == ko.toJS(self.SelectedSalaryItem).SalaryItemID) {
                    msg("Data already exists.");
                    return;
                }
            }

            var office = {
                OfficeCode: ko.toJS(self.SelectedOffice).OfficeCode,
                OfficeNameNep: ko.toJS(self.SelectedOffice).OfficeNameNep
            }

            var salaryitem = {
                SalaryItemID: ko.toJS(self.SelectedSalaryItem).SalaryItemID,
                SalaryItemDesc: ko.toJS(self.SelectedSalaryItem).SalaryItemDesc
            }

            var salarysheet = {
                SubmissionNo: self.EmpSubmissionNo(),
                EmpID: ko.toJS(self.SelectedEmployee).EmpID,
                SalaryYear: self.Year(),
                SalaryMonth: ko.toJS(self.SelectedMonth).MonthID,
                SalaryItem: salaryitem,
                OrignalAmount: self.Amount(),
                EditedAmount: self.Amount(),
                Office: office,
                PostID: null,
                PFromDate: "",
                EFromDate: "",
                EntryBy: self.EntryBy(),
                EntryDate: "",
                RStatus: "F",
                Action: "A",
                CostCenter: self.SelectedCostCenter()
            }

            //self.EmpSalaryItems.push(salaryitem);

            self.SalarySheets.push(salarysheet);

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
        }
    }

    self.clearSelectedEmpSalary = function () {
        self.SelectedEmpSalaryItem(null);
        console.log('asdf');
    };

    self.ClearControls = function () {
        self.Employees([]);
        self.SalarySheets([]);
        self.SelectedSalaryItem('');
        self.GetSalaryByOffice();

    }

    self.VerifyValidation = function () {
        var errMsg = "";

        if (self.Employees().length > 0) {

        }
        else {
            errMsg += "Please select salarysheet generated office!!!<br>";
        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }


    }

    self.PrintSalarySheet = function () {
        //if (self.VerifyValidation()) {
        var OfficeCD = ko.toJS(self.SelectedOffice()).OfficeCode;
        if (self.SelectedCostCenter() != null) {
            var CostCenter = ko.toJS(self.SelectedCostCenter()).CostCenterID;
        }
        var data = {
            OfficeCode: OfficeCD,
            CostCenterID: CostCenter,
            Year: self.Year(),
            Month: ko.toJS(self.SelectedMonth).MonthID
        }
        var hght = screen.height;
        var left = (screen.width / 2) - (900 / 2);
        var url = "../../../Reporting/PAYROLL/ReportHandlers/SalarySheetAdjustmentReportHandler.ashx";
        var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
        OpenWindowWithPost(url, winOption, "NewFile", data);
        //}
    }


}

$(document).ready(function () {

	ValidateSession();

	
	//$("#txtYear").on('blur', function () {
	//	if ($("#txtYear").val() !== undefined && $("#txtYear").val() !== '') {
	//		$("#ddlMonth").removeAttr("disabled");
	//	}
	//});
	//$("#txtYear").on('focus', function () {
	//	$("#ddlMonth").attr("disabled", "disabled");
	//});

	//$("#ddlMonth").on('blur', function () {
	//	if ($("#ddlMonth").val() !== undefined && $("#ddlMonth").val() !== '') {
	//		$("#ddlOffice").removeAttr("disabled");
	//	}
	//});
	

	//$("#ddlOffice").attr("disabled", "disabled");
	//$("#Select2").attr("disabled", "disabled");
 //   $("#ddlMonth").attr("disabled", "disabled");
    var ssgam = new SalarySheetAdjustmentViewModel();
    ko.applyBindings(ssgam);

});
