using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for ResignationHandler
    /// </summary>
    public class ResignationHandler : BaseHandler
    {
        public object SaveResignation(string args, string appID, string modID)
        {
            
            BLLResignation objResignationBll = new BLLResignation();
            ATTResignation objResignationAtt = (ATTResignation)JsonUtility.DeSerialize(args, typeof(ATTResignation));
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = objResignationBll.SaveResignation(objResignationAtt, appID, modID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetResignationBySubNo(Int64? SubmissionNo)
        {
            BLLResignation obj = new BLLResignation();

            List<ATTResignation> lst = new List<ATTResignation>();

            JsonResponse response = new JsonResponse();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetResignationBySubNo(SubmissionNo);
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