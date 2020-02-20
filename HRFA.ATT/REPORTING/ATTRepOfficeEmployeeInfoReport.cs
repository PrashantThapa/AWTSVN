using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.ATT.REPORTING
{
	public class ATTRepOfficeEmployeeInfoReport
	{
		public string EMP_NAME { get; set; }
		public string SYMBOL_NO { get; set; }
		public Int64? EMP_ID { get; set; }
		public Int64? POST_ID { get; set; }
		public string JOINING_DATE { get; set; }
		public Int64? OFFICE_CD { get; set; }
		public string OFFICE_NAME_NEPALI { get; set; }
		public string POST_DESC { get; set; }
	}
}
