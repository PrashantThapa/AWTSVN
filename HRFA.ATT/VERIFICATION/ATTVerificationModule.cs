using System;

namespace HRFA.ATT
{
    public class ATTVerificationModule
    {
        public ATTVerificationModule()
        {}
        //NB: selection of verification Module while cliking submit button
        public string ApplicationID { get; set; }
        public string ModuleID { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int LevelOfVerification { get; set; }
        public Int32? VerifyLevel { get; set; }
        public string EntryBy { get; set; }
        public string Action { get; set; }
    }
}
