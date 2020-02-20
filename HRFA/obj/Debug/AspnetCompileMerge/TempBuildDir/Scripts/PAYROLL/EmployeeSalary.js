var main = '';

function EmpSalaryItem(data) {
	var itemSelf = this;
	if (data !== undefined) {
		
		itemSelf.SubmissionNo = ko.observable(data.SubmissionNo);
		itemSelf.EmpID = ko.observable(data.EmpID);
		itemSelf.SalaryItemID = ko.observable(data.SalaryItemID);
		itemSelf.FromDate = ko.observable(data.FromDate);
		itemSelf.ToDate = ko.observable(data.ToDate);
		itemSelf.EntryBy = ko.observable(data.EntryBy);
		itemSelf.EntryDate = ko.observable(data.EntryDate);
		itemSelf.RStatus = ko.observable(data.RStatus);
	}
	else {
		itemSelf.SubmissionNo = ko.observable('');
		itemSelf.EmpID = ko.observable(self.EmpID);
		itemSelf.SalaryItemID = ko.observable();
		itemSelf.FromDate = ko.observable('');
		itemSelf.ToDate = ko.observable('');
		itemSelf.EntryBy = ko.observable('');
		itemSelf.EntryDate = ko.observable('');
		itemSelf.RStatus = ko.observable('F');
	}
}
ko.observableArray.fn.find = function (prop, data) {
	console.log('inside find ', data);
	var valueToMatch = data[prop];
	return ko.utils.arrayFirst(this(), function (item) {
		return item[prop] === valueToMatch;
	});
};

