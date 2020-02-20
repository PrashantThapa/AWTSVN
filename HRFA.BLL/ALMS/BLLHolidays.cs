using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.DataLayer;
using HRFA.COMMON;
namespace HRFA.BLL
{
    public class BLLHolidays
    {

        public string SaveHolidays(ATTHolidays objHolidayAtt)
        {
            try
            {
                DLLHolidays objHolidayDll = new DLLHolidays();
                return objHolidayDll.SaveHolidays(objHolidayAtt);

            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public List<ATTHolidays> GetHolidays(Int32? HolidayValue)
        {
            try
            {
                DLLHolidays obj = new DLLHolidays();
                return obj.GetHolidays(HolidayValue);

            }
            catch (Exception ex)
            {
                throw (ex);
            }

        }

		public JsonResponse DeleteHolidaySetup(Int32? holidays)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				DLLHolidays dLLHolidays = new DLLHolidays();
				response.Message = dLLHolidays.DeleteHolidaySetup(holidays);
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}
			return response;
		}
	}
}
