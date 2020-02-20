using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.ALMS
{
   

    public class AttendenceHandler : BaseHandler
    {
        public object SaveAttendenceInfo(string args)
        {
            JsonResponse response = new JsonResponse();
            ATTAttendenceDownload objAttDownload = JsonUtility.DeSerialize(args, typeof(ATTAttendenceDownload)) as ATTAttendenceDownload;
            BLLAttendence bllAttendence = new BLLAttendence();
            response = bllAttendence.SaveAttendenceInfo(objAttDownload);

            return JsonUtility.Serialize(response);

        }

       
    }
}