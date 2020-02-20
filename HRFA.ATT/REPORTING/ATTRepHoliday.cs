using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.ATT.REPORTING
{
	public class ATTRepHoliday
	{
		public string HOLIDAY_DESC { get; set; }
		public Int64? HOLIDAY_ID { get; set; }
		public string FROM_DATE { get; set; }
		public string TO_DATE { get; set; }
		public string FIXED_HOLIDAYS{ get; set; }
	}
}
