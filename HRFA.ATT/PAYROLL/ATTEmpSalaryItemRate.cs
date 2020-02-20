using System;

namespace HRFA.ATT
{
    public class ATTEmpSalaryItemRate
    {
        public ATTEmpSalaryItemRate() { }

        public Int64? SubmissionNo { get; set; }
        public int? EmpID { get; set; }
        public ATTSalaryItem SalaryItem { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Mode { get; set; }
        public double? Amount { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string RStatus { get; set; }
        public string Action { get; set; }
    }
}
