using HRFA.BLL.REPORTING;
using HRFA.COMMON;
using System;

namespace HRFA.Reporting.PIS.ReportHandlers
{
	/// <summary>
	/// Summary description for ShiftScheduleInfoHandler
	/// </summary>
	public class ShiftScheduleInfoHandler : BaseHandler
	{

		public object GetShiftScheduleReport(Int64 officecd, Int64 deptid)

		{
			JsonResponse response = new JsonResponse();
			BLLRepShiftSchedule bLLRepShiftSchedule = new BLLRepShiftSchedule();
			try
			{
				response = bLLRepShiftSchedule.GetShiftScheduleReport(officecd, deptid);
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