using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;
using System.Collections.Generic;

namespace HRFA.BLL
{
    public class BLLVerificationModule
    {

        //NB: selection of verification module while clicking submit button
        public JsonResponse SaveSelectionofVerificationModule(List<ATTVerificationModule> lstVM)
        {
            JsonResponse response = new JsonResponse();
            DLLVerificationModule obj = new DLLVerificationModule();

            try
            {
                response.Message = obj.SaveSelectionofVerificationModule(lstVM);
                response.IsSucess = true;

            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        //NB: Getting Transaction while clicking row of Modules-------------------------------------------------------------------------------------------
     
    }
}
