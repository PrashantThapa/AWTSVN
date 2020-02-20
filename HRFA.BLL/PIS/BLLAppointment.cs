using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;

namespace HRFA.BLL
{
    public class BLLAppointment
    {
        public JsonResponse SaveAppointment(ATTAppointment objAppointment, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLAppointment dllAppointment = new DLLAppointment();
                    response.Message = dllAppointment.SaveAppointment(objAppointment,appID,modID);
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


        public JsonResponse GetAppointment(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            DLLAppointment objDll = new DLLAppointment();
            try
            {
                response.ResponseData = objDll.GetAppointment(submissionNo);
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
