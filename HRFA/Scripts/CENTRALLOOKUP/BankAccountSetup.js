
function Bank(data) {
    var self = this;

    self.BankID = ko.observable(data.BankID);
    self.BankName = ko.observable(data.BankName);
    self.BankNameEn = ko.observable(data.BankNameEn);
    self.BankCategory = ko.observable(data.BankCategory);
    self.BankAddress = ko.observable(data.BankAddress);
    self.BankAddressEn = ko.observable(data.BankAddressEn);
    self.Status = ko.observable(data.Status);
    self.Action = ko.observable(data.Action);
}
function BankLst(data) {
    var self = this;
    self.EmpID = ko.observable(data.EmpID);
    self.EmployeeName = ko.observable(data.EmployeeName);
    self.OfficeCD = ko.observable(data.OfficeCD);
    self.OfficeName = ko.observable(data.OfficeName);
    self.Bank = ko.observable(data.Bank);
    self.AccountNo = ko.observable(data.AccountNo);
    //self.GLName = ko.observable(data.GLName);
    self.Action = ko.observable(data.Action);
    self.AccCode = ko.observable(data.AccCode);
    self.EntryBy = ko.observable(data.EntryBy);
    self.FromDate = ko.observable(data.FromDate);
}
var ParentGL = function (data) {
    var self = this;
    self.AccCode = ko.observable(data.AccCode);
    self.AccName = ko.observable(data.AccName);
    self.GroupID = ko.observable(data.GroupID);
    self.PaACCode = ko.observable(data.PaACCode);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.Rstatus = ko.observable(data.Rstatus);
    self.TranNo = ko.observable(data.TranNo);
    self.HeadTran = ko.observable(data.HeadTran);
    self.Balance = ko.observable(data.Balance);
    //self.GlCode = ko.observable(data.GlCode);
    self.ACNameEng = ko.observable(data.ACNameEng);
    self.Action = ko.observable(data.Action);
};
function BankAccountViewModel() {

    var self = this;
    self.EmployeeName = ko.observable();
    self.EmpID = ko.observable();
    self.EmpID.subscribe(function (v) {
        waitMsg('Loading');
        waitMsg.show();
        $.ajax({
            type: 'GET',
            async: false,
            dataType: 'json',
            url: '../../Handlers/CENTRALLOOKUP/BankAccountHandler.ashx',
            data: { 'method': 'GetBankAccount', 'EmpID': v },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                var mappedTasks = $.map(data.ResponseData, function (item) {
                    return new BankLst(item);
                });
                self.BankLsts(mappedTasks);
            },
            error: function (err) {
                msg(err.status + ' - ' + err.statusText, 'FAILURE');
            }
        });


    });
    self.OfficeCD = ko.observable();
    self.OfficeName = ko.observable();
    self.BankLsts = ko.observableArray([]);
    self.BankID = ko.observable();
    self.BankName = ko.observable();
    self.BankNameEn = ko.observable();
    self.BankCategory = ko.observable();
    self.BankAddress = ko.observable();
    self.BankAddressEn = ko.observable();
    self.Status = ko.observable(true);
    self.FromDate = ko.observable();
    self.Banks = ko.observableArray([]);
    self.Action = ko.observable('');
    self.BankAccountNo = ko.observable();
    self.selectedItem = ko.observable();
    self.selectedItem = ko.observable();
    //self.ParentGL_Array = ko.observableArray([]);
    var entryBy = $('#user').text();
    //self.SelectedParentGL = ko.observable();
    self.SelectedBank = ko.observable();

    self.LoadBanks = function () {

        waitMsg('Loading');
        waitMsg.show();

        $.ajax({
            dataType: 'json',
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/BankHandler.ashx',
            data: { 'method': 'GetAllBank', 'bankid': null, 'token': $('#token').text() },
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                waitMsg.hide();
                if (result.IsSucess) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new Bank(item);
                    });

                    self.Banks(mappedTask);
                }
                else {

                    if (!result.IsToken)
                        msg(result.Message, 'WARNING', null, ClearSession);
                    else
                        msg(result.Message, 'WARNING');
                }
            },
            error: function (err) {
                waitMsg.hide();
                msg(err.status + ' - ' + err.statusText, 'FAILURE');
            }
        });
    };

    self.LoadBanks();
    self.isNewAdd = function () {
        if (self.Validation()) {
            var sel = self.selectedItem();
            if (sel != undefined || sel != null) {
                var action = sel.Action() == 'A' ? 'A' : 'E';
                var Bnk = {
                    BankID: ko.toJS(self.SelectedBank).BankID,
                    BankName: ko.toJS(self.SelectedBank).BankName
                };
                sel.Bank(Bnk);
                sel.EntryBy($('#user').text());
                sel.AccountNo(self.BankAccountNo());
                //sel.GLName(ko.toJS(self.SelectedParentGL).AccName);
                sel.AccCode(ko.toJS(self.SelectedParentGL).AccCode);
                sel.Action(action);
                self.selectedItem(null);
                $('#Addtoggle').text('Add');
                self.ClearControls();
            }
            else {
                var Bnk = {
                    BankID: ko.toJS(self.SelectedBank).BankID,
                    BankName: ko.toJS(self.SelectedBank).BankName
                };
                var newAdd = {
                    EmpID: self.EmpID(),
                    OfficeCD: self.OfficeCD(),
                    EmployeeName: self.EmployeeName(),
                    OfficeName: self.OfficeName(),
                    Bank: Bnk,
                    AccountNo: self.BankAccountNo(),
                    //AccCode: ko.toJS(self.SelectedParentGL).AccCode,
                    //GLName: ko.toJS(self.SelectedParentGL).AccName,
                    Action: 'A',
                    EntryBy: $('#user').text()
                };
                self.BankLsts.push(new BankLst(newAdd));
                self.ClearControls();
            }
        }
    };

    self.Edit = function (data) {
        var datas = ko.toJS(data);
        self.BankAccountNo(datas.AccountNo);
        self.EmployeeName(datas.EmployeeName);
        self.EmpID(datas.EmpID);
        self.OfficeCD(datas.OfficeCD);
        self.OfficeName(datas.OfficeName);
        for (var i = 0; i < self.Banks().length; i++) {
            if (self.Banks()[i].BankID() == datas.Bank.BankID) {
                self.SelectedBank(self.Banks()[i]);
            }
        }

        //for (var i = 0; i < self.ParentGL_Array().length; i++) {
        //    if (self.ParentGL_Array()[i].AccCode() == datas.AccCode) {
        //        self.SelectedParentGL(self.ParentGL_Array()[i]);
        //    }
        //}
        //self.SelectedParentGL(datas.AccCode);
        self.Action(datas.Action);
        self.selectedItem(data);
        $('#Addtoggle').text('Update');

    };
    self.Delete = function (data) {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.BankLsts.remove(data);
            }
        });
    };
    self.GetParentGL = function () {
        var Office_Cd = $('#offcode').text();
        $.ajax({
            type: 'GET',
            async: false,
            dataType: 'json',
            url: '/Handlers/ACCOUNT/AccountChartHandler.ashx',
            data: { 'method': 'GetAccountChart', 'accCode': 2, 'PLgrCode': null, 'Office_Cd': Office_Cd },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                var mappedTasks = $.map(data.ResponseData, function (item) {
                    if (item.ACNameEng == 'Salary') return new ParentGL(item);
                });
                self.ParentGL_Array(mappedTasks);
                self.SelectedParentGL(self.ParentGL_Array()[0]);
            },
            error: function (err) {
                msg(err.status + ' - ' + err.statusText, 'FAILURE');
            }
        });
    };
    self.GetParentGL();
    self.GetBankList = function () {
        $.ajax({
            type: 'GET',
            async: false,
            dataType: 'json',
            url: '../../Handlers/CENTRALLOOKUP/BankAccountHandler.ashx',
            data: { 'method': 'GetBankLsts', 'OfficeCD': $('#offcode').text() },
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                var mappedTasks = $.map(data.ResponseData, function (item) {
                    return new BankLst(item);
                });
                self.BankLsts(mappedTasks);
            },
            error: function (err) {
                msg(err.status + ' - ' + err.statusText, 'FAILURE');
            }
        });
    };
    self.GetBankList();


    //--------------------------------------------------------------
    // To Clear Controls
    //--------------------------------------------------------------
    self.ClearControls = function () {
        self.SelectedBank('');
        self.BankAccountNo('');
        //self.SelectedParentGL('');
    };
    //--------------------------------------------------------------
    //NB: To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = '';
        var objFocus = null;

        if (Validate.empty(self.SelectedBank())) {
            errMsg = 'Plese select Bank Name !!!<br>';
        }
        if (Validate.empty(self.BankAccountNo())) {
            errMsg += 'Please fill Account Number!!!<br>';
        }
        //if (Validate.empty(self.SelectedParentGL())) {
        //    errMsg += 'कृपया जी एल कोड छान्नुहोस् !!!<br>';
        //}
        if (errMsg !== '') {
            msg(errMsg, 'WARNING');
            return false;
        }
        else {
            return true;
        }
    };

    //--------------------------------------------------------------
    // To Save Data
    //--------------------------------------------------------------

    self.SaveBank = function (Bank) {
        if (ko.toJS(self.BankLsts()) != '' || ko.toJS(self.BankLsts()) != undefined) {
            waitMsg('Saving');
            waitMsg.show();
            var data = { 'method': 'SaveBankAccount', 'args': JSON.stringify(ko.toJS(self.BankLsts())) };
            var url = '../../Handlers/CENTRALLOOKUP/BankAccountHandler.ashx';

            $.post(url, data, function (result) {
                var obj = jQuery.parseJSON(result);
                if (obj.IsSucess) {
                    msg(obj.Message);
                    self.GetBankList();
                }
                else {
                    if (!obj.IsToken)
                        msg(obj.Message, 'WARNING', null, ClearSession);
                    else
                        msg(obj.Message, 'WARNING');
                }
            });
        }
    };
    $('#modalEmpSearch').on('hidden.bs.modal', function (event) {
        self.EmpID(GEmpID);
        self.EmployeeName(GEmpName);
        self.OfficeCD(GOfficeCD);
        self.OfficeName(GOfficeName);
    });
}

$(document).ready(function () {
    ValidateSession();
    var bavm = new BankAccountViewModel();
    ko.applyBindings(bavm, document.getElementById('BankAccountForm'));
});