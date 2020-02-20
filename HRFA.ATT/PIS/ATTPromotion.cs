using System;


namespace HRFA.ATT
{
    public class ATTPromotion
    {
        public ATTPromotion()
        {
            _Office = new ATTOffice();
            _PromotionOffice = new ATTOffice();
            _Post = new ATTPost();
            _PromotionPost = new ATTPost();
            _OfficeDarbandi = new ATTOfficePostDarbandi();
        }
        private ATTOffice _Office;
        public ATTOffice Office
        {
            get { return _Office; }
            set { _Office = value; }
        }

        private ATTOffice _PromotionOffice ;
        public ATTOffice PromotionOffice
        {
            get { return _PromotionOffice; }
            set { _PromotionOffice = value; }
        }

        private ATTPost _Post ;
        public ATTPost Post
        {
            get { return _Post; }
            set { _Post = value; }
        }

        private ATTPost _PromotionPost ;
        public ATTPost PromotionPost
        {
            get { return _PromotionPost; }
            set { _PromotionPost = value; }
        }

        private ATTOfficePostDarbandi _OfficeDarbandi ;
        public ATTOfficePostDarbandi OfficeDarbandi
        {
            get { return _OfficeDarbandi; }
            set { _OfficeDarbandi = value; }
        }

       
        public Int32? EmpID { get; set; }
        public string EmployeeName { get; set; }
        public Int32? SupervisorID { get; set; }
        public string SupervisorName { get; set; }
        public Int32? PromoTypeID { get; set; }
        public Int64? SubmissionNo { get; set; }
        public Int64? OldSubmissionNo { get; set; }

        public string LetterIssueDate { get; set; }
        public string EffectiveDate { get; set; }
        public string EffectiveTillDate { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Status { get; set; }
        public string Action { get; set; }
    }
}
