using System;
using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTPISEmployee
    {
        public ATTPISEmployee()
        {
            _Person = new ATTPerson();
            _EmployeeTraining = new List<ATTEmpTraining>();
            _EmployeeInsurance = new List<ATTEmpInsurance>();
            _EmployeeExperience = new List<ATTEmpExperience>();
            _SalarySheet = new List<ATTEmpSalarySheet>();
            _EmpMedicalAttr = new List<ATTEmpMedicalCondition>();
        }
        private ATTPerson _Person ;
        public ATTPerson Person
        {
            get { return _Person; }
            set { _Person = value; }
        }
       
        public Int32? EmpID { get; set; }
        public string EmployeeName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string Status { get; set; }
        public string OrgEmpNo { get; set; }
        public string SymbolNo { get; set; }
        public string IdentityMark { get; set; }
        public string NLKNo { get; set; }
        public string PFNo { get; set; }
        public string PanNo { get; set; }
        public string Action { get; set; }

        public string Source { get; set; }
        public Int64? OldSubmissionNo { get; set; }
        public Int64? SubmissionNo { get; set; }// added for dirty
        public Int32? SequenceNo { get; set; }// added for dirty  
        public ATTOffice Office { get; set; }
        public ATTPost Post { get; set; }
        public ATTCostCenter CostCenter { get; set; }
        public ATTOfficePostDarbandi OfficeDarabandi { get; set; }
        public string FormID { get; set; }

        public List<ATTEmpTraining> _EmployeeTraining;
        public List<ATTEmpTraining> EmployeeTraining
        {
            get { return _EmployeeTraining; }
            set { _EmployeeTraining = value; }
        }

        public List<ATTEmpInsurance> _EmployeeInsurance ;
        public List<ATTEmpInsurance> EmployeeInsurance
        {
            get { return _EmployeeInsurance; }
            set { _EmployeeInsurance = value; }
        }

        public List<ATTEmpExperience> _EmployeeExperience;
        public List<ATTEmpExperience> EmployeeExperience
        {
            get { return _EmployeeExperience; }
            set { _EmployeeExperience = value; }
        }

        public List<ATTEmpMedicalCondition> _EmpMedicalAttr ;
        public List<ATTEmpMedicalCondition> EmpMedicalAttr
        {
            get { return _EmpMedicalAttr; }
            set { _EmpMedicalAttr = value; }
        }

        public List<ATTEmpSalarySheet> _SalarySheet ;
        public List<ATTEmpSalarySheet> SalarySheet
        {
            get { return _SalarySheet; }
            set { _SalarySheet = value; }
        }


    }
}
