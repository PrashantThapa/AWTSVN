using System;
namespace HRFA.ATT
{
    public class ATTEmployeeTransfer
    {
        public ATTEmployeeTransfer()
        {
            _Office = new ATTOffice();
            _Post = new ATTPost();
            _TransferPost = new ATTPost();
            _TransferOffice = new ATTOffice();
            _OfficePostDarbandi = new ATTOfficePostDarbandi();
        }
        private ATTOffice _Office;
        public ATTOffice Office
        {
            get { return _Office; }
            set { _Office = value; }
        }
        
        private ATTPost _Post;
        public ATTPost Post
        {
            get { return _Post; }
            set { _Post = value; }
        }

        private ATTPost _TransferPost ;
        public ATTPost TransferPost
        {
            get { return _TransferPost; }
            set { _TransferPost = value; }
        }
        private ATTOffice _TransferOffice ;
        public ATTOffice TransferOffice
        {
            get { return _TransferOffice; }
            set { _TransferOffice = value; }
        }
        private ATTOfficePostDarbandi _OfficePostDarbandi ;
        public ATTOfficePostDarbandi OfficePostDarbandi
        {
            get { return _OfficePostDarbandi; }
            set { _OfficePostDarbandi = value; }
        }
        public Int32? EmpID { get; set; }
        public string EmpName { get; set; }

        public string DecisionDate { get; set; }
        public string LetterIssueDate { get; set; }
        public string EffectiveDate { get; set; }
        public string EffectiveTillDate { get; set; }
        public string JoinDate { get; set; }
        public string SupervisorID { get; set; }
        public string SupervisorName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Status { get; set; }
        public string Action { get; set; }
        public Int64? SubmissionNo { get; set; } 
        public Int64? OldSubmissionNo { get; set; }

    }
}
