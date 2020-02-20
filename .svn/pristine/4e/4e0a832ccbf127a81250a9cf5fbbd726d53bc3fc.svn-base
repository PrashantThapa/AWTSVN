using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.ALMS
{
    /// <summary>
    /// Summary description for HolidaysHandler
    /// </summary>
    public class HolidaysHandler : BaseHandler
    {

        public object SaveHolidays(string args)
        {
            BLLHolidays objHolidayBll = new BLLHolidays();
            ATTHolidays objHolidayAtt = (ATTHolidays)JsonUtility.DeSerialize(args, typeof(ATTHolidays));
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = objHolidayBll.SaveHolidays(objHolidayAtt);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }


        public object GetHolidays(Int32? HolidayValue)
        {
            BLLHolidays obj = new BLLHolidays();

            List<ATTHolidays> lst = new List<ATTHolidays>();

            JsonResponse response = new JsonResponse();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetHolidays(HolidayValue);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }

		public object DeleteHolidaySetup(Int32? holidays)
		{
			JsonResponse response = new JsonResponse();

			BLLHolidays bLLLeaveType = new BLLHolidays();


			response = bLLLeaveType.DeleteHolidaySetup(holidays);


			return JsonUtility.Serialize(response);

		}
	}
}