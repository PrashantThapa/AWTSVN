using System;

namespace HRFA.ATT
{
    public class ATTRetirement
    {
        public ATTRetirement() { }

        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }
        public int? EmpID { get; set; }
        public string EmployeeName { get; set; }
        public string RetirementType { get; set; }
        public string RetirementDate { get; set; }
        public string Remarks { get; set; }
        public string RStatus { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }
    }
}
