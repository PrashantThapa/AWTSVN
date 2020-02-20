using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using HRFA.DataLayer.REPORTING;

using System;


namespace HRFA.BLL.REPORTING
{
	public class BLLPayslip
	{
		public JsonResponse GetPaySlip(Int64? officeCd, Int64? year, Int64? month, Int64? empId)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepPaySlip dLLRepPaySlip = new DLLRepPaySlip();
					var data = dLLRepPaySlip.GetPaySlip(officeCd, year, month, empId);
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
