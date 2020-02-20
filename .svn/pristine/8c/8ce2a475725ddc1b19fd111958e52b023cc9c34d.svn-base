using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for DeputationHandler
    /// </summary>
    public class DeputationHandler : BaseHandler
    {
        public object SaveDeputation(string args, string appID, string modID)
        {

           BLLDeputation objBllDeputation = new BLLDeputation();
           ATTDeputation objeAttDeputation = (ATTDeputation)JsonUtility.DeSerialize(args, typeof(ATTDeputation));
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = objBllDeputation.SaveDeputation(objeAttDeputation, appID, modID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetDeputationByID(int? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLDeputation objBLLDeputation = new BLLDeputation();
            try
            {
                response = objBLLDeputation.GetDeputationByID(empID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetDeputationBySubNo(Int64? SubmissionNo)
        {
            BLLDeputation obj = new BLLDeputation();

            List<ATTDeputation> lst = new List<ATTDeputation>();

            JsonResponse response = new JsonResponse();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetDeputationBySubNo(SubmissionNo);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;              
            }
            return JsonUtility.Serialize(response);       
 
        }

    }
}