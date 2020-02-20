using HRFA.COMMON;
using HRFA.ATT;
using HRFA.BLL;
using System;

namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for AppraisalHandler
    /// </summary>
    public class AppraisalHandler : BaseHandler
    {
        private readonly BLLAppraisal _bllAppraisal = new BLLAppraisal();

        public object SaveAppraisal(string args, string appID, string modID)
        {
            var response = new JsonResponse();

            try
            {
                ATTAppraisal objAward = (ATTAppraisal)JsonUtility.DeSerialize(args, typeof(ATTAppraisal));
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return JsonUtility.Serialize(response);
        }

        public object SaveAppraisalCategory(string args, string appId, string modId)
        {
            var response = new JsonResponse();

            try
            {
                ATTAppraisalCategory objCategory = (ATTAppraisalCategory)JsonUtility.DeSerialize(args, typeof(ATTAppraisalCategory));
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }

            return JsonUtility.Serialize(response);
        }

        public object GetAppraisalAll() { return new { }; }
        public object GetAppraisalById() { return new { }; }
        public object GetAppraisalCategory() { return new {}; }
        public object GetAppraisalDetails() { return new { }; }
    }
}