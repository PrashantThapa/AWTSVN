using System;
using System.Collections.Generic;
using HRFA.ATT.COMMON;

namespace HRFA.ATT.PAYROLL
{
    public class ATTSalaryParameter
    {
        public string OldSubmissionNo { get; set; }
        public Int32? SPID { get; set; }
        public Int32? EmpID { get; set; }
        public string EmployeeName { get; set; }
        public string GradeID { get; set; }
        public decimal? CITPer { get; set; }
        public decimal? CITRs { get; set; }
        public decimal? PFPer { get; set; }
        public decimal? PFRs { get; set; }
        public string EntryBy { get; set; }

        public string EntryDate { get; set; }
        public string Action { get; set; }
        public string RStatus { get; set; }
        public string TaxDeduction { get; set; }

        public string GradeLevelName { get; set; }
		public decimal? Tax { get; set; }
		public decimal? InsuranceAmt { get; set; }
		public decimal? AdvanceAmt { get; set; }
		public decimal? LunchAmt { get; set; }



		public List<ATTExtraAllowance> extrallowancedata { get; set; }

    }
}
