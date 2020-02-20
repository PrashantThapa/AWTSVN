using HRFA.COMMON;
using HRFA.DataLayer.REPORTING;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.BLL.REPORTING
{
	public class BLLRepLeave
	{
		public JsonResponse GetLeaveReport(Int64 officecd, string appfromdt, string apptodt)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepLeave dLLRepLeave = new DLLRepLeave();
					var data = dLLRepLeave.GetLeaveReport(officecd, appfromdt, apptodt);
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
