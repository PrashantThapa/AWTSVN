using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.ATT.REPORTING
{
	public class ATTRepLeaveDetail
	{
		public Int64? EMP_ID { get; set; }
		public string APP_NO_OF_DAYS { get; set; }
		public string APP_FROM_DATE { get; set; }
		public string REMARKS { get; set; }
		public Int64? L_TYPE_ID { get; set; }
		public Int64? FORWARDED_TO { get; set; }
		public string APP_STATUS { get; set; }
		public string LEAVE_TYPE_NAME { get; set; }
		public string APP_TO_DATE { get; set; }
		public string APP_DATE { get; set; }
		public string EMP_NAME { get; set; }
		public string FORWARDED_EMP { get; set; }
		public string C_FROM_DATE { get; set; }
		public Int64? C_NO_OF_DAYS { get; set; }
		public string C_TO_DATE { get; set; }
		public string CANCEL_DATE { get; set; }
		public string CANCEL_REASON { get; set; }
	}
}
