using HRFA.COMMON;
using HRFA.DataLayer;
using System;

namespace HRFA.BLL
{
    public class BLLDate
    {
        

        public JsonResponse GetDates()
        {

            JsonResponse response = new JsonResponse();

            try
            {
                if (SessionManager.CurrentDate == null)
                {
                    if (response == null)
                        response = new JsonResponse();

                    DLLDate dllDate = new DLLDate();
                    response.ResponseData = dllDate.GetDates();
                    response.IsSucess = true;

                    SessionManager.CurrentDate = response;
                }
                else
                {
                    response = SessionManager.CurrentDate;
                }

            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;

            }

            return response;

        }


        public JsonResponse ValidateNepDate(string nepDate, string futureDate)
        {

            JsonResponse response = new JsonResponse();

            try
            {
                DLLDate dllDate = new DLLDate();
                response.Message = dllDate.ValidateNepDate(nepDate, futureDate);

                if (response.Message != "OK")
                {
                    response.IsSucess = false;
                }
                else
                {
                    response.IsSucess = true;
                }

            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;

            }

            return response;


        }

        

        public JsonResponse GetNoOfMonth(string fromDate, string toDate)
        {
            JsonResponse response = new JsonResponse();
            
            Int64 numMonth = 0;


            try
            {
                DLLDate objDate = new DLLDate();
               
                numMonth = objDate.GetNoOfMonth(fromDate, toDate);
                response.Message = "";
                response.IsSucess = true;
                response.ResponseData = numMonth;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;
        }

        public JsonResponse GetDaysDifference(string date1, string date2)
        {
            JsonResponse response = new JsonResponse();
            int numOfDays = 0;
            try
            {
                DLLDate objDate = new DLLDate();

                numOfDays = objDate.GetDaysDifference(date1, date2);
                response.Message = "";
                response.IsSucess = true;
                response.ResponseData = numOfDays;

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;
        }

        public JsonResponse GetDaysDifferenceWithHoliday(string date1, string date2)
        {
            JsonResponse response = new JsonResponse();
            int numOfDays = 0;
            try
            {
                DLLDate objDate = new DLLDate();

                numOfDays = objDate.GetDaysDifferenceWithHoliday(date1, date2);
                response.Message = "";
                response.IsSucess = true;
                response.ResponseData = numOfDays;

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
