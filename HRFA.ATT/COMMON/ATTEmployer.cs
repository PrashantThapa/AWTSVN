using System;
namespace HRFA.ATT
{
    public class ATTEmployer
    {
        public Int64? EmployerID { get; set; }
        public string EmployerNameNep { get; set; }
        public string EmployerNameEng { get; set; }
        //public ATTEmployerType Employertype { get; set; }//ETYPE_ID
       // private ATTEmployerType _Employertype = new ATTEmployerType();
       // public ATTEmployerType Employertype
       // {
       //     get { return _Employertype; }
       //     set { _Employertype = value; }

       // }

       //// public ATTServiceType ServiceType { get; set; }//STYPE_ID  

       // private ATTServiceType _ServiceType = new ATTServiceType();
       // public ATTServiceType ServiceType
       // {
       //     get { return _ServiceType; }
       //     set { _ServiceType = value; }

       // }
        public string EssID { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Rstatus { get; set; }
        public string Action { get; set; }
        public Int64? TranNo { get; set; }
        //private List<ATTEmpDocument> _EmpDocuments = new List<ATTEmpDocument>();
        //public List<ATTEmpDocument> EmpDocuments
        //{
        //    get { return _EmpDocuments; }
        //    set { _EmpDocuments = value; }
            
        //}

        //private List<ATTEmpAddress> _EmpAddresss = new List<ATTEmpAddress>();
        //public List<ATTEmpAddress> EmpAddresss
        //{
        //    get { return _EmpAddresss; }
        //    set { _EmpAddresss = value; }

        //}

        public Int64? SubmissionNo { get; set; }// added for dirty
        public string Source { get; set; }  // added for dirty  
       

         
    }
}
