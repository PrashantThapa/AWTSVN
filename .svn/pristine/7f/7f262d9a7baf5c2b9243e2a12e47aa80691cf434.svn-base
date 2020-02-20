using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{


    public class PromotionHandler : BaseHandler
    {

        public object GetOfficeEmpPost(int? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLPromotion objBLLPromotion = new BLLPromotion();
            try
            {
                response = objBLLPromotion.GetOfficeEmpPost(empID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object SavePromotion(string args,string appID,string modID)
        {
            JsonResponse response = new JsonResponse();


            ATTPromotion objPromotion = JsonUtility.DeSerialize(args, typeof(ATTPromotion)) as ATTPromotion;
            BLLPromotion bllPromotion = new BLLPromotion();
            response = bllPromotion.SavePromotion(objPromotion,appID,modID);

            return JsonUtility.Serialize(response);

        }

        public object GetPromotion(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLPromotion objBLLPromotion = new BLLPromotion();
            try
            {
                response = objBLLPromotion.GetPromotion(submissionNo);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

       public object GetPromotionType(int? PromoTypeID)
        {
            JsonResponse response = new JsonResponse();
            BLLPromotion objBLLPromotion = new BLLPromotion();
            try
            {
                response = objBLLPromotion.GetPromotionType(PromoTypeID);
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