function EmployeeSalaryViewModel() {
	var self = this;

	self.SubmissionNo = ko.observable();
	self.visibleGrid = ko.observable(false);
	self.SalaryItems = ko.observableArray([]);
	self.Modes = ko.observable([
		{ ModeID: 'F', ModeDesc: 'Flat' }, { ModeID: 'C', ModeDesc: 'Calculated' }
	]);
	self.GetSalaryItems = function () {
		$.ajax({
			dataType: "json",
			cache: false,
			url: '../../../Handlers/PAYROLL/SalaryItemHandler.ashx',
			data: { 'method': 'GetSalaryItem', 'SalaryItemID': null },
			contentType: "application/json; charset=utf-8",
			async: false,
			success: function (result) {
				var mappedTask = $.map(result.ResponseData, function (item) {
					if (item.SalaryItemID === 10 || item.SalaryItemID === 66 || item.SalaryItemID === 67 || item.SalaryItemID === 176) {
						return new SalaryItem(item)
					}
					else
						return null;
				});
				if (mappedTask !== null && mappedTask !== undefined) {
					self.SalaryItems(mappedTask)
				};
			},
			error: function (err) {
                msg("Oops! Error occured while obtaining data ...", "WARNING");
			}
		});
	}
	self.GetSalaryItems();	
	self.EmpSalaryItemRates = ko.observableArray([]);
	self.addEmpSalaryItemRate = function () {
		self.EmpSalaryItemRates.push(new EmpSalaryItemRate());
	};
	self.removeSalaryItemRate = function (empSalrate) {
		self.EmpSalaryItemRates.remove(empSalrate);
	};
    self.EmpID = ko.observable();
	self.EmpID.subscribe(function (value) {
		
		if (value === undefined || value === -1 || value==='') return;
		
        $.ajax({
            dataType: "json",
			url: '../../Handlers/PAYROLL/EmpSalaryItemRateHandler.ashx',
			data: { 'method': 'GetEmpSalaryItemRate', 'EmpID': value },
            contentType: "application/json; charset=utf-8",
            async: false,
			success: function (result) {	
			
				if (result.ResponseData !== null && result.ResponseData !== undefined && result.ResponseData.length > 0) {					
					var mappedTask = $.map(result.ResponseData, function (item) {
						if (item !== null && item !== undefined) {
							return new EmpSalaryItemRate(item)
						}
						return null;
					});
					if (mappedTask !== null && mappedTask !== undefined) {
						
						self.EmpSalaryItemRates.push(mappedTask);
					}
				}
				
            },
            error: function(err) {
                msg("Oops! Error occured while obtaining data...","WARNING");
            }

        });

    });
	self.EmployeeName = ko.observable();
	self.isAnnualAllowance= ko.observable(true);
	self.FiscalYears = ko.observableArray([]);
	self.SelectedFiscalYear = ko.observable([]);
   
   
    self.Calculate = function () {
        if (self.SelectedFun() == "" || self.SelectedFun() == undefined) {
             msg("Please select calculate type !!!","WARNING");          

        } else {

            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../Handlers/PAYROLL/SalaryItemHandler.ashx',
                data: { 'method': ko.toJS(self.SelectedFun()).FunID, 'EmpID': self.EmpID() },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    self.Amount(result.ResponseData.Amount);
                },
                error: function (err) {
                    msg("Oops! Error occured while obtaining data...","WARNING");

                }
            });
        }
    }   
    self.SaveEmpSalary = function () {
		if (self.ValidateEmpSalary()) {

			//console.log(ko.toJS(self.EmpID));
			ko.utils.arrayForEach(self.EmpSalaryItemRates(), function (item) {
				item.EmpID = self.EmpID();
			});

			console.log(ko.toJS(self.EmpSalaryItemRates()));
			if (ko.toJS(self.EmpSalaryItemRates()) != "" || ko.toJS(self.EmpSalaryItemRates()) != undefined) {
                var url = "../../../Handlers/PAYROLL/EmpSalaryItemHandler.ashx";
                var method = "SaveEmpSalaryItem";
                var appID = "PIS";
                var modID = "EMPSALITEM";

				var data = { 'method': method, 'args': JSON.stringify(ko.toJS(self.EmpSalaryItemRates())), 'appID': appID, 'modID': modID };
                $.post(url, data,
                                    function (result) {
                                        var obj = jQuery.parseJSON(result);
                                        if (obj.IsSucess) {
											msg(obj.Message,"SUCCESS");//msg("डेटा सुरक्षित भयो !!!","WARNING");    
											self.CancelEmpSalary();
                                        }
                                        else {
                                            msg("Oops! Error occured while saving data ...","WARNING");
                                        }

                                    });

            }
        }
    }
    self.GetEmpSalaryItemRate = function () {

        if (!Validate.empty(self.EmpID()) ) {
            $.ajax({
                dataType: "json",
                cache: false,
                url: '../../../Handlers/PAYROLL/EmpSalaryItemRateHandler.ashx',
                data: { 'method': 'GetEmpSalaryItemRate', 'EmpID': self.EmpID() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (result) {
                    if (result.ResponseData.length > 0) {
                        var data = result.ResponseData[0];
                        //self.Amount(getNumUnicode(data.Amount));
                        //self.SelectedMode(data.Mode);
                    }
                },
                error: function (err) {
                    msg("Oops! Error occured while obtaining data ...","WARNING");
                }
            });
        }
	}
	self.CancelEmpSalary = function () {
		self.EmpID('');
		self.EmployeeName('')
		self.EmpSalaryItemRates([]);
       
    }
    self.ValidateEmpSalary = function () {
        var errMsg = "";
		//if (Validate.empty(self.EmployeeName())) {
  //          errMsg += "कृपया कर्मचारी खोज्नुहोस्!! !\n";

		//}
		if (self.EmpSalaryItemRates().length <=0) {
			errMsg += "Please fill employee salary desc!\n";
        }
        if (errMsg === "") {
            return true;
        }
        else {
             msg(errMsg,"WARNING");
            return false;
        }
    }  
   
    self.ValidatePrint = function () {
        var errMsg = "";
		if (Validate.empty(self.EmployeeName)) {
			errMsg += "Please search employee!!!\n";

		}
		if (Validate.empty(self.EmpSalaryItemRates())) {
			errMsg += "Please fill employee salary desc!\n";
		}
		
        if (errMsg !== "") {
             msg(errMsg,"WARNING");

            return false;
        }
        else {
            return true;
        }
    }   
    self.PrintEmpSalary = function () {
        if (self.ValidatePrint()) {
            //var OfficeCD = ko.toJS(self.SelectedOffice()).OfficeCode;
            //if (self.SelectedCostCenter() != null) {
            //    var CostCenter = ko.toJS(self.SelectedCostCenter()).CostCenterID;
            //}
            //if (self.SelectedPost() != null) {
            //    var Post = ko.toJS(self.SelectedPost()).PostID;
            //}
            //var data = {
            //    OfficeCode: OfficeCD,
            //    CostCenterID: CostCenter,
            //    PostID: Post
            //}
            //var hght = screen.height;
            //var left = (screen.width / 2) - (900 / 2);
            //var url = "../../../Reporting/PAYROLL/ReportHandlers/EmpSalaryReportsHandler.ashx";
            //var winOption = "width=900,resizable=yes,scrollbars=yes,left=" + 230 + ",height=" + hght + "";
            //OpenWindowWithPost(url, winOption, "NewFile", data);
        }
	}
	
	
	$('#modalEmpSearch').on('hidden.bs.modal', function () {
		self.EmpID(GEmpID);

		self.EmployeeName(GEmpName);
	})
	ko.bindingHandlers.numeric = {
		init: function (element, valueAccessor) {
			$(element).on("keydown", function (event) {
				// Allow: backspace, delete, tab, escape, and enter
				if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
					// Allow: Ctrl+A
					(event.keyCode == 65 && event.ctrlKey === true) ||
					// Allow: . ,
					(event.keyCode == 188 || event.keyCode == 190 || event.keyCode == 110) ||
					// Allow: home, end, left, right
					(event.keyCode >= 35 && event.keyCode <= 39)) {
					// let it happen, don't do anything
					return;
				}
				else {
					// Ensure that it is a number and stop the keypress
					if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
						event.preventDefault();
					}
				}
			});
		}
	};
	


}
function Mode(data) {
	var self = this;
	if (data !== undefined) {

		self.ModeID = ko.observable(data.ModeID);
		self.ModeDesc = ko.observable(data.ModeDesc);
	} else {
		self.ModeID = ko.observable();
		self.ModeDesc = ko.observable();
	}
}
function EmpSalaryItemRate(data) {

	console.log('SALARYITEMS', ko.toJS(main.SalaryItems));
	var empSelf = this;
	var entryBy = $("#user").text();
	var empId = $('#txtEmployeeIDID').val();
	if (data !== null && data !== undefined) {

		empSelf.SubmissionNo = ko.observable('');
		empSelf.OldSubmissionNo = ko.observable(data.SubmissionNo);
		empSelf.EmpID = ko.observable(data.EmpID);
		//var mappedTask = $.map(data.SalaryItem, function (item) {
		//	if (item != null && item !== undefined) {
		//		return new SalaryItem(item)
		//	}
		//	return null;
		//});
		//var mappedModeTask = $.map(data.Mode, function (item) {
		//	if (item != null && item !== undefined) {
		//		return new Mode(item)
		//	}
		//	return null;
		//});

		

		empSelf.SalaryItem = ko.observable(main.SalaryItems()[0]); 
		empSelf.FromDate = ko.observable(data.FromDate);
		empSelf.ToDate = ko.observable(data.ToDate);
		empSelf.Amount = ko.observable(data.Amount);
		empSelf.Mode = ko.observable(main.Modes()[0]);
		empSelf.EntryBy = ko.observable(data.EntryBy);
		empSelf.EntryDate = ko.observable(data.EntryDate);
		empSelf.RStatus = ko.observable(data.Status);
		empSelf.Action = ko.observable('E');
		//empSelf.isModeEnabled = ko.observable(false);
		//empSelf.isAmountEnabled = ko.observable(false);	
		//empSelf.OptionSelected = ko.observable();
		//empSelf.OptionModeSelected = ko.observable();
		//empSelf.SalaryItem = ko.computed({
		//	read: function () { return empSelf.OptionSelected },
		//	write: function (OptionSelected) {
		//		if (OptionSelected !== null && OptionSelected !== undefined && OptionSelected !== 'Select Salary Item') {
		//			empSelf.isModeEnabled(true);
		//			//empSelf.OptionSelected(OptionSelected);
		//		}
		//		else if (OptionSelected === undefined) {
		//			empSelf.isModeEnabled(false);

		//		}
		//	}
		//});
		//empSelf.Mode = ko.computed({
		//	read: function () { return empSelf.OptionModeSelected },
		//	write: function (OptionModeSelected) {
		//		if (OptionModeSelected !== null && OptionModeSelected !== undefined && OptionModeSelected !== 'Select Mode of Calculation') {
		//			empSelf.isAmountEnabled(true);	
		//		}
		//		else if (OptionModeSelected === undefined) {
		//			empSelf.isAmountEnabled(false);

		//		}
		//	}
		//});



	} else {
		empSelf.SubmissionNo = ko.observable('');
		empSelf.OldSubmissionNo = ko.observable('');
		empSelf.EmpID = ko.observable(empId);
		empSelf.SalaryItem = ko.observable(new SalaryItem());
		empSelf.FromDate = ko.observable(null);
		empSelf.ToDate = ko.observable(null);
		empSelf.Mode = ko.observable(new Mode());
		empSelf.Amount = ko.observable('');
		empSelf.EntryBy = ko.observable(entryBy);
		empSelf.EntryDate = ko.observable(null);
		empSelf.RStatus = ko.observable('F');
		empSelf.Action = ko.observable('A');
		//empSelf.isModeEnabled = ko.observable(false);
		//empSelf.isAmountEnabled = ko.observable(false);
		//empSelf.OptionSelected = ko.observable();
		//empSelf.OptionModeSelected = ko.observable();
		//empSelf.SalaryItem = ko.computed({
		//	read: function () { return empSelf.OptionSelected;},
		//	write: function (OptionSelected) {
		//		if (OptionSelected !== null && OptionSelected !== undefined && OptionSelected !== 'Select Salary Item') {
		//			empSelf.isModeEnabled(true);					
		//		}
		//		else if (OptionSelected === undefined) {
		//			empSelf.isModeEnabled(false);
		//		}
		//	}
		//});
		//empSelf.Mode = ko.computed({
		//	read: function () { return },//empSelf.OptionModeSelected;},
		//	write: function (OptionModeSelected) {
		//		if (OptionModeSelected !== null && OptionModeSelected !== undefined && OptionModeSelected !== 'Select Mode of Calculation') {
		//			empSelf.isAmountEnabled(true);						
		//		}
		//		else if (OptionModeSelected === undefined) {
		//			empSelf.isAmountEnabled(false);

		//		}
		//	}
		//});
	}
}

function SalaryItem(data) {
	if (data !== undefined) {
		var self = this;
		self.SalaryItemID = ko.observable(data.SalaryItemID);
		self.SalaryItemDesc = ko.observable(data.SalaryItemDesc);
	}
}


$(document).ready(function () {
//ValidateSession();
	main = new EmployeeSalaryViewModel();
    ko.applyBindings(new EmployeeSalaryViewModel());
})