using HRFA.BLL.REPORTING;
using HRFA.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
namespace HRFA.Reporting.PIS.ReportHandlers
{
	/// <summary>
	/// Summary description for LeaveReportHandler
	/// </summary>
	public class LeaveReportHandler : BaseHandler
	{


		public object GetLeaveReport(Int64 officecd, string appfromdt, string apptodt)
		{
			JsonResponse response = new JsonResponse();
			BLLRepLeave bLLRepLeave = new BLLRepLeave();
			try
			{
				response = bLLRepLeave.GetLeaveReport(officecd, appfromdt, apptodt);
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}
			return JsonUtility.Serialize(response);
		}
	}
}