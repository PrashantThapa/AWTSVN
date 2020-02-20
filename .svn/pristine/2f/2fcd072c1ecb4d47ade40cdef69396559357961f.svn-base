using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for EmployeeDeviceHandler
    /// </summary>
    public class EmployeeDeviceHandler : BaseHandler
    {

        public object SaveEmpDevice(string args)
        {
            ATTEmployeeDevice objEmpL = (ATTEmployeeDevice)JsonUtility.DeSerialize(args, typeof(ATTEmployeeDevice));
            JsonResponse response = new JsonResponse();
            BLLEmployeeDevice objBLLEmp = new BLLEmployeeDevice();

            try
            {
                response = objBLLEmp.SaveEmpDevice(objEmpL);
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