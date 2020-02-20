function Transaction(data) {
    var self = this;
    self.ApplicationID = ko.observable(data.ApplicationID);
    self.ModuleID = ko.observable(data.ModuleID);
    self.ModuleDesc = ko.observable(data.ModuleDesc);
    self.TranNo = ko.observable(data.TranNo);
    self.Reason = ko.observable(data.VerifyRemarks);
}


var RejectedModulesViewModel = function () {
    var self = this;

    self.RowIndex = ko.observable();
    self.LoadModuleTranLST = ko.observableArray([]);

    self.GetRejectedList = function () {
        $.ajax({
            dataType: "json",
            url: '../../Handlers/VERIFICATION/ModuleVerificationHandler.ashx',
            data: { 'method': 'GetRejectedList' },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {

                    return new Transaction(item)

                });
                self.LoadModuleTranLST(mappedTask);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText);
            }
        });
    }

    self.GetRejectedList();


    self.GetApplicationByTranNumber = function (TranNumber) {

        for (var i = 0; i < self.LoadModuleTranLST().length; i++) {

            if (ko.toJS(self.LoadModuleTranLST()[i].ModuleID) === ko.toJS(TranNumber.ModuleID)) {
                self.RowIndex(i);

            }

        }
		
        var tranNo = ko.toJS(TranNumber.TranNo);
        var hght = screen.height;
        var wdth = screen.width;
        var index = ko.toJS(self.RowIndex());
        var modID = ko.toJS(self.LoadModuleTranLST()[index].ModuleID);
        var ModuleName = ko.toJS(self.LoadModuleTranLST()[index].ModuleDesc);
        /****************************************** PIS Begin ***********************************************/
        if (modID == "EMPREG") {
            var url = "/Modules/PIS/Employee.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "EMPAPP") {

            var url = "/Modules/PIS/Appointment.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "EMPPOS") {

            var url = "/Modules/PIS/EmployeePosting.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "EMPPRO") {

            var url = "/Modules/PIS/Promotion.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "EMPPNS") {
            var url = "/Modules/PIS/Punishment.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "EMPAWD") {
            var url = "/Modules/PIS/Award.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "EMPRTM") {
            var url = "/Modules/PIS/Retirement.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "EMPRES") {
            var url = "/Modules/PIS/Resignation.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        if (modID == "EMPLCAN") {
            var url = "/Modules/PIS/LeaveCancellation.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "EMPRWN") {

            var url = "/Modules/PIS/EmployeeRawana.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "EMPTRA") {

            var url = "/Modules/PIS/EmployeeTransfer.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        if (modID == "EMPDEPT") {

            var url = "/Modules/PIS/EmployeeDeputation.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "EMPDEPTRTN") {

            var url = "/Modules/PIS/EmpDeputationReturn.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        /****************************************** PIS End ***********************************************/


        /****************************************** Payroll Begin ***********************************************/
        if (modID == "EMPSALITEM") {
            var url = "/Modules/PAYROLL/EmployeeSalary.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        if (modID == "POSTSALITEM") {
            var url = "/Modules/PAYROLL/PostWiseSalaryItemSetup.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        /****************************************** Payroll End ***********************************************/

        /****************************************** FAMS Begin ***********************************************/


        if (modID == "BUDREQST") {
            var url = "/Modules/FAMS/BudgetRequest.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "APPRBUDGET") {

            var url = "/Modules/FAMS/BudgetApprove.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }
        if (modID == "BUDGETREL") {

            var url = "/Modules/FAMS/BudgetRelease.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        if (modID == "PURORDER") {
            var url = "/Modules/FAMS/PurchaseOrder.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        if (modID == "VENDORREG") {
            var url = "/Modules/FAMS/VendorRegistration.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        if (modID == "BUDGETTRAN") {
            var url = "/Modules/FAMS/BudgetTransfer.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }


        if (modID == "BLANKETPUR") {
            var url = "/Modules/FAMS/BlanketPurchase.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        if (modID == "EMPDEPTCOSTCENTER") {
            var url = "/Modules/PIS/EmpDeptCostAssign.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        if (modID == "EMPSALPAY") {
            var url = "/Modules/PAYROLL/EmployeeSalaryPayment.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        if (modID == "EMPGRADE") {
            var url = "/Modules/PAYROLL/EmployeeGrade.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F" + "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }

        if (modID == "EMPSAL") {
            var url = "/Modules/FAMS/SalarySheetAdjustment.aspx?SubmissionNumber=" + tranNo + "&MenuOptions=F"+ "&Editable=Y";
            window.open(url, '_blank', 'width=' + wdth + ', height=' + hght + ',scrollbars=yes');
        }


        


        /********************************************** FAMS End *************************************************/
    };

}


$(document).ready(function () {

    ValidateSession();
    ko.applyBindings(new RejectedModulesViewModel());


});