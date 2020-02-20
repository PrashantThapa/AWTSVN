using System;

namespace HRFA.ATT
{
    public class ATTUserVerificationModule
    {
        public string ApplicationID { get; set; }
        public string ModuleID { get; set; }
        public string VMFromDate { get; set; }
        public string UserID {get;set;}
        public Int32? VerifyLevel { get; set; }
        public Int32? LevelOfVerification { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }    
        public string EntryDate { get; set; }
        public bool shouldShowMessage { get; set; }
        public string Action { get; set; }        
        
    }
}
