using System;
using System.Collections.Generic;
using System.Text;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLLanguage
    {
        public JsonResponse SaveLanguage(List<ATTLanguage> lstType)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                response.Message = Validate(lstType);
                if (response.Message == "")
                {
                    DLLLanguage dllAddressType = new DLLLanguage();
                    response.Message = dllAddressType.SaveAddressType(lstType);
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
	
		public JsonResponse DeleteLanguage(int? languageid)
		{
			JsonResponse response = new JsonResponse();

			try
			{
					DLLLanguage dLLLanguage = new DLLLanguage();
					response.Message = dLLLanguage.DeleteLanguage(languageid);
					response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}
			return response;
		}

		
		public string Validate(List<ATTLanguage> lstAddType)
        {
            StringBuilder errMsg = new StringBuilder();

            foreach (ATTLanguage obj in lstAddType)
            {

                if (Validator.IsBlank(obj.LanguageName))
                {
                    errMsg.Append("Please Enter Language Name !!!");
                    errMsg.AppendLine();
                }

                if (Validator.IsBlank(obj.LanguageNameEng))
                {
                    errMsg.Append("Please Enter Language Name English !!!");
                    errMsg.AppendLine();
                }
            }


            return errMsg.ToString();
        }
        public JsonResponse GetLanguageType(int? langtypeID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTLanguage> lst = new List<ATTLanguage>();
            DLLLanguage dllLanguage = new DLLLanguage();
            try
            {
                lst = dllLanguage.GetLanguageType(langtypeID);

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
        public JsonResponse GetLanguageTypes(int? langtypeID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTLanguage> lst = new List<ATTLanguage>();
            DLLLanguage dllLanguage = new DLLLanguage();
            try
            {
                lst = dllLanguage.GetLanguageTypes(langtypeID);

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
