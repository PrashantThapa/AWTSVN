using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.CENTRALLOOKUP
{

    public class AppointmentTypeHandler : BaseHandler
    {
        public object GetAppointmentType(Int32? ApptTypeID)
        {
            JsonResponse response = new JsonResponse();


            BLLAppointmentType bllAppointmentType = new BLLAppointmentType();
            response = bllAppointmentType.GetAppointmentType(ApptTypeID);
           

            return JsonUtility.Serialize(response);

        }

       

    }
}