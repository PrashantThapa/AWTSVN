using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLLeaveCancellation
    {
        public JsonResponse GetLeaveCancellation(int? empID)
        {
            JsonResponse response = new JsonResponse();
            DLLLeaveCancellation objDll = new DLLLeaveCancellation();
            try
            {
                response.ResponseData = objDll.GetLeaveCancellation(empID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }


        //public JsonResponse EditLeaveCancellation(int? empID)
        //{
        //    JsonResponse response = new JsonResponse();
        //    DLLLeaveCancellation objDll = new DLLLeaveCancellation();
        //    try
        //    {
        //        response.ResponseData = objDll.EditLeaveCancellation(empID);
        //        response.IsSucess = true;
        //    }
        //    catch (Exception ex)
        //    {
        //        response.IsSucess = false;
        //        response.Message = ex.Message;
        //    }
        //    return response;
        //}
        public JsonResponse SaveLeaveCancellation(ATTLeaveCancellation objEmpLeaveApp, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            DLLLeaveCancellation objDll = new DLLLeaveCancellation();
            try
            {
                response.Message = objDll.SaveLeaveCancellation(objEmpLeaveApp, appID, modID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public JsonResponse GetLeaveCancelBySubNo(Int64? SubNo)
        {
            JsonResponse response = new JsonResponse();
            DLLLeaveCancellation objDll = new DLLLeaveCancellation();
            try
            {
                response.ResponseData = objDll.GetLeaveCancelBySubNo(SubNo);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetPortalLeaveCancellation(int? empID)
        {
            JsonResponse response = new JsonResponse();
            DLLLeaveCancellation objDll = new DLLLeaveCancellation();
            try
            {
                response.ResponseData = objDll.GetPortalLeaveCancellation(empID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse SavePortalLeaveCancellation(ATTLeaveCancellation objEmpLeaveApp, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            DLLLeaveCancellation objDll = new DLLLeaveCancellation();
            try
            {
                response.Message = objDll.SavePortalLeaveCancellation(objEmpLeaveApp, appID, modID);
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
