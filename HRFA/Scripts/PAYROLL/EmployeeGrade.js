function ExtraAllowance(data) {
    var self = this;
    if (data != undefined) {
        //self.OldSubmissionNo = ko.observable(data.OldSubmissionNo);
        self.SPID = ko.observable(data.SPID);
        self.EAName = ko.observable(data.EAName);
        self.EAValue = ko.observable(data.EAValue);
        self.EntryBy = ko.observable(data.EntryBy);
        //self.RStatus = ko.observable(data.RStatus);
        self.Action = ko.observable(data.Action);
        self.EAID = ko.observable(data.EAID);
        self.EntryDate = ko.observable(data.EntryDate);
    }
};

function GradeUnit(data) {
    var self = this;
    if (data != undefined) {
        self.LevelID = ko.observable(data.LevelID);
        self.GradeAmount = ko.observable(data.GradeAmount);
        self.GradeID = ko.observable(data.GradeID);
        self.GradeLevelName = ko.observable(data.GradeLevelName);
        self.GradeName = ko.observable(data.GradeName);
    }
}

function GradeChange(data) {
    var self = this;
    if (data != undefined) {
        self.LevelID = ko.observable(data.LevelID);
        self.GradeAmount = ko.observable(data.GradeAmount);
        self.GradeID = ko.observable(data.GradeID);
        self.GradeLevelName = ko.observable(data.GradeLevelName);
        self.GradeName = ko.observable(data.GradeName);
    }
}

var EmployeeGrade = function (data) {
    var self = this;
    if (data != undefined) {
        self.OldSubmissionNo = ko.observable(data.OldSubmissionNo);
        self.SPID = ko.observable(data.SPID);
        self.EmpID = ko.observable(data.EmpID);
        self.EmployeeName = ko.observable(data.EmployeeName);
        self.GradeID = ko.observable(data.GradeID);
        self.CITPer = ko.observable(data.CITPer);
        self.CITRs = ko.observable(data.CITRs);
        self.PFPer = ko.observable(data.PFPer);
        self.PFRs = ko.observable(data.PFRs);
        self.EntryBy = ko.observable(data.EntryBy);
        self.Action = ko.observable(data.Action);
        self.TaxDeduction = ko.observable(data.TaxDeduction);
        self.InsuranceAmt = ko.observable(data.InsuranceAmt);
        self.AdvanceAmt = ko.observable(data.AdvanceAmt);
        self.LunchAmt = ko.observable(data.LunchAmt);
    }
}

var TaxCat = function (data) {
    var self = this;
    self.TaxCatID = ko.observable(data.TaxCatID);
    self.NCatID = ko.observable(data.NCatID);
    self.DescNep = ko.observable(data.DescNep);
    self.DescEng = ko.observable(data.DescEng);
};


