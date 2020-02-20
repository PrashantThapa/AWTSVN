using System;

namespace HRFA.ATT
{
    public class ATTEmpContact
    {
        public ATTEmpContact()
        {
            _ContactType = new ATTContactType();
            _EmpContactPririoty = new ATTEmpContactPririoty();
            _Designation = new ATTDesignation();
        }
        public Int64? EmployerID { get; set; }
       // public ATTContactType ContactType { get; set; }// CTypeID

        private ATTContactType _ContactType ;
        public ATTContactType ContactType
        {
            get { return _ContactType; }
            set { _ContactType = value; }

        }
        public string FromDate { get; set; }
        public string CValue { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string Action { get; set; }
        public string Rstatus { get; set; }
        public Int64? SubmissionNo { get; set; }// added for dirty
        public string Source { get; set; }  // added for dirty  

       // public ATTEmpContactPririoty EmpContactPririoty { get; set; }
        private ATTEmpContactPririoty _EmpContactPririoty ;
        public ATTEmpContactPririoty EmpContactPririoty
        {
            get { return _EmpContactPririoty; }
            set { _EmpContactPririoty = value; }

        }

        private ATTDesignation _Designation ;
        public ATTDesignation Designation
        {
            get { return _Designation; }
            set { _Designation = value; }

        }
      /*public List<ATTEmpContactPririoty> _EmpContactPririoty = new List<ATTEmpContactPririoty>();
        public List<ATTEmpContactPririoty> EmpContactPririoty
        {
            get { return _EmpContactPririoty; }
            set { _EmpContactPririoty = value; }
        }*/

   }
}
