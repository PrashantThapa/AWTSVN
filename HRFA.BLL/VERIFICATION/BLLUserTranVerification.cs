using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

using System;

namespace HRFA.BLL
{
    public class BLLUserTranVerification
    {
        public JsonResponse SaveUserTranVerification(ATTUserTranVerification objUTV)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                DLLUserTranVerification dllUTV = new DLLUserTranVerification();

                response.Message = dllUTV.SaveUserTranVerification(objUTV);
                response.IsSucess = true;
            }
            catch (OracleException ex)
            {
                if (ex.Message.Contains("ORA-00001: unique constraint (CTB_EMP_GRADE_HISTORY_PK) violated"))
                {
                    response.Message = "Provided data is already present. Please cancel the transaction";
                }
                else
                    response.Message = ex.Message;
                response.IsSucess = false;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;
        }

        public JsonResponse GetRejectedList()
        {
            JsonResponse response = new JsonResponse();
            DLLUserTranVerification dllUTV = new DLLUserTranVerification();
            try
            {
                response.ResponseData = dllUTV.GetRejectedList();
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return response;
        }
    }
}
