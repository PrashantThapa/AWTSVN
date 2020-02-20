using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
using System;

namespace HRFA.Handlers.WFMS
{
    /// <summary>
    /// Summary description for DeptWiseShiftHandler
    /// </summary>
    public class DeptWiseShiftHandler : BaseHandler
    {

        public object SaveDeptWiseShiftType(string args)
        {
            ATTDeptWiseShift objDeptWiseShift = (ATTDeptWiseShift)JsonUtility.DeSerialize(args, typeof(ATTDeptWiseShift));
            JsonResponse response = new JsonResponse();
            BLLDeptWiseShift objBLLDeptWiseShift = new BLLDeptWiseShift();

            try
            {
                response = objBLLDeptWiseShift.SaveDeptWiseShiftType(objDeptWiseShift);
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