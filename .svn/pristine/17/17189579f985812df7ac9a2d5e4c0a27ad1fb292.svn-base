using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLMarkingType
    {
        public JsonResponse SaveMarkingType(List<ATTMarkingType> lstMarkType)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = Validate(lstMarkType);
                if (response.Message == "")
                {
                    DLLMarkingType dllMarkingType = new DLLMarkingType();
                    response.Message = dllMarkingType.SaveMarkingType(lstMarkType);
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


        public JsonResponse DeleteMarkingType(int? markingtypeid)
        {
            JsonResponse response = new JsonResponse();
            try
            {
                DLLMarkingType dllMarkingType = new DLLMarkingType();
                response.Message = dllMarkingType.DeleteMarkingType(markingtypeid);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public JsonResponse GetMarkingType(int? markingtypeid)
        {
            JsonResponse response = new JsonResponse();
            List<ATTMarkingType> lst = new List<ATTMarkingType>();
            try
            {
                DLLMarkingType dllMarkingType = new DLLMarkingType();
                lst = dllMarkingType.GetMarkingType(markingtypeid);
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

        public string Validate(List<ATTMarkingType> lstMarkType)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTMarkingType obj in lstMarkType)
            {

                if (Validator.IsBlank(obj.MarkingName))
                {
                    errMsg.Append("Please Enter Marking Type Name Nepali !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.MarkingNameEnglish))
                {
                    errMsg.Append("Please Enter Marking Type Name English !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.FromDate))
                {
                    errMsg.Append("Please Enter From Date !!!");
                    errMsg.AppendLine();
                }
            }


            return errMsg.ToString();
        }
    }
}
