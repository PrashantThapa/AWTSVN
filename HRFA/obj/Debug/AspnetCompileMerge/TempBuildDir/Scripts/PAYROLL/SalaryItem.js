
function SalaryItem(data) {
    if (data != undefined) {
        var self = this;
        self.SalaryItemID = ko.observable(data.SalaryItemID);
        self.SalaryItemDesc = ko.observable(data.SalaryItemDesc);
        self.ItemType = ko.observable(data.ItemType);
        self.Status = ko.observable(data.Status);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Action = ko.observable(data.Action);

        self.Taxable = ko.observable(data.Taxable);
        
    }
}

//function SalaryItemGL(data) {
//    if (data != undefined) {
//        var self = this;
//        
//    }
//}

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
    self.GlCode = ko.observable(data.GlCode);
    self.ACNameEng = ko.observable(data.ACNameEng);
    self.Action = ko.observable(data.Action);
}



function SalaryItemViewModel() {
    var self = this;
    self.SalaryItemID = ko.observable();
    self.SalaryItemDesc = ko.observable();
    self.ItemType = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.Status = ko.observable();
    self.Action = ko.observable();
    self.OldGLCode = ko.observable();

    self.Taxable = ko.observable();

//    self.SalaryID = ko.observable();

    self.SalaryItems = ko.observableArray([]);
    self.SelectedSalaryItem = ko.observable();

    self.chkType = ko.observable();

    self.SelectedParentGL = ko.observable();
    self.ParentGL_Array = ko.observableArray([]);

    self.SaveSalaryItem = function () {

        self.SetNepali();
        if (self.Validation()) {
            var parentGL = {
                AccCode: self.SelectedParentGL()
            };
            if ($("#btnSave").text() == 'Save') {
        
                  var salaryItemGL = {
                    EntryBy: self.EntryBy(),
                    ParentGL: parentGL,
                    Action: "A"
                }

                var row = {
                    SalaryItemID: null,
                    SalaryItemDesc: self.SalaryItemDesc(),
                    ItemType: self.ItemType(),
                    Status: self.Status(),
                    FromDate: self.FromDate(),
                    ToDate: self.ToDate(),
                    EntryBy: self.EntryBy(),
                    EntryDate: self.EntryDate(),
                    Action: self.Action(),

                    Taxable: self.Taxable(),
                    SalaryItemGL: salaryItemGL,


                    Action: "A"
                };

                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/PAYROLL/SalaryItemHandler.ashx',
                    data: { 'method': 'SaveSalaryItem', 'args': JSON.stringify(row) },
                    contentType: "application/json; character=utf-8",

                    success: function (result) {
                        if (result.IsSucess) {
                            msg(result.Message);
                            self.ClearControl();
                            self.GetSalaryType();
                            self.GetParentGL();

                        }
                        else {
                            msg(result.Message);
                        }
                    },
                    error: function (err) {
                        msg("Failed error");
                        //console.log(err);
                    }
                });
            }

            else {

                var salaryItemGL = {
                    OldGLCode:self.OldGLCode(),
                    FromDate: self.FromDate(),
                    EntryBy: self.EntryBy(),
                    ParentGL: parentGL,
                    Action: "E"
                }
                var row = {
                    SalaryItemID: self.SelectedSalaryItem(),
                    SalaryItemDesc: self.SalaryItemDesc(),
                    ItemType: self.ItemType(),
                    Status: self.Status(),
                    FromDate: self.FromDate(),
                    ToDate: self.ToDate(),
                    EntryBy: self.EntryBy(),
                    EntryDate: self.EntryDate(),

                    Taxable: self.Taxable(),

                    SalaryItemGL: salaryItemGL,
                    //     SalaryItemGL: salaryItemGL,

                    Action: "E"
                };

                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../Handlers/PAYROLL/SalaryItemHandler.ashx',
                    data: { 'method': 'SaveSalaryItem', 'args': JSON.stringify(row) },
                    contentType: "application/json; character=utf-8",

                    success: function (result) {
                        if (result.IsSucess) {
                            msg(result.Message,'SUCCESS');
                            self.ClearControl();
                            self.GetSalaryType();
                            self.GetParentGL();
                        }
                        else {
                            msg(result.Message,'WARNING');
                        }
                    },
                    error: function (err) {
                        msg("Failed error",'WARNING');
                        //console.log(err);
                    }
                });

            }
        }
    }
    
    //#region Function to Get Parent GL

    self.GetParentGL = function () { //901000 paccode
        //        [901010, 901020, 901030, 901050, 901060, 901070, 901080, 901090, 901100, 901110]
        $.ajax({
            type: 'GET',
            async: false,
            dataType: "json",
            url: '/Handlers/ACCOUNT/AccountChartHandler.ashx',
            data: { 'method': 'GetAccountChartExp', 'accCode': null },
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                //waitMsg.hide();
                //  console.log(ko.toJS(data));
                var mappedTasks = $.map(data.ResponseData, function (item) {
                    return new ParentGL(item)
                });
                self.ParentGL_Array(mappedTasks);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    };

    //#endregion


    self.GetSalaryType = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/PAYROLL/SalaryItemHandler.ashx',
            data: { 'method': 'GetSalaryItem', 'SalaryItemID': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new SalaryItem(item)

                });

                self.SalaryItems(mappedTask);
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }


    self.SalaryItemDetails = function () {
        if (self.SelectedSalaryItem() != undefined) {

            var btnSave = $("#btnSave");
            btnSave.text('Update');

            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/PAYROLL/SalaryItemHandler.ashx',
                data: { 'method': 'GetSalaryItem', 'SalaryItems': self.SelectedSalaryItem },
                contentType: "application/json; charset=utf-8",
                success: function (result) {

                    //                    console.log(result);

                    var data = result.ResponseData[0];
                    self.SalaryItemID(data.SalaryItemID);
                    self.SalaryItemDesc(data.SalaryItemDesc);
                    self.ItemType(data.ItemType);
                    self.Taxable(data.Taxable);
                    self.SelectedParentGL(data.SalaryItemGL.ParentGL.AccCode);
                    self.OldGLCode(data.SalaryItemGL.ParentGL.AccCode);
                    self.FromDate(data.SalaryItemGL.FromDate);

                    //                 parentGL = { AccCode: self.SelectedParentGL() };

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");
                }
            });
        }
        else {
            self.ClearControl();
            var btnSave = $("#btnSave");
            btnSave.text('Save');
        }
    }


    self.Validation = function () {
        var errMsg = "";
        if (Validate.empty(self.SalaryItemDesc())) {
            errMsg += "Please fill salary !!!\n";
        }

        if (Validate.empty(self.ItemType())) {
            errMsg += "Please select salary item type !!!\n";
        }
        if (Validate.empty(self.Taxable())) {
            errMsg += "Please select taxable !!!\n";
        }

        //if (Validate.empty(self.ParentGL_Array()) || (self.SelectedParentGL() == undefined)) {
        //    errMsg += "कृपया जि.एल. कोड छान्नुहोस् !!!<br>";

        //}

        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }
    self.DeleteSalaryItem = function () {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();
                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/PAYROLL/SalaryItemHandler.ashx',
                    data: { 'method': 'DeleteSalaryItem', 'SalaryItems': self.SelectedSalaryItem, 'token': $("#token").text() },
                    contentType: "application/json; character=utf-8",
                    success: function (result) {
                        waitMsg.hide();
                        msg(result.Message);

                        if (result.IsSucess) {
                            msg(result.Message);
                            self.GetSalaryType();
                        }
                        else {
                            if (!result.IsToken)
                                msg(result.Message, "WARNING", null, ClearSession);
                            else
                                msg(result.Message, "WARNING");
                        }

                    },
                    error: function (err) {
                        waitMsg.hide();
                        msg(err.status + " - " + err.statusText, "FAILURE");
                    }
                });
            }
        });
    }

   self.CancelSalaryItem = function () {
       self.SetNepali();
       self.ClearControl();
   }

   self.ClearControl = function () {
       self.SalaryItemDesc("");
       self.ItemType(false);
       self.SelectedSalaryItem("");
       self.Taxable(false);
       self.SelectedParentGL(null);

   }

    self.SetNepali = function () {
        self.SalaryItemDesc($("#txtSalaryItem").val());
    }

    self.GetSalaryType();
    self.GetParentGL();
}

$(document).ready(function () {
    ValidateSession();
 ko.applyBindings(new SalaryItemViewModel());
})