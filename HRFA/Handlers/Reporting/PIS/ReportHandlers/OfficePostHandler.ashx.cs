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


	public class OfficePostHandler : BaseHandler
	{
		public object GetAllOffice(Int32? officeCode)
		{

			BLLOffice obj = new BLLOffice();
			//ATTOffice offcode = JsonUtility.DeSerialize(args, typeof(ATTOffice)) as ATTOffice;

			//List<ATTOffice> lst = obj.GetAllOffice();
			List<ATTOffice> lst = new List<ATTOffice>();

			JsonResponse response = new JsonResponse
			{
				ResponseData = lst
			};
			try
			{
				response.Message = "Success";
				response.ResponseData = obj.GetAllOffice(officeCode);
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}
			return JsonUtility.Serialize(response);
		}

		public object GetReportPost(Int64 officecd, string SymbolNo)
		{
			JsonResponse response = new JsonResponse();
			BLLRepOfficePost bLLrepOfficePost = new BLLRepOfficePost();
			try
			{
				response = bLLrepOfficePost.GetReportPost(officecd, SymbolNo);
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