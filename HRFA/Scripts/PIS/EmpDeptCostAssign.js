function Office(data) {
    var self = this;
    self.OfficeCode = ko.observable(data.OfficeCode);
    self.OfficeNameNep = ko.observable(data.OfficeNameNep);
}

function CostCenter(data) {
    var self = this;
    self.CostCenterID = ko.observable(data.CostCenterID);
    self.CostCenterName = ko.observable(data.CostCenterName);
}

function Department(data) {
    var self = this;
    self.DeptID = ko.observable(data.DeptID);
    self.DeptDesc = ko.observable(data.DeptDesc);
}

function Post(data) {
    var self = this;
    self.PostID = ko.observable(data.PostID);
    self.PostDesc = ko.observable(data.PostDesc);
}

function Employee(data) {
    var self = this;
    self.EmpID = ko.observable(data.EmpID);
    self.EmployeeName = ko.observable(data.EmployeeName);
}




function EmpDeptCostAssign(data) {
    var self = this;
    self.SubmissionNo = ko.observable(data.SubmissionNo);
    self.EmpID = ko.observable(data.EmpID);
    self.EmpName = ko.observable(data.EmpName);
    self.FromDate = ko.observable(data.FromDate);
    self.ToDate = ko.observable(data.ToDate);
    self.EntryDate = ko.observable(data.EntryDate);
    self.RStatus = ko.observable(data.RStatus);
}

function EmpDeptCostAssignViewModel() {
    var self = this;
    self.SubmissionNo = ko.observable();
    self.EmpID = ko.observable();
    self.EmpName = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.EntryDate = ko.observable();
    self.RStatus = ko.observable();
    self.Action = ko.observable();

    self.DeptID = ko.observable();
    self.DeptDesc = ko.observable();

    self.CostCenterID = ko.observable();
    self.CostCenterName = ko.observable();

    self.OfficeCode = ko.observable();
    self.OfficeNameNep = ko.observable();

    self.Departments = ko.observableArray([]);
    self.SelectedDepartment = ko.observable();

    self.CostCenters = ko.observableArray([]);
    self.SelectedCostCenter = ko.observable();

    self.grdOfficeCD = ko.observable();
    self.grdOfficeName = ko.observable();
    self.grdEmployeeName = ko.observable();
    self.grdPostDesc = ko.observable();

    self.EmployeeName = ko.observable();

  //  self.EmpName = ko.observable();

    //--------------------------------------------------------------
    //NB: To get Cost Center according to office selected
    //--------------------------------------------------------------
    self.GetCostCenter = function () {

            $.ajax({
                dataType: "json",
                cache: false,
                async:false,
                url: '/Handlers/FAMS/CostCenterHandler.ashx',
                async: false,
                data: { 'method': 'GetCostCenter', 'officeCode': self.OfficeCode(), 'CostCenterID': null },
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

//    }

    //--------------------------------------------------------------
    //NB: To get Department according to office selected
    //--------------------------------------------------------------
    self.GetDepartment = function () {
//        if (self.SelectedOffice() != undefined) {

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '/Handlers/COMMON/DepartmentHandler.ashx',

                data: { 'method': 'GetDepartment', 'officeCode':self.OfficeCode(), 'deptID': null },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new Department(item)
                    });

                    self.Departments(mappedTask);

                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText, "FAILURE");

                }
            });
        }


        // Save
        self.SaveEmpDeptCostAssign = function () {

            if (self.Validation()) {

                var office = {OfficeCode:self.grdOfficeCD()};

                var Department = { DeptID: self.SelectedDepartment() };

                var CostCenter = { CostCenterID: self.SelectedCostCenter() };

                var args = {

                    OldSubmissionNo: self.SubmissionNo(),

                    EmpID: self.EmpID(),

                    Office: office,
                    Department: Department,
                    CostCenter: CostCenter,

                    FromDate: self.FromDate(),
                    ToDate: self.ToDate(),
                    EntryBy: $("#user").text(),
                    EntryDate: null,
                    RStatus: "F",
                    Action: "A"
                }
                var url = "/Handlers/PIS/EmpDeptCostAssignHandler.ashx";
                var method = "SaveEmpDeptCostAssign";
                var appID = "PIS";
                var modID = "EMPDEPTCOSTCENTER";

                var data = { 'method': method, 'args': JSON.stringify(ko.toJS(args)), 'appID': appID, 'modID': modID };

                $.post(url, data,
                        function (result) {
                            var obj = jQuery.parseJSON(result);
                            if (obj.IsSucess) {
                                msg(obj.Message);
                            }
                            else {
                                msg(obj.Message, "WARNING");
                            }
                            self.ClearControl();
                        });

            }
        }

