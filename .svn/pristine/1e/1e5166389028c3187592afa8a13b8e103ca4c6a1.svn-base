using System.Collections.Generic;
namespace HRFA.ATT
{
    public class ATTOfficePost
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
       private List<ATTOfficePostDarbandi> _OfficeDarbandi;
       public List<ATTOfficePostDarbandi> OfficeDarbandi
       {
           get { return _OfficeDarbandi; }
           set { _OfficeDarbandi = value; }
       }
       
       public string Action { get; set; }
       public string Status { get; set; }
       public string EntryBy { get; set; }
       public string EntryDate { get; set; }
       public string FromDate { get; set; }
       public string DarbandiFDate { get; set; }
       public string ToDate { get; set; }
        
        public ATTOfficePost()
        {
            _OfficeDarbandi = new List<ATTOfficePostDarbandi>();
            _Office = new ATTOffice();
        }
    }
}
