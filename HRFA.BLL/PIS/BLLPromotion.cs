using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLPromotion
    {
        public JsonResponse GetOfficeEmpPost(int? empID)
        {
            JsonResponse response = new JsonResponse();
            DLLPromotion objDll = new DLLPromotion();
            try
            {
                response.ResponseData = objDll.GetOfficeEmpPost(empID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse SavePromotion(ATTPromotion objPromotion,string appID,string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLPromotion dllPromotion = new DLLPromotion();
                    response.Message = dllPromotion.SavePromotion(objPromotion,appID,modID);
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


        public JsonResponse GetPromotion(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            DLLPromotion objDll = new DLLPromotion();
            try
            {
                response.ResponseData = objDll.GetPromotion(submissionNo);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetPromotionType(int? promoTypeID)
        {
            JsonResponse response = new JsonResponse();
            DLLPromotion objDll = new DLLPromotion();
            try
            {
                response.ResponseData = objDll.GetPromotionType(promoTypeID);
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
