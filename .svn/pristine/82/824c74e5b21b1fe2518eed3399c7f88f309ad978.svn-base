using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer.REPORTING;
using System;
using System.Text;

namespace HRFA.BLL.REPORTING
{
	public class BLLRepOfficePost
	{
		public JsonResponse GetReportPost(Int64 officecd, string SymbolNo)
		{
			 JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepOfficePost dllrepOfficePost = new DLLRepOfficePost();
					var data = dllrepOfficePost.GetReportPost(officecd, SymbolNo);
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
