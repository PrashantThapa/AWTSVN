
function Office(data) {
    var self = this;
    if (data != undefined) {
        self.OfficeCode = ko.observable(data.OfficeCode);
        self.OfficeNameNep = ko.observable(data.OfficeNameNep);
    }
}

function Post(data) {
    var self = this;
    if (data != undefined) {
        self.PostID = ko.observable(data.Post.PostID);
        self.PostDesc = ko.observable(data.Post.PostDesc);
    }
}

function OfficeDarbandi(data) {
    var self = this;
    if (data != undefined) {
        self.PostSeq = ko.observable(data.PostSeq);
    }
}

function PersonDocument(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Status = ko.observable(data.Status);
        self.DocType = ko.observable(data.DocType);
        self.DocFile = ko.observable(data.DocFile);
        self.IssueNo = ko.observable(data.IssueNo);
        self.IssueDate = ko.observable(data.IssueDate);
        self.IssueBy = ko.observable(data.IssueBy);
        self.Action = ko.observable(data.Action);
    }
}

function EmpConfirmation(data) {
    var self = this;
    self.SubmissionNo = ko.observable(data.SubmissionNo);
    self.OfficeCode = ko.observable(data.OfficeCode);
    self.PostID = ko.observable(data.PostID);
    self.PostSequence = ko.observable(data.PostSequence);
    self.EmpID = ko.observable(data.EmpID);
    self.ConfirmationLetterDate = ko.observable(data.ConfirmationLetterDate);
    self.EffectiveDate = ko.observable(data.EffectiveDate);
    self.ServiceTypeID = ko.observable(data.ServiceTypeID);
    self.ConfirmationLetterName = ko.observable(data.ConfirmationLetterName);
    self.ConfirmationLetterFile = ko.observable(data.ConfirmationLetterFile);
    self.FromDate = ko.observable(data.FromDate);
    self.ToDate = ko.observable(data.ToDate);
    self.RStatus = ko.observable(data.RStatus);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
}

function ServiceType(data) {
    var self = this;
    self.STypeID = ko.observable(data.STypeID);
    self.STypeName = ko.observable(data.STypeName);
    self.STypeNameEng = ko.observable(data.STypeNameEng);
    self.Status = ko.observable(data.Status);
    self.FromDate = ko.observable(data.FromDate);
    self.ToDate = ko.observable(data.ToDate);
    self.EntryBy = ko.observable(data.EntryBy);
    self.EntryDate = ko.observable(data.EntryDate);
    self.Action = ko.observable(data.Action);
}


