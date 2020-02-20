using System;

namespace HRFA.ATT
{
    public class ATTPostWiseSalaryItem
    {
        
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
       private ATTSalaryItem _SalaryItem;
       public ATTSalaryItem SalaryItem
       {
           get { return _SalaryItem; }
           set { _SalaryItem = value; }

       }
       public Int64? SubmissionNo { get; set; }
       public ATTMode Mode { get; set; }
       public ATTFunction Fnc { get; set; }
       public double? Amount { get; set; }
      
       public Int64? OldSubmissionNo { get; set; }
       public string Action { get; set; }
       public string Status { get; set; }
       public string EntryBy { get; set; }
       public string EntryDate { get; set; }
       public string FromDate { get; set; }
       public string ToDate { get; set; }

        public ATTPostWiseSalaryItem()
        {
            _Office = new ATTOffice();
            _Post = new ATTPost();
            _SalaryItem = new ATTSalaryItem();
        }

    }
}
