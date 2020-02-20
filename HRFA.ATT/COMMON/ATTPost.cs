using System;

namespace HRFA.ATT
{
	public class ATTPost
	{
		public Int16? PostID { get; set; }
		public string PostDesc { get; set; }
		public ATTSewa Sewa { get; set; }
        public ATTLevel Level { get; set; }

        public Int16? AvailableLevel { get; set; }

        //public Int16? Level { get; set; }
        public ATTSamuha Samuha { get; set; }
		public ATTUpaSamuha UpaSamuha { get; set; }
		public ATTPost ParentPost { get; set; }
		public string Status { get; set; }
		public string FromDate { get; set; }
		public string ToDate { get; set; }
		public string EntryBy { get; set; }
		public string EntryDate { get; set; }
		public string Action { get; set; }
		public Int16? DeptID { get; set; }
		public Int16? OfficeCode { get; set; }
	}
}
