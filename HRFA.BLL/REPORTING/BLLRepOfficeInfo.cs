using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer.REPORTING;
using System;

namespace HRFA.BLL.REPORTING
{
	public class BLLRepOfficeInfo
	{
		public JsonResponse GetEmployeeInfo(Int64 officecd)
		{
			JsonResponse response = new JsonResponse(); 

			try
			{
				if (response.Message == "")
				{
					DLLRepOfficeInfo dllrepOfficeInfo = new DLLRepOfficeInfo();
					var data = dllrepOfficeInfo.GetEmployeeInfo(officecd);
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
