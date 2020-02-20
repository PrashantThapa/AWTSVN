using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEmployeeDevice
    {
        public JsonResponse SaveEmpDevice(ATTEmployeeDevice objEmpDevice)
        {
            JsonResponse response = new JsonResponse();
            DLLEmployeeDevice objDll = new DLLEmployeeDevice();
            try
            {
                response.Message = objDll.SaveEmpDevice(objEmpDevice);
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
