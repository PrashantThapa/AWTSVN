using HRFA.COMMON;
using HRFA.DataLayer.REPORTING;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.BLL.REPORTING
{
	public class BLLRepShiftWiseInfo
	{
		public JsonResponse GetShiftWiseReport(Int64 officecd, Int64 deptid)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepShiftWiseInfo dLLRepShiftWiseInfo = new DLLRepShiftWiseInfo();
					var data = dLLRepShiftWiseInfo.GetShiftWiseReport(officecd, deptid);
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
