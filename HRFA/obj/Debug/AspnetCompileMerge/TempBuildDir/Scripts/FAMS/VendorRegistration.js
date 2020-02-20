var Type = function (data) {
    var self = this;
    self.TypeID = ko.observable(data.TypeID);
    self.TypeName = ko.observable(data.TypeName);
}

var Category = function (data) {
    var self = this;
    self.CategoryID = ko.observable(data.CategoryID);
    self.CategoryDesc = ko.observable(data.CategoryDesc);
}

var VendorRegistrationViewModel = function () {

    var self = this;

    self.Name = ko.observable();
    self.Address = ko.observable();
    self.Email = ko.observable();
    self.ContactNo = ko.observable();
    self.ContactPerson = ko.observable();

    self.SelectedType = ko.observable();
    self.SelectedCategory = ko.observable();

    self.Types = ko.observableArray([]);
    self.Categories = ko.observableArray([]);

    var entryBy = $("#user").text();
    self.EntryBy = ko.observable(entryBy);
    self.SubmissionNo = ko.observable();


    //Load Type
    $.ajax({
        dataType: "json",
        url: '../../Handlers/FAMS/TypeHandler.ashx',
        data: { 'method': 'GetTypes', 'typeID': null },
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Type(item)

            });
            self.Types(mappedTask);

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText);
        }
    });



    //Load Category
    $.ajax({
        dataType: "json",
        url: '../../Handlers/FAMS/CategoryHandler.ashx',
        data: { 'method': 'GetCategory', 'categoryID': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Category(item)

            });
            self.Categories(mappedTask);

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText);
        }
    });


    self.GetVendorBySubmissionNo = function () {
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
                $('form').find('input, select').attr('disabled', 'disabled');
            }

            $.ajax({
                dataType: "json",
                url: '../../Handlers/FAMS/VendorHandler.ashx',
                data: { 'method': 'GetVendorBySubmissionNo', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                         msg("सबमिशन नम्बरमा कुनै डाटा छैन।","WARNING");
                    }
                    else {
                        self.Name(data.ResponseData.VendorName);
                        self.Address(data.ResponseData.Address);
                        self.Email(data.ResponseData.Email);
                        self.ContactNo(data.ResponseData.ContactNo);
                        self.ContactPerson(data.ResponseData.ContactPerson);

                        for (var i = 0; i < self.Types().length; i++) {
                            if (self.Types()[i].TypeID() == data.ResponseData.Type.TypeID) {
                                self.SelectedType(self.Types()[i]);
                            }
                        }

                        for (var i = 0; i < self.Categories().length; i++) {
                            if (self.Categories()[i].CategoryID() == data.ResponseData.Category.CategoryID) {
                                self.SelectedCategory(self.Categories()[i]);
                            }
                        }

                    }
                },
                error: function (err) {
                    msg(err.status + " - " + err.statusText);
                }
            });
        }
    }


    self.GetVendorBySubmissionNo();


    self.SubmitVendor = function () {
        if (self.Validation()) {
            var type = {
                TypeID: ko.toJS(self.SelectedType).TypeID,
                TypeName: ko.toJS(self.SelectedType).TypeName
            }

            var category = {
                CategoryID: ko.toJS(self.SelectedCategory).CategoryID,
                CategoryDesc: ko.toJS(self.SelectedCategory).CategoryDesc
            }

            var vendor = {
                OldSubmissionNo: self.SubmissionNo(),
                Type: type,
                Category: category,
                VendorName: self.Name(),
                Address: self.Address(),
                Email: self.Email(),
                ContactNo: self.ContactNo(),
                ContactPerson: self.ContactPerson(),
                FromDate: "",
                ToDate: "",
                EntryBy: self.EntryBy(),
                EntryDate: "",
                RStatus: "F",
                Action: "A"

            }

            var url = "../../Handlers/FAMS/VendorHandler.ashx";
            var method = "SaveVendor";
            var appID = "FAMS";
            var modID = "VENDORREG";

            var data = { 'method': method, 'args': JSON.stringify(ko.toJS(vendor)), 'appID': appID, 'modID': modID };
            $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
                                            msg(obj.Message);
                                            self.ClearControls();
                                        }
                                        else {
                                            msg(obj.Message, "WARNING");
                                        }

                                    });
        }
    }


    self.Validation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (self.SelectedType() == undefined) {
            errMsg += "कृपया प्रकार छान्नुहोस् !!!<br>";
        }
        if (self.SelectedCategory() == undefined) {
            errMsg += "कृपया वर्ग छान्नुहोस् !!!<br>";
        }
        if (Validate.empty(self.Name())) {
            errMsg += "कृपया नाम भर्नुहोस !!!<br>";
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
        self.Name('');
        self.Address('');
        self.Email('');
        self.ContactNo('');
        self.ContactPerson('');
        self.SelectedType('');
        self.SelectedCategory('');
    }

    self.SetNepaliValues = function () {
        self.Name($('#txtName').val());
        self.Address($('#txtAddress').val());
        self.ContactPerson($('#txtContactPerson').val());
    }

};

$(document).ready(function () {

    ValidateSession();
    var vrvm = new VendorRegistrationViewModel();
    ko.applyBindings(vrvm);

});