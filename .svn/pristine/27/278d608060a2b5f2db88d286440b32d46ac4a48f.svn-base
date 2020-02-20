/*********************************************************************************
 Copyright © HRFA PCS System  2016
*********************************************************************************
Project              :  HRFA PCS System  2016
File                 :Office.js 
Description          :This Page contain the Office Knockout JS Code
*********************************************************************************
<Name>                                          <Date>         
om shrestha                              4/20/2016                                                              
*********************************************************************************/



var structure = function Office(data) {
    var self = this;

    self.OFFICE_CODE = ko.observable(data.OFFICE_CODE);
    self.OFFICE_NAME_NEPALI = ko.observable(data.OFFICE_NAME_NEPALI);
    self.OFF_NAME_ENGLISH = ko.observable(data.OFF_NAME_ENGLISH);
    self.IRD_CODE = ko.observable(data.IRD_CODE);
    self.HOUSE_NO = ko.observable(data.HOUSE_NO);
    self.STREETNAME = ko.observable(data.STREETNAME);
    self.WARDNO = ko.observable(data.WARDNO);
    self.VDC_TOWN = ko.observable(data.VDC_TOWN);
    self.FAXNO = ko.observable(data.FAXNO);
    self.PHONENO = ko.observable(data.PHONENO);
    self.DISTRICT_CODE = ko.observable(data.DISTRICT_CODE);
    self.EMAIL = ko.observable(data.EMAIL);
    self.ADDRESS = ko.observable(data.ADDRESS);
    self.OFFICE_TYPE = ko.observable(data.OFFICE_TYPE);
    self.PARENT_ID = ko.observable(data.PARENT_ID);
    self.PAYING_OFFCODE = ko.observable(data.PAYING_OFFCODE);
    self.NEW_PAYING_OFFCODE = ko.observable(data.NEW_PAYING_OFFCODE);
    self.OFF_NAME = ko.observable(data.OFF_NAME);
    self.Action = ko.observable(data.Action);
};

var OfficeViewModel = function OfficeViewModel() {
    var self = this;
    self.Offices = ko.observableArray([]);

    self.OFFICE_CODE = ko.observable();
    self.OFFICE_NAME_NEPALI = ko.observable();
    self.OFF_NAME_ENGLISH = ko.observable();
    self.IRD_CODE = ko.observable();
    self.HOUSE_NO = ko.observable();
    self.STREETNAME = ko.observable();
    self.WARDNO = ko.observable();
    self.VDC_TOWN = ko.observable();
    self.FAXNO = ko.observable();
    self.PHONENO = ko.observable();
    self.DISTRICT_CODE = ko.observable();
    self.EMAIL = ko.observable();
    self.ADDRESS = ko.observable();
    self.OFFICE_TYPE = ko.observable();
    self.PARENT_ID = ko.observable();
    self.PAYING_OFFCODE = ko.observable();
    self.NEW_PAYING_OFFCODE = ko.observable();
    self.OFF_NAME = ko.observable();
    self.Action = ko.observable();

    self.selectedItem = ko.observable();
    self.getFocused = ko.observable(true);
    self.setFocus = ko.observable();


    $.ajax({
        dataType: "json",
        cache: false,
        url: '../../../Handlers/CENTRALLOOKUP/OfficeHandler.ashx',
        data: { 'method': 'GetAllOffice', 'args': null },
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            var mappedTask = $.map(result.ResponseData, function (item) {
                return new structure(item)
            });

            self.Offices(mappedTask);

        },
        error: function (err) {
            msg(err.status + " - " + err.statusText, "FAILURE");

        }
    });


};

$(document).ready(function () {
    ValidateSession();
    ko.applyBindings(new OfficeViewModel());
});
