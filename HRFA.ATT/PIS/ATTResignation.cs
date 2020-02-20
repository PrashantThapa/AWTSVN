using System;


namespace HRFA.ATT
{
    public class ATTResignation
    {
        public ATTResignation()
        {
            _Office = new ATTOffice();
            _OfficePost = new ATTPost();
        }
        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }
        public Int32? EmpID { get; set; }
        public string EmpName { get; set; }

        private ATTOffice _Office ;
        public ATTOffice Office
        {
            get { return _Office; }
            set { _Office = value; }
        }
        public string PostDesc { get; set; }

        private ATTPost _OfficePost ;
        public ATTPost Post
        {
            get { return _OfficePost; }
            set { _OfficePost = value; }
        }
        

        public string ResignLetterDate { get; set; }
        public string EffectiveDate { get; set; }
        public string ResignationReason { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string RStatus { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }

        public string Action { get; set; }
            
    }
}
