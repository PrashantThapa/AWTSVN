using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEmployee
    {
        public JsonResponse SaveEmployee(ATTPISEmployee objEmployee, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            
            try
            {
                if (response.Message == "")
                {

                    DLLEmployee dllEmployee = new DLLEmployee();
                    response.Message = dllEmployee.SaveEmployee(objEmployee,appID,modID);
                    response.IsSucess = true;

                }

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;

        }

        public JsonResponse CheckUniqueSymbolNo(string SymbolNo)
        {
            JsonResponse response = new JsonResponse();
            DLLEmployee objdllemployee = new DLLEmployee();
            try
            {
                response.ResponseData = objdllemployee.CheckUniqueSymbolNo(SymbolNo);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetEmployee(Int64? submissionNo, string filePath)
        {
            JsonResponse response = new JsonResponse();
            DLLEmployee objdllemployee = new DLLEmployee();
            try
            {
                response.ResponseData = objdllemployee.GetDirtyEmployee(submissionNo, filePath);
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
