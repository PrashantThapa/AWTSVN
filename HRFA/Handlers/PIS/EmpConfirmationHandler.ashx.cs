using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for EmpConfirmationHandler
    /// </summary>
    public class EmpConfirmationHandler : BaseHandler
    {

        public object SaveEmpConfirmation(string args)
        {
            ATTEmpConfirmation objEmpL = (ATTEmpConfirmation)JsonUtility.DeSerialize(args, typeof(ATTEmpConfirmation));
            JsonResponse response = new JsonResponse();
            BLLEmpConfirmation objBLLEmpConf = new BLLEmpConfirmation();

            try
            {
                response = objBLLEmpConf.SaveEmpConfirmation(objEmpL);
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