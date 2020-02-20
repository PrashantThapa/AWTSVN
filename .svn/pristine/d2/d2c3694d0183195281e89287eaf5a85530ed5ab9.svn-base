using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLDeputation
    {
       public string SaveDeputation(ATTDeputation objAttDeputation, string appID, string modID)
        {
            try
            {
                DLLDeputation objDllDeputation = new DLLDeputation();
                return objDllDeputation.SaveDeputation(objAttDeputation, appID, modID);
            }
            catch (Exception ex)
            {
                throw (ex);

            }
        }

       public JsonResponse GetDeputationByID(int? empID)
       {
           JsonResponse response = new JsonResponse();
           DLLDeputation objDll = new DLLDeputation();
           try
           {
               response.ResponseData = objDll.GetDeputationByID(empID);
               response.IsSucess = true;
           }
           catch (Exception ex)
           {
               response.IsSucess = false;
               response.Message = ex.Message;
           }
           return response;
       }


       public List<ATTDeputation> GetDeputationBySubNo(Int64? SubmissionNo)
       {
           try
           {
               DLLDeputation obj = new DLLDeputation();
               return obj.GetDeputationBySubNo(SubmissionNo);
           }
           catch (Exception ex)
           {
               throw (ex);
           }
       }

    }
}
