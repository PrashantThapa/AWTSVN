using HRFA.BLL.REPORTING;
using HRFA.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace HRFA.Reporting.PIS.ReportHandlers
{
	public class HolidayHandler : BaseHandler
	{
		public object GetHolidayReport(string fromdate, string todate)
		{
			JsonResponse response = new JsonResponse();
			BLLRepHoliday bLLRepHoliday = new BLLRepHoliday();
			try
			{
				response = bLLRepHoliday.GetHolidayReport(fromdate, todate);
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}
			return JsonUtility.Serialize(response);
		}

		public object GetHolidayReports(string fromdate, string todate)
		{
			JsonResponse response = new JsonResponse();
			BLLRepHoliday bLLRepHoliday = new BLLRepHoliday();
			try
			{
				response = bLLRepHoliday.GetHolidayReports(fromdate, todate);
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