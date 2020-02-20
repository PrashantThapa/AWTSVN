using System;
using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTEmpConfirmation
    {
        public ATTEmpConfirmation()
        {
            _PersonDoc = new List<ATTPersonDoc>();
            _Office = new ATTOffice();
            _Post = new ATTPost();
            _OfficeDarbandi = new ATTOfficePostDarbandi();
            _ServiceType = new ATTServiceType();
        }
            public Int64? SubmissionNo { get; set; }
            private List<ATTPersonDoc> _PersonDoc ;
            public List<ATTPersonDoc> PersonDoc
            {
                get { return _PersonDoc; }
                set { _PersonDoc = value; }

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


            private ATTOfficePostDarbandi _OfficeDarbandi;
            public ATTOfficePostDarbandi OfficeDarbandi
            {
                get { return _OfficeDarbandi; }
                set { _OfficeDarbandi = value; }
            }

            public Int64? EmpID { get; set; }
            public string ConfirmationLetterDate { get; set; }
            public string EffectiveDate { get; set; }
            private ATTServiceType _ServiceType;
            public ATTServiceType ServiceType
            {
                get { return _ServiceType; }
                set { _ServiceType = value; }

            }
            //servicetypeid
            public string ConfirmationLetterName { get; set; }
            public string ConfirmationLetterFile { get; set; }
            public string FromDate { get; set; }
            public string ToDate { get; set; }
            public string RStatus { get; set; }
            public string EntryBy { get; set; }
            public string EntryDate { get; set; }
            public string Action { get; set; }
        
    }
}
