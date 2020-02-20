using System;
using System.Web;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace IDS.Handlers.COMMON
{
    /*
     Auther shanjeev
     Date : 2015.05.29
 
  */
    public class SubmissionHandler : BaseHandler
    {


        public object SaveSubmission(string args)
        {
            ATTSubmission objSub = (ATTSubmission)JsonUtility.DeSerialize(args, typeof(ATTSubmission));


            BLLSubmission objBLLSubs = new BLLSubmission();
            Int64? msg = objBLLSubs.SaveSubmission(objSub);

            //string msg = "";

            JsonResponse response = new JsonResponse();

            try
            {
                //HttpContext.Current.Session["SubmissionNo"] = msg.ToString();
                response.Message = string.Format("Submission number saved! Please Note the submission number! <BR> Your Submission number ", msg.ToString()); 
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }

            return JsonUtility.Serialize(response);

        }


        public object SaveSubmissionWithCaptcha(string args, string captcha)
        {
            ATTSubmission objSub = (ATTSubmission)JsonUtility.DeSerialize(args, typeof(ATTSubmission));

            JsonResponse response = new JsonResponse();

            if (HttpContext.Current.Session["captcha"].ToString() != captcha)
            {
                response.IsSucess = false;
                response.Message = "Invalid Captcha";
            }
            else
            {
                BLLSubmission objBLLSubs = new BLLSubmission();
                Int64? msg = objBLLSubs.SaveSubmission(objSub);

                try
                {
                    //HttpContext.Current.Session["SubmissionNo"] = msg.ToString();
                    response.Message = msg.ToString();
                    response.IsSucess = true;
                }
                catch (Exception ex)
                {
                    response.IsSucess = false;
                    response.Message = ex.Message;
                }
            }

            return JsonUtility.Serialize(response);

        }


   /*
     Auther shanjeev sah
     Date : 2014.07.24
 
  */

        public object LogInWithSubmissionNo(string userId, string password, Int64? submissionNo) //, string token
        {
            JsonResponse response = new JsonResponse();
            BLLSubmission objBLLSubmission = new BLLSubmission();

            if (userId != "" || userId != null)
            {
                response = objBLLSubmission.GetLogInBySubmissionNo(userId, password, submissionNo);
            }
            else
            {
                response.Message = "Suspicious Activity !!!";
                response.IsSucess = false;
                response.IsToken = false;
            }

            return JsonUtility.Serialize(response);

        }
        
    }
}
