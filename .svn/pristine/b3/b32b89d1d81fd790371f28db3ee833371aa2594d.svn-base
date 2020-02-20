using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLQualification
    {
        public JsonResponse GetQualification(int? qualID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTQualification> lst = new List<ATTQualification>();
            DLLQualification dllQualification = new DLLQualification();
            try
            {
                lst = dllQualification.GetQualification(qualID);

                response.ResponseData = lst;
                response.Message = "Success";
                response.IsSucess = true;
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
