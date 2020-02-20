function Level(data) {
    var self = this;
    self.LevelId = ko.observable(data.LevelID);
    self.LevelDesc = ko.observable(data.LevelDesc);
}
function OTSettingViewModel() {
    var self = this;
    self.Levels = ko.observableArray();
    self.SelectedLevel = ko.observableArray();
    self.Hour = ko.observable();
    self.Rate = ko.observable();
    self.disableSave = ko.observable(true);

    self.GetLevels = function () {
        waitMsg("Loading");
        waitMsg.show();

        $.ajax({
            dataType: "json",
            cache: false,
            url: '../../../Handlers/CENTRALLOOKUP/OTSettingHandler.ashx',
            data: { 'method': 'GetLevels'},
            contentType: "application/json; charset=utf-8",
            success: function (result) {
                waitMsg.hide();
                if (result.IsSucess) {
                    var mappedTask = $.map(result.ResponseData, function (item) {
                        return new Level(item)
                    });
                    self.Levels(mappedTask);
                }
                else {                   
                        msg(result.Message, "WARNING");
                }


            },
            error: function (err) {
                waitMsg.hide();
                msg(err.status + " - " + err.statusText, "FAILURE");

            }
        });
    }
    self.SaveOT = function () {
    }
    self.Delete = function () {
    }
    self.Edit = function () {
    }
    self.Validation = function () {
        var errMsg = "";       
        if (Validate.empty(self.SelectedLevel())) {
            errMsg = "Please select Level!!!<br>";
        }

        if (Validate.empty(self.Hour())) {
            errMsg += "Please fill Working Hour !!!<br>";
        }

        if (Validate.empty(self.Rate())) {
            errMsg += "Please fill Rate !!!<br>";
        }

        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }

    }
    self.GetLevels();
}

$(document).ready(function () {
   //ValidateSession();
    ko.applyBindings(new OTSettingViewModel());
});