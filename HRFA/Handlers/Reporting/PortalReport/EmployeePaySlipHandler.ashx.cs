using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL.REPORTING;
using HRFA.COMMON;


namespace HRFA.Handlers.Reporting.PortalReport

{
	/// </summary>
	public class EmployeePaySlipHandler : BaseHandler
	{
		public object GetPaySlip(Int64? officeCd, Int64? year, Int64? month, Int64? empId)
		{
			BLLPayslip bLLPayslip = new BLLPayslip();
			JsonResponse response = bLLPayslip.GetPaySlip(officeCd, year, month, empId);
			return JsonUtility.Serialize(response);

		}
	}
}