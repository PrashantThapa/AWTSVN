﻿function MaritalStatus(data) {
    var self = this;

    self.MarStatID = ko.observable(data.MarStatID);
    self.MarStatName = ko.observable(data.MarStatNameEng);


};

function AddressType(data) {
    var self = this;

    self.AddressTypeID = ko.observable(data.AddressTypeID);
    self.AddressName = ko.observable(data.AddressNameEnglish);

};

function District(data) {
    var self = this;

    self.DistrictCD = ko.observable(data.DistrictCD);
    self.DistrictNameNepali = ko.observable(data.DistrictNameNepali);
    self.DistrictNameEnglish = ko.observable(data.DistrictNameEnglish);

};

function Province(data) {
    var self = this;

    self.ProvinceCD = ko.observable(data.ProvinceCD);
    self.ProvinceNameNepali = ko.observable(data.ProvinceNameNepali);
    self.ProvinceNameEnglish = ko.observable(data.ProvinceNameEnglish);

};

function VDCMP(data) {
    var self = this;

    self.VdcCD = ko.observable(data.VdcCD);
    self.VDCName = ko.observable(data.VDCName);
    self.VDCEn = ko.observable(data.VDCEn);

};

function Ward(data) {
    var self = this;
    self.TotalCount = ko.observable(data.TotalCount);
};

function DocumentType(data) {
    var self = this;

    self.TypeID = ko.observable(data.TypeID);
    self.TypeName = ko.observable(data.TypeName);
    self.TypeNameEng = ko.observable(data.TypeNameEng);

};

function ContactType(data) {
    var self = this;
    self.TypeID = ko.observable(data.TypeID);
    self.TypeName = ko.observable(data.TypeName);
    self.TypeNameEng = ko.observable(data.TypeNameEng);

};

function RelationType(data) {
    var self = this;

    self.RelTypeID = ko.observable(data.RelTypeID);
    self.RelTypeName = ko.observable(data.RelTypeName);
    self.RelTypeNameEng = ko.observable(data.RelTypeNameEng);


};

function Country(data) {
    //debugger;
    var self = this;

    self.CountryName = ko.observable(data.CountryName);
    self.CountryCode = ko.observable(data.CountryCode);


};

function Religion(data) {
    var self = this;

    self.ReligionTypeID = ko.observable(data.ReligionTypeID);
    self.ReligionTypeName = ko.observable(data.ReligionTypeNameEng);


};

function Language(data) {
    var self = this;

    self.LanguageID = ko.observable(data.LanguageID);
    self.LanguageName = ko.observable(data.LanguageName);
    self.LanguageNameEng = ko.observable(data.LanguageNameEng);


};

function Qualification(data) {
    var self = this;

    self.QualID = ko.observable(data.QualID);
    self.QualName = ko.observable(data.QualName);



};

//Employee Registration
function Employee(data) {
    if (data != undefined) {
        var self = this;
        self.Person = ko.observable(data.Person);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.OrgEmpNo = ko.observable(data.OrgEmpNo);
        self.SymbolNo = ko.observable(data.SymbolNo);
        self.IdentityMark = ko.observable(data.IdentityMark);
        self.EntryBy = ko.observable(data.EntryBy);
        self.Status = ko.observable(data.Status);
        self.Action = ko.observable(data.Action);
        self.NLKNo = ko.observable(data.NLKNo);
        self.PFNo = ko.observable(data.PFNo);
        self.PanNo = ko.observable(data.PanNo);
        self.Source = ko.observable(data.Source);
        self.SubmissionNo = ko.observable(data.SubmissionNo);
        self.SequenceNo = ko.observable(data.SequenceNo);
        self.EmployeeTraining = ko.observableArray([new EmployeeTraining()]);
        self.EmployeeInsurance = ko.observableArray([new EmployeeInsurance()]);
        self.EmployeeExperience = ko.observableArray([new EmployeeExperience()]);
        self.EmpMedicalAttr = ko.observableArray([new EmpMedicalAttr()]);
    }
}

// Person
function Person(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.FirstName = ko.observable(data.FirstName);
        self.MiddleName = ko.observable(data.MiddleName);
        self.LastName = ko.observable(data.LastName);
        self.DOB = ko.observable(data.DOB);
        self.Gender = ko.observable(data.Gender);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.Status = ko.observable(data.Status);
        self.Action = ko.observable(data.Action);
        self.Country = ko.observable(data.Country);
        self.Religion = ko.observable(data.Religion);

        self.PersonMaritalStatus = ko.observable(data.PersonMaritalStatus); //ko.observableArray([new PersonMaritalStatus()]);
        self.PersonDocs = ko.observableArray([new PersonDocs()]);
        self.Dependents = ko.observableArray([new PersonDocs()]);
        self.PersonAddresses = ko.observableArray([new PersonAddresses()]);
        self.PersonContacts = ko.observableArray([new PersonContacts()]);
        self.PersonQualifications = ko.observableArray([new PersonQualifications()]);
        self.PersonLanguages = ko.observableArray([new PersonLanguages()]);

        self.Source = ko.observable(data.Source);
        self.SubmissionNo = ko.observable(data.SubmissionNo);
        self.SeqNo = ko.observable(data.SeqNo);
        self.PersonImage = ko.observable(data.PersonImage);
        self.AlertSource = ko.observable(data.AlertSource);
        self.AlertSourceValue = ko.observable(data.AlertSourceValue);

    }
}

// Address
function Address(data) {
    if (data != undefined) {
        var self = this;
        self.AddressID = ko.observable(data.AddressID);

        self.Province = ko.observable(data.Province);
        self.District = ko.observable(data.District);
        self.Ward = ko.observable(data.Ward);
        self.Province = ko.observable(data.Province);
        self.Vdc = ko.observable(data.Vdc);

        self.Tole = ko.observable(data.Tole);
        self.ToleEn = ko.observable(data.ToleEn);
        self.HouseNumber = ko.observable(data.HouseNumber);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Status = ko.observable(data.Status);
        self.Action = ko.observable(data.Action);
    }
}

//person Address
function PersonAddress(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Status = ko.observable(data.Status);
        self.Action = ko.observable(data.Action);
        self.Address = ko.observable(data.Address);
        self.AddrType = ko.observable(data.AddrType);
        self.TranNo = ko.observable(data.TranNo);

    }
}


function PersonContact(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.CTypeValue = ko.observable(data.CTypeValue);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Status = ko.observable(data.Status);
        self.Action = ko.observable(data.Action);

        self.ContactType = ko.observable(data.ContactType);
    }
}

function PersonQualification(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Status = ko.observable(data.Status);
        self.Country = ko.observable(data.Country);
        self.Qualification = ko.observable(data.Qualification);
        self.Title = ko.observable(data.Title);
        self.Institute = ko.observable(data.Institute);
        self.Grade = ko.observable(data.Grade);
        self.Percentage = ko.observable(data.Percentage);
        self.Remarks = ko.observable(data.Remarks);
        self.MajorSubject = ko.observable(data.MajorSubject);
        self.OptSubject = ko.observable(data.OptSubject);
        self.EduEquivalence = ko.observable(data.EduEquivalence);
        self.Action = ko.observable(data.Action);
    }
}

function EmployeeTraining(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Status = ko.observable(data.Status);
        self.Country = ko.observable(data.Country);
        self.Title = ko.observable(data.Title);
        self.Institution = ko.observable(data.Institution);
        self.Grade = ko.observable(data.Grade);
        self.Percentage = ko.observable(data.Percentage);
        self.Remarks = ko.observable(data.Remarks);
        self.MajorSubject = ko.observable(data.MajorSubject);
        self.CertificateName = ko.observable(data.CertificateName);
        self.Action = ko.observable(data.Action);
    }
}

function EmployeeExperience(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Status = ko.observable(data.Status);
        self.Country = ko.observable(data.Country);
        self.JobLocation = ko.observable(data.JobLocation);
        self.Remarks = ko.observable(data.Remarks);
        self.Action = ko.observable(data.Action);
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


function EmployeeInsurance(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.FromDate = ko.observable(data.FromDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.RStatus = ko.observable(data.RStatus);
        self.CompanyName = ko.observable(data.CompanyName);
        self.InsuranceNo = ko.observable(data.InsuranceNo);
        self.PolicyType = ko.observable(data.PolicyType);
        self.ExpiryDate = ko.observable(data.ExpiryDate);
        self.YearlyPremium = ko.observable(data.YearlyPremium);
        self.MonthlyPremium = ko.observable(data.MonthlyPremium);
        self.Remarks = ko.observable(data.Remarks);
        self.Action = ko.observable(data.Action);
    }
}

function EmpMedicalAttr(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.RStatus = ko.observable(data.RStatus);
        self.ProblemName = ko.observable(data.ProblemName);
        self.ProblemStart = ko.observable(data.ProblemStart);
        self.ProblemReason = ko.observable(data.ProblemReason);
        self.DoctorName = ko.observable(data.DoctorName);
        self.DoctorMobileNo = ko.observable(data.DoctorMobileNo);
        self.DoctorAddress = ko.observable(data.DoctorAddress);
        self.DoctorEmail = ko.observable(data.DoctorEmail);
        self.Action = ko.observable(data.Action);
    }
}

function PersonLanguage(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.FromDate = ko.observable(data.FromDate);
        self.ToDate = ko.observable(data.ToDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Status = ko.observable(data.Status);
        self.ReadingFluency = ko.observable(data.ReadingFluency);
        self.WritingFluency = ko.observable(data.WritingFluency);
        self.SpeakingFluency = ko.observable(data.SpeakingFluency);
        self.ListeningFluency = ko.observable(data.ListeningFluency);
        self.MotherLang = ko.observable(data.MotherLang);
        self.Language = ko.observable(data.Language);
        self.Action = ko.observable(data.Action);
    }
}

function PersonRelative(data) {
    if (data != undefined) {
        var self = this;
        self.PID = ko.observable(data.PID);
        self.FromDate = ko.observable(data.FromDate);
        self.EntryBy = ko.observable(data.EntryBy);
        self.EntryDate = ko.observable(data.EntryDate);
        self.Status = ko.observable(data.Status);
        self.Action = ko.observable(data.Action);
        self.IsNominee = ko.observable(data.IsNominee);
        self.prevIsNominee = ko.observable(data.prevIsNominee);
        self.Relative = ko.observable(data.Relative);
        self.RelType = ko.observable(data.RelType);
        self.NomineeFromDate = ko.observable(data.NomineeFromDate);
        self.PersonNominee = ko.observable(data.PersonNominee);
    }
}


function Saveemployeeregistration(self) {
    var source = '';
    source = 'DIRTY';
    var action;
    if (self.MAction() === undefined || self.MAction() === null) {
        action = "A";
    }
    else {
        action = "E";
    }

    //action = "A";

    var country = {
       
        CountryCode: ko.toJS(self.SelectedEmpCountry).CountryCode,
        CountryName: ko.toJS(self.SelectedEmpCountry).CountryName
    }

    var maritalStatus = {
        MarStatID: ko.toJS(self.SelectedEmpMStatus).MarStatID,
        MarStatName: ko.toJS(self.SelectedEmpMStatus).MarStatName,
        Action: action,
        RStatus: self.Status()
    }

    if (ko.toJS(self.SelectedEmpReligion) == undefined || ko.toJS(self.SelectedEmpReligion) == null) {
        {
            var religion = {
                ReligionTypeID: null,
                ReligionTypeName: ""
            }
        }
    }
    else {
        var religion = {
            ReligionTypeID: ko.toJS(self.SelectedEmpReligion).ReligionTypeID,
            ReligionTypeName: ko.toJS(self.SelectedEmpReligion).ReligionTypeName
        }
    }

    var subno = null;

    if (action == "A") {
        subno = null;
    }

    else if (action == "E") {
        subno = self.SubmissionNo();
    }
    //action == "A"

        var originalPerConData = self.PersonContacts();
    if (self.DeleteContacts().length > 0) {
        ko.utils.arrayPushAll(originalPerConData, self.DeleteContacts());
    }

    var person = {
        PID: self.PID(),
        FirstName: self.EmpFirstName(),
        MiddleName: self.EmpMiddleName(),
        LastName: self.EmpLastName(),
        FirstNameEn: self.EmpFirstNameEng(),
        MiddleNameEn: self.EmpMiddleNameEng(),
        LastNameEn: self.EmpLastNameEng(),
        DOB: self.EmpDOB(),
        Gender: self.EmpGender(),

        ToDate: "",
        EntryBy: self.EntryBy(),
        Status: self.Status(),
        Action: action,


        Country: country,
        Religion: religion,
        PersonMaritalStatus: maritalStatus,


        PersonAddresses: self.PersonAddresses(),
        Dependents: self.PersonRelatives(),
        PersonLanguages: self.PersonLanguages(),
        PersonContacts: self.PersonContacts(),
        PersonQualifications: self.PersonQualifications(),
        PersonDocs: self.PersonDocuments(),

        Source: source,
        SubmissionNo: subno,
        SeqNo: self.SequenceNo,

        PersonImage: self.PersonImage(),
        AlertSource: self.AlertSource(),
        AlertSourceValue: self.AlertSourceValue()

    }

    var employeeregistration = {
        Person: person,
        FromDate: "",
        ToDate: "",
        EntryBy: self.EntryBy(),
        Status: self.Status(),
        Action: action,
        OldSubmissionNo: self.SubmissionNo(),
        SubmissionNo: subno,
        SequenceNo: self.SequenceNo(),
        OrgEmpNo: "",
        SymbolNo: self.SymbolNo(),
        IdentityMark: self.IdentityMark(),
        NLKNo: self.CtzDFNo(),
        PFNo: self.PFNo(),
        PanNo: self.PanNo(),
        Source: source,
        EmployeeTraining: self.EmployeeTrainings(),
        EmployeeInsurance: self.EmployeeInsurances(),
        EmployeeExperience: self.EmployeeExperiences(),
        EmpMedicalAttr: self.EmpMedicalAttrs()
    }

    method = 'SaveEmployee';
    var url = "/Handlers/PIS/EmployeeRegistrationHandler.ashx";
    var appID = "PIS";
    var modID = "EMPREG";

    var data = { 'method': method, 'args': JSON.stringify(ko.toJS(employeeregistration)), 'appID': appID, 'modID': modID };
    $.post(url, data,
        function (result) {
            var obj = jQuery.parseJSON(result);
            if (obj.IsSucess == true) {
                self.ClearControls();
                msg(obj.Message, "SUCCESS");
                if (self.Editable() == 'G') {
                    window.history.back();
                }
            }
            else {
                //msg(obj.Message);
                msg("Oops!!There is an error..Please check all the fields and retry", "FAILURE");
            }
            //debugger;   


        });

}




