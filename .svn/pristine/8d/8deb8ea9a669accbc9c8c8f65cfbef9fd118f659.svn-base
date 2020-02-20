using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEmpLeaveApplication
    {
        public JsonResponse SaveEmpLeaveApplication(ATTEmpLeaveApplication objEmpLeaveApp)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpLeaveApplication objDll = new DLLEmpLeaveApplication();
            try
            {
                response.Message = objDll.SaveEmpLeaveApplication(objEmpLeaveApp);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetLeaveTypePostWise(int? empID)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpLeaveApplication objDll = new DLLEmpLeaveApplication();
            try
            {
                response.ResponseData = objDll.GetLeaveTypePostWise(empID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse SavePortalEmpLeaveApplication(ATTEmpLeaveApplication objEmpLeaveApp)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpLeaveApplication objDll = new DLLEmpLeaveApplication();
            try
            {
                response.Message = objDll.SavePortalEmpLeaveApplication(objEmpLeaveApp);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetPortalLeaveTypePostWise(int? empID)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpLeaveApplication objDll = new DLLEmpLeaveApplication();
            try
            {
                response.ResponseData = objDll.GetPortalLeaveTypePostWise(empID);
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
