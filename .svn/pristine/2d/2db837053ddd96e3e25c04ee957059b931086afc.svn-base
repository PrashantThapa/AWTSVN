using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{

    public class AppointmentHandler : BaseHandler
    {

        public object SaveAppointment(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            ATTAppointment objAppointment = JsonUtility.DeSerialize(args, typeof(ATTAppointment)) as ATTAppointment;
            BLLAppointment bllAppointment = new BLLAppointment();
            response = bllAppointment.SaveAppointment(objAppointment, appID, modID);

            return JsonUtility.Serialize(response);

        }


        public object GetAppointment(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLAppointment objBLLAppointment = new BLLAppointment();
            try
            {
                response = objBLLAppointment.GetAppointment(submissionNo);
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