var EmployeeViewModel = function () {
    var self = this;

    //Employee
    self.PID = ko.observable(null);
    self.SymbolNo = ko.observable();
    self.Uniqueness = ko.observable(null);
    self.EmpFirstName = ko.observable();
    self.EmpMiddleName = ko.observable();
    self.EmpLastName = ko.observable();
    self.EmpFirstNameEng = ko.observable();
    self.EmpMiddleNameEng = ko.observable();
    self.EmpLastNameEng = ko.observable();
    self.EmpDOB = ko.observable();
    self.ProvinceCD = ko.observable();
    self.EmpGender = ko.observable();
    self.IdentityMark = ko.observable();
    self.CtzDFNo = ko.observable();
    self.PFNo = ko.observable();
    self.PanNo = ko.observable();
    self.EmpImageFile = ko.observable();
    self.Status = ko.observable();
    self.MAction = ko.observable();
    self.Action = ko.observable();
    self.PersonImage = ko.observable();
    self.AlertSource = ko.observable();
    self.AlertSource.focused = ko.observable();
    self.DeleteContacts = ko.observableArray([]);

    self.AlertSource.focused.subscribe(function (value) {
        if (value === 'Mobile') {
            if (isNaN(self.AlertSourceValue()) === true) {
                msg("Please fill Correct Mobile Number", "WARNING");
                return;
            }
            if (self.AlertSourceValue().length !== 10) {
                msg("Please fill Correct Mobile Number", "WARNING");
                return;
            }

        }
        else if (value === 'Email') {
            if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)) {
                msg("enter email");
                return;
            }
            return;
        }
        else {
            self.AlertSourceValue('');
        }

    });
    self.AlertSourceValue = ko.observable();
    self.AlertSourceValue.subscribe(function (value) {

    });
    self.Days = ko.observable();
    var entryBy = $("#user").text();
    self.EntryBy = ko.observable(entryBy);

    self.SelectedEmpMStatus = ko.observable();
    self.SelectedEmpCountry = ko.observable();
    self.SelectedEmpReligion = ko.observable();

    self.MaritalStatuses = ko.observableArray([]);
    self.Countries = ko.observableArray([]);
    self.Religions = ko.observableArray([]);


    //Details
    self.SubmissionNo = ko.observable(null);
    self.SequenceNo = ko.observable(0);
    self.RSequenceNo = ko.observable();
    self.Employees = ko.observableArray([]);

    //Address
    self.AddressID = ko.observable();
    self.ToleNep = ko.observable();
    self.ToleEng = ko.observable();
    self.HouseNo = ko.observable();
    self.AddRPRiority = ko.observable();

    self.SelectedAddrType = ko.observable();
    self.SelectedProvince = ko.observable();
    self.SelectedDistrict = ko.observable();
    //self.SelectedProvince = ko.observableArray([]);
    self.SelectedVDCMP = ko.observable();
    self.SelectedWards = ko.observable();

    self.AddressTypes = ko.observableArray([]);
    self.States = ko.observableArray([]);
    self.Districts = ko.observableArray([]);
    self.VDCMPs = ko.observableArray([]);
    self.Wards = ko.observableArray([]);
    self.Provinces = ko.observableArray([]);
    self.PersonAddresses = ko.observableArray([]);


    //Contact
    self.Value = ko.observable();
    self.ContactPriority = ko.observable();

    self.SelectedContactType = ko.observable();

    self.ContactTypes = ko.observableArray([]);
    self.PersonContacts = ko.observableArray([]);



    //Qualification
    self.QualTitle = ko.observable();
    self.QualInstitution = ko.observable();
    self.QualFromDate = ko.observable();
    self.QualToDate = ko.observable();
    self.QualGrade = ko.observable();
    self.QualPercent = ko.observable();
    self.QualMjrSubject = ko.observable();
    self.QualOptSubject = ko.observable();
    self.QualRemarks = ko.observable();
    self.EduEquivalence = ko.observable();

    self.SelectedQualCountry = ko.observable();
    self.SelectedQualification = ko.observable();

    self.Qualifications = ko.observableArray([]);
    self.PersonQualifications = ko.observableArray([]);



    //Training
    self.TrainingTitle = ko.observable();
    //self.TrainCountry = ko.observable();
    self.TrainCertificate = ko.observable();
    self.TrainInstitution = ko.observable();
    self.TrainFromDate = ko.observable();
    self.TrainToDate = ko.observable();
    self.TrainGrade = ko.observable();
    self.TrainPercent = ko.observable();
    self.TrainRemarks = ko.observable();
    self.TrainMjrSubject = ko.observable();

    self.SelectedTrainCountry = ko.observable();

    self.EmployeeTrainings = ko.observableArray([]);



    //Experience
    self.JobLocation = ko.observable();
    self.ExpFromDate = ko.observable();
    self.ExpToDate = ko.observable();
    self.JobTitleResp = ko.observable();

    self.SelectedExpCountry = ko.observable();

    self.EmployeeExperiences = ko.observableArray([]);



    //Document
    self.DocNo = ko.observable();
    self.DocIssuedBy = ko.observable();
    self.DocDate = ko.observable();
    self.EmpDocFile = ko.observable();

    self.SelectedDocType = ko.observable();

    self.DocumentTypes = ko.observableArray([]);
    self.PersonDocuments = ko.observableArray([]);

    self.Provinces = ko.observableArray([]);

    //Insurance
    self.CompanyName = ko.observable();
    self.InsuranceNo = ko.observable();
    self.PolicyType = ko.observable();
    self.ExpiryDate = ko.observable();
    self.YearlyPremium = ko.observable();
    self.MonthlyPremium = ko.observable();
    self.InsRemarks = ko.observable();

    self.EmployeeInsurances = ko.observableArray([]);



    //MedicalCondition
    self.Problem = ko.observable();
    self.ProblemStart = ko.observable();
    self.Reason = ko.observable();
    self.DoctorName = ko.observable();
    self.DoctorMobNo = ko.observable();
    self.DoctorAddress = ko.observable();
    self.DoctorEmail = ko.observable();

    self.EmpMedicalAttrs = ko.observableArray([]);



    //Language
    self.IsMotherLanguage = ko.observable(false);

    self.SelectedLanguage = ko.observable();
    self.SelectedRFluency = ko.observable();
    self.SelectedWFluency = ko.observable();
    self.SelectedSFluency = ko.observable();
    self.SelectedLFluency = ko.observable();

    self.Languages = ko.observableArray([]);
    self.Fluencies = ko.observableArray([
        { FluenCyID: 1, FluencyName: "Excellent" },
        { FluencyID: 2, FluencyName: "Very Good" },
        { FluenCyID: 3, FluencyName: "Good" },
        { FluencyID: 4, FluencyName: "Average" }
    ]);
    self.PersonLanguages = ko.observableArray([]);



    //Relative
    self.RFirstName = ko.observable();
    self.RMiddleName = ko.observable();
    self.RLastName = ko.observable();
    self.RelGender = ko.observable();
    self.RelDOB = ko.observable();
    self.isNominee = ko.observable(false);
    self.prevIsNominee = ko.observable(false);

    self.SelectedRelationType = ko.observable();

    self.RelationTypes = ko.observableArray([]);
    self.PersonRelatives = ko.observableArray([]);


    //Nominee Document
    //self.NDocType = ko.observable();
    self.NDocNo = ko.observable();
    self.NDocIssuedBy = ko.observable();
    self.NDocDate = ko.observable();
    self.NomDocFile = ko.observable();

    self.SelectedNDocType = ko.observable();

    self.NomineeDocuments = ko.observableArray([]);

    self.SelectedAddress = ko.observable();
    self.SelectedContact = ko.observable();
    self.SelectedQual = ko.observable();
    self.SelectedTraining = ko.observable();
    self.SelectedExperience = ko.observable();
    self.SelectedDocument = ko.observable();
    self.SelectedInsurance = ko.observable();
    self.SelectedMedicalCondition = ko.observable();
    self.SelectedLang = ko.observable();
    self.SelectedRelative = ko.observable();
    self.SelectedNomineeDoc = ko.observable();
    self.SelectedWard = ko.observable();

    //Load Marital Status
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/MaritalStatusHandler.ashx',
        data: { 'method': 'GetMaritalStatus', 'MarStatID': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new MaritalStatus(item)

            });
            self.MaritalStatuses(mappedTask);

        },
        error: function (err) {
            msg("Oops! Error occured while obtaining marital status!...", "WARNING");
        }
    });

    //Load Address Type
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/AddressTypeHandler.ashx',
        data: { 'method': 'GetAddressType', 'addresstypeid': null, 'token': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new AddressType(item)

            });
            self.AddressTypes(mappedTask);

        },
        error: function (err) {
            msg("Oops! Error occured while obtaining Address Type data! ...", "WARNING");
        }
    });

    //Load State
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/StateHandler.ashx',
        data: { 'method': 'GetState', 'statecd': null, 'token': "" },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTasks = $.map(data.ResponseData, function (item) {
                return new State(item)
            });
            self.States(mappedTasks);

        },
        error: function (err) {
            msg("Oops! Error occured while obtaining data!...", "WARNING");
        }
    });



    self.GetProvinces = function () {
        if (ko.toJS(self.SelectedAddrType) == undefined) { }

        else {
            $.ajax({
                dataType: "json",
                url: '../../Handlers/CENTRALLOOKUP/DistrictHandler.ashx',
                data: { 'method': 'GetProvince', 'ProvinceCD': null },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    var mappedTask = $.map(data.ResponseData, function (item) {

                        return new Province(item)

                    });
                    self.Provinces(mappedTask);

                },
                error: function (err) {
                    msg("Oops! Error occured while obtaining Province data! ...", "WARNING");
                }
            });
        }
    };
    self.SelectedAddrType.subscribe(function (newValue) {
        self.GetProvinces(); 
    });
    //Load District
    self.GetDistricts = function () {
        if (ko.toJS(self.SelectedProvince) == undefined) { }

        else {
            $.ajax({
                dataType: "json",
                url: '../../Handlers/CENTRALLOOKUP/DistrictHandler.ashx',
                data: { 'method': 'GetDistrict', 'ProvinceCD': ko.toJS(self.SelectedProvince().ProvinceCD), 'DistrictCD': null },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    var mappedTask = $.map(data.ResponseData, function (item) {
                        return new District(item);
                    });
                    self.Districts(mappedTask);
                },
                error: function (err) {
                    msg("Oops! Error occured while obtaining District data! ...", "WARNING");
                }
            });
        }
    }
        ;

    self.SelectedProvince.subscribe(function (newValue) {
        self.GetDistricts();
    });

    //Load VDC
    self.GetVDC = function () {
        if (ko.toJS(self.SelectedDistrict) == undefined) {
            self.SelectedVDCMP(null);
            self.SelectedWard(null);
            //
            $("#ddlVDCMP").attr("disabled", true);
            $("#ddlWard").attr("disabled", true);
        }
        else {
            var DisIDS = ko.toJS(self.SelectedDistrict);
            var DistrictIDS = DisIDS.DistrictCD;
            $.ajax({
                dataType: "json",
                url: '../../Handlers/CENTRALLOOKUP/VDCHandler.ashx',
                data: { 'method': 'GetVDC', 'DistrictCD': DistrictIDS },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    var mappedTask = $.map(data.ResponseData, function (item) {

                        return new VDCMP(item)

                    });
                    self.VDCMPs(mappedTask);

                },
                error: function (err) {
                    msg("Oops! Error occured while obtaining VDC data!...", "WARNING");
                }
            });
            $("#ddlVDCMP").attr("disabled", false);
        }
    };

    self.SelectedDistrict.subscribe(function (newValue) {
        self.GetVDC();
    });


    //Load Ward
    self.GetWard = function () {

        if (ko.toJS(self.SelectedDistrict) == undefined || ko.toJS(self.SelectedVDCMP) == undefined) {

            self.SelectedWard(null);
            $("#ddlWard").attr("disabled", true);

        }

        else {
            var DisIDS = ko.toJS(self.SelectedDistrict);
            var DistrictIDS = ko.toJS(DisIDS.DistrictCD);

            var VDC = ko.toJS(self.SelectedVDCMP);
            var VdcCD = ko.toJS(VDC.VdcCD);
            $.ajax({
                dataType: "json",
                url: '../../Handlers/CENTRALLOOKUP/VDCHandler.ashx',
                data: { 'method': 'GetVDC', 'DistrictCD': DistrictIDS, 'VdcCD': VdcCD },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    var datas = ko.toJS(data.ResponseData)[0].TotalCount;
                    self.Wards([]);
                    for (var i = 1; i <= datas; i++) {
                        self.Wards.push(i);
                    }
                },
                error: function (err) {
                    msg("Oops! Error occured while obtaining Wards data!...", "WARNING");
                }
            });
            $("#ddlWard").attr("disabled", false);
        }
    };

    self.SelectedVDCMP.subscribe(function (newValue) {
        self.GetWard();
    });


    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/DocumentTypeHandler.ashx',
        data: { 'method': 'GetDocumentType', 'doctypeid': null, 'usedfor': 'P', 'token': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new DocumentType(item)

            });
            self.DocumentTypes(mappedTask);

        },
        error: function (err) {
            msg("Oops! Error occured while obtaining Document data! ...", "WARNING");
        }
    });


    //Load Contact Type
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/ContactTypeHandler.ashx',
        data: { 'method': 'GetContactType', 'contacttypeid': null, 'token': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new ContactType(item)

            });
            self.ContactTypes(mappedTask);

        },
        error: function (err) {
            msg("Oops! Error occured while obtaining contact data!...", "WARNING");
        }
    });

    //Load Relation Type
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/RelationTypeHandler.ashx',
        data: { 'method': 'GetRelationType', 'relType': null, 'token': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new RelationType(item)

            });
            self.RelationTypes(mappedTask);

        },
        error: function (err) {
            msg("Oops! Error occured while obtaining relation type data! ...", "WARNING");
        }
    });


    //Load Country
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/CountryHandler.ashx',
        data: { 'method': 'GetCountry', 'CountryID': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Country(item)

            });
            self.Countries(mappedTask);

        },
        error: function (err) {
            msg("Oops! Error occured while obtaining country type data!...", "WARNING");
        }
    });


    //Load Religion
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/ReligionHandler.ashx',
        data: { 'method': 'GetReligionType', 'reltypeID': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Religion(item)

            });
            self.Religions(mappedTask);

        },
        error: function (err) {
            msg("Oops! Error occured while obtaining religion data!...", "WARNING");
        }
    });

    //Load Language
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/LanguageHandler.ashx',
        data: { 'method': 'GetLanguageType', 'langtypeID': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Language(item)

            });
            self.Languages(mappedTask);

        },
        error: function (err) {
            msg("Oops! Error occured while obtaining Language data!...", "WARNING");
        }
    });


    //Load Qualification
    $.ajax({
        dataType: "json",
        url: '../../Handlers/CENTRALLOOKUP/QualificationHandler.ashx',
        data: { 'method': 'GetQualification', 'qualID': null },
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (data) {
            var mappedTask = $.map(data.ResponseData, function (item) {

                return new Qualification(item)

            });
            self.Qualifications(mappedTask);

        },
        error: function (err) {
            msg("Oops! Error occured while obtaining qualification data! ...", "FAILURE");
        }
    });


    for (var i = 0; i < self.Countries().length; i++) {
        if (self.Countries()[i].CountryName() == "NEPAL") {
            self.SelectedEmpCountry(self.Countries()[i]);
        }
    }


    self.GetDateDifference = function (date1, date2) {
        if (date1 != undefined && date2 != undefined) {

            $.ajax({
                dataType: "json",
                cache: false,
                async: false,
                url: '../../../Handlers/COMMON/DateHandler.ashx',
                data: { 'method': 'GetDaysDifference', 'date1': date2, 'date2': date1 },
                contentType: "application/json; charset=utf-8",
                success: function (result) {
                    var days = result.ResponseData;
                    self.Days(days);

                },
                error: function (err) {
                    msg("Oops! Error occured while obtaining days data!...", "WARNING");
                }
            });
        }
    }

    self.ValidateQualificationDate = function () {
        if (!Validate.empty(self.QualFromDate()) && !Validate.empty(self.QualToDate())) {
            self.GetDateDifference(self.QualFromDate(), self.QualToDate());
            if (self.Days() < 0) {
                msg("End date should be Greater or Equal to Start date !!!", "WARNING");
                self.QualToDate('');
                self.Days('');
            }
        }
    }

    self.ValidateTrainingDate = function () {
        if (!Validate.empty(self.TrainFromDate()) && !Validate.empty(self.TrainToDate())) {
            self.GetDateDifference(self.TrainFromDate(), self.TrainToDate());
            if (self.Days() < 0) {
                msg("End date should be Greater or Equal to Start date!!!", "WARNING");
                self.TrainToDate('');
                self.Days('');
            }
        }
    }

    self.ValidateExpDate = function () {
        if (!Validate.empty(self.ExpFromDate()) && !Validate.empty(self.ExpToDate())) {
            self.GetDateDifference(self.ExpFromDate(), self.ExpToDate());
            if (self.Days() < 0) {
                msg("End date should be Greater or Equal to Start date!!!", "WARNING");
                self.ExpToDate('');
                self.Days('');
            }
        }
    }

    self.ValidatePremium = function () {
        if (!Validate.empty(self.YearlyPremium()) && !Validate.empty(self.MonthlyPremium())) {
            if (Number(self.MonthlyPremium()) >= Number(self.YearlyPremium())) {
                msg("Yearly Premium should be greater than Monthly premium!!!", "WARNING");
                self.MonthlyPremium('');
            }
        }
    }

    ValidateMedEmail = function (obj, focus) {
        if (!Validate.empty(self.DoctorEmail())) {
            if (focus) {
                callback = function () {
                    obj.focus();
                }
            }
            if (Validate.email(self.DoctorEmail())) {
                msg("Please fill correct Email!!!", "WARNING");

                return false;
            }
            else {
                return true;
            }

        }
        else {
            return true;
        }
    }


    //Get Details of all

    //Person Address Details
    self.PersonAddrDetails = function (data, edit) {
        for (var i = 0; i < data.length; i++) {
            var addressesType = {
                AddressTypeID: data[i].AddrType.AddressTypeID,
                AddressName: data[i].AddrType.AddressName
            };
            var province = {
                ProvinceCD: data[i].Address.Province.ProvinceCD,
                ProvinceNameNepali: data[i].Address.Province.ProvinceNameNepali,
                ProvinceNameEnglish: data[i].Address.Province.ProvinceNameEnglish
            };

            var district = {
                DistrictCD: data[i].Address.District.DistrictCD,
                DistrictNameNepali: data[i].Address.District.DistrictNameNepali
            }
            var vdc = {
                DistrictCD: data[i].Address.District.DistrictCD,
                VdcCD: data[i].Address.Vdc.VdcCD,
                VDCName: data[i].Address.Vdc.VDCName

            }
            var wrd = {
                DistrictCD: data[i].Address.District.DistrictCD,
                VdcCD: data[i].Address.Vdc.VdcCD,
                WardNO: data[i].Address.Ward.WardNO,
                WardNameNep: data[i].Address.Ward.WardNameNep
            }

            var state = {
                StateCD: data[i].Address.State.StateCD,
                StateNameNepali: data[i].Address.State.StateNameNepali
            }

            var action = null;
            var entrydate = null;
            if (edit == 'Y') {
                action = 'E';
                entrydate = null;
            }
            else {
                action = //data[i].Action;
                    entrydate = data[i].EntryDate;
            }

            var address = {
                AddressID: data[i].Address.AddressID,
                District: district,
                State: state,
                VDC: vdc,
                Province: province,
                Ward: self.SelectedWard,
                Tole: data[i].Address.Tole,
                ToleEn: data[i].Address.ToleEn,
                HouseNumber: data[i].Address.HouseNumber,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                Status: data[i].Address.Status,
                Action: action
            }
            var personAddr = {
                PID: "",
                AddrType: addressesType,
                Address: address,
                AddressPriority: null,
                FromDate: data[i].FromDate,
                ToDate: data[i].ToDate,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                Status: data[i].Status,
                Action: action
            };

            self.PersonAddresses.push(new PersonAddress(personAddr));
        }
    }


    self.PersonContactDetails = function (data, edit) {
        for (var i = 0; i < data.length; i++) {
            var contactType = {
                TypeID: data[i].ContactType.TypeID,
                TypeName: data[i].ContactType.TypeName
            };

            var action = null;
            var entrydate = null;
            if (edit == 'Y') {
                action = 'E';
                entrydate = null;
            }
            else {
                action = data[i].Action;
                entrydate = data[i].EntryDate;
            }

            var personContact = {
                PID: "",
                CTypeValue: data[i].CTypeValue,
                FromDate: data[i].FromDate,
                ToDate: data[i].ToDate,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                Status: data[i].Status,
                ContactType: contactType,
                Action: action
            };

            self.PersonContacts.push(new PersonContact(personContact));
        }
    }


    //Person Qualification Details
    self.PersonQualDetails = function (data, edit) {
        for (var i = 0; i < data.length; i++) {
            var qualification = {
                QualID: data[i].Qualification.QualID,
                QualName: data[i].Qualification.QualName
            };

            var country = {
                CountryCode: data[i].Country.CountryCode,
                CountryName: data[i].Country.CountryName
            };

            var action = null;
            var entrydate = null;
            if (edit == 'Y') {
                action = 'E';
                entrydate = null;
            }
            else {
                action = data[i].Action;
                entrydate = data[i].EntryDate;
            }

            var personQualification = {
                PID: "",
                FromDate: data[i].FromDate,
                ToDate: data[i].ToDate,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                Status: data[i].Status,
                Country: country,
                Qualification: qualification,
                Title: data[i].Title,
                Institute: data[i].Institute,
                Grade: data[i].Grade,
                Percentage: data[i].Percentage,
                Remarks: data[i].Remarks,
                MajorSubject: data[i].MajorSubject,
                OptSubject: data[i].OptSubject,
                EduEquivalence: data[i].EduEquivalence,
                Action: action
            };

            self.PersonQualifications.push(new PersonQualification(personQualification));
        }
    }


    //Employee Training Details
    self.EmpTrainingDetails = function (data, edit) {

        for (var i = 0; i < data.length; i++) {

            var action = null;
            var entrydate = null;
            if (edit == 'Y') {
                action = 'E';
                entrydate = null;
            }
            else {
                action = data[i].Action;
                entrydate = data[i].EntryDate;
            }
            var country = {
                CountryCode: data[i].Country.CountryCode,
                CountryName: data[i].Country.CountryName
            }

            var employeeTraining = {
                PID: "",
                FromDate: data[i].FromDate,
                ToDate: data[i].ToDate,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                Status: data[i].Status,
                Country: country,
                Title: data[i].Title,
                Institution: data[i].Institution,
                Grade: data[i].Grade,
                Percentage: data[i].Percentage,
                Remarks: data[i].Remarks,
                MajorSubject: data[i].MajorSubject,
                CertificateName: data[i].CertificateName,
                Action: action
            };

            self.EmployeeTrainings.push(new EmployeeTraining(employeeTraining));
        }
    }


    //Employee Experience Details
    self.EmpExperienceDetails = function (data, edit) {
        for (var i = 0; i < data.length; i++) {
            var country = {
                CountryCode: data[i].Country.CountryCode,
                CountryName: data[i].Country.CountryName
            }

            var action = null;
            var entrydate = null;
            if (edit == 'Y') {
                action = 'E';
                entrydate = null;
            }
            else {
                action = data[i].Action;
                entrydate = data[i].EntryDate;
            }

            var employeeExperience = {
                PID: "",
                FromDate: data[i].FromDate,
                ToDate: data[i].ToDate,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                RStatus: data[i].RStatus,
                Country: country,
                JobLocation: data[i].JobLocation,
                Remarks: data[i].Remarks,
                Action: action

            };

            self.EmployeeExperiences.push(new EmployeeExperience(employeeExperience));
        }
    }

    //Person Documents Details
    self.PersonDocDetails = function (data, edit) {
        for (var i = 0; i < data.length; i++) {
            var docType = {
                TypeID: data[i].DocType.TypeID,
                TypeName: data[i].DocType.TypeName
            }

            var action = null;
            var entrydate = null;
            if (edit == 'Y') {
                action = 'E';
                entrydate = null;
            }
            else {
                action = data[i].Action;
                entrydate = data[i].EntryDate;
            }

            var personDocument = {
                PID: "",
                FromDate: data[i].FromDate,
                ToDate: data[i].ToDate,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                Status: data[i].Status,
                DocType: docType,
                DocFile: data[i].DocFile,
                IssueNo: data[i].IssueNo,
                IssueDate: data[i].IssueDate,
                IssueBy: data[i].IssueBy,
                Action: action
            };

            self.PersonDocuments.push(new PersonDocument(personDocument));
        }
    }


    //Employee Insurance Details
    self.EmpInsuranceDetails = function (data, edit) {
        for (var i = 0; i < data.length; i++) {

            var action = null;
            var entrydate = null;
            if (edit == 'Y') {
                action = 'E';
                entrydate = null;
            }
            else {
                action = data[i].Action;
                entrydate = data[i].EntryDate;
            }

            var employeeInsurance = {
                PID: "",
                CompanyName: data[i].CompanyName,
                InsuranceNo: data[i].InsuranceNo,
                PolicyType: data[i].PolicyType,
                ExpiryDate: data[i].ExpiryDate,
                YearlyPremium: data[i].YearlyPremium,
                MonthlyPremium: data[i].MonthlyPremium,
                Remarks: data[i].Remarks,
                FromDate: data[i].FromDate,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                RStatus: data[i].RStatus,
                Action: action
            };

            self.EmployeeInsurances.push(new EmployeeInsurance(employeeInsurance));
        }
    }


    //Employee Medical Condition Details
    self.EmpMedicalConditionDetails = function (data, edit) {
        for (var i = 0; i < data.length; i++) {

            var action = null;
            var entrydate = null;
            if (edit == 'Y') {
                action = 'E';
                entrydate = null;
            }
            else {
                action = data[i].Action;
                entrydate = data[i].EntryDate;
            }

            var empMedicalAttr = {
                PID: "",
                ProblemName: data[i].ProblemName,
                ProblemStart: data[i].ProblemStart,
                ProblemReason: data[i].ProblemReason,
                DoctorName: data[i].DoctorName,
                DoctorMobileNo: data[i].DoctorMobileNo,
                DoctorAddress: data[i].DoctorAddress,
                DoctorEmail: data[i].DoctorEmail,
                FromDate: data[i].FromDate,
                ToDate: data[i].ToDate,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                RStatus: data[i].RStatus,
                Action: action
            };

            self.EmpMedicalAttrs.push(new EmpMedicalAttr(empMedicalAttr));

        }
    }


    //Person Language Details
    self.PersonLanguageDetails = function (data, edit) {
        for (var i = 0; i < data.length; i++) {
            var language = {
                LanguageID: data[i].Language.LanguageID,
                LanguageName: data[i].Language.LanguageName
            }

            var action = null;
            var entrydate = null;
            if (edit == 'Y') {
                action = 'E';
                entrydate = null;
            }
            else {
                action = data[i].Action;
                entrydate = data[i].EntryDate;
            }

            var personLanguage = {
                PID: "",
                ReadingFluency: data[i].ReadingFluency,
                WritingFluency: data[i].WritingFluency,
                SpeakingFluency: data[i].SpeakingFluency,
                ListeningFluency: data[i].ListeningFluency,
                Language: language,
                MotherLang: data[i].MotherLang,
                FromDate: data[i].FromDate,
                ToDate: data[i].ToDate,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                Status: data[i].Status,
                Action: action
            };

            self.PersonLanguages.push(new PersonLanguage(personLanguage));
        }
    }


    //Person Dependent Details
    self.PersonDependentDetails = function (data, edit) {
        for (var i = 0; i < data.length; i++) {
            var relationType = {
                RelTypeID: data[i].RelType.RelTypeID,
                RelTypeName: data[i].RelType.RelTypeName
            }

            var action = null;
            var entrydate = null;
            if (edit == 'Y') {
                action = 'E';
                entrydate = null;
            }
            else {
                action = data[i].Action;
                entrydate = data[i].EntryDate;
            }

            var relative = {
                PID: "",
                FirstName: data[i].Relative.FirstName,
                MiddleName: data[i].Relative.MiddleName,
                LastName: data[i].Relative.LastName,
                SeqNo: data[i].Relative.SeqNo,
                DOB: data[i].Relative.DOB,
                Gender: data[i].Relative.Gender,
                MaritalStatus: null,
                ToDate: data[i].Relative.ToDate,
                EntryBy: self.EntryBy(),
                Status: data[i].Status,
                Action: action
            }
            if (data[i].IsNominee == true) {
                for (var j = 0; j < data[i].PersonNominee.NomineeDoc.length; j++) {
                    var nDocumentType = {
                        TypeID: data[i].PersonNominee.NomineeDoc[j].DocType.TypeID,
                        TypeName: data[i].PersonNominee.NomineeDoc[j].DocType.TypeName
                    }
                    var nomineeDocument = {
                        PID: self.PID(),
                        FromDate: data[i].PersonNominee.NomineeDoc[j].FromDate,
                        ToDate: data[i].PersonNominee.NomineeDoc[j].ToDate,
                        EntryBy: self.EntryBy(),
                        EntryDate: entrydate,
                        Status: data[i].PersonNominee.NomineeDoc[j].Status,
                        DocType: nDocumentType,
                        DocFile: data[i].PersonNominee.NomineeDoc[j].DocFile,
                        IssueNo: data[i].PersonNominee.NomineeDoc[j].IssueNo,
                        IssueDate: data[i].PersonNominee.NomineeDoc[j].IssueDate,
                        IssueBy: data[i].PersonNominee.NomineeDoc[j].IssueBy,
                        Action: action
                    };

                    self.NomineeDocuments.push(new PersonDocument(nomineeDocument));
                }

                var personNominee = {
                    PID: "",
                    RelType: relationType,
                    Relative: relative,
                    NomineeFromDate: data[i].PersonNominee.NomineeFromDate,
                    NomineeDoc: ko.toJS(self.NomineeDocuments),
                    EntryBy: self.EntryBy(),
                    EntryDate: entrydate,
                    Status: data[i].PersonNominee.Status,
                    Action: action
                }
            }

            else {
                var personNominee = null;
            }

            var personRelative = {
                PID: self.PID(),
                IsNominee: data[i].IsNominee,
                prevIsNominee: data[i].IsNominee,
                RelType: relationType,
                Relative: relative,
                PersonNominee: personNominee,
                EntryBy: self.EntryBy(),
                EntryDate: entrydate,
                Status: data[i].Status,
                Action: action
            };

            self.PersonRelatives.push(new PersonRelative(personRelative));
        }
    }


    //Person Details
    self.PersonDetails = function (data, edit) {
        self.EmpFirstName(data.FirstName);
        self.EmpMiddleName(data.MiddleName);
        self.EmpLastName(data.LastName);
        self.EmpFirstNameEng(data.FirstNameEn);
        self.EmpMiddleNameEng(data.MiddleNameEn);
        self.EmpLastNameEng(data.LastNameEn);
        self.EmpFirstName(data.FirstName);
        self.EmpFirstName(data.FirstName);
        self.EmpFirstName(data.FirstName);
        self.EmpDOB(data.DOB);
        self.EmpGender(data.Gender);
        self.AlertSource(data.AlertSource);
        self.AlertSourceValue(data.AlertSourceValue);
        self.SubmissionNo(data.SubmissionNo);
        self.SequenceNo(data.SeqNo);
        empimgfile = data.PersonImage;
        var extension = empimgfile.substr(empimgfile.indexOf('.'))
        self.PersonImage(extension);
        self.EmpImageFile('/PhotoHandle/temp/' + empimgfile + '?' + new Date().getTime());
        for (var i = 0; i < self.Countries().length; i++) {
            if (self.Countries()[i].CountryCode() == data.Country.CountryCode) {
                self.SelectedEmpCountry(self.Countries()[i]);
            }
        }

        for (var i = 0; i < self.Religions().length; i++) {
            if (self.Religions()[i].ReligionTypeID() == data.Religion.ReligionTypeID) {
                self.SelectedEmpReligion(self.Religions()[i]);
            }
        }

        for (var i = 0; i < self.MaritalStatuses().length; i++) {
            if (self.MaritalStatuses()[i].MarStatID() == data.PersonMaritalStatus.MarStatID) {
                self.SelectedEmpMStatus(self.MaritalStatuses()[i]);
            }
        }


        self.PersonAddrDetails(data.PersonAddresses, edit);
        self.PersonContactDetails(data.PersonContacts, edit);
        self.PersonQualDetails(data.PersonQualifications, edit);
        self.PersonDocDetails(data.PersonDocs, edit);
        self.PersonLanguageDetails(data.PersonLanguages, edit);
        self.PersonDependentDetails(data.Dependents, edit);

    }



    self.Editable = ko.observable(getUrlParamVal('Editable'));

    //Employee Details on Verification
    self.GetEmpDetailsBySubmissionNo = function () {
        self.SubmissionNo(getUrlParamVal('SubmissionNumber'));
        var editable = getUrlParamVal('Editable');
        if (self.SubmissionNo() == null || self.SubmissionNo() == "" || self.SubmissionNo() == undefined) {
            return;
        }
        else {

            $.ajax({
                dataType: "json",
                url: '../../Handlers/PIS/EmployeeRegistrationHandler.ashx',
                data: { 'method': 'GetEmployee', 'submissionNo': self.SubmissionNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    if (data.ResponseData == null) {
                        msg("No data on this submission number", "WARNING");
                    }
                    else {
                        self.Employees(data.ResponseData);
                        self.SymbolNo(self.Employees().SymbolNo);
                        self.PFNo(self.Employees().PFNo);
                        self.PanNo(self.Employees().PanNo);
                        self.CtzDFNo(self.Employees().NLKNo);
                        self.IdentityMark(self.Employees().IdentityMark);
                        self.PersonDetails(self.Employees().Person, self.Editable());
                        self.EmpTrainingDetails(self.Employees().EmployeeTraining, self.Editable());
                        self.EmpExperienceDetails(self.Employees().EmployeeExperience, self.Editable());
                        self.EmpInsuranceDetails(self.Employees().EmployeeInsurance, self.Editable());
                        self.EmpMedicalConditionDetails(self.Employees().EmpMedicalAttr, self.Editable());
                        if (self.Editable() == 'G') {
                            $("#btnEmpDetails").hide();
                            $("#divSubmissionNo").hide();
                            $("#btnEmpDetails").hide();
                            self.MAction("E");
                            $('#txtSymbolNo').attr('disabled', 'disabled');
                            //$('#txtEmpFirstName').attr('disabled', 'disabled');
                            //$('#txtEmpMiddleName').attr('disabled', 'disabled');
                            //$('#txtEmpLastName').attr('disabled', 'disabled');
                            //$('#txtEmpFNameEng').attr('disabled', 'disabled');
                            //$('#txtEmpMNameEng').attr('disabled', 'disabled');
                            //$('#txtEmpLNameEng').attr('disabled', 'disabled');
                            //$('#txtEmpDOB').attr('disabled', 'disabled');
                            //$('#txtPFNo').attr('disabled', 'disabled');
                            //$('#txtCtzDFNo').attr('disabled', 'disabled');
                            //$('#txtPanNo').attr('disabled', 'disabled');
                            $('#btnCancel').hide();



                        }
                        else if (self.Editable() == 'Y') {
                            $("#divSubmissionNo").hide();
                            $("#btnEmpDetails").hide();
                            self.MAction("E");
                        }
                        else {
                            $("#btnEmpDetails").show();
                            $("button").hide();
                            $("#btnNominee").show();
                            $('form').find('input, textarea, select').attr('disabled', 'disabled');
                            $("#divSubmissionNo").show();
                        }
                    }
                },
                error: function (err) {
                    msg("Oops! Error while obtaining data...", "WARNING");
                }
            });
        }
    }


    self.GetEmpDetailsBySubmissionNo();


    //Employee Details
    self.EmpDetails = function () {
        if ($("#btnEmpDetails").text() == "Update Details") {
            $("#divSubmissionNo").show();
            $("#btnEmpDetails").text('View Details');
        }
        else {
            if (self.SubmissionNo() == null) {
                msg("Please fill correct submission number!!!", "WARNING");
            }
            else {
                $.ajax({
                    dataType: "json",
                    url: '../../Handlers/PIS/EmployeeRegistrationHandler.ashx',
                    data: { 'method': 'GetEmployee', 'submissionNo': self.SubmissionNo() },
                    contentType: "application/json; charset=utf-8",
                    async: false,
                    success: function (data) {
                        if (data.ResponseData == null) {
                            msg("Please fill correct submission number!!!", "SUCCESS");
                        }
                        else {
                            self.ClearControls();
                            self.Employees(data.ResponseData);
                            self.SymbolNo(self.Employees().SymbolNo);
                            self.PFNo(self.Employees().PFNo);
                            self.PanNo(self.Employees().PanNo);
                            self.CtzDFNo(self.Employees().NLKNo);
                            self.IdentityMark(self.Employees().IdentityMark);
                            self.PersonDetails(self.Employees().Person, 'N');
                            self.EmpTrainingDetails(self.Employees().EmployeeTraining, 'N');
                            self.EmpExperienceDetails(self.Employees().EmployeeExperience, 'N');
                            self.EmpInsuranceDetails(self.Employees().EmployeeInsurance, 'N');
                            self.EmpMedicalConditionDetails(self.Employees().EmpMedicalAttr, 'N');
                            self.MAction('E');

                            if (self.Employees().Status == "T") {
                                msg("This submission number is already approved!!!", "WARNING");

                                $("button").hide();
                                $("#btnNominee").show();
                                $('form').find('input, textarea, select').attr('disabled', 'disabled');
                            }
                        }
                    },
                    error: function (err) {
                        msg("Oops Error while obtaining data...", "FAILURE");
                    }
                });
            }
        }
    }

    //Employee Image File Upload
    empimgfile = null;
    edocerror = "";
    filesize = "";
    $("#UploadEmpImgFile").on("change", function () {
        edocerror = "";
        filesize = "";
        if (this.files === undefined || this.files[0] === undefined) return;
        filesize = this.files[0].size / 3072 / 3072;
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        var reader = new FileReader(); // instance of the FileReader            
        reader.readAsDataURL(files[0]); // read the local file  

        reader.onloadend = function (event) { // set image data as background of div 
            if (files[0].type == "image/jpeg" || files[0].type == "image/png" || files[0].type == "image/bnb") {

                var dataUri = event.target.result
                empimgfile = dataUri;
            }
            if (files[0].type != "image/jpeg" && files[0].type != "image/png" && files[0].type != "image/bnb") {
                edocerror = 1;
            }
            if (parseFloat(filesize) > 1.0) {
                edocerror = 2;
            }
        }
    });

    //Employee Document File Upload
    empdocfile = null;
    empdocerror = "";
    filesize = "";
    $("#UploadDocFile").on("change", function () {
        empdocerror = "";
        filesize = "";
        filesize = this.files[0].size / 3072 / 3072;
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

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

    //preview employee document image
    self.previewEmpDocImage = function (abc) {
        $('#upEmpDocImage').attr('src', ko.toJS(abc.DocFile));
        var largeImage = document.getElementById('upEmpDocImage');
        var left = (screen.height) / 2;
        var top = (screen.width) / 2;

        var url = largeImage.getAttribute('src', ko.toJS(abc.DocFile));
        window.open(url, 'Image', 'height=' + 500 + ',width=' + 500 + ',resizable=1,scrollbars=yes, left=' + left + ',top=' + top);

    }




    //Nominee Document File Upload
    nomdocfile = null;
    nomdocerror = "";
    filesize = "";
    $("#UploadNDocFile").on("change", function () {
        nomdocerror = "";
        filesize = "";
        filesize = this.files[0].size / 3072 / 3072;
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        var reader = new FileReader(); // instance of the FileReader            
        reader.readAsDataURL(files[0]); // read the local file               
        reader.onloadend = function () { // set image data as background of div 

            if (files[0].type == "image/jpeg" || files[0].type == "application/pdf") {
                nomdocfile = this.result;
            }
            if (files[0].type != "image/jpeg" && files[0].type != "application/pdf") {

                nomdocerror = 1;
            }
            if (parseFloat(filesize) > 1.0) {
                nomdocerror = 2;
            }
        }
    });

    //preview nominee document image
    self.previewNomDocImage = function (abc) {
        $('#upNomDocImage').attr('src', ko.toJS(abc.DocFile));
        var largeImage = document.getElementById('upNomDocImage');
        var left = (screen.height) / 2;
        var top = (screen.width) / 2;

        var url = largeImage.getAttribute('src', ko.toJS(abc.DocFile));
        window.open(url, 'Image', 'height=' + 500 + ',width=' + 500 + ',resizable=1,scrollbars=yes, left=' + left + ',top=' + top);

    }



    self.UploadImage = function () {
        self.EmpImageFile(empimgfile);
    };

    self.DeleteImage = function () {
        self.EmpImageFile('');
        empimgfile = "";
        $("#UploadEmpImgFile").val("");
        edocerror = "";
    };

    self.AddAddress = function () {
        if (self.AddressValidation()) {

            var addressesType = {
                AddressTypeID: ko.toJS(self.SelectedAddrType).AddressTypeID,
                AddressName: ko.toJS(self.SelectedAddrType).AddressName
            };

            var province = {
                ProvinceCD: ko.toJS(self.SelectedProvince).ProvinceCD,
                ProvinceNameNepali: ko.toJS(self.SelectedProvince).ProvinceNameNepali,
                ProvinceNameEnglish: ko.toJS(self.SelectedProvince).ProvinceNameEnglish

            }

            var district = {
                DistrictCD: ko.toJS(self.SelectedDistrict).DistrictCD,
                DistrictNameNepali: ko.toJS(self.SelectedDistrict).DistrictNameNepali
            }
            var vdc = {
                DistrictCD: ko.toJS(self.SelectedDistrict).DistrictCD,
                VdcCD: ko.toJS(self.SelectedVDCMP).VdcCD,
                VDCName: ko.toJS(self.SelectedVDCMP).VDCName

            }
            var wrd = {
                DistrictCD: ko.toJS(self.SelectedDistrict).DistrictCD,
                TotalCount: ko.toJS(self.SelectedWard).TotalCount
            }

            if (ko.toJS(self.SelectedState) == undefined || ko.toJS(self.SelectedState) == null) {
                var state = {
                    StateCD: null,
                    StateNameNepali: ""
                }
            }
            else {
                var state = {
                    StateCD: ko.toJS(self.SelectedState).StateCD,
                    StateNameNepali: ko.toJS(self.SelectedState).StateNameNepali
                }
            }

            var addrinfo = self.SelectedAddress();

            if (addrinfo != undefined || addrinfo != null) {

                //Duplicate Check
                for (var i = 0; i < self.PersonAddresses().length; i++) {
                    if (ko.toJS(self.PersonAddresses()[i].AddrType().AddressTypeID) == addrinfo.AddrType().AddressTypeID) {

                    }
                    else if (ko.toJS(self.PersonAddresses()[i].AddrType().AddressTypeID) == ko.toJS(self.SelectedAddrType).AddressTypeID) {
                        msg("data already exist !!!", "WARNING");
                        return;
                    }
                }

                var action = self.Action() == "A" ? "A" : "E";

                var address = {
                    AddressID: self.AddressID(),
                    Province: province,
                    District: district,
                    State: state,
                    VDC: vdc,
                    Ward: ko.toJS(self.SelectedWard),
                    Tole: self.ToleNep(),
                    ToleEn: self.ToleEng(),
                    HouseNumber: self.HouseNo(),
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: self.Status(),
                    Action: action
                };


                addrinfo.AddrType(addressesType);
                addrinfo.Address(address);
                addrinfo.Status(self.Status());
                addrinfo.Action(action);

                self.SelectedAddress(null);
                $("#btnAddAddress").text('Add');
                self.Action('');
            }

            else {

                //Duplicate Check
                for (var i = 0; i < self.PersonAddresses().length; i++) {
                    if (ko.toJS(self.PersonAddresses()[i].AddrType().AddressTypeID) == ko.toJS(self.SelectedAddrType).AddressTypeID) {
                        msg("data already exist !!!", "WARNING");
                        return;
                    }
                }

                var address = {
                    AddressID: self.AddressID(),
                    Province: province,
                    District: district,
                    State: state,
                    VDC: vdc,
                    Ward: ko.toJS(self.SelectedWard),
                    Tole: self.ToleNep(),
                    ToleEn: self.ToleEng(),
                    HouseNumber: self.HouseNo(),
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: self.Status(),
                    Action: "A"

                };



                var personAddr = {
                    PID: self.PID(),
                    AddrType: addressesType,
                    Address: address,
                    AddressPriority: null,
                    FromDate: "",
                    ToDate: "",
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: self.Status(),
                    Action: "A"
                };


                self.PersonAddresses.push(new PersonAddress(personAddr));


            }
            self.ClearAddress();
        }
    };



    //self.AddContact = function () {
    //    if (self.ContactValidation()) {
    //        var contactType = {
    //            TypeID: ko.toJS(self.SelectedContactType).TypeID,
    //            TypeName: ko.toJS(self.SelectedContactType).TypeName
    //        }

    //        var contInfo = self.SelectedContact();

    //        if (contInfo != undefined || contInfo != null) {
    //            //var action = self.Action() == "A" ? "A" : "E"

    //            var action = self.Action() == "A"

    //            contInfo.ContactType(contactType);
    //            contInfo.CTypeValue(self.Value());
    //            contInfo.Status(self.Status());
    //            contInfo.Action(action);

    //            self.SelectedContact(null);
    //            $("#btnAddContact").text('Add');
    //            self.Action('');
    //        }

    //        else {
    //            var personContact = {
    //                PID: self.PID(),
    //                CTypeValue: self.Value(),
    //                ContactType: contactType,
    //                FromDate: "",
    //                ToDate: "",
    //                EntryBy: self.EntryBy(),
    //                EntryDate: "",
    //                Status: "A",
    //                Action: "A"
    //            };
    //            self.PersonContacts.push(new PersonContact(personContact));


    //        }
    //        self.ClearContact();
    //    }
    //};

    self.AddContact = function () {
        if (self.ContactValidation()) {
            var contactType = {
                TypeID: ko.toJS(self.SelectedContactType).TypeID,
                TypeName: ko.toJS(self.SelectedContactType).TypeName
            }

            var contInfo = self.SelectedContact();

            if (contInfo != undefined || contInfo != null) {
                var action = self.Action() == "A" ? "A" : "E";

                contInfo.ContactType(contactType);
                contInfo.CTypeValue(self.Value());
                contInfo.Status(self.Status());
                contInfo.Action(action);

                self.SelectedContact(null);
                $("#btnAddContact").text('Add');
                self.Action('');
            }

            else {
                var personContact = {
                    PID: self.PID(),
                    CTypeValue: self.Value(),
                    ContactType: contactType,
                    FromDate: "",
                    ToDate: "",
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: "A",
                    Action: "A"
                };
                self.PersonContacts.push(new PersonContact(personContact));

            }
            self.ClearContact();
        }
    };


    self.AddQualification = function () {
        if (self.QualificationValidation()) {
            var qualification = {
                QualID: ko.toJS(self.SelectedQualification).QualID,
                QualName: ko.toJS(self.SelectedQualification).QualName
            }
            var country = {
                CountryCode: ko.toJS(self.SelectedQualCountry).CountryCode,
                CountryName: ko.toJS(self.SelectedQualCountry).CountryName
            }

            var qualInfo = self.SelectedQual();

            if (qualInfo != undefined || qualInfo != null) {
                //Duplicate Check
                for (var i = 0; i < self.PersonQualifications().length; i++) {
                    if (ko.toJS(self.PersonQualifications()[i].Qualification().QualName) == qualInfo.Qualification().QualName) {

                    }
                    else if (ko.toJS(self.PersonQualifications()[i].Qualification().QualName) == ko.toJS(self.SelectedQualification).QualName) {
                        msg("data already exist !!!", "WARNING");
                        return;
                    }
                }
                var action = self.Action() == "A" ? "A" : "E";

                qualInfo.Title(self.QualTitle());
                qualInfo.Institute(self.QualInstitution());
                qualInfo.FromDate(self.QualFromDate());
                qualInfo.ToDate(self.QualToDate());
                qualInfo.Grade(self.QualGrade());
                qualInfo.Percentage(self.QualPercent());
                qualInfo.MajorSubject(self.QualMjrSubject());
                qualInfo.OptSubject(self.QualOptSubject());
                qualInfo.Remarks(self.QualRemarks());
                qualInfo.EduEquivalence(self.EduEquivalence());
                qualInfo.Qualification(qualification);
                qualInfo.Country(country);

                qualInfo.Status(self.Status());
                qualInfo.Action(action);

                self.SelectedQual(null);
                $("#btnAddQualification").text('Add');
                self.Action('');
            }

            else {

                //Duplicate Check
                for (var i = 0; i < self.PersonQualifications().length; i++) {
                    if (ko.toJS(self.PersonQualifications()[i].Qualification().QualID) == ko.toJS(self.SelectedQualification).QualID) {
                        msg("data already exist!!!", "WARNING");
                        return;
                    }
                }

                var personQualification = {
                    PID: self.PID(),
                    FromDate: self.QualFromDate(),
                    ToDate: self.QualToDate(),
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: "A",
                    Country: country,
                    Qualification: qualification,
                    Title: self.QualTitle(),
                    Institute: self.QualInstitution(),
                    Grade: self.QualGrade(),
                    Percentage: self.QualPercent(),
                    Remarks: self.QualRemarks(),
                    MajorSubject: self.QualMjrSubject(),
                    OptSubject: self.QualOptSubject(),
                    EduEquivalence: self.EduEquivalence(),
                    Action: "A"
                };


                self.PersonQualifications.push(new PersonQualification(personQualification));
            }
            self.ClearQualification();
        }
    };

    self.AddTraining = function () {
        if (self.TrainingValidation()) {
            var country = {
                CountryCode: ko.toJS(self.SelectedTrainCountry).CountryCode,
                CountryName: ko.toJS(self.SelectedTrainCountry).CountryName
            }

            var trainInfo = self.SelectedTraining();

            if (trainInfo != undefined || trainInfo != null) {
                var action = self.Action() == "A" ? "A" : "E";

                trainInfo.Title(self.TrainingTitle());
                trainInfo.Country(country);
                trainInfo.CertificateName(self.TrainCertificate());
                trainInfo.Institution(self.TrainInstitution());
                trainInfo.FromDate(self.TrainFromDate());
                trainInfo.ToDate(self.TrainToDate());
                trainInfo.Grade(self.TrainGrade());
                trainInfo.Percentage(self.TrainPercent());
                trainInfo.MajorSubject(self.TrainMjrSubject());
                trainInfo.Remarks(self.TrainRemarks());
                trainInfo.Status(self.Status());
                trainInfo.Action(action);

                self.SelectedTraining(null);
                $("#btnAddTraining").text('Add');
                self.Action('');

            }
            else {
                var employeeTraining = {
                    PID: self.PID(),
                    FromDate: self.TrainFromDate(),
                    ToDate: self.TrainToDate(),
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: "A",
                    Country: country,
                    Title: self.TrainingTitle(),
                    Institution: self.TrainInstitution(),
                    Grade: self.TrainGrade(),
                    Percentage: self.TrainPercent(),
                    Remarks: self.TrainRemarks(),
                    MajorSubject: self.TrainMjrSubject(),
                    CertificateName: self.TrainCertificate(),
                    Action: "A"
                };

                self.EmployeeTrainings.push(new EmployeeTraining(employeeTraining));
            }
            self.ClearTraining();
        }
    };

    self.AddExperience = function () {
        if (self.ExperienceValidation()) {
            var country = {
                CountryCode: ko.toJS(self.SelectedExpCountry).CountryCode,
                CountryName: ko.toJS(self.SelectedExpCountry).CountryName
            }

            var expInfo = self.SelectedExperience();
            console.log('Selected Experience', expInfo);
            if (expInfo != undefined || expInfo != null) {
                var action = self.Action() == "A" ? "A" : "E";
                expInfo.Country(country);
                expInfo.JobLocation(self.JobLocation());
                expInfo.FromDate(self.ExpFromDate());
                expInfo.ToDate(self.ExpToDate());
                expInfo.Remarks(self.JobTitleResp());
                expInfo.Status(self.Status());
                expInfo.Action(action);

                self.SelectedExperience(null);
                $("#btnAddExperience").text('Add');
                self.Action('');
            }

            else {
                var employeeExperience = {
                    PID: self.PID(),
                    FromDate: self.ExpFromDate(),
                    ToDate: self.ExpToDate(),
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: "A",
                    Country: country,
                    JobLocation: self.JobLocation(),
                    Remarks: self.JobTitleResp(),
                    Action: "A"
                };

                self.EmployeeExperiences.push(new EmployeeExperience(employeeExperience));
            }
            self.ClearExperience();
        }
    };

    self.AddDocument = function () {
        if (self.DocumentValidation()) {
            self.EmpDocFile(empdocfile);
            var documentType = {
                TypeID: ko.toJS(self.SelectedDocType).TypeID,
                TypeName: ko.toJS(self.SelectedDocType).TypeName
            }

            var docInfo = self.SelectedDocument();

            if (docInfo != undefined || docInfo != null) {
                //Duplicate Check
                for (var i = 0; i < self.PersonDocuments().length; i++) {
                    if (ko.toJS(self.PersonDocuments()[i].DocType().TypeName) == docInfo.DocType().TypeName) {

                    }
                    else if (ko.toJS(self.PersonDocuments()[i].DocType().TypeName) == ko.toJS(self.SelectedDocType).TypeName) {

                        msg("data already exist!!!", "WARNING");
                        return;
                    }
                }

                var action = self.Action() == "A" ? "A" : "E";

                docInfo.DocType(documentType);
                docInfo.IssueNo(self.DocNo());
                if (empdocfile !== undefined && empdocfile !== null) {
                    docInfo.DocFile(self.EmpDocFile());
                }
                docInfo.IssueBy(self.DocIssuedBy());
                docInfo.IssueDate(self.DocDate());
                docInfo.Status(self.Status());
                docInfo.Action(action);

                self.SelectedDocument(null);
                $("#btnAddDocument").text('Add');
                self.Action('');

            }

            else {
                //Duplicate Check
                for (var i = 0; i < self.PersonDocuments().length; i++) {
                    if (ko.toJS(self.PersonDocuments()[i].DocType().TypeID) == ko.toJS(self.SelectedDocType).TypeID) {
                        msg("data already exist!!!", "WARNING");
                        return;
                    }
                }

                var personDocument = {
                    PID: self.PID(),
                    FromDate: "",
                    ToDate: "",
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: "A",
                    DocType: documentType,
                    DocFile: self.EmpDocFile(),
                    IssueNo: self.DocNo(),
                    IssueDate: self.DocDate(),
                    IssueBy: self.DocIssuedBy(),
                    Action: "A"
                };


                self.PersonDocuments.push(new PersonDocument(personDocument));
            }
            self.ClearDocument();
        }
    };

    self.AddInsurance = function () {
        if (self.InsuranceValidation()) {

            var insInfo = self.SelectedInsurance();

            if (insInfo != undefined || insInfo != null) {

                var action = self.Action() == "A" ? "A" : "E";

                insInfo.CompanyName(self.CompanyName());
                insInfo.InsuranceNo(self.InsuranceNo());
                insInfo.PolicyType(self.PolicyType());
                insInfo.ExpiryDate(self.ExpiryDate());
                insInfo.YearlyPremium(self.YearlyPremium());
                insInfo.MonthlyPremium(self.MonthlyPremium());
                insInfo.Remarks(self.InsRemarks());
                insInfo.RStatus(self.Status());
                insInfo.Action(action);

                self.SelectedInsurance(null);
                $("#btnAddInsurance").text('Add');
                self.Action('');

            }
            else {
                var employeeInsurance = {
                    PID: self.PID(),
                    CompanyName: self.CompanyName(),
                    InsuranceNo: self.InsuranceNo(),
                    PolicyType: self.PolicyType(),
                    ExpiryDate: self.ExpiryDate(),
                    YearlyPremium: getNumEng(self.YearlyPremium()),
                    MonthlyPremium: getNumEng(self.MonthlyPremium()),
                    Remarks: self.InsRemarks(),
                    FromDate: "",
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    RStatus: "A",
                    Action: "A"
                };

                self.EmployeeInsurances.push(new EmployeeInsurance(employeeInsurance));
            }
            self.ClearInsurance();
        }
    };

    self.AddMedicalCondition = function () {
        if (self.MedicalAttrValidation()) {

            var medInfo = self.SelectedMedicalCondition();

            if (medInfo != undefined || medInfo != null) {

                var action = self.Action() == "A" ? "A" : "E";

                medInfo.ProblemName(self.Problem());
                medInfo.ProblemStart(self.ProblemStart());
                medInfo.ProblemReason(self.Reason());
                medInfo.DoctorName(self.DoctorName());
                medInfo.DoctorMobileNo(self.DoctorMobNo());
                medInfo.DoctorAddress(self.DoctorAddress());
                medInfo.DoctorEmail(self.DoctorEmail());
                medInfo.RStatus(self.Status());
                medInfo.Action(action);

                self.SelectedMedicalCondition(null);
                $("#btnAddMedical").text('Add');
                self.Action('');

            }

            else {
                var empMedicalAttr = {
                    PID: self.PID(),
                    ProblemName: self.Problem(),
                    ProblemStart: self.ProblemStart(),
                    ProblemReason: self.Reason(),
                    DoctorName: self.DoctorName(),
                    DoctorMobileNo: self.DoctorMobNo(),
                    DoctorAddress: self.DoctorAddress(),
                    DoctorEmail: self.DoctorEmail(),
                    FromDate: "",
                    ToDate: "",
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    RStatus: "A",
                    Action: "A"
                };

                self.EmpMedicalAttrs.push(new EmpMedicalAttr(empMedicalAttr));
            }
            self.ClearMedicalAttribute();
        }
    };

    self.AddLanguage = function () {
        if (self.LanguageValidation()) {
            var ismotherlang;
            if (self.IsMotherLanguage()) {
                ismotherlang = "Y";
            }

            else {
                ismotherlang = "N";
            }

            var language = {
                LanguageID: ko.toJS(self.SelectedLanguage).LanguageID,
                LanguageName: ko.toJS(self.SelectedLanguage).LanguageName
            }

            var langInfo = self.SelectedLang();

            if (langInfo != undefined || langInfo != null) {

                //Duplicate Check
                for (var i = 0; i < self.PersonLanguages().length; i++) {
                    if (ko.toJS(self.PersonLanguages()[i].Language().LanguageName) == langInfo.Language().LanguageName) {

                    }
                    else if (ko.toJS(self.PersonLanguages()[i].Language().LanguageName) == ko.toJS(self.SelectedLanguage).LanguageName) {

                        msg("data already exist!!!", "WARNING");
                        return;
                    }
                }

                var action = self.Action() == "A" ? "A" : "E";

                langInfo.Language(language);
                langInfo.ReadingFluency(self.SelectedRFluency());
                langInfo.WritingFluency(self.SelectedWFluency());
                langInfo.SpeakingFluency(self.SelectedSFluency());
                langInfo.ListeningFluency(self.SelectedLFluency());
                langInfo.MotherLang(ismotherlang);
                langInfo.Status(self.Status());
                langInfo.Action(action);

                self.SelectedLang(null);
                $("#btnAddLanguage").text('Add');
                self.Action('');
            }

            else {

                //Duplicate Check
                for (var i = 0; i < self.PersonLanguages().length; i++) {
                    if (ko.toJS(self.PersonLanguages()[i].Language().LanguageID) == ko.toJS(self.SelectedLanguage).LanguageID) {
                        msg("data already exist!!!", "WARNING");
                        return;
                    }
                }

                var personLanguage = {
                    PID: self.PID(),
                    ReadingFluency: self.SelectedRFluency(),
                    WritingFluency: self.SelectedWFluency(),
                    SpeakingFluency: self.SelectedSFluency(),
                    ListeningFluency: self.SelectedLFluency(),
                    Language: language,
                    MotherLang: ismotherlang,
                    FromDate: "",
                    ToDate: "",
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: "A",
                    Action: "A"
                };

                self.PersonLanguages.push(new PersonLanguage(personLanguage));
            }
            self.ClearLanguage();
        }
    };

    self.AddRelative = function () {
        if (self.RelativeValidation()) {

            var relationType = {
                RelTypeID: ko.toJS(self.SelectedRelationType).RelTypeID,
                RelTypeName: ko.toJS(self.SelectedRelationType).RelTypeName
            }

            var relInfo = self.SelectedRelative();

            if (relInfo != undefined || relInfo != null) {

                var action = self.Action() == "A" ? "A" : "E";

                var relative = {
                    PID: self.PID(),
                    FirstName: self.RFirstName(),
                    MiddleName: self.RMiddleName(),
                    LastName: self.RLastName(),
                    DOB: self.RelDOB(),
                    Gender: self.RelGender(),
                    SeqNo: self.RSequenceNo(),
                    MaritalStatus: null,
                    ToDate: "",
                    EntryBy: self.EntryBy(),
                    Status: self.Status(),
                    Action: action
                }

                if (self.prevIsNominee() == true) {
                    var naction = "E";
                }
                else {
                    var naction = "A";
                }

                if (self.isNominee() == true) {
                    var personNominee = {
                        PID: self.PID(),
                        RelType: relationType,
                        Relative: relative,
                        NomineeFromDate: "",
                        NomineeDoc: self.NomineeDocuments(),
                        EntryBy: self.EntryBy(),
                        EntryDate: "",
                        Status: "A",
                        Action: naction
                    }

                }

                else {
                    var personNominee = null;
                }


                relInfo.IsNominee(self.isNominee());
                relInfo.PersonNominee(personNominee);
                relInfo.RelType(relationType);
                relInfo.Relative(relative);
                relInfo.Status(self.Status());
                relInfo.Action(action);
                self.SelectedRelative(null);
                $("#btnAddRelative").text('Add');
                self.Action('');
            }

            else {

                var relative = {
                    PID: self.PID(),
                    FirstName: self.RFirstName(),
                    MiddleName: self.RMiddleName(),
                    LastName: self.RLastName(),
                    DOB: self.RelDOB(),
                    Gender: self.RelGender(),
                    MaritalStatus: null,
                    ToDate: "",
                    EntryBy: self.EntryBy(),
                    Status: "A",
                    Action: "A"
                }

                if (self.isNominee() == true) {
                    var personNominee = {
                        PID: self.PID(),
                        RelType: relationType,
                        Relative: relative,
                        NomineeFromDate: "",
                        NomineeDoc: self.NomineeDocuments(),
                        EntryBy: self.EntryBy(),
                        EntryDate: "",
                        Status: "A",
                        Action: "A"
                    }
                }

                else {
                    var personNominee = null;
                }

                var personRelative = {
                    PID: self.PID(),
                    IsNominee: self.isNominee(),
                    prevIsNominee: self.prevIsNominee(),
                    RelType: relationType,
                    Relative: relative,
                    PersonNominee: personNominee,
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: "A",
                    Action: "A"
                };

                self.PersonRelatives.push(new PersonRelative(personRelative));
                self.NomineeDocuments([]);
            }
            self.ClearRelative();
        }
    };

    self.AddNomDocument = function () {
        if (self.NDocumentValidation()) {
            self.NomDocFile(nomdocfile);
            var nDocumentType = {
                TypeID: ko.toJS(self.SelectedNDocType).TypeID,
                TypeName: ko.toJS(self.SelectedNDocType).TypeName
            }

            var ndocInfo = self.SelectedNomineeDoc();

            if (ndocInfo != undefined || ndocInfo != null) {

                //Duplicate Check
                for (var i = 0; i < self.NomineeDocuments().length; i++) {
                    if (ko.toJS(self.NomineeDocuments())[i].DocType.TypeName == ndocInfo.DocType().TypeName) {

                    }
                    else if (ko.toJS(self.NomineeDocuments())[i].DocType.TypeName == ko.toJS(self.SelectedNDocType).TypeName) {
                        //msg("??????? ???? ????? ??  ??????? ? !!!", "WARNING");
                        return;
                    }
                }

                var action = self.Action() == "A" ? "A" : "E";

                ndocInfo.DocType(nDocumentType);
                if (nomdocfile !== undefined && nomdocfile !== null) {
                    ndocInfo.DocFile(self.NomDocFile());
                }
                ndocInfo.IssueNo(self.NDocNo());
                ndocInfo.IssueBy(self.NDocIssuedBy());
                ndocInfo.IssueDate(self.NDocDate());
                ndocInfo.Status(self.Status());
                ndocInfo.Action(action);

                self.SelectedNomineeDoc(null);
                $("#btnAddNDocument").text('Add');
                self.Action('');

            }

            else {

                var nomineeDocument = {
                    PID: self.PID(),
                    FromDate: "",
                    ToDate: "",
                    EntryBy: self.EntryBy(),
                    EntryDate: "",
                    Status: "A",
                    DocType: nDocumentType,
                    DocFile: self.NomDocFile(),
                    IssueNo: self.NDocNo(),
                    IssueDate: self.NDocDate(),
                    IssueBy: self.NDocIssuedBy(),
                    Action: "A"
                };

                //Duplicate Check
                for (var i = 0; i < self.NomineeDocuments().length; i++) {
                    if (ko.toJS(self.NomineeDocuments()[i].DocType().TypeID) == ko.toJS(self.SelectedNDocType).TypeID) {
                        //msg("??????? ???? ????? ??  ??????? ? !!!", "WARNING");
                        return;
                    }
                }

                self.NomineeDocuments.push(new PersonDocument(nomineeDocument));
            }
            self.ClearNDocument();
        }
    };

    self.SaveEmployeeRegistration = function () {
        self.Status("I");
        self.SetNepaliValues();
        if (self.EmployeeValidation()) {
            Confirm('Do you want to save?', 'Confirmation Dialog', function (r) {
                if (r) {
                    Saveemployeeregistration(self);
                }
            });
        }
    };

    self.SubmitEmployeeRegistration = function () {

        self.Status("F");

        if (self.EmployeeValidation()) {
            if (self.SubmitPersonRegistrationValidation()) {
                Confirm('You cannot submit again once it is submitted\n Do you want to Submit?', 'Confirmation Dialog', function (r) {
                    if (r) {
                        Saveemployeeregistration(self);
                    }
                });


            }
        }

    };



    // Delete functions of all

    self.DeleteAddress = function (address) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.PersonAddresses.remove(address);
            }
        });

    };


    //self.DeleteContact = function (contact) {
    //    if (ko.toJS(self.Status) === 'F') return;
    //    Confirm('Are you sure to delete? ?', 'Confirmation Dialog', function (r) {
    //        if (r) {
    //            self.PersonContacts.remove(contact);
    //        }
    //    });


    //};

        self.DeleteContact = function (contact) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete? ?', 'Confirmation Dialog', function (r) {
            if (r) {
                if (contact.Action === 'E') {
                    self.PersonContacts.remove(contact);
                    contact.Action = 'D';  // Now for this D action write storeprocedure and if caluse in data layer as E and A
                    self.DeleteContacts.push(contact);
                }
                else
                    self.PersonContacts.remove(contact);

            }
        });


    };

    self.DeleteQualification = function (qualification) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete ?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.PersonQualifications.remove(qualification);
            }
        });


    };

    self.DeleteTraining = function (training) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.EmployeeTrainings.remove(training);
            }
        });

    };

    self.DeleteExperience = function (experience) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.EmployeeExperiences.remove(experience);
            }
        });


    };

    self.DeleteInsurance = function (insurance) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete ?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.EmployeeInsurances.remove(insurance);
            }
        });

    };

    self.DeleteMedCondition = function (medcondition) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.EmpMedicalAttrs.remove(medcondition);
            }
        });

    };

    self.DeleteLanguage = function (language) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.PersonLanguages.remove(language);
            }
        });

    };

    self.DeleteDocument = function (document) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.PersonDocuments.remove(document);
            }
        });


    };

    self.DeleteRelative = function (relative) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete ?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.PersonRelatives.remove(relative);
            }
        });

    };


    self.DeleteNomDocument = function (ndocument) {
        if (ko.toJS(self.Status) === 'F') return;
        Confirm('Are you sure to delete ?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.NomineeDocuments.remove(ndocument);
            }
        });
        Confirm('Are you sure to delete ?', 'Confirmation Dialog', function (r) {
            if (r) {
                self.NomineeDocuments.remove(ndocument);
            }
        });


    };



    // Edit function of all

    //Edit Address
    self.EditAddress = function (PersonAddresses) {
        console.log('alert', PersonAddresses)
        for (var i = 0; i < self.AddressTypes().length; i++) {
            if (ko.toJS(self.AddressTypes()[i].AddressName) === PersonAddresses.AddrType().AddressName) {
                self.SelectedAddrType(self.AddressTypes()[i]);
            }
        }
       
        for (var i = 0; i < self.Provinces().length; i++) {
            if (ko.toJS(self.Provinces()[i].ProvinceCD) === PersonAddresses.Address().Province.ProvinceCD) {
                self.SelectedProvince(self.Provinces()[i]);
            }
        }

        for (var i = 0; i < self.Districts().length; i++) {
            if (ko.toJS(self.Districts()[i].DistrictCD) === PersonAddresses.Address().District.DistrictCD) {
                self.SelectedDistrict(self.Districts()[i]);
            }
        }
        self.GetVDC();
        for (var i = 0; i < self.VDCMPs().length; i++) {
            if (ko.toJS(self.VDCMPs()[i].VDCName) === PersonAddresses.Address().VDC.VDCName) {
                self.SelectedVDCMP(self.VDCMPs()[i]);
            }
        }
        self.GetWard();

        for (var i = 0; i < self.Wards().length; i++) {
            if (ko.toJS(self.Wards()[i]) === PersonAddresses.Address().Ward) {
                self.SelectedWard(self.Wards()[i]);
            }
        }

        self.ToleNep(PersonAddresses.Address().Tole);
        self.ToleEng(PersonAddresses.Address().ToleEn);
        self.HouseNo(PersonAddresses.Address().HouseNumber);
        self.AddressID(PersonAddresses.Address().AddressID);
        if (PersonAddresses.Action() == "A") {
            self.Action("A");
        }
        else {
            self.Action("E");
        }

        self.SelectedAddress(PersonAddresses);

        $("#btnAddAddress").text('Update'); //.removeClass('icon-add').addClass('icon-ok');
    }


    //Edit Contact
    //self.EditContact = function (PersonContacts) {
    //    for (var i = 0; i < self.ContactTypes().length; i++) {
    //        if (ko.toJS(self.ContactTypes()[i].TypeName) === PersonContacts.ContactType().TypeName) {
    //            self.SelectedContactType(self.ContactTypes()[i]);
    //        }
    //    }

    //    self.Value(PersonContacts.CTypeValue());

    //    if (PersonContacts.Action() == "A")
    //    {
    //        self.Action("A")
    //    }
    //    else {
    //        self.Action("A");//("E");
    //    }

    //    self.SelectedContact(PersonContacts);
    //    //self.personContacts();
    //    $("#btnAddContact").text('UPDATE');
    //}



    //Edit Contact
    self.EditContact = function (PersonContacts) {
        debugger;
        for (var i = 0; i < self.ContactTypes().length; i++) {
            if (ko.toJS(self.ContactTypes()[i].TypeName) === PersonContacts.ContactType().TypeName) {
                self.SelectedContactType(self.ContactTypes()[i]);
            }
        }

        self.Value(PersonContacts.CTypeValue());
        if (PersonContacts.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }

        self.SelectedContact(PersonContacts);
        $("#btnAddContact").text('Update');
    }





    //Edit Qualification
    self.EditQualification = function (PersonQualifications) {

        for (var i = 0; i < self.Countries().length; i++) {
            if (ko.toJS(self.Countries()[i].CountryName) === PersonQualifications.Country().CountryName) {
                self.SelectedQualCountry(self.Countries()[i]);
            }
        }

        for (var i = 0; i < self.Qualifications().length; i++) {
            if (ko.toJS(self.Qualifications()[i].QualName) === PersonQualifications.Qualification().QualName) {
                self.SelectedQualification(self.Qualifications()[i]);
            }
        }

        self.QualTitle(PersonQualifications.Title());
        self.QualInstitution(PersonQualifications.Institute());
        self.QualFromDate(PersonQualifications.FromDate());
        self.QualToDate(PersonQualifications.ToDate());
        self.QualGrade(PersonQualifications.Grade());
        self.QualMjrSubject(PersonQualifications.MajorSubject());
        self.QualOptSubject(PersonQualifications.OptSubject());
        self.QualPercent(PersonQualifications.Percentage());
        self.QualRemarks(PersonQualifications.Remarks());
        self.EduEquivalence(PersonQualifications.EduEquivalence());

        if (PersonQualifications.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }

        self.SelectedQual(PersonQualifications);
        $("#btnAddQualification").text('Update');
    }


    //Edit Training
    self.EditTraining = function (EmpTrainings) {

        for (var i = 0; i < self.Countries().length; i++) {
            if (ko.toJS(self.Countries()[i].CountryName) === EmpTrainings.Country().CountryName) {
                self.SelectedTrainCountry(self.Countries()[i]);
            }
        }

        self.TrainingTitle(EmpTrainings.Title());
        self.TrainCertificate(EmpTrainings.CertificateName());
        self.TrainInstitution(EmpTrainings.Institution());
        self.TrainFromDate(EmpTrainings.FromDate());
        self.TrainToDate(EmpTrainings.ToDate());
        self.TrainGrade(EmpTrainings.Grade());
        self.TrainPercent(EmpTrainings.Percentage());
        self.TrainMjrSubject(EmpTrainings.MajorSubject());
        self.TrainRemarks(EmpTrainings.Remarks());


        if (EmpTrainings.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }

        self.SelectedTraining(EmpTrainings);
        $("#btnAddTraining").text('Update');
    }


    //Edit Experience
    self.EditExperience = function (EmpExperiences) {
        for (var i = 0; i < self.Countries().length; i++) {
            if (ko.toJS(self.Countries()[i].CountryName) === EmpExperiences.Country().CountryName) {
                self.SelectedExpCountry(self.Countries()[i]);
            }
        }

        self.JobLocation(EmpExperiences.JobLocation());
        self.ExpFromDate(EmpExperiences.FromDate());
        self.ExpToDate(EmpExperiences.ToDate());
        self.JobTitleResp(EmpExperiences.Remarks());
        self.Status(EmpExperiences.Status());
        if (EmpExperiences.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }

        self.SelectedExperience(EmpExperiences);
        $("#btnAddExperience").text('Update');
    }


    //Edit Document
    self.EditDocument = function (PersonDocs) {
        for (var i = 0; i < self.DocumentTypes().length; i++) {
            if (ko.toJS(self.DocumentTypes()[i].TypeName) === PersonDocs.DocType().TypeName) {
                self.SelectedDocType(self.DocumentTypes()[i]);
            }
        }

        self.DocIssuedBy(PersonDocs.IssueBy());
        self.DocNo(PersonDocs.IssueNo());
        self.DocDate(PersonDocs.IssueDate());

        if (PersonDocs.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }

        self.SelectedDocument(PersonDocs);
        $("#btnAddDocument").text('Update');
    }


    //Edit Insurance
    self.EditInsurance = function (EmpInsurances) {
        self.CompanyName(EmpInsurances.CompanyName());
        self.InsuranceNo(EmpInsurances.InsuranceNo());
        self.PolicyType(EmpInsurances.PolicyType());
        self.ExpiryDate(EmpInsurances.ExpiryDate());
        self.YearlyPremium(EmpInsurances.YearlyPremium());
        self.MonthlyPremium(EmpInsurances.MonthlyPremium());
        self.InsRemarks(EmpInsurances.Remarks());

        if (EmpInsurances.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }

        self.SelectedInsurance(EmpInsurances);
        $("#btnAddInsurance").text('Update');
    }

    //Edit Medical Condition
    self.EditMedCondition = function (EmpMedConditions) {
        self.Problem(EmpMedConditions.ProblemName());
        self.ProblemStart(EmpMedConditions.ProblemStart());
        self.Reason(EmpMedConditions.ProblemReason());
        self.DoctorName(EmpMedConditions.DoctorName());
        self.DoctorMobNo(EmpMedConditions.DoctorMobileNo());
        self.DoctorAddress(EmpMedConditions.DoctorAddress());
        self.DoctorEmail(EmpMedConditions.DoctorEmail());

        if (EmpMedConditions.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }
        self.SelectedMedicalCondition(EmpMedConditions);
        $("#btnAddMedical").text('Update');
    }

    //Edit Language
    self.EditLanguage = function (PersonLanguages) {
        for (var i = 0; i < self.Languages().length; i++) {
            if (ko.toJS(self.Languages()[i].LanguageName) === PersonLanguages.Language().LanguageName) {
                self.SelectedLanguage(self.Languages()[i]);
            }
        }

        for (var i = 0; i < self.Fluencies().length; i++) {
            if (ko.toJS(self.Fluencies()[i].FluencyName) === PersonLanguages.ReadingFluency()) {
                self.SelectedRFluency(PersonLanguages.ReadingFluency());
            }
        }

        for (var i = 0; i < self.Fluencies().length; i++) {
            if (ko.toJS(self.Fluencies()[i].FluencyName) === PersonLanguages.WritingFluency()) {
                self.SelectedWFluency(PersonLanguages.WritingFluency());
            }
        }

        for (var i = 0; i < self.Fluencies().length; i++) {
            if (ko.toJS(self.Fluencies()[i].FluencyName) === PersonLanguages.SpeakingFluency()) {
                self.SelectedSFluency(PersonLanguages.SpeakingFluency());
            }
        }

        for (var i = 0; i < self.Fluencies().length; i++) {
            if (ko.toJS(self.Fluencies()[i].FluencyName) === PersonLanguages.ListeningFluency()) {
                self.SelectedLFluency(PersonLanguages.ListeningFluency());
            }
        }

        if (PersonLanguages.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }

        if (PersonLanguages.MotherLang() == "Y") {
            self.IsMotherLanguage(true);
        }
        else {
            self.IsMotherLanguage(false);
        }

        self.SelectedLang(PersonLanguages);
        $("#btnAddLanguage").text('Update');

    }


    //Edit Relative
    self.EditRelative = function (PersonRelatives) {
        self.NomineeDocuments([]);
        for (var i = 0; i < self.RelationTypes().length; i++) {
            if (ko.toJS(self.RelationTypes()[i].RelTypeName) === PersonRelatives.RelType().RelTypeName) {
                self.SelectedRelationType(self.RelationTypes()[i]);
            }
        }
        self.RFirstName(PersonRelatives.Relative().FirstName);
        self.RMiddleName(PersonRelatives.Relative().MiddleName);
        self.RLastName(PersonRelatives.Relative().LastName);
        self.RelGender(PersonRelatives.Relative().Gender);
        self.RelDOB(PersonRelatives.Relative().DOB);
        self.isNominee(PersonRelatives.IsNominee());
        self.prevIsNominee(PersonRelatives.prevIsNominee());
        self.RSequenceNo(PersonRelatives.Relative().SeqNo);
        if (PersonRelatives.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }


        if (self.isNominee() == true) {
            for (var i = 0; i < PersonRelatives.PersonNominee().NomineeDoc.length; i++) {
                var NomineeDoc = ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].DocType);
                var nDocumentType = {
                    TypeID: NomineeDoc.TypeID,
                    TypeName: NomineeDoc.TypeName
                }
                var nomineeDocument = {
                    PID: self.PID(),
                    FromDate: ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].FromDate),
                    ToDate: ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].ToDate),
                    EntryBy: ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].EntryBy),
                    EntryDate: ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].EntryDate),
                    Status: ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].Status),
                    DocType: nDocumentType,
                    DocFile: ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].DocFile),
                    IssueNo: ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].IssueNo),
                    IssueDate: ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].IssueDate),
                    IssueBy: ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].IssueBy),
                    Action: ko.toJS(PersonRelatives.PersonNominee().NomineeDoc[i].Action)
                };
                self.NomineeDocuments.push(new PersonDocument(nomineeDocument));
            }
        }

        self.SelectedRelative(PersonRelatives);
        $("#btnAddRelative").text('Update');
    }


    //Edit Nominee Document
    self.EditNomDocument = function (PersonNomDocs) {
        for (var i = 0; i < self.DocumentTypes().length; i++) {
            if (ko.toJS(self.DocumentTypes()[i].TypeName) === PersonNomDocs.DocType().TypeName) {
                self.SelectedNDocType(self.DocumentTypes()[i]);
            }
        }

        self.NDocIssuedBy(PersonNomDocs.IssueBy());
        self.NDocNo(PersonNomDocs.IssueNo());
        self.NDocDate(PersonNomDocs.IssueDate());


        if (PersonNomDocs.Action() == "A") {
            self.Action("A")
        }
        else {
            self.Action("E");
        }

        self.SelectedNomineeDoc(PersonNomDocs);
        $("#btnAddNDocument").text('Update');
    }



    // Validation of all

    self.EmployeeValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (Validate.empty(self.SymbolNo())) {
            errMsg += "Please fill symbol no.!!!<br>";
        }
        if (Validate.empty(self.EmpFirstName())) {
            errMsg += "Please fill First Name!!!<br>";
        }

        if (Validate.empty(self.EmpLastName())) {
            errMsg += "Please fill Last Name !!!<br>";
        }
        if (Validate.empty(self.EmpDOB())) {
            errMsg += "Please fill Date of Birth!!!<br>";
        }
        if (Validate.empty(self.EmpGender())) {
            errMsg += "Please fill Gender!!!<br>";
        }
        if (self.SelectedEmpMStatus() == undefined) {
            errMsg += "Please select Marital Status!!!<br>";
        }
        if (self.SelectedEmpCountry() == undefined) {
            errMsg += "Please select country!!!<br>";
        }
        if (edocerror == 1) {
            errMsg += "Image Only In jpeg, png or bnb Format !!!<br>";
        }
        else if (edocerror == 2) {
            errMsg += "Image should be less than 1 MB !!!<br>";
        }

        if (errMsg !== "") {
            msg(errMsg, "WARNING");
            return false;
        }
        else {
            return true;
        }
    };

    self.AddressValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (self.SelectedAddrType() == undefined) {
            errMsg += "Please select Address Type !!!<br>";
        }
        if (self.SelectedProvince() == undefined) {
            errMsg += "Please select Province !!!<br>";
        }

        if (self.SelectedDistrict() == undefined) {
            errMsg += "Please select District !!!<br>";
        }
        if (self.SelectedVDCMP() == undefined) {
            errMsg += "Please select VDC/Municipality!!!<br>";
        }
        if (self.SelectedWard() == undefined) {
            errMsg += "Please select Ward no. !!!<br>";
        }
        if (Validate.empty(self.ToleNep())) {
            errMsg += "Please fill Tole(nep)!!!<br>";
        }

        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    self.ContactValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();

        if (self.SelectedContactType() == undefined) {
            errMsg += "Please select Contact Type !!!<br>";
        }
        if (Validate.empty(self.Value())) {
            errMsg += "Please fill Contact Value!!!<br>";
        }
        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    self.QualificationValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (Validate.empty(self.QualTitle())) {
            errMsg += "Please fill Title!!!<br>";
        }
        if (self.SelectedQualCountry() == undefined) {
            errMsg += "Please select country!!!<br>";
        }
        if (self.SelectedQualification() == undefined) {
            errMsg += "Please select Qualification!!!<br>";
        }


        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    self.TrainingValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (Validate.empty(self.TrainingTitle())) {
            errMsg += "Please fill Title !!!<br>";
        }
        if (self.SelectedTrainCountry() == undefined) {
            errMsg += "Please select country!!!<br>";
        }
        if (Validate.empty(self.TrainCertificate())) {
            errMsg += "Please fill certificate!!!<br>";
        }


        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    self.ExperienceValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (self.SelectedExpCountry() == undefined) {
            errMsg += "Please select country!!!<br>";
        }
        if (Validate.empty(self.JobLocation())) {
            errMsg += "Please select job location!!!<br>";
        }

        if (errMsg !== "") {

            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    self.DocumentValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (self.SelectedDocType() == undefined) {
            errMsg += "Please select Document Type!!!<br>";
        }
        if (Validate.empty(self.DocNo())) {
            errMsg += "Please fill Document number!!!<br>";
        }
        if (Validate.empty(self.DocIssuedBy())) {
            errMsg += "Please fill org. name that issued Document!!!<br>";
        }
        if (Validate.empty(self.DocDate())) {
            errMsg += "Please fill Document Date!!!<br>";
        }
        if (empdocerror == 1) {
            errMsg += "Document should only be in jpeg or pdf format !!!<br>";
        }
        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    self.InsuranceValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (Validate.empty(self.CompanyName())) {
            errMsg += "Please fill Company Name !!!<br>";
        }
        if (Validate.empty(self.InsuranceNo())) {
            errMsg += "Please fill Insurance number!!!<br>";
        }
        if (Validate.empty(self.ExpiryDate())) {
            errMsg += "Please fill Expiry Date!!!<br>";
        }
        if (Validate.empty(self.YearlyPremium())) {
            errMsg += "Please fill Yearly Premium!!!<br>";
        }
        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    self.MedicalAttrValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (Validate.empty(self.Problem())) {
            errMsg += "Please fill Problem!!!<br>";
        }
        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    self.LanguageValidation = function () {
        var errMsg = "";
        if (self.SelectedLanguage() == undefined) {
            errMsg += "Please fill Language!!!<br>";
        }

        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    self.RelativeValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (Validate.empty(self.RFirstName())) {
            errMsg += "Please fill First Name!!!<br>";
        }
        if (Validate.empty(self.RLastName())) {
            errMsg += "Please fill Last Name!!!<br>";
        }
        if (self.SelectedRelationType() == undefined) {
            errMsg += "Please select Relation !!!<br>";
        }
        if (Validate.empty(self.RelGender())) {
            errMsg += "Please fill Gender!!!<br>";
        }
        //        if (Validate.empty(self.RelDOB())) {
        //            errMsg += "????? ???? ???? ???????? !!!<br>";
        //        }
        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };

    self.NDocumentValidation = function () {
        var errMsg = "";
        self.SetNepaliValues();
        if (self.SelectedNDocType() == undefined) {
            errMsg += "Please select Document Type!!!<br>";
        }
        if (Validate.empty(self.NDocNo())) {
            errMsg += "Please fill Document number!!!<br>";
        }
        if (Validate.empty(self.NDocIssuedBy())) {
            errMsg += "Please fill org. name that issued Document !!!<br>";
        }
        if (Validate.empty(self.NDocDate())) {
            errMsg += "Please fill Document Date!!!<br>";
        }
        if (nomdocerror == 1) {
            errMsg += "Document should only be in jpeg or pdf format !!!<br>";
        }
        if (errMsg !== "") {
            msg(errMsg, "WARNING");

            return false;
        }
        else {
            return true;
        }
    };


    self.SubmitPersonRegistrationValidation = function () {

        var errMsg = "";
        var objFocus = null;

        if (self.PersonAddresses().length <= 0) {
            errMsg += "Please fill Address!!!<br>";
        }

        if (self.PersonContacts().length <= 0) {
            errMsg += "Please fill Contacts!!!<br>";
        }

        if (self.PersonQualifications().length <= 0) {
            errMsg += "Please fill Qualifications!!!<br>";
        }

        if (self.PersonDocuments().length <= 0) {
            errMsg += "Please fill Documents!!!<br>";
        }

        if (self.PersonRelatives().length <= 0) {
            errMsg += "Please fill Contact Person!!!<br>";
        }

        if (errMsg !== "") {
            msg(errMsg, "WARNING");
            return false;
        }
        else {
            return true;
        }
    }


    // Clear function of all

    self.ClearControls = function () {
        self.ClearEmployee();
        self.PersonAddresses([]);
        self.PersonContacts([]);
        self.PersonQualifications([]);
        self.EmployeeTrainings([]);
        self.EmployeeExperiences([]);
        self.PersonDocuments([]);
        self.EmployeeInsurances([]);
        self.EmpMedicalAttrs([]);
        self.PersonLanguages([]);
        self.PersonRelatives([]);
        self.NomineeDocuments([]);
        self.MAction(null);
        self.ClearAddress();
        self.ClearContact();
        self.ClearQualification();
        self.ClearTraining();
        self.ClearExperience();
        self.ClearDocument();
        self.ClearInsurance();
        self.ClearMedicalAttribute();
        self.ClearLanguage();
        self.ClearRelative();
        self.ClearNDocument();
        self.SubmissionNo('');
        for (var i = 0; i < self.Countries().length; i++) {
            if (self.Countries()[i].CountryName() == "NEPAL") {
                self.SelectedEmpCountry(self.Countries()[i]);
            }
        }

    };

    self.ClearEmployee = function () {
        self.SetNepaliValues();
        self.SymbolNo('');
        self.Uniqueness(null);
        self.EmpFirstName('');
        self.EmpMiddleName('');
        self.EmpLastName('');
        self.EmpFirstNameEng('');
        self.EmpMiddleNameEng('');
        self.EmpLastNameEng('');
        self.EmpDOB('');
        self.EmpGender('');
        self.IdentityMark('');
        self.CtzDFNo('');
        self.PFNo('');
        self.PanNo('');
        self.SelectedEmpMStatus('');
        self.SelectedEmpCountry('');
        self.SelectedEmpReligion('');
        self.AlertSource('');
        self.AlertSourceValue('');
        empimgfile = null;
        $("#UploadEmpImgFile").val("");
        self.EmpImageFile('');
        $("#divSubmissionNo").hide();
        $("#btnEmpDetails").text('Update Details');
    };

    self.ClearAddress = function () {
        self.SetNepaliValues();
        self.ToleNep('');
        self.ToleEng('');
        self.HouseNo('');
        self.SelectedAddrType('');
        self.SelectedProvince('');
        self.SelectedDistrict('');
        self.SelectedVDCMP('');
        self.SelectedWard('');
        self.SelectedAddress(null);
    };

    self.ClearContact = function () {
        self.SetNepaliValues();
        self.SelectedContactType('');
        self.Value('');
        self.SelectedContact(null);
    };

    self.ClearQualification = function () {
        self.SetNepaliValues();
        self.QualTitle('');
        self.QualInstitution('');
        self.QualFromDate('');
        self.QualToDate('');
        self.QualGrade('');
        self.QualMjrSubject('');
        self.QualOptSubject('');
        self.QualPercent('');
        self.QualRemarks('');
        self.EduEquivalence('');
        self.SelectedQualCountry('');
        self.SelectedQualification('');
        self.SelectedQual(null);
    };

    self.ClearTraining = function () {
        self.SetNepaliValues();
        self.TrainingTitle('');
        self.TrainCertificate('');
        self.TrainInstitution('');
        self.TrainFromDate('');
        self.TrainToDate('');
        self.TrainGrade('');
        self.TrainPercent('');
        self.TrainMjrSubject('');
        self.TrainRemarks('');
        self.SelectedTrainCountry('');
        self.SelectedTraining(null);
    };

    self.ClearExperience = function () {
        self.SetNepaliValues();
        self.JobLocation('');
        self.ExpFromDate('');
        self.ExpToDate('');
        self.JobTitleResp('');
        self.SelectedExpCountry('');
        self.SelectedExperience(null);
    };

    self.ClearDocument = function () {
        self.SetNepaliValues();
        self.DocNo('');
        self.DocIssuedBy('');
        self.DocDate('');
        self.SelectedDocType('');
        empdocfile = null;
        $("#UploadDocFile").val("");
        self.SelectedDocument(null);
    };

    self.ClearInsurance = function () {
        self.SetNepaliValues();
        self.CompanyName('');
        self.InsuranceNo('');
        self.PolicyType('');
        self.ExpiryDate('');
        self.YearlyPremium('');
        self.MonthlyPremium('');
        self.InsRemarks('');
        self.SelectedInsurance(null);
    };

    self.ClearMedicalAttribute = function () {
        self.SetNepaliValues();
        self.Problem('');
        self.ProblemStart('');
        self.Reason('');
        self.DoctorName('');
        self.DoctorMobNo('');
        self.DoctorAddress('');
        self.DoctorEmail('');
        self.SelectedMedicalCondition(null);
    };

    self.ClearLanguage = function () {
        self.SelectedLanguage('');
        self.SelectedRFluency('');
        self.SelectedWFluency('');
        self.SelectedSFluency('');
        self.SelectedLFluency('');
        self.IsMotherLanguage(false);
        self.SelectedLang(null);
    };

    self.ClearRelative = function () {
        self.SetNepaliValues();
        self.RFirstName('');
        self.RMiddleName('');
        self.RLastName('');
        self.SelectedRelationType('');
        self.RelGender('');
        self.RelDOB('');
        self.isNominee(false);
        self.SelectedRelative(null);
    };

    self.ClearNDocument = function () {
        self.SetNepaliValues();
        self.NDocNo('');
        self.NDocIssuedBy('');
        self.NDocDate('');
        self.SelectedNDocType('');
        nomdocfile = null;
        $("#UploadNDocFile").val("");
        self.SelectedNomineeDoc(null);
    };

    // Check if the Symbol number is unique.
    self.checkUnique = function (data) {
        if (data.SymbolNo()) {
            $.ajax({
                dataType: "json",
                url: '../../Handlers/PIS/EmployeeRegistrationHandler.ashx',
                data: { 'method': 'CheckUniqueSymbolNo', 'SymbolNo': data.SymbolNo() },
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (data) {
                    self.Uniqueness(data.ResponseData);
                    if (!self.Uniqueness()) {
                        msg("This symbol no is already registered!", "WARNING");
                        self.SymbolNo(null);
                    }
                },
                error: function (err) {
                    msg(errMsg, "WARNING");
                }
            });
        }
    };

    // function for nepali values 

    self.SetNepaliValues = function () {
        self.SymbolNo($('#txtSymbolNo').val());
        self.EmpFirstName($('#txtEmpFirstName').val());
        self.EmpMiddleName($('#txtEmpMiddleName').val());
        self.EmpLastName($('#txtEmpLastName').val());
        //self.EmpDOB($('#txtEmpDOB').val());
        self.IdentityMark($('#txtIdentityMark').val());
        self.ToleNep($('#txtToleNep').val());
        self.ToleEng($('#txtToleEng').val());
        self.HouseNo($('#txtHouseNo').val());
        self.Value($('#txtValue').val());
        self.QualTitle($('#txtQualTitle').val());
        self.QualInstitution($('#txtQualInstitution').val());
        self.QualFromDate($('#txtQualFromDate').val());
        self.QualToDate($('#txtQualToDate').val());
        self.QualGrade($('#txtQualGrade').val());
        self.QualMjrSubject($('#txtQualMjrSubject').val());
        self.QualOptSubject($('#txtQualOptSubject').val());
        self.QualPercent($('#txtQualPercent').val());
        self.QualRemarks($('#txtQualRemarks').val());
        self.EduEquivalence($('#txtEduEquivalence').val());
        self.TrainingTitle($('#txtTrainingTitle').val());
        self.TrainCertificate($('#txtTrainCertificate').val());
        self.TrainInstitution($('#txtTrainInstitute').val());
        self.TrainFromDate($('#txtTrainFromDate').val());
        self.TrainToDate($('#txtTrainToDate').val());
        self.TrainGrade($('#txtTrainGrade').val());
        self.TrainPercent($('#txtTrainPercent').val());
        self.TrainMjrSubject($('#txtTrainMjrSubject').val());
        self.TrainRemarks($('#txtTrainRemarks').val());
        self.JobLocation($('#txtJobLocation').val());
        self.ExpFromDate($('#txtExpFromDate').val());
        self.ExpToDate($('#txtExpToDate').val());
        self.JobTitleResp($('#txtJobTitleResp').val());
        self.DocNo($('#txtDocNo').val());
        self.DocIssuedBy($('#txtDocIssuedBy').val());
        self.DocDate($('#txtDocDate').val());
        self.CompanyName($('#txtCompanyName').val());
        self.InsuranceNo($('#txtInsuranceNo').val());
        self.PolicyType($('#txtPolicyType').val());
        self.ExpiryDate($('#txtExpiryDate').val());
        self.YearlyPremium($('#txtYearlyPremium').val());
        self.MonthlyPremium($('#txtMonthlyPremium').val());
        self.InsRemarks($('#txtInsRemarks').val());
        self.Problem($('#txtProblem').val());
        self.ProblemStart($('#txtProblemStart').val());
        self.Reason($('#txtReason').val());
        self.DoctorName($('#txtDoctorName').val());
        self.DoctorMobNo($('#txtDoctorMobNo').val());
        self.DoctorAddress($('#txtDoctorAddress').val());
        self.DoctorEmail($('#txtDoctorEmail').val());
        self.RFirstName($('#txtRFirstName').val());
        self.RMiddleName($('#txtRMiddleName').val());
        self.RLastName($('#txtRLastName').val());
        self.RelDOB($('#txtRelDOB').val());
        self.NDocNo($('#txtNDocNo').val());
        self.NDocIssuedBy($('#txtNDocIssuedBy').val());
        self.NDocDate($('#txtNDocDate').val());
        self.AlertSourceValue($('#txtAlertSourceValue').val());
    }

    $("#UploadEmpImgFile").fileupload({
        dataType: 'json',
        url: '../../Handlers/PIS/FileUploadHandler.ashx',
        replaceFileInput: false,
        done: function (e, data) {
            var result = data.result.ResponseData;
            self.PersonImage(result);
        }
    });
};

$(document).ready(function () {

    ValidateSession();
    $("#ddlVDCMP").attr("disabled", true);
    $("#ddlWard").attr("disabled", true);
    $("#txtAlertSourceValue").attr("disabled", true);
    $("#divSubmissionNo").hide();
    var evm = new EmployeeViewModel();
    ko.applyBindings(evm);
});