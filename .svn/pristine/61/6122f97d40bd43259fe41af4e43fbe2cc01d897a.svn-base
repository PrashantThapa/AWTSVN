using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;

namespace HRFA.BLL
{
    public class BLLEmpConfirmation
    {

        public JsonResponse SaveEmpConfirmation(ATTEmpConfirmation objEmpConfirm)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpConfirmation objDll = new DLLEmpConfirmation();
            try
            {
                response.Message = objDll.SaveEmpConfirmation(objEmpConfirm);
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
