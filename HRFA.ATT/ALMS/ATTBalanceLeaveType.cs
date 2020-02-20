using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.ATT.ALMS
{
	public class ATTBalanceLeaveType
	{
		//public Int64? EmpID { get; set; }
		//public string UptoDate { get; set; }
		public decimal? balancedleave { get; set; }
		public decimal? leavetaken { get; set; }
		public decimal? homeleave { get; set; }
		public decimal? sickleave { get; set; }
		public decimal? homeleaveaccumulation { get; set; }
		public decimal? sickleaveaccumulation { get; set; }

	}
}
