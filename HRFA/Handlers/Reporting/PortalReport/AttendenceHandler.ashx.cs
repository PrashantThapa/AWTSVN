using HRFA.BLL.REPORTING;
using HRFA.COMMON;
using System;

namespace HRFA.Handlers.Reporting.PortalReport
{
	/// <summary>
	/// Summary description for AttendenceHandler
	/// </summary>
	public class AttendenceHandler : BaseHandler
	{

		public object GetAttendenceReport(string fromdate, string todate, string symbolNO, Int64? officeCD)
		{
			JsonResponse response = new JsonResponse();
			BLLRepAttendence bLLRepAttendence = new BLLRepAttendence();
			try
			{
				response = bLLRepAttendence.GetAttendenceReport(fromdate, todate, symbolNO, officeCD);
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