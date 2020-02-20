

function AllowanceMap(data) {	
		var self = this;
	self.EmpID = ko.observable(data.EmpId);
	
	self.EmpID = ko.observable(data.EmpId);
}
function FiscalYear(data) {
	var self = this;
	self.FiscalYearName = ko.observable(data.FiscalYearName);
}
var FixedAllowanceSetup = function () {

	var self = this;
	self.Months = ko.observableArray([
		{ 'MonthID': 1, 'MonthName': 'Baisakh' },
		{ 'MonthID': 2, 'MonthName': 'Jestha' },
		{ 'MonthID': 3, 'MonthName': 'Ashad' },
		{ 'MonthID': 4, 'MonthName': 'Shrawan' },
		{ 'MonthID': 5, 'MonthName': 'Bhadra' },
		{ 'MonthID': 6, 'MonthName': 'Aswin' },
		{ 'MonthID': 7, 'MonthName': 'Kartik' },
		{ 'MonthID': 8, 'MonthName': 'Mangsir' },
		{ 'MonthID': 9, 'MonthName': 'Poush' },
		{ 'MonthID': 10, 'MonthName': 'Magh' },
		{ 'MonthID': 11, 'MonthName': 'Falgun' },
		{ 'MonthID': 12, 'MonthName': 'Chaitra' }
	]);	
	self.SelDressMonth = ko.observable();
	self.SelDearnessMonth = ko.observable();
	self.SelMedicalMonth = ko.observable();
	self.SelWaterDhalMonth = ko.observable();
	self.SelFestivalMonth = ko.observable();
	self.EmployeeName = ko.observable();
	self.EmpID = ko.observable();
	self.disableThis = ko.observable(false);
	self.disableSave = ko.observable(false);

	self.FiscalYears = ko.observableArray([]);
	self.SelectedFiscalYear = ko.observable();
	self.DearnessAllowance = ko.observable();
	self.WaterDhalAllowance = ko.observable();
	self.DressAllowance = ko.observable();
	self.MedicalAllowance = ko.observable();
	self.FestivalAllowance = ko.observable();
	self.PFPercentage = ko.observable();
	self.Remarks = ko.observable();
	
	self.MARemarks = ko.observable();
	self.isAnnualAllowance = ko.observable(true);

	self.KhajaPerMonth = ko.observable();
	self.YataYatPerMonth = ko.observable();
	self.AtithitiSatkarAllowance = ko.observable();
	self.TeliphoneAllowance = ko.observable();
	self.OverTimeAllowance = ko.observable();
	self.MedicalRebet = ko.observable();
	self.Allowances = ko.observableArray([]);
	var entryby = $("#user").text();
	self.EntryBy = ko.observable(entryby);
	self.EntryDate = ko.observable();
	self.SelectedFiscalYearChanged = function () {
		if (self.SelectedFiscalYear() !== null && self.SelectedFiscalYear() !== undefined) {   
			console.log(ko.toJS(self.SelectedFiscalYear())[0]);
			
			self.disableSave(true);
			self.LoadYearlyAllowanc();
		}
		else
			self.disableSave(false);
		console.log(self.SelectedFiscalYear());
	}
	self.LoadMonthlyAllowanc = function (employeeId) {
		waitMsg("Loading");
		waitMsg.show();
		var fiscalyear = ko.toJS(self.SelectedFiscalYear).FiscalYearName;
		$.ajax({
			dataType: "json",
			cache: false,
			url: '../../../Handlers/PAYROLL/AllowanceSetting.ashx',
			data: { 'method': 'LoadMonthlyAllowance', 'empID': employeeId, 'fiscalYear': fiscalyear, 'token': $("#token").text() },
			contentType: "application/json; charset=utf-8",
			success: function (result) {
				waitMsg.hide();
				if (result.IsSucess) {
                    $.map(result.ResponseData, function (item) {
                        console.log('itemData', item);
                                //if (item === null && item===undefined) {							
                        if (item.EmpId !== null && item.EmpId !== undefined) {
                            self.EmpID(item.EmpId);
                        }
                         if (item.Salary_ItemId === 67) {
                                self.AtithitiSatkarAllowance(item.Item_Amount);
						}
                            if (item.Salary_ItemId === 117) {
                             self.TeliphoneAllowance(item.Item_Amount);
						}
                            if (item.Salary_ItemId === 66) {
                             self.OverTimeAllowance(item.Item_Amount);
						}
                            self.MARemarks(item.Remarks);
                            if (item.Salary_ItemId === 176) {
                                self.MedicalRebet(item.Item_Amount);
						}
                            if (item.Salary_ItemId === 174) {
                                self.KhajaPerMonth(item.Item_Amount);
						}
                            if (item.Salary_ItemId === 175) {
                                self.YataYatPerMonth(item.Item_Amount);
						}
                            if (item.Salary_ItemId === 30) {
                                self.PFPercentage(item.Item_Amount);
                        }	
                        if (item.Salary_ItemId === 110) {
                            self.DearnessAllowance(item.Item_Amount);
                            //self.SelDearnessMonth(item.AllowanceMonth);
                        }
                        if (item.Salary_ItemId === 34) {
                            self.WaterDhalAllowance(item.Item_Amount);
                           // self.SelWaterDhalMonth(item.AllowanceMonth);
                        }
						});
					}
				else {

					if (!result.IsToken)
						msg("Oops! Error occured while obtaining data!...", "WARNING");
					else
                        msg("Oops! Error occured while obtaining data! ...", "WARNING");
				}
			},
			error: function (err) {
                msg("Oops! Error occured while obtaining data! ...", "WARNING");
				waitMsg.hide();
			}
		});
	}
	self.LoadYearlyAllowanc = function () {
		waitMsg("Loading");
		waitMsg.show();
		var fiscalyear = ko.toJS(self.SelectedFiscalYear) !== undefined?  ko.toJS(self.SelectedFiscalYear).FiscalYearName:'';
		$.ajax({
			dataType: "json",
			cache: false,
			url: '../../../Handlers/PAYROLL/AllowanceSetting.ashx',
			data: { 'method': 'LoadYearlyAllowance', 'fiscalYear': fiscalyear, 'token': $("#token").text() },
			contentType: "application/json; charset=utf-8",
			success: function (result) {
				waitMsg.hide();
				if (result.IsSucess) {					
					$.map(result.ResponseData, function (item) {
					
						//if (item === null && item===undefined) {						
						
						if (item.Salary_ItemId === 65) {
							self.DressAllowance(item.Item_Amount);
							self.SelDressMonth(item.AllowanceMonth);
						}
						if (item.Salary_ItemId === 60) {
							self.MedicalAllowance(item.Item_Amount);
							self.SelMedicalMonth(item.AllowanceMonth);
						}
						if (item.Salary_ItemId === 32) {
							self.FestivalAllowance(item.Item_Amount);
							self.SelFestivalMonth(item.AllowanceMonth);
						}
						self.Remarks(item.Remarks);
						//}

						
						//return new AllowanceMap(item)
					});


				}
				else {

					if (!result.IsToken)
                        msg("Oops! Error occured while obtaining data!...", "WARNING");
					else
                        msg("Oops! Error occured while obtaining data! ...", "WARNING");
				}
			},
			error: function (err) {
                msg("Oops! Error occured while obtaining data! ...", "WARNING");
				waitMsg.hide();
			}
		});
	}
	self.ValidateAllownce = function () {
		var errMsg = "";
		if (Validate.empty(self.SelectedFiscalYear())) {
			errMsg += "Please select Fiscal Year !!!<br>";
		}
		if (self.isAnnualAllowance()) {
			
			if (self.DressAllowance().length <= 0) {
				errMsg += "Please fill Dress Allowance!\n";
			}
			if (Validate.numeric(self.DressAllowance())) {
                errMsg += "Please fill correct Dress Allowance!\n";
			}
		}
        else {
            if (self.DearnessAllowance().length <= 0) {
                errMsg += "Please fill Dearness Allowance!\n";
            }
            if (Validate.numeric(self.DearnessAllowance())) {
                errMsg += "Please fill correct Dearness Allowance!\n";
            }
            if (self.WaterDhalAllowance().length <= 0) {
                errMsg += "Please fill water and swarage Allowance!\n";
            }
            if (Validate.numeric(self.WaterDhalAllowance())) {
                errMsg += "Please fill correct water and swarage Allowance!\n";
            }
			if (self.KhajaPerMonth() === undefined || self.KhajaPerMonth().length <= 0) {
				errMsg += "Please fill tiffin money per month!\n";
			}
			if (self.YataYatPerMonth() === undefined || self.YataYatPerMonth().length <= 0) {
				errMsg += "Please fill transportation allowance per month!\n";
			}
			if (self.PFPercentage() === undefined || self.PFPercentage().length <= 0) {
				errMsg += "Please fill PF per month!\n";
			}
			//if (self.AtithitiSatkarAllowance() !== undefined && self.OverTimeAllowance() !== undefined && self.AtithitiSatkarAllowance().length <= 0 && self.TeliphoneAllowance().length <= 0 && self.OverTimeAllowance().length <= 0 && self.MedicalRebet().length <= 0) {
			//	errMsg += "कृपया अतिथि सत्कार भता / टेलिफोन खर्च  / ओभर टाईम भता  /  मेडिकल रिबेट भर्नुहोस्!\n";
			//}
			
		}
		
		if (errMsg === "") {
			return true;
		}
		else {
			msg(errMsg, "WARNING");
			return false;
		}
	}
	self.SaveAllowance = function () {
		var fiscalyear = ko.toJS(self.SelectedFiscalYear).FiscalYearName;
		
		if (self.ValidateAllownce()) {
			self.Allowances([]);
			if (self.isAnnualAllowance()) {
				
				var DressAll = {
					SelectedFiscalYear: fiscalyear,
					Salary_ItemId: 65,
					Item_Amount: self.DressAllowance(),
					EmpId: self.EmpID(),
					Remarks: self.Remarks(),
					AStatus: 'A',
					SubmissionNo: '',
					OldSubmissionNo: '',
					EntryBy: self.EntryBy(),
					EntryDate: self.EntryDate(),
					RStatus: "F",
					AllowanceMonth: self.SelDressMonth()
				}
				self.Allowances.push(DressAll);
				var MedicalAll = {
					SelectedFiscalYear: fiscalyear,
					Salary_ItemId: 60,
					Item_Amount: self.MedicalAllowance(),
					EmpId: self.EmpID(),
					Remarks: self.Remarks(),
					AStatus: 'A',
					SubmissionNo: '',
					OldSubmissionNo: '',
					EntryBy: self.EntryBy(),
					EntryDate: self.EntryDate(),
					RStatus: "F",
					AllowanceMonth: self.SelMedicalMonth()
				}
				self.Allowances.push(MedicalAll);
				var AnuualFestAll = {
					SelectedFiscalYear: fiscalyear,
					Salary_ItemId: 32,
					Item_Amount: self.FestivalAllowance(),
					EmpId: self.EmpID(),
					Remarks: self.Remarks(),
					AStatus: 'A',
					SubmissionNo: '',
					OldSubmissionNo: '',
					EntryBy: self.EntryBy(),
					EntryDate: self.EntryDate(),
					RStatus: "F",
					AllowanceMonth: self.SelFestivalMonth()
				}
				self.Allowances.push(AnuualFestAll);

			}
            else {
                var DearnessAll = {
                    SelectedFiscalYear: fiscalyear,
                    Salary_ItemId: 110,
                    Item_Amount: self.DearnessAllowance(),
                    AllowanceMonth: self.SelDearnessMonth(),
                    EmpId: self.EmpID(),
                    Remarks: self.Remarks(),
                    AStatus: 'M',
                    SubmissionNo: '',
                    OldSubmissionNo: '',
                    EntryBy: self.EntryBy(),
                    EntryDate: self.EntryDate(),
                    RStatus: "F",
                    AllowanceMonth: self.SelDearnessMonth()
                }
                self.Allowances.push(DearnessAll);
                var WaterDhalAll = {
                    SelectedFiscalYear: fiscalyear,
                    Salary_ItemId: 34,
                    Item_Amount: self.WaterDhalAllowance(),
                    EmpId: self.EmpID(),
                    Remarks: self.Remarks(),
                    AStatus: 'M',
                    SubmissionNo: '',
                    OldSubmissionNo: '',
                    EntryBy: self.EntryBy(),
                    EntryDate: self.EntryDate(),
                    RStatus: "F",
                    AllowanceMonth: self.SelWaterDhalMonth()
                }
                self.Allowances.push(WaterDhalAll);
				if (self.KhajaPerMonth() !== null && self.KhajaPerMonth() !== undefined && self.KhajaPerMonth() !== "") {
					var KhajaAll = {
						SelectedFiscalYear: fiscalyear,
						Salary_ItemId: 174,
						Item_Amount: self.KhajaPerMonth(),
						EmpId: self.EmpID(),
						Remarks: self.MARemarks(),
						AStatus: 'M',
						SubmissionNo: '',
						OldSubmissionNo: '',
						EntryBy: self.EntryBy(),
						EntryDate: self.EntryDate(),
						RStatus: "F",
						AllowanceMonth: null
					}
					self.Allowances.push(KhajaAll);
				}
				if (self.YataYatPerMonth() !== null && self.YataYatPerMonth() !== undefined && self.YataYatPerMonth() !== "") {
					var YataYatAll = {
						SelectedFiscalYear: fiscalyear,
						Salary_ItemId: 175,
						Item_Amount: self.YataYatPerMonth(),
						EmpId: self.EmpID(),
						Remarks: self.MARemarks(),
						AStatus: 'M',
						SubmissionNo: '',
						OldSubmissionNo: '',
						EntryBy: self.EntryBy(),
						EntryDate: self.EntryDate(),
						RStatus: "F",
						AllowanceMonth: null
					}
					self.Allowances.push(YataYatAll);
				}

				if (self.PFPercentage() !== null && self.PFPercentage() !== undefined && self.PFPercentage() !== "") {
					var PFAll = {
						SelectedFiscalYear: fiscalyear,
						Salary_ItemId: 30,
						Item_Amount: self.PFPercentage(),
						EmpId: self.EmpID(),
						Remarks: self.MARemarks(),
						AStatus: 'M',
						SubmissionNo: '',
						OldSubmissionNo: '',
						EntryBy: self.EntryBy(),
						EntryDate: self.EntryDate(),
						RStatus: "F",
						AllowanceMonth: null
					}
					self.Allowances.push(PFAll);
				}


				if (self.AtithitiSatkarAllowance() !== null && self.AtithitiSatkarAllowance() !== undefined && self.AtithitiSatkarAllowance() !=="") {
					var AtithiAll = {
						SelectedFiscalYear: fiscalyear,
						Salary_ItemId: 67,
						Item_Amount: self.AtithitiSatkarAllowance(),
						EmpId: self.EmpID(),
						Remarks: self.MARemarks(),
						AStatus: 'M',
						SubmissionNo: '',
						OldSubmissionNo: '',
						EntryBy: self.EntryBy(),
						EntryDate: self.EntryDate(),
						RStatus: "F",
						AllowanceMonth: null
					}
					self.Allowances.push(AtithiAll);
				}
				if (self.TeliphoneAllowance() !== null && self.TeliphoneAllowance() !== undefined && self.TeliphoneAllowance() !== "") {
					var TeliphoneAll = {
						SelectedFiscalYear: fiscalyear,
						Salary_ItemId: 177,
						Item_Amount: self.TeliphoneAllowance(),
						EmpId: self.EmpID(),
						Remarks: self.MARemarks(),
						AStatus: 'M',
						SubmissionNo: '',
						OldSubmissionNo: '',
						EntryBy: self.EntryBy(),
						EntryDate: self.EntryDate(),
						RStatus: "F",
						AllowanceMonth: null
					}
					self.Allowances.push(TeliphoneAll);
				}
				if (self.OverTimeAllowance() !== null && self.OverTimeAllowance() !== undefined && self.OverTimeAllowance() !== "") {
					var OverTimeAll = {
						SelectedFiscalYear: fiscalyear,
						Salary_ItemId: 66,
						Item_Amount: self.OverTimeAllowance(),						
						EmpId: self.EmpID(),
						Remarks: self.MARemarks(),
						AStatus: 'A',
						SubmissionNo:'',
						OldSubmissionNo: '',
						EntryBy: self.EntryBy(),
						EntryDate: self.EntryDate(),
						RStatus: "F",
						AllowanceMonth: null
					}
					self.Allowances.push(OverTimeAll);
				}
				if (self.MedicalRebet() !== null && self.MedicalRebet() !== undefined && self.MedicalRebet() !== "") {
					var MedRebateAll = {
						SelectedFiscalYear: fiscalyear,
						Salary_ItemId: 176,
						Item_Amount: self.MedicalRebet(),
						EmpId: self.EmpID(),
						Remarks: self.MARemarks(),
						AStatus: 'A',
						SubmissionNo: '',
						OldSubmissionNo:'',
						EntryBy: self.EntryBy(),
						EntryDate: self.EntryDate(),
						RStatus: "F",
						AllowanceMonth: null
					}
					self.Allowances.push(MedRebateAll);
				}

			}

			var url = "/Handlers/PAYROLL/AllowanceSetting.ashx";
			var method = "SaveAllowanceSetting";
			var appID = "FAMS";
			var modID = "EMPSAL";

			var data = { 'method': method, 'args': JSON.stringify(ko.toJS(self.Allowances())), 'appID': appID, 'modID': modID };

			$.post(url, data, function (result) {
				var obj = jQuery.parseJSON(result);
				if (obj.IsSucess) {
					//self.SubmissionNo(obj.Message.match(/\d+/g));
					msg(obj.Message, "SUCCESS");
					self.ClearControls();
				}
				else {
					msg("Oops! Error Occured while saving data...", "WARNING");
				}
			});


		}


	}
	self.ClearControls = function () {		
		self.SelectedFiscalYear([]);
		self.DearnessAllowance('');
		self.WaterDhalAllowance('');
		self.DressAllowance('');
		self.Remarks('');
		self.MARemarks('');
		self.isAnnualAllowance(true);
		self.AtithitiSatkarAllowance('');
		self.TeliphoneAllowance('');
		self.OverTimeAllowance('');
		self.MedicalRebet('');
		self.Allowances([]);
	}
	self.GetFiscalYear = function () {
		$.ajax({
			dataType: "json",
			cache: false,
			async: false,
			url: '../../Handlers/CENTRALLOOKUP/FiscalYearHandler.ashx',
			data: { 'method': 'GetFiscalYear', 'fiscalYearID': null },
			contentType: "application/json; charset=utf-8",
			success: function (result) {

				var mappedTask = $.map(result.ResponseData, function (item) {

					return new FiscalYear(item)
				});

				self.FiscalYears(mappedTask);

			},
			error: function (err) {
				msg(err.status + " - " + err.statusText, "FAILURE");

			}
		});
	}
	$('#modalEmpSearch').on('hidden.bs.modal', function () {
		self.EmpID(GEmpID);
		self.EmployeeName(GEmpName);
		if (self.EmpID() === undefined) {
			self.disableThis(true);			
		}
		else {
			self.disableThis(false);
			self.LoadMonthlyAllowanc(GEmpID);
		}
	})
	self.GetFiscalYear();
	self.CLearMonthlyAllowance = function () {
		self.EmpID('');
		self.EmployeeName('');
		self.AtithitiSatkarAllowance('');
		self.TeliphoneAllowance('');
		self.OverTimeAllowance('');
		self.MedicalRebet('');
		self.MARemarks('');
	}
	self.CLearYearlyAllowance = function () {
		self.DearnessAllowance = ko.observable('');
		self.WaterDhalAllowance = ko.observable('');
		self.DressAllowance = ko.observable('');
		self.Remarks = ko.observable('');
	}
	self.isAnnualAllowance.subscribe(function () {				
		if (self.isAnnualAllowance()) {			
			self.CLearMonthlyAllowance();
			self.LoadYearlyAllowanc();
		}
		else {
			self.CLearYearlyAllowance();
			self.LoadMonthlyAllowanc("");
		}
	})
}



$(document).ready(function () {
	//ValidateSession();
	var fas = new FixedAllowanceSetup();
	ko.applyBindings(fas, document.getElementById('FixedAllowanceSetupForm'));

});