//                $.ajax({
//                    type: 'GET',
//                    dataType: "json",
//                    cache: false,
//                    url: '../../../Handlers/PIS/EmpDeptCostAssignHandler.ashx',
//                    data: { 'method': 'SaveEmpDeptCostAssign', 'args': JSON.stringify(args) },
//                    contentType: "application/json; character=utf-8",
//                    success: function (result) {
//                        console.log(result);
//                        if (result.IsSucess) {
//                            msg(result.Message);
//                            self.ClearControl();

//                        }
//                        else {
//                            msg(result.Message);
//                        }
//                    },
//                    error: function (err) {
//                        msg("Failed error");
//                        //console.log(err);
//                    }
//                });
//            }
//        }


        self.GetEmpDeptCostAssignBySubNo = function () {
            

            self.SubmissionNo(getUrlParamVal('SubmissionNumber'));

            var editable = getUrlParamVal('Editable');

            if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
                return;
            }
            else {
                if (editable == 'Y') {
                }
                else {
                    $('button').hide();
                    $('form').find('input, textarea, select').attr('disabled', 'disabled');

                    $("#Office").hide();
                    $("#EmpName").hide();

                    $("#txtEmployeeID").hide();

                    $("#divDllOffice").hide();
                }

                $.ajax({
                    dataType: "json",
                    cache: false,
                    url: '../../Handlers/PIS/EmpDeptCostAssignHandler.ashx',
                    data: { 'method': 'GetEmpDeptCostAssignBySubNo', 'SubmissionNo': self.SubmissionNo() },
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    success: function (result) {

                        if (result.ResponseData != null) {

                            self.OfficeCode(result.ResponseData.Office.OfficeCode);
                            self.GetDepartment();
                            self.GetCostCenter();

                            console.log(ko.toJS(self.Departments()));

//                            self.SubmissionNo(result.ResponseData.SubmissionNo);
                            self.EmpID(result.ResponseData.EmpID);

                            self.EmployeeName(result.ResponseData.EmpName);

                            console.log(result.ResponseData.Department.DeptID);

                            self.grdOfficeCD(result.ResponseData.Office.OfficeCode);
                            self.grdOfficeName(result.ResponseData.Office.OfficeName);

                            self.grdPostDesc(result.ResponseData.Post.PostDesc);
                            self.grdEmployeeName(result.ResponseData.Employee.EmployeeName);

                            self.SelectedDepartment(result.ResponseData.Department.DeptID);
                            self.SelectedCostCenter(result.ResponseData.CostCenter.CostCenterID);

                            self.FromDate(result.ResponseData.FromDate);
                            self.RStatus(result.ResponseData.RStatus);

                            //                        $('button').hide();
                            //                        $('form').find('input, textarea, select').attr('disabled', 'disabled');

                            //                        $("#Office").hide();
                            //                        $("#EmpName").hide();

                            //                        $("#txtEmployeeID").hide();

                            //                        $("#divDllOffice").hide();


                            //$("#grdMain").hide();

                        }
                        else {
                            msg("Submission number is not valid");
                        }
                    },
                    error: function (err) {
                        msg(err.status + " - " + err.statusText, "FAILURE");

                    }
                });
            }
        }
        self.GetEmpDeptCostAssignBySubNo();





    self.Validation = function () {
        var errMsg = "";

        if (Validate.empty(self.EmployeeName())) {
            errMsg += "Please select employee name!!!<br>";
        }

        if (Validate.empty(self.Departments()) || (self.SelectedDepartment() == undefined)) {
            errMsg += "Please select department!!!<br>";

        }


        if (Validate.empty(self.CostCenters()) || (self.SelectedCostCenter() == undefined)) {
            errMsg += "Please select cost center!!!<br>";
        }

        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }

    self.ClearControl = function () {
        self.Departments("");
        self.CostCenters("");

        self.EmpID("");
        self.EmployeeName("");

        self.grdOfficeName("");
        self.grdEmployeeName("");
        self.grdPostDesc("");
    };

    self.CancelEmpDeptCostAssign = function () {
        self.ClearControl();
    }


    $('#modalEmpSearch').on('hidden.bs.modal', function () {

        self.EmpID(GEmpID);
        self.EmployeeName(GEmpName);
        self.OfficeCode(GOfficeCD);
        self.grdEmployeeName(GEmpName);
        self.grdOfficeCD(GOfficeCD);
        self.grdOfficeName(GOfficeName);
        self.grdPostDesc(GPostDesc);
        self.GetDepartment();
        self.GetCostCenter();
    })
}

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new EmpDeptCostAssignViewModel(), document.getElementById('EmpDeptCostAssignForm'));
})
