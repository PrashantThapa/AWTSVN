using HRFA.BLL.REPORTING;
using HRFA.COMMON;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace HRFA.Handlers.Reporting.PortalReport
{
	public class LeaveDetailHandler : BaseHandler
	{

		public object GetLeaveDetail(Int64? empId) { 

			JsonResponse response = new JsonResponse();
			BLLRepLeaveDetail bLLRepLeaveDetail = new BLLRepLeaveDetail();
			try
			{
				response = bLLRepLeaveDetail.GetLeaveDetail(empId);
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