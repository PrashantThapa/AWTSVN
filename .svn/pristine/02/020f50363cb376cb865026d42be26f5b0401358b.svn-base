
function LeaveBalance(data) {
    var self = this;
           //self.UptoDate = ko.observable(data.UptoDate);
    //self.EmpID = ko.observable(data.EmpID);
    if (data !== undefined) {
        self.balancedleave = ko.observable(data.balancedleave);
        self.leavetaken = ko.observable(data.leavetaken);
        self.homeleave = ko.observable(data.homeleave);
        self.sickleave = ko.observable(data.sickleave);
        self.homeleaveaccumulation = ko.observable(data.homeleaveaccumulation);
        self.sickleaveaccumulation = ko.observable(data.sickleaveaccumulation);
    }
}

function LeaveBalanceViewModel() {

    var self = this;
    self.EmployeeName = ko.observable();
    self.EmpID = ko.observable();
    self.LeaveBalances = ko.observableArray([]);
    self.UptoDate = ko.observable();
    //self.balancedleave = ko.observable();
    //self.leavetaken = ko.observable();
    //self.homeleave = ko.observable();
    //self.sickleave = ko.observable();
    //self.homeleaveaccumulation = ko.observable();
    //self.sickleaveaccumulation = ko.observable();


    self.GetLeaveBalance = function () {
        $.ajax({
            type: 'GET',
            async: false,
            dataType: 'json',
            url: '../../Handlers/COMMON/LeaveTypeHandler.ashx',
            data: { 'method': 'GetLeaveBalance', 'EmpID': self.EmpID(), 'UptoDate': self.UptoDate() },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                var mappedTasks = $.map(data.ResponseData, function (item) {
                    return new LeaveBalance(item);
                });
                self.LeaveBalances(mappedTasks);
            },
            error: function (err) {
                msg(err.status + ' - ' + err.statusText, 'FAILURE');
            }
        });
        

    }
 
    // To Clear Controls
    //--------------------------------------------------------------
    //self.ClearControls = function () {
    //    self.SelectedBank('');
    //    self.BankAccountNo('');
    //    //self.SelectedParentGL('');
    //};
    ////--------------------------------------------------------------
    ////NB: To Validate Controls
    ////--------------------------------------------------------------
    //self.Validation = function () {

    //    var errMsg = '';
    //    var objFocus = null;

    //    if (Validate.empty(self.SelectedBank())) {
    //        errMsg = 'Plese select Bank Name !!!<br>';
    //    }
    //    if (Validate.empty(self.BankAccountNo())) {
    //        errMsg += 'Please fill Account Number!!!<br>';
    //    }
    //    //if (Validate.empty(self.SelectedParentGL())) {
    //    //    errMsg += 'कृपया जी एल कोड छान्नुहोस् !!!<br>';
    //    //}
    //    if (errMsg !== '') {
    //        msg(errMsg, 'WARNING');
    //        return false;
    //    }
    //    else {
    //        return true;
    //    }
    //};

    //--------------------------------------------------------------
    // To Save Data
    //--------------------------------------------------------------

    $('#modalEmpSearch').on('hidden.bs.modal', function (event) {
        self.EmpID(GEmpID);
        self.EmployeeName(GEmpName);
        //self.OfficeCD(GOfficeCD);
        //self.OfficeName(GOfficeName);
    });
}   

$(document).ready(function () {

    ValidateSession();

    var epvm = new LeaveBalanceViewModel();
    ko.applyBindings(epvm, document.getElementById('LeaveBalanceForm'));
   
});