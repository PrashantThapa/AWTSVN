using System;

namespace HRFA.ATT
{
    public class ATTAllowance
    {
        public int Id { get; set; }
        public string SelectedFiscalYear { get; set; }
        public int Salary_ItemId { get; set; }
        public decimal Item_Amount { get; set; }
        public int? AllowanceMonth { get; set; }
        public int? EmpId { get; set; }
        public string Remarks { get; set; }
        public string AStatus { get; set; }
        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }
        public string EntryBy { get; set; }
        public DateTime EntryDate { get; set; }
        public string RStatus { get; set; }
    }
}