var EmpGradeViewModel = function () {

    var self = this;

    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.CheckSource = ko.observable();
    //self.hasCIT = ko.observable(true);
    self.CIT = ko.observable();
    self.PF = ko.observable();
    self.hasCIT = ko.computed(function () {
        return self.CIT() == '1';
    });
    self.hasnoCIT = ko.computed(function () {
        return self.CIT() == '0';
    });
    self.hasPF = ko.computed(function () {
        return self.PF() == '1';
    });
    self.hasnoPF = ko.computed(function () {
        return self.PF() == '0';
    });
    self.SPID = ko.observable();
    self.EAID = ko.observable();
    self.EAName = ko.observable('');
    self.EAValue = ko.observable();
    self.EntryBy = ko.observable();
    self.selectedItem = ko.observable();
    self.Action = ko.observable("");
    self.SelectedGradeName = ko.observable();
    self.ExtraAllowances = ko.observableArray([]);
    self.TaxCats = ko.observableArray([]);
    self.GradeUnits = ko.observableArray([]);
    self.GradeAmount = ko.observable();
    self.EmployeeGrades = ko.observableArray([]);
    self.SelectedTaxDeduction = ko.observable();
    self.SubmissionNo = ko.observable('');
    self.CITPer = ko.observable('');
    self.CITRs = ko.observable('');
    self.PFPer = ko.observable('');
    self.PFRs = ko.observable('');
    self.ShowPost = ko.observable(true);
    self.GradeID = ko.observable('');
    self.TaxDeduction = ko.observable();
    self.SelectedGradeID = ko.observable();
    self.RStatus = ko.observable();
    self.EntryDate = ko.observable('');
    self.SelectedGradeLevel = ko.observable();
    self.OldSubmissionNo = ko.observable();
    self.GradeChanges = ko.observableArray([]);

    self.SaveEmpGrade = function () {
        {
            var entryBy = $("#user").text();

            var extrallowancedata = FilteredJson(ko.toJS(self.ExtraAllowances));
            if (self.ValidationEmpGrade()) {

                empgrade = {
                    OldSubmissionNo: self.SubmissionNo(),
                    SPID: self.SPID(),
                    EmpID: self.EmpID(),
                    EmployeeName: self.EmployeeName(),
                    GradeID: ko.toJS(self.SelectedGradeID()).GradeID,
                    GradeLevelName: ko.toJS(self.SelectedGradeLevel()).GradeLevelName,
                    CITPer: self.CITPer(),
                    CITRs: self.CITRs(),
                    PFPer: self.PFPer(),
                    PFRs: self.PFRs(),
                    EntryBy: entryBy,
                    EntryDate: self.EntryDate(),
                    TaxDeduction: ko.toJS(self.SelectedTaxDeduction()).NCatID,
                    RStatus: "F",
                    Action: "A",
                    Extrallowancedata: extrallowancedata
                };
            }

            self.EmployeeGrades.push(new EmployeeGrade(empgrade));
            var url = "/Handlers/PAYROLL/EmpGradeHandler.ashx";
            var method = "SaveEmpGrade";
            var appID = "FAMS";
            var modID = "EMPGRADE";

            var data = { 'method': method, 'args': JSON.stringify(empgrade), 'appID': appID, 'modID': modID };

            $.post(url, data, function (result) {
                var obj = jQuery.parseJSON(result);
                if (obj.IsSucess) {
                    self.SubmissionNo(obj.Message.match(/\d+/g));
                    msg(obj.Message, "WARNING");
                    self.ClearControls();
                }
                else {
                    msg("Oops! Error occured while saving data ...", "WARNING");
                }
            });
        }
    };


    self.ValidationEmpGrade = function () {
        var errMsg = "";

        if (Validate.empty(self.EmpID())) {
            errMsg += "Please Select Employee!!!<br>";
        }
        if (Validate.empty(self.SelectedGradeID())) {
            errMsg += "Please select grade!!!<br>";
        }
        if (Validate.empty(self.CITPer()) && Validate.empty(self.CITRs())) {
            errMsg += "Please select CIT!!!<br>";
        }

        if (Validate.empty(self.PFPer()) && Validate.empty(self.PFRs())) {
            errMsg += "Please select PF!!!<br>";
        }
        if (Validate.empty(self.SelectedTaxDeduction())) {
            errMsg += "Please Select a Tax Deduction!!!<br>";
        }
        //if (Validate.empty(extrallowancedata)) {
        //    errMsg += "Please add extra allowance!!!<br>";
        //}

        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }

    }

    var entryBy = $("#user").text();
    self.AddExtraAllowance = function () {

        var errMsg = "";

        var add = self.selectedItem();
        self.EAName($("#EAName").val());

        //-----------in case to edit/update----------

        if (add != undefined) {

            //validating controls      
            if (self.Validation()) {
                add.EAID(self.EAID());
                add.EAName(self.EAName());
                add.EAValue(self.EAValue());
                //add.TaxDeduction(self.TaxDeduction());
                //add.RStatus('F');
                var action = self.Action() == "A" ? "A" : "E";
                add.Action(action);
                add.SPID(self.SPID());



                self.selectedItem(null);

                var btnAdd = $("button.icon-ok");
                btnAdd.removeClass("icon-ok").addClass("icon-add");
                btnAdd.text("Add");

                self.ClearControls();
            }
        }

        //---------in case of adding new record to grid----------------
        else {
            //validating controls
            if (self.Validation()) {
                add = {
                    EAID: null,
                    EAName: self.EAName(),
                    EAValue: self.EAValue(),
                    Action: "A",
                    EntryBy: entryBy,
                    EntryDate: self.EntryDate(),
                    SPID: null
                    //RStatus: 'F',


                };

                if (self.ExtraAllowances.indexOf(add) > -1) {
                    return;
                }
                var match = ko.utils.arrayFirst(self.ExtraAllowances(),
                    function (item) {
                        return add.EAName == ko.toJS(item).EAName;
                    });
                if (!match) {
                    self.ExtraAllowances.push(new ExtraAllowance(add));
                }
                else {
                    msg('Please already Exists! Please fill the correct Data', 'WARNING');
                }


                var btnAdd = $("button.icon-ok");
                btnAdd.removeClass("icon-ok").addClass("icon-add");
                btnAdd.text("Add");

                //--clearing controls------

                self.ClearControls();

            }
        }



    };

    self.DeleteExtraAllowance = function (extraallowance) {
        Confirm('Are you sure to Delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                waitMsg("Deleting");
                waitMsg.show();
                var test = extraallowance;
                console.log(test);
                $.ajax({
                    dataType: "json",
                    cache: false,
                    url: '../../../Handlers/CENTRALLOOKUP/AddressTypeHandler.ashx',
                    data: { 'method': 'DeleteExtraAllowance', 'extraallowanceid': extraallowance.EAID },
                    success: function (result) {
                        waitMsg.hide();
                        if (result.IsSucess) {
                            self.ExtraAllowances.remove(extraallowance);
                            msg(result.Message);
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
    };

    self.EditExtraAllowance = function (extraallowanceid) {

        self.SPID(extraallowanceid.SPID());
        self.EAID(extraallowanceid.EAID());
        self.EAName(extraallowanceid.EAName());
        self.EAValue(extraallowanceid.EAValue());

        if (extraallowanceid.Action() == "A") {
            self.Action("A");
        }
        else {
            self.Action("E");
        }
        self.selectedItem(extraallowanceid);



        var btnAdd = $("button.icon-add");
        btnAdd.removeClass("icon-add").addClass("icon-ok");
        btnAdd.text("Update");

    }

    self.SaveExtraAllowance = function (extraallowanceid) {
        //waitMsg("Saving");
        //waitMsg.show();

        var jsonData = FilteredJson(ko.toJS(self.ExtraAllowances));
        //var jsonData = ko.toJS(self.ExtraAllowances);
        //console.log('test', self.ExtraAllowances);

        debugger;
        $.ajax({
            type: "GET",
            dataType: "json",
            cache: false,
            url: '../../Handlers/CENTRALLOOKUP/AddressTypeHandler.ashx',
            data: { 'method': 'SaveExtraAllowance', 'extraallowance': JSON.stringify(jsonData), 'token': $("#token").text() },
            contentType: "applicaton/json; character=utf -8",

            success: function (result) {
                waitMsg.hide();
                //msg(result.Message);

                if (result.IsSucess) {
                    msg(result.Message, 'SUCCESS');

                }
                else {
                    if (!result.IsToken)
                        msg(result.Message, "WARNING", null, ClearSession);
                    else
                        msg(result.Message, "WARNING");
                }
                debugger;
            },
            error: function (err) {
                waitMsg.hide();
                msg(err.status + " - " + err.statusText, "FAILURE");
            }


        });



    };

    self.GetExtraAllowance = function () {

        waitMsg("Loading");
        waitMsg.show();

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/AddressTypeHandler.ashx',
            data: { 'method': 'GetExtraAllowance', 'extraallowanceid': self.SPID() },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                waitMsg.hide();
                if (result.IsSucess) {
                    var mappedTask = $.map(result.ResponseData, function (item) {

                        return new ExtraAllowance(item)
                    });

                    self.ExtraAllowances(mappedTask);
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

    self.GetTaxCat = function () {
        $.ajax({
            dataType: "json",
            async: false,
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/LoanTypeHandler.ashx',
            data: { 'method': 'GetTaxCat' },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new TaxCat(item);
                });
                self.TaxCats(mappedTask);
            },
            error: function (err) {
                msg("Oops! Error occured while obtaining data ...", "WARNING");
            }
        });
    };


    self.GetGradeUnit = function () {
        $.ajax({
            dataType: "json",
            async: false,
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/LoanTypeHandler.ashx',
            data: { 'method': 'GetGradeUnit' },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new GradeUnit(item);
                });
                self.GradeUnits(mappedTask);
                //self.test(mappedTask);
            },
            error: function (err) {
                msg("Oops! Error occured while obtaining data ...", "WARNING");
            }
        });
    };

    self.GetTaxCat();

    self.GetGradeUnit();

    self.GradeChange = function () {
        $.ajax({
            dataType: "json",
            url: '../../../Handlers/CENTRALLOOKUP/LoanTypeHandler.ashx',
            data: { 'method': 'GetGradeLevelName', 'GradeID': ko.toJS(self.SelectedGradeID()).GradeID },
            contentType: "application/json; charset=utf-8",
            async: false,
            success: function (data) {
                var mappedTask = $.map(data.ResponseData, function (item) {

                    return new GradeChange(item)

                });
                self.GradeChanges(mappedTask);
                console.log('changes grade',ko.toJS(self.GradeChanges()));

            },
            error: function (err) {
                msg("Oops! Error occured while obtaining Grade data! ...", "WARNING");
            }
        });
        }

    
         self.GradeLevelChange = function () {
                if (self.SelectedGradeLevel()) {
                    self.GradeAmount(ko.toJS(self.SelectedGradeLevel()).GradeAmount);
                }
        }

        self.GetEmpGradeBySubmissionNo = function () {
            self.SubmissionNo(getUrlParamVal('SubmissionNumber'));

            $.ajax({
                    dataType: "json",
                    url: '../../Handlers/PAYROLL/EmpGradeHandler.ashx',
                    data: { 'method': 'GetEmpGrade', 'submissionNo': self.SubmissionNo() },
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    success: function (result) {
                    if (result.IsSucess) {
                        //console.log(ko.toJS(result).ResponseData);
                        //var mappedTask = $.map(ko.toJS(result).ResponseData, function (item) {
                        //    return new EmployeeGrade(item);
                        //});
                        var mappedTask = ko.toJS(result).ResponseData;
                        console.log('tirisir',mappedTask);  
                        if (mappedTask) {
                                //self.SPID(mappedTask[0].SPID);
                                //self.EmpID(mappedTask[0].EmpID);
                                //self.GradeID(mappedTask[0].GradeID);
                                //self.CITPer(mappedTask[0].CITPer);
                                //self.CITRs(mappedTask[0].CITRs);
                                //self.PFPer(mappedTask[0].PFPer);
                                //self.PFRs(mappedTask[0].PFRs);
                                //self.RStatus(mappedTask[0].RStatus);
                                //self.TaxDeduction(mappedTask[0].TaxDeduction);
                                //self.LunchAmt(mappedTask[0].LunchAmt);
                                //self.AdvanceAmt(mappedTask[0].AdvanceAmt);
                                //self.InsuranceAmt(mappedTask[0].InsuranceAmt);
                            //console.log('spid value', self.SPID());
                            //console.log('empid value', self.EmpID());
                            //console.log('Grade ID', self.GradeID());
                            //console.log('CITPer', self.CITPer());
                            //console.log('CITRs', self.CITRs());
                            //console.log('PFPer', self.PFPer());
                            //console.log('PFRs', self.PFRs());
                            //console.log('RStatus', self.RStatus());
                            //console.log('TaxDeduction', self.TaxDeduction());
                            
                        }
                    }
                } 

        });

    };

    self.GetExtraAllowance();

    self.GetEmpGradeBySubmissionNo();


    self.ClearControls = function () {
        self.SPID("");
        self.EAName("");
        self.EAValue("");
        self.Action("");
        self.selectedItem(null);


        var btnAdd = $("button.icon-ok");
        btnAdd.removeClass("icon-ok").addClass("icon-add");
        btnAdd.text("Add");
    };
    //--------------------------------------------------------------
    //NB: To Validate Controls
    //--------------------------------------------------------------
    self.Validation = function () {

        var errMsg = "";
        var objFocus = null;


        if (Validate.empty(self.EAName())) {
            errMsg = "Please fill Extra Allowances Name !!!<br>";
        }

        if (Validate.empty(self.EAValue())) {

            errMsg += "Please fill Extra Allowances Value !!!<br>";
        }

        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };


    $('#modalEmpSearch').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var value = button.data('thissource');
        self.CheckSource(value);
        if (self.CheckSource() === "employee") {
            GEmpID = self.EmpID();
            GEmpName = self.EmployeeName();
            //self.ClearControls();
            //self.ClearGridControls();
        }
    })

    $('#modalEmpSearch').on('hidden.bs.modal', function (event) {
        if (self.CheckSource() === "employee") {
            self.EmpID(GEmpID);

            self.EmployeeName(GEmpName);

        }
    })

};

$(document).ready(function () {
    ValidateSession();
    var egvm = new EmpGradeViewModel();
    ko.applyBindings(egvm, document.getElementById('EmpGradeForm'));
});
