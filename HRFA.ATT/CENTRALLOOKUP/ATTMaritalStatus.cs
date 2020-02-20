using System;

namespace HRFA.ATT
{
    public class ATTMaritalStatus
    {
		/*
        public int MarStatusID { get; set; }
        public string MarStatusName { get; set; }
        public string MarStatusNameEn { get; set; }
        public string Status { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }
		*/
		public Int32? MarStatID { get; set; }
        public string MarStatName { get; set; }
        public string MarStatNameEng { get; set; }
        public string Status { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
		public string Action { get; set; }

        public string RStatus { get; set; }
    }
}
