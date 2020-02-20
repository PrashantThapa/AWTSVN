using HRFA.ATT.PAYROLL;
using System;
using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTGradeScaleSetup
    {
        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }
        public Int32? GradeID { get; set; }
        public decimal MinBasicSalary { get; set; }
        public decimal MinAllowance { get; set; }
        public decimal MaxBasicSalary { get; set; }
		public decimal MaxAllowance { get; set; }
		public string Remarks { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string RStatus { get; set; }
        public string GradeName { get; set; }
        public string Allowance { get; set; }


        public List<ATTGradeLevel> GradeLevels { get; set; }
    }
}
