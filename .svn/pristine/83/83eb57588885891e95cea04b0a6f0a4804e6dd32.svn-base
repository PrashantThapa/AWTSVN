using System;

namespace HRFA.ATT
{
    public class ATTEmpPosting
    {
        public ATTEmpPosting()
        {
            _Office = new ATTOffice();
            _Post = new ATTPost();
            _OfficeDarbandi = new ATTOfficePostDarbandi();
        }
        private ATTOffice _Office ;
        public ATTOffice Office
        {
            get { return _Office; }
            set { _Office = value; }
        }

        private ATTPost _Post ;
        public ATTPost Post
        {
            get { return _Post; }
            set { _Post = value; }
        }

        private ATTOfficePostDarbandi _OfficeDarbandi;
        public ATTOfficePostDarbandi OfficeDarbandi
        {
            get { return _OfficeDarbandi; }
            set { _OfficeDarbandi = value; }
        }

        public Int32? EmpID { get; set; }
        public string EmployeeName { get; set; }
        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }

        public string Salary { get; set; }
        public string Allowance { get; set; }
        public string Remarks { get; set; }
        public string RStatus { get; set; }

        public string PostingType { get; set; }
        public string PromoFromDate { get; set; }
        public string ApptFromDate { get; set; }
        public string TranFromDate { get; set; }
        public string Action { get; set; }
    }
}
