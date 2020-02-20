using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLAppraisal
    {
        public readonly DllAppraisal _dllAppraisal = new DllAppraisal();

        public JsonResponse SaveAppraisal(ATTAppraisal objAppraisal, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = _dllAppraisal.SaveAppraisal(objAppraisal, appID, modID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse SaveAppraisalCategory(ATTAppraisalCategory objAppraisalCategory, string appId, string modId)
        {
            var response = new JsonResponse();
            try
            {
                response.Message = _dllAppraisal.SaveAppraisalCategory(objAppraisalCategory, appId, modId);
                response.IsSucess = true;
            }
            catch(Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
