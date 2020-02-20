using HRFA.BLL.REPORTING;
using HRFA.COMMON;
using System;
using HRFA.ATT;
using HRFA.BLL;
using System.Collections.Generic;


//using COREDL;
//

namespace HRFA.Reporting.PIS.ReportHandlers
{
	/// <summary>
	/// Summary description for OfficePostHandler
	/// </summary>


	public class OfficePostReportHandler : BaseHandler
	{
		public object GetPostReport(Int64 officecd, Int64 postid)
		{ 
			JsonResponse response = new JsonResponse();
			BLLRepOfficePostReport bLLRepOfficePostReport = new BLLRepOfficePostReport();
			try
			{
				response = bLLRepOfficePostReport.GetPostReport(officecd, postid);
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}
			return JsonUtility.Serialize(response);
		}

	}
}