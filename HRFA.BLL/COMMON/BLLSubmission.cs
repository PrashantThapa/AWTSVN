using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
   public class BLLSubmission
    {
        /*
           Auther shanjeev
           Date : 2015.05.30
 
       */
       public Int64? SaveSubmission(ATTSubmission objSub)
        {
           // string msg = "";
            Int64? subno = null;

            try
            {
                DLLSubmission objSubs = new DLLSubmission();
                subno = objSubs.SaveSubmission(objSub);
            }
            catch (Exception ex)
            {
                throw (ex);
            }

            return subno;

            
        }

       public JsonResponse CheckSubNoExists(Int64? subno)
       {
           JsonResponse response = new JsonResponse();
           string msg = "";

           try
           {
               ATTSubmission obj = new ATTSubmission();
               DLLSubmission objsub = new DLLSubmission();
               msg = objsub.CheckSubNoExists(subno);
               response.Message = "";
               response.IsSucess = true;
               response.ResponseData = msg;
           }
           catch (Exception ex)
           {
               response.Message = ex.Message;
               response.IsSucess = false;
           }
           return response;
 
       }

       public JsonResponse GetLogInBySubmissionNo(string userid,string password,Int64? subNo)
       {
           JsonResponse response = new JsonResponse();
           string msg = "";

           try
           {
               ATTSubmission obj = new ATTSubmission();
               DLLSubmission objSubmission = new DLLSubmission();
               msg = objSubmission.GetLogInBySubmissionNo(userid, password, subNo);
               response.Message = "";
               response.IsSucess = true;
               response.ResponseData = msg;

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
