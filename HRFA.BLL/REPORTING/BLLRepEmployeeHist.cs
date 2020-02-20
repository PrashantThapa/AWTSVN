using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using HRFA.DataLayer.REPORTING;

using System;

namespace HRFA.BLL.REPORTING
{
	public class BLLRepEmployeeHist
	{
		public JsonResponse GetEmployeePostHistory(string SymbolNo)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepEmployeePostHist dLLrepEmployeePostHist = new DLLRepEmployeePostHist();
					var data = dLLrepEmployeePostHist.GetEmployeePostHistory(SymbolNo);
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


		//public JsonResponse GetAppointment(Int64? submissionNo)
		//{
		//	JsonResponse response = new JsonResponse();
		//	DLLAppointment objDll = new DLLAppointment();
		//	try
		//	{
		//		response.ResponseData = objDll.GetAppointment(submissionNo);
		//		response.IsSucess = true;
		//	}
		//	catch (Exception ex)
		//	{
		//		response.IsSucess = false;
		//		response.Message = ex.Message;
		//	}
		//	return response;
		//}
	}

}
