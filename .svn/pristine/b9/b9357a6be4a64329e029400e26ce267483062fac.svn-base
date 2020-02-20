using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLAttendence
    {
        public JsonResponse SaveAttendenceInfo(ATTAttendenceDownload objAttDownload)
        {
            JsonResponse response = new JsonResponse();
            DLLAttendence dllAttendence = new DLLAttendence();
            try
            {
                response.Message = dllAttendence.SaveAttendenceInfo(objAttDownload);
                response.IsSucess = true;
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
