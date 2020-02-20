using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.ATT.FAMS
{
    public class ATTSalarySheetEmployee
    {
        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }
        public Int32? EmpID { get; set; }
        public Int32? PostID { get; set; }
        public string PostDesc { get; set; }
        public Int32? DepartmentID { get; set; }
        public string DepartmentDesc { get; set; }

        public string SalaryYear { get; set; }
        public Int32? SalaryMonth { get; set; }
        public Int32? OfficeCode { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string RStatus { get; set; }
        public string Action { get; set; }
        public string Gender { get; set; }
        public decimal AttendedDays { get; set; }
        public decimal TotalSalary { get; set; }
        public Int32? SalaryItemID { get; set; }
        public string SalaryItemDesc { get; set; }
        public decimal Amount { get; set; }
        public decimal EditedAmount { get; set; }
        public string FNAME_ENG { get; set; }
        public string LNAME_ENG { get; set; }
        public decimal PF { get; set; }
        public decimal? TAXABLEINCOME { get; set; }
        public decimal ALLOWANCE { get; set; }
        public decimal INSURANCE { get; set; }

        public decimal BASIC_SALARY { get; set; }
        public decimal INCOMETAX { get; set; }
        public decimal LUNCH { get; set; }
        public decimal ADVANCE { get; set; }


    }
}
