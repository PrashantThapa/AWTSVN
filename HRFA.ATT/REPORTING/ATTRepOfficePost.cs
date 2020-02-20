using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.ATT.REPORTING
{
	public class ATTRepOfficePost
	{
		public Int64? EMP_ID { get; set; }
		public string EMP_NAME { get; set; }
		public string FROM_DATE { get; set; }
		public string TO_DATE { get; set; }
		public string POST_DESC { get; set; }
		public Int64? OFFICE_CD { get; set; }
		public Int64? POST_ID { get; set; }
		public string OFFICE_NAME_NEPALI { get; set; }
		public string SYMBOL_NO { get; set; }
	}
}
