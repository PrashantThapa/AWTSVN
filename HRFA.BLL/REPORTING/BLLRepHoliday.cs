using HRFA.COMMON;
using HRFA.DataLayer.REPORTING;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.BLL.REPORTING
{
	public class BLLRepHoliday
	{
		public JsonResponse GetHolidayReport(string fromdate, string todate)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepHoliday dLLRepHoliday = new DLLRepHoliday();
					var data = dLLRepHoliday.GetHolidayReport(fromdate,todate);
					response.ResponseData = data;
					response.IsSucess = true;

				}

			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}


			return response;

		}

		public JsonResponse GetHolidayReports(string fromdate, string todate)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepHoliday dLLRepHoliday = new DLLRepHoliday();
					var data = dLLRepHoliday.GetHolidayReports(fromdate, todate);
					response.ResponseData = data;
					response.IsSucess = true;

				}

			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}


			return response;

		}


	}
}