function EmpConfirmationViewModel() {
    var self = this;
    self.SubmissionNo = ko.observable();
    self.OfficeCode = ko.observable();
    self.PostID = ko.observable();
    self.PostSequence = ko.observable();
    self.EmpID = ko.observable();
    self.ConfirmationLetterDate = ko.observable();
    self.EffectiveDate = ko.observable();
    self.STypeID = ko.observable();
    self.ConfirmationLetterName = ko.observable();
    self.ConfirmationLetterFile = ko.observable();
    self.FromDate = ko.observable();
    self.ToDate = ko.observable();
    self.RStatus = ko.observable();
    self.EntryBy = ko.observable();
    self.EntryDate = ko.observable();
    self.STypeName = ko.observable();
    self.EmployeeName = ko.observable();
    self.TempEmpName = ko.observable();
    self.ServiceTypes = ko.observableArray([]);
    self.SelectedServiceType = ko.observable();
    self.EmpDocFile = ko.observable();

    self.CheckSource = ko.observable();
    var entryBy = $("#user").text();
    self.EntryBy = ko.observable(entryBy);
    
    self.PersonDocuments = ko.observableArray([]);


    //For OfficeCode
    self.OfficeNameNep = ko.observable();

    //For Post
         self.PostID = ko.observable();
         self.PostDesc = ko.observable();

   //For Post Sequence
         self.PostSeq = ko.observable();


    //Employee Document File Upload
    empdocfile = null;
    empdocerror = "";
    filesize = "";
    $("#UploadDocFile").on("change", function () {
        empdocerror = "";
        filesize = "";
        filesize = this.files[0].size / 1024 / 1024;
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        //if (/^image/.test(files[0].type)) { // only image file
        var reader = new FileReader(); // instance of the FileReader            
        reader.readAsDataURL(files[0]); // read the local file               
        reader.onloadend = function () { // set image data as background of div 

            if (files[0].type == "image/jpeg" || files[0].type == "application/pdf") {
                empdocfile = this.result;
            }
            if (files[0].type != "image/jpeg" && files[0].type != "application/pdf") {

                empdocerror = 1;
            }
            if (parseFloat(filesize) > 1.0) {
                empdocerror = 2;
            }
        }
    });


    self.GetServiceType = function () {
        $.ajax({
            dataType: "json",
            cache: false,
            async: false,
            url: '../../../Handlers/CENTRALLOOKUP/ServiceTypeHandler.ashx',
            data: { 'method': 'GetServiceType', 'sertypeid': null },
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                var mappedTask = $.map(result.ResponseData, function (item) {
                    return new ServiceType(item)
                });
                self.ServiceTypes(mappedTask);
                
            },
            error: function (err) {
                msg(err.status + " - " + err.statusText, "FAILURE");
            }
        });
    }

    self.GetServiceType();

    self.SaveConfirmation = function () {
        if (self.ValidateConfirmation()) {

            var office = {
                OfficeCode: self.OfficeCode()
            }

            var post = {
                PostID: self.PostID()
            }

            var officedarbandi = {
                PostSeq: self.PostSeq()
            }

            var doctype = {
                TypeID: 101
            }
            var serviceType = { STypeID: self.SelectedServiceType() }

            self.EmpDocFile(empdocfile);
            var personDocument = {
                PID: null,
                FromDate: "",
                ToDate: "",
                EntryBy: self.EntryBy(),
                EntryDate: "",
                Status: "F",
                DocType: doctype,
                DocFile: self.EmpDocFile(),
                IssueNo: "10",
                IssueDate: self.ConfirmationLetterDate(),
                IssueBy: "",
                Action: "A"
            };
            self.PersonDocuments.push(new PersonDocument(personDocument));

            var empConfirmation = {
                EmpID: self.EmpID(),
                Post: post,
                OfficeDarbandi: officedarbandi,
                Office: office,
                ServiceType: serviceType,
                ConfirmationLetterDate: self.ConfirmationLetterDate(),
                EffectiveDate: self.EffectiveDate(),
                PersonDoc: self.PersonDocuments(),
                EntryBy: self.EntryBy(),
                EntryDate: null,
                RStatus: "F",
                Action: "A"
            };


            method = 'SaveEmpConfirmation';
            var url = "/Handlers/PIS/EmpConfirmationHandler.ashx";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(empConfirmation))
            };
            $.post(url, data,
            function (result) {
                self.ClearControl();
                var obj = jQuery.parseJSON(result);
                msg(obj.Message);


            });
        }

    }


    self.ClearConfirmation = function () {
        self.ClearControl();
    }

    self.ValidateConfirmation = function () {
        var errMsg = "";

        if (Validate.empty(self.EmployeeName())) {
            errMsg += "Please fill employee name!!!<br>";
        }
        if (Validate.empty(self.ConfirmationLetterDate())) {
            errMsg += "Please fill letter issue date!!!<br>";
        }
        if (Validate.empty(self.EffectiveDate())) {
            errMsg += "Please  fill effective date !!!<br>";
        }
        if (Validate.empty(self.SelectedServiceType())) {
            errMsg += "Please select service type!!!<br>";
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
        self.EmpID("");
        self.ConfirmationLetterDate("");
        self.EffectiveDate("");
        self.EmployeeName("");
        self.SelectedServiceType("");
        $("#UploadDocFile").val("");
        $("#txtEmployeeName").val("");
        self.TempEmpName("");
    }

    

    $('#modalEmpSearch').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var value = button.data('thissource');
        self.CheckSource(value);
    })

    $('#modalEmpSearch').on('hidden.bs.modal', function (event) {
        if (self.CheckSource() === "employee") {
            self.EmpID(GEmpID);
            self.EmployeeName(GEmpName);
            self.OfficeCode(GOfficeCD);
            self.OfficeNameNep(GOfficeName);
            self.PostID(GPostID);
            self.PostDesc(GPostDesc);
            self.PostSeq(GPostSeq);
        }

    })

}

$(document).ready(function () {
    ValidateSession();
    var empConfirmationViewModel = new EmpConfirmationViewModel();
    ko.applyBindings(empConfirmationViewModel,document.getElementById('ConfirmationForm'));
})