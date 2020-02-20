var EmployeeDeviceViewModel = function () {
    var self = this;
    self.SubmissionNo = ko.observable();
    self.EmpID = ko.observable();
    self.EmployeeName = ko.observable();
    self.Device = ko.observable();
    self.isDisabled = ko.observable(true);
    


    self.SaveEmployeeDevice = function () {
        if (self.Validation()) {
            var args = {
                EmpID: self.EmpID(),
                DeviceEnrollID: self.Device(),
                Action: "A"
            };
            


            var url = "../../Handlers/PIS/EmployeeDeviceHandler.ashx";
            var method = "SaveEmpDevice";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(args)) };
            $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
                                            msg(obj.Message);
                                        }
                                        else {
                                            msg(obj.Message, "WARNING");
                                        }
                                        self.ClearControls();

                                    });
             }
    }


    self.Validation = function () {
        var errMsg = "";

        if (Validate.empty(self.EmpID())) {
            errMsg += "Please select employee!!!<br>";
        }

        if (Validate.empty(self.Device())) {
            errMsg += "Please fill Device ID No.!!!<br>";
        }

        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }

    }

    self.ClearControls = function () {
        self.EmpID('');
        self.EmployeeName('');
        self.Device('');
    }


    $('#modalEmpSearch').on('hidden.bs.modal', function () {

        self.EmpID(GEmpID);
        self.EmployeeName(GEmpName);

    })
};



$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new EmployeeDeviceViewModel(), document.getElementById("EmpDevice"));
});