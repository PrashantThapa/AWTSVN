using System;

namespace HRFA.ATT
{
    public class ATTUserTranVerification
    {
        //public string ApplicationID { get; set; }
        public string ModuleID { get; set; }
		public string EntryBY { get; set; }
		public string UpdatedBY { get; set; }
        public string ModuleDesc { get; set; }
        //public string FromDate { get; set; }
        public Int64? TranNo { get; set; }
        public int? SeqNo { get; set; }
        public string UserID { get; set; }
        //public int VerifyLevel { get; set; }
        public string VerifyStatus { get; set; }
        public string VerifyDate { get; set; }
        public string VerifyRemarks { get; set; }
        public string ForwardTo { get; set; }
        //public string UFromDate { get; set; }
        //public int NoOfLevelReq { get; set; }
        public string PrevStatus { get; set; }
        public string Action { get; set; }
    }
}
