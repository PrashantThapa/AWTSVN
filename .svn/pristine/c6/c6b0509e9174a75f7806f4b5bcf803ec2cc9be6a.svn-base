using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for LeaveApprovedRecommend
    /// </summary>
    public class LeaveApprovedRecommend : BaseHandler
    {

        public object SaveLeaveApprovedRecommend(string args)
        {
            ATTLeaveApprovedRecommend objLAR = (ATTLeaveApprovedRecommend)JsonUtility.DeSerialize(args, typeof(ATTLeaveApprovedRecommend));
            JsonResponse response = new JsonResponse();
            BLLLeaveApprovedRecommend objBLLLAR = new BLLLeaveApprovedRecommend();

            try
            {
                response = objBLLLAR.SaveLeaveApprovedRecommend(objLAR);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }


        public object GetLeaveApprovedRecommend(Int32? empID, string userID)
        {
            JsonResponse response = new JsonResponse();
            BLLLeaveApprovedRecommend objBLLLAR = new BLLLeaveApprovedRecommend();

            try
            {
                response = objBLLLAR.GetLeaveApprovedRecommend(empID, userID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);

        }
    }
}