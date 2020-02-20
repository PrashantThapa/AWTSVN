using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for EmpLeaveApplicationHandler
    /// </summary>
    public class EmpLeaveApplicationHandler : BaseHandler
    {
        public object SaveEmpLeaveApplication(string args)
        {
            ATTEmpLeaveApplication objEmpL = (ATTEmpLeaveApplication)JsonUtility.DeSerialize(args, typeof(ATTEmpLeaveApplication));
            JsonResponse response = new JsonResponse();
            BLLEmpLeaveApplication objBLLEmp = new BLLEmpLeaveApplication();

            try
            {
                response = objBLLEmp.SaveEmpLeaveApplication(objEmpL);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetLeaveTypePostWise(int? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpLeaveApplication objBLLEmp = new BLLEmpLeaveApplication();

            try
            {
                response = objBLLEmp.GetLeaveTypePostWise(empID);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object SavePortalEmpLeaveApplication(string args)
        {
            ATTEmpLeaveApplication objEmpL = (ATTEmpLeaveApplication)JsonUtility.DeSerialize(args, typeof(ATTEmpLeaveApplication));
            JsonResponse response = new JsonResponse();
            BLLEmpLeaveApplication objBLLEmp = new BLLEmpLeaveApplication();

            try
            {
                response = objBLLEmp.SavePortalEmpLeaveApplication(objEmpL);
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetPortalLeaveTypePostWise(int? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpLeaveApplication objBLLEmp = new BLLEmpLeaveApplication();

            try
            {
                response = objBLLEmp.GetPortalLeaveTypePostWise(empID);
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