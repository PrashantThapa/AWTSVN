using System;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLAppointmentType
    {
        public JsonResponse GetAppointmentType(Int32? ApptTypeID)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLAppointmentType dllAppointmentType = new DLLAppointmentType();
                response.ResponseData=dllAppointmentType.GetAppointmentType(ApptTypeID);
                 
            }
            catch (Exception ex)
            {

                throw (ex);
            }
            return response;
        }
    }
}
