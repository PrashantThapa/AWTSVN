using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.ATT.REPORTING
{
	public class ATTRepOfficePostReport
	{
		public Int64? OFFICE_CD { get; set; }
		public Int64? POST_ID { get; set; }
		public string TOTAL_SEAT { get; set; }
		public string OCCUPIED { get; set; }
		public string VACANT { get; set; }
		public string OFFICE_NAME_NEPALI { get; set; }
		public string POST_DESC { get; set; }

	}
}
