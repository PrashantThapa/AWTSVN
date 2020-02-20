using HRFA.COMMON;
using HRFA.DataLayer.REPORTING;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.BLL.REPORTING
{
	public class BLLRepShiftSchedule
	{
		public JsonResponse GetShiftScheduleReport(Int64 officecd, Int64 deptid)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepShiftSchedule dLLRepShiftSchedule = new DLLRepShiftSchedule();
					var data = dLLRepShiftSchedule.GetShiftScheduleReport(officecd, deptid);
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
