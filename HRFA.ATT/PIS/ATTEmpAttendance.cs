using System;

namespace HRFA.ATT
{
    public class ATTEmpAttendance
    {
        public Int64? EmpID { get; set; }
        public Int64? SubmissionNo { get; set; }
        public string SN { get; set; }
        public string EmployeeName { get; set; }
        public string PostDesc { get; set; }
        public int? OfficeCD { get; set; }
        public int? CostCenterID { get; set; }
        public int? Year { get; set; }
        public int? Month { get; set; }
        public Int16? WorkingDays { get; set; }
        public Int16? AttDays { get; set; }
        public char RStatus { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public char Action { get; set; }
        public string RejRemarks { get; set; }
    }
}
