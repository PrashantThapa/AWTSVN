using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLPostWiseLeaveType
    {
        /*
           Auther shanjeev
           Date : 2015.05.30
 
       */
        public string SavePostWiseLeaveType(ATTPostWiseLeaveType objSub)
        {
            // string msg = "";
            string msg = string.Empty;

            try
            {
                DLLPostWiseLeaveType objSubs = new DLLPostWiseLeaveType();
                msg = objSubs.SavePostWiseLeaveType(objSub);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            return msg;


        }
        public JsonResponse GetLeave(string LeaveTypeID)
        {
            JsonResponse response = new JsonResponse();
            DLLPostWiseLeaveType obj = new DLLPostWiseLeaveType();
            try
            {
                response.ResponseData = obj.GetLeave(LeaveTypeID);
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
