using System;


namespace HRFA.ATT
{
    public class ATTEmpContactPerson
    {
        public ATTEmpContactPerson()
        {
            _Person = new ATTPerson();
            _Designation = new ATTDesignation();
        }
        public Int64? EmployerID { get; set; }
       // public ATTPerson Person { get; set; } //PID

        private ATTPerson _Person;
        public ATTPerson Person
        {
            get { return _Person; }
            set { _Person = value; }

        }
        public string FromDate { get; set; }
       // public ATTDesignation Designation { get; set; }//DesID
        private ATTDesignation _Designation ;
        public ATTDesignation Designation
        {
            get { return _Designation; }
            set { _Designation = value; }

        }
        public string ToDate { get; set; }
        public Int64? CP_SUBMISSION_NO { get; set; }
        public Int16? SEQ_NO { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Rstatus { get; set; }
        public string Action { get; set; }
        public Int64? SubmissionNo { get; set; }// added for dirty
        public string Source { get; set; }  // added for dirty  

    }
}
