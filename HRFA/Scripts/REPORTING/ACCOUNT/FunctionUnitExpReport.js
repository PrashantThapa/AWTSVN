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
var FunctionUnitExpReportViewModel = function () {

    var self = this;
    self.Year = ko.observable();

    self.SelectedOffice = ko.observable();
    self.SelectedMonth = ko.observable();
    self.SelectedCostCenter = ko.observable();
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
    self.CostCenters = ko.observableArray([]);
    var entryby = $("#user").text();
    self.EntryBy = ko.observable(entryby);
    self.FromDate =  ko.observable();
    self.ToDate =  ko.observable();


    /******************************** Load Office End ***************************************/
    $.ajax({
        dataType: "json",
        url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
        data: { 'method': 'GetAllOffice', 'officeCode': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: data => self.Offices(data.ResponseData.map(item => new Office(item))),
        error: err => msg(err.status + " - " + err.statusText)
    });

    /******************************** Load Office End ***************************************/

    /******************************** Load CostCenter Start ***************************************/
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

    /******************************** Load CostCenter End ***************************************/

    /******************************** Print Start ***************************************/

    self.PrintFunctionUnit = function () {
        if (self.Validation()) {
            var CostID = self.SelectedCostCenter() || null;
            var data = {
                OfficeCode: ko.toJS(self.SelectedOffice()).OfficeCode,
                CostcenterID: CostID,
                Year:self.Year(),
                MonthID: ko.toJS(self.SelectedMonth()).MonthID,
                MonthName:ko.toJS(self.SelectedMonth()).MonthName
            };
            var hght = screen.height;
            var left = (screen.width / 2) - (900 / 2);
            var url = "../../../Reporting/Account/ReportHandlers/FunctionUnitExpReportHandler.ashx";
            var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            OpenWindowWithPost(url, winOption, "NewFile", data);
        }
    };
    /******************************** Print End ***************************************/

    /******************************** Validation Start ***************************************/
    self.Validation = function () {
        var errMsg = "";

        if (!self.SelectedOffice()) {
            errMsg += "Please select office!!!<br>";
        }
        if (!self.Year()) {
            errMsg += "Please fill Fiscel year!!!<br>";
        }

        if (!self.SelectedMonth())
            errMsg += "Please select month!!!<br>";

        if (errMsg) {
             msg(errMsg,"WARNING");
            return false;
        }
        else {
            return true;
        }
    }
    /******************************** Validation End ***************************************/

    self.ClearControls = function () {
        self.SelectedOffice('');
        //self.Year('');
        //self.SelectedMonth('');
    }
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new FunctionUnitExpReportViewModel());

});
