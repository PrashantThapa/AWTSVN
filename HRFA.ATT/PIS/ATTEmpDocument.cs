using System;
namespace HRFA.ATT
{
    public class ATTEmpDocument
    {
        public ATTEmpDocument()
        {
            _DocType = new ATTDocumentType();
        }
        public Int64? EmployerID { get; set; }
       // public ATTDocumentType  DocType { get; set; }
        private ATTDocumentType _DocType;
        public ATTDocumentType DocType
        {
            get { return _DocType; }
            set { _DocType = value; }

        }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string IssueNo { get; set; }
        public string IssueDate { get; set; }
        public string IssuePlace { get; set; }
        public string DocFile { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Rstatus { get; set; }
        public string Action { get; set; }
        public Int64? SubmissionNo { get; set; }// added for dirty
        public string Source { get; set; }  // added for dirty  
    }
}
