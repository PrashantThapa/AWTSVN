﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.ATT.REPORTING
{
	public class ATTRepEmployeePostHistory
	{
		public string SYMBOL_NO { get; set; }
		public Int64? EMP_ID { get; set; }
		public Int64? POST_ID { get; set; }
		public string POST_DESC { get; set; }
		public string POSTING_TYPE_ID { get; set; }
		public string FROM_DATE { get; set; }
		public string DECISION_DATE { get; set; }


	}
}
