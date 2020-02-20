using HRFA.COMMON;
using HRFA.DataLayer.REPORTING;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.BLL.REPORTING
{
	public class BLLRepOfficePostReport
	{
		public JsonResponse GetPostReport(Int64 officecd, Int64 postid)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{
					DLLRepOfficePostReport dLLRepOfficePostReport = new DLLRepOfficePostReport();
					var data = dLLRepOfficePostReport.GetPostReport(officecd, postid);
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
