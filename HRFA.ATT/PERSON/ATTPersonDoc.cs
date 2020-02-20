using System;
namespace HRFA.ATT
{
    public class ATTPersonDoc
    {
       public ATTPersonDoc()
        {
            _Person = new ATTPerson();
            _DocType = new ATTDocumentType();
        }
        //public Int64? PID { get; set; }

        private ATTPerson _Person ;
        public ATTPerson Person
        {
            get { return _Person; }
            set { _Person = value; }
        }
        
        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public string IssueNo { get; set; }
        public string IssueDate { get; set; }
        public string IssuePlace { get; set; }
        public string IssueBy { get; set; }

        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Status { get; set; }
        public string Action { get; set; }

        public string DocFile { get; set; }

        public ATTDocumentType _DocType ;
        public ATTDocumentType DocType
        {
            get { return _DocType; }
            set { _DocType = value; }
        }
        public Int64? BFIID { get; set; }
    }
}
