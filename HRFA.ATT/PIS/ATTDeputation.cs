using System;

namespace HRFA.ATT
{
    public class ATTDeputation
    {
        public ATTDeputation()
        {
            _Office = new ATTOffice();
            _Post = new ATTPost();
        }
        public Int64? SubmissionNo { get; set; }
        public Int32? EmpID { get; set; }
        public string EmpName { get; set; }

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

        public Int64? OldSubmissionNo { get; set; }

        public string DepoFromDate { get; set; }
        public string DepoToDate { get; set; }
        public string Responsibilities { get; set; }

        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string RStatus { get; set; }

        public string Action { get; set; }
    }
}
