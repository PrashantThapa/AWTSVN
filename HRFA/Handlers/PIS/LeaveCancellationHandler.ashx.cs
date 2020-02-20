using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for LeaveCancellationHandler
    /// </summary>
    public class LeaveCancellationHandler : BaseHandler
    {
        
        public object GetLeaveCancellation(int? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLLeaveCancellation objBLLEmp = new BLLLeaveCancellation();

            try
            {
                response = objBLLEmp.GetLeaveCancellation(empID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }
        public object GetLeaveCancelBySubNo(Int64? SubNo)
        {
            JsonResponse response = new JsonResponse();
            BLLLeaveCancellation objBLLPromotion = new BLLLeaveCancellation();
            try
            {
                response = objBLLPromotion.GetLeaveCancelBySubNo(SubNo);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }
        //public object EditLeaveCancellation(int? empID)
        //{
        //    JsonResponse response = new JsonResponse();
        //    BLLLeaveCancellation objBLLEmp = new BLLLeaveCancellation();

        //    try
        //    {
        //        response = objBLLEmp.EditLeaveCancellation(empID);
        //    }
        //    catch (Exception ex)
        //    {
        //        response.IsSucess = false;
        //        response.Message = ex.Message;
        //    }
        //    return JsonUtility.Serialize(response);
        //}

        public object SaveLeaveCancellation(string args, string appID, string modID)
        {
            ATTLeaveCancellation objEmpL = (ATTLeaveCancellation)JsonUtility.DeSerialize(args, typeof(ATTLeaveCancellation));
            JsonResponse response = new JsonResponse();
            BLLLeaveCancellation objBLLEmp = new BLLLeaveCancellation();

            try
            {
                response = objBLLEmp.SaveLeaveCancellation(objEmpL, appID, modID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetPortalLeaveCancellation(int? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLLeaveCancellation objBLLEmp = new BLLLeaveCancellation();

            try
            {
                response = objBLLEmp.GetPortalLeaveCancellation(empID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object SavePortalLeaveCancellation(string args, string appID, string modID)
        {
            ATTLeaveCancellation objEmpL = (ATTLeaveCancellation)JsonUtility.DeSerialize(args, typeof(ATTLeaveCancellation));
            JsonResponse response = new JsonResponse();
            BLLLeaveCancellation objBLLEmp = new BLLLeaveCancellation();

            try
            {
                response = objBLLEmp.SavePortalLeaveCancellation(objEmpL, appID, modID);
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