using System;
using System.Collections.Generic;

namespace HRFA.ATT
{
    public class ATTEmpAddress
    {
        public ATTEmpAddress()
        {
            _AddressType = new ATTAddressType();
            _Address = new ATTAddress();
            _EmpAdPririoty = new ATTEmpContactPririoty();
            _EmpContacts = new List<ATTEmpContact>();
            _EmpContactPersons = new List<ATTEmpContactPerson>();

        }
        public Int64? EmployerID {get; set;}
       // public ATTAddressType AddressType { get; set; }//ADTYPE_ID
        private ATTAddressType _AddressType ;
        public ATTAddressType AddressType
        {
            get { return _AddressType; }
            set { _AddressType = value; }

        }
       // public ATTAddress Address { get; set; }// ADDRESS_ID
        private ATTAddress _Address;
        public ATTAddress Address
        {
            get { return _Address; }
            set { _Address = value; }

        }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
         public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Rstatus { get; set; }
        public string Action { get; set; }
       // public  ATTEmpContactPririoty EmpAdPririoty { get; set; }
        private ATTEmpContactPririoty _EmpAdPririoty ;
        public ATTEmpContactPririoty EmpAdPririoty
        {
            get { return _EmpAdPririoty; }
            set { _EmpAdPririoty = value; }

        }

        private List<ATTEmpContact> _EmpContacts ;
        public List<ATTEmpContact> EmpContacts
        {
            get { return _EmpContacts; }
            set { _EmpContacts = value; }
        }
        private List<ATTEmpContactPerson> _EmpContactPersons ;
        public List<ATTEmpContactPerson> EmpContactPersons
        {
            get { return _EmpContactPersons; }
            set { _EmpContactPersons = value; }
        }

        public Int64? SubmissionNo { get; set; }// added for dirty
        public string Source { get; set; }  // added for dirty  
     }
}
