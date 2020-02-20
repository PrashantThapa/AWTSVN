using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using HRFA.DataLayer.REPORTING;
using System;


namespace HRFA.BLL.REPORTING
{
	public class BLLRepLeaveDetail
	{
		public JsonResponse GetLeaveDetail(Int64? empId)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepLeaveDetail dLLRepLeaveDetail = new DLLRepLeaveDetail();
					var data = dLLRepLeaveDetail.GetLeaveDetail(empId);
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
