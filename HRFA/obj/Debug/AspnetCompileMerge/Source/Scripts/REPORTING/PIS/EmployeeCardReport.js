var EmployeePostViewModel = function () {
    var self = this;
    self.SymbolNo = ko.observable();

    self.Cancel = function () {
        self.SymbolNo(null);
    }
    self.ViewReportEmployeeCard = function () {
        var data = {
            SymbolNo: self.SymbolNo()
        }
        var hght = screen.height;
        var left = (screen.width / 2) - (900 / 2);
        var url = "/Reporting/PIS/ReportHandlers/EmployeeCardHandler.ashx";
        var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
        OpenWindowWithPost(url, winOption, "NewFile", data);
        self.SymbolNo(null);
    }
}

$(document).ready(function () {
    ValidateSession();
    var epvm = new EmployeePostViewModel();
    ko.applyBindings(epvm);
});