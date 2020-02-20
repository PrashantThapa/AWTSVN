using HRFA.COMMON;
using HRFA.DataLayer.REPORTING;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.BLL.REPORTING
{
	public class BLLRepAttendence
	{
		public JsonResponse GetAttendenceReport(string fromdate, string todate, string symbolNO, Int64? officeCD)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepAttendence dLLRepAttendence = new DLLRepAttendence();
					var data = dLLRepAttendence.GetAttendenceReport(fromdate, todate, symbolNO, officeCD);
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
