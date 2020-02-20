using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
using System;

namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for PostWiseLeaveTypeHandler
    /// </summary>
    public class PostWiseLeaveTypeHandler : BaseHandler
    {

        public object SavePostWiseLeaveType(string args)
        {
            ATTPostWiseLeaveType objSub = (ATTPostWiseLeaveType)JsonUtility.DeSerialize(args, typeof(ATTPostWiseLeaveType));


            BLLPostWiseLeaveType objBLLSubs = new BLLPostWiseLeaveType();
            string msg = objBLLSubs.SavePostWiseLeaveType(objSub);

            //string msg = "";

            JsonResponse response = new JsonResponse();

            try
            {
                //HttpContext.Current.Session["SubmissionNo"] = msg.ToString();
                response.Message = msg.ToString();
                response.IsSucess = true;
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