using System;
using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTAppraisal
    {
        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }
        public int? EmpID { get; set; }
        public string EmployeeName { get; set; }
        public ATTOffice Office { get; set; }
        public ATTPost Post { get; set; }
        public ATTOfficePostDarbandi OfficePostDarbandi { get; set; }
        public List<ATTAppraisalCategory> AppraisalCategories { get; set; }
        public Int16 SeqNo { get; set; }
        public string Award { get; set; }
        public string AwardDate { get; set; }
        public string Remarks { get; set; }
        public string RStatus { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }

    }
}
