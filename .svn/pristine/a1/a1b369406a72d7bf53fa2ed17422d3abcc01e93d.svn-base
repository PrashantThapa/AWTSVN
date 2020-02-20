using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLDeptWiseShift
    {
        public JsonResponse SaveDeptWiseShiftType(ATTDeptWiseShift DeptObj)
        {
            JsonResponse response = new JsonResponse();
            DLLDeptWiseShift objDll = new DLLDeptWiseShift();
            try
            {
                response.Message = objDll.SaveDeptWiseShiftType(DeptObj);
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
