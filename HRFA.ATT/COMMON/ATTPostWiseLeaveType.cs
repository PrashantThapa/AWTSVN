namespace HRFA.ATT
{
    public class ATTPostWiseLeaveType
    {
        public ATTPostWiseLeaveType()
        {
            _Office = new ATTOffice();
            _Post = new ATTPost();
            _Leave = new ATTLeaveType();
            _PeriodType = new ATTPeriodType();
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
       private ATTLeaveType _Leave;
       public ATTLeaveType Leave
       {
           get { return _Leave; }
           set { _Leave = value; }
       }
       private ATTPeriodType _PeriodType;
       public ATTPeriodType PeriodType
       {
           get { return _PeriodType; }
           set { _PeriodType = value; }
       }
       public string Action { get; set; }
       public string Status { get; set; }
       public string EntryBy { get; set; }
       public string EntryDate { get; set; }
       public string FromDate { get; set; }
       public string ToDate { get; set; }

        // public string PeriodType { get; set; }
         public string PeriodTimes { get; set; }
         public bool IsAccural { get; set; }
         public string MaxAccrualDays { get; set; }
        
    }
}
