using System;

namespace HRFA.ATT
{
    public class ATTContributor
    {
        public ATTContributor()
        {
            _Person = new ATTPerson();
            _Employer = new ATTEmployer();
            _EmploymentType = new ATTEmploymentType();
        }
        private ATTPerson _Person;
        public ATTPerson Person
        {
            get { return _Person; }
            set { _Person = value; }
        }

        private ATTEmployer _Employer;
        public ATTEmployer Employer
        {
            get { return _Employer; }
            set { _Employer = value; }
        }

        public string Post { get; set; }

        private ATTEmploymentType _EmploymentType ;
        public ATTEmploymentType EmploymentType
        {
            get { return _EmploymentType; }
            set { _EmploymentType = value; }
        }
        

        public string FromDate { get; set; }

        public string ToDate { get; set; }
        public string JoiningDate { get; set; }
        public string TerminationDate { get; set; }
        public string TerminationRes { get; set; }

        public string EntryBy { get; set; }
        public string Status { get; set; }
        public string Action { get; set; }

        public Int64? TranNo { get; set; }

        public string Source { get; set; }
        public Int64? SubmissionNo { get; set; }// added for dirty
        public Int64? SequenceNo { get; set; }// added for dirty  
        public string SchList { get; set; }
        public string SchListInt { get; set; }


       
    }
}
