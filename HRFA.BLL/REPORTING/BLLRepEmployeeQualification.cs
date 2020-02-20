using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;

namespace HRFA.BLL.REPORTING
{
	public class BLLRepEmployeeQualification 
	{
		public JsonResponse GetEmployeeQualification(Int64 pid)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepEmployeeQualification dllrepEmployeeQualification = new DLLRepEmployeeQualification();
					var data = dllrepEmployeeQualification.GetEmployeeQualification(pid);
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
