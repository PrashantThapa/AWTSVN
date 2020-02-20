using System;

namespace HRFA.ATT
{
    public class ATTEmpGrade
    {
        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }

        public Int32? EmpID { get; set; }
        public string EmployeeName { get; set; }
        // public Double? UnitGradeAmount { get; set; }
        // public Double? NLKPercent { get; set; }
        // public Int16? UpgradeMonth { get; set; }

        public string GradeType { get; set; }
        public Double? GradeValue { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string RStatus { get; set; }
        public string Action { get; set; }
    }
}
