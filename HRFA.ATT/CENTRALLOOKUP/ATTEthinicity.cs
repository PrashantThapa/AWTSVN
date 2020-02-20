using System;

namespace HRFA.ATT
{
    public class ATTEthinicity
    {
	   /*
        public Int32? EthnicID { get; set; }
        public string EthnicName { get; set; }
        public string EthnicNameEng { get; set; }
        public bool Status { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }
		*/
		
		public Int32? EthTypeID { get; set; }
        public string EthTypeName { get; set; }
        public string EthTypeNameEng { get; set; }
        public string EthFromDate { get; set; }
        public string EthToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public bool EthStatus { get; set; }
        public string Action { get; set; }
		
    }
}
