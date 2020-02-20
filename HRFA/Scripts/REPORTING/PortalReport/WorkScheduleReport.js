function WorkScheduleViewModel() {
    var self = this;

    self.ViewReport = function () {

        var data = {
            EmpID: $("#empID").text()
        }
        var hght = screen.height;
        var left = (screen.width / 2) - (900 / 2);
        var url = "/Reporting/PortalReport/ReportHandlers/WorkScheduleHandler.ashx";
        var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
        OpenWindowWithPost(url, winOption, "NewFile", data);

    }
    self.Cancel = function () {


    }



}
$(document).ready(function () {
    PortalValidateSession();
    ko.applyBindings(new WorkScheduleViewModel());
});