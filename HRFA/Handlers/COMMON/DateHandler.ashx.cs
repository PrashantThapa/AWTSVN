using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for DateHandler
    /// </summary>
    public class DateHandler : BaseHandler
    {

        public object GetDates()
        {
            JsonResponse response = new JsonResponse();

            BLLDate bllDate = new BLLDate();

            response = bllDate.GetDates();

            return JsonUtility.Serialize(response);
        }

        public object ValidateNepDate(string nepDate, string futureDate)
        {
            JsonResponse response = new JsonResponse();

            BLLDate bllDate = new BLLDate();

            response = bllDate.ValidateNepDate(nepDate, futureDate);

            return JsonUtility.Serialize(response);
        }
        public object GetNoOfMonth(string fromDate, string toDate)//'2070.0.01','2070.02.02'//string fromDate, string toDate
        {


            JsonResponse response = new JsonResponse();
            BLLDate objBLLDate = new BLLDate();

            if (fromDate != "" || toDate != "")
            {
                response = objBLLDate.GetNoOfMonth(fromDate, toDate);
            }
            else
            {
                response.Message = "Suspicious Activity !!!";
                response.IsSucess = false;
                response.IsToken = false;
            }

            return JsonUtility.Serialize(response);

        }

        public object GetDaysDifference(string date1, string date2)
        {
            JsonResponse response = new JsonResponse();
            BLLDate objBLLDate = new BLLDate();


            response = objBLLDate.GetDaysDifference(date1, date2);
            return JsonUtility.Serialize(response);

        }
        public object GetDaysDifferenceWithHoliday(string date1, string date2)
        {
            JsonResponse response = new JsonResponse();
            BLLDate objBLLDate = new BLLDate();


            response = objBLLDate.GetDaysDifferenceWithHoliday(date1, date2);
            return JsonUtility.Serialize(response);

        }


    }
}