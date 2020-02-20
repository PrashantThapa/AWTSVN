using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.CENTRALLOOKUP
{

    public class LanguageHandler : BaseHandler
    {
        public object SaveLanguage(string args)
        {
            JsonResponse response = new JsonResponse();
            //if (token == CurrentToken())
            //{
            BLLLanguage bllAddressType = new BLLLanguage();
            List<ATTLanguage> objType = JsonUtility.DeSerialize(args, typeof(List<ATTLanguage>)) as List<ATTLanguage>;
            response = bllAddressType.SaveLanguage(objType);
           


            return JsonUtility.Serialize(response);
		}

		public object DeleteLanguage(int? languageid)
		{
			JsonResponse response = new JsonResponse();

			BLLLanguage bLLLanguage = new BLLLanguage();

			//if (token == CurrentToken())
			//{
			response = bLLLanguage.DeleteLanguage(languageid);
			//}
			//else
			//{
			//    response.Message = "Suspicious Activity !!!";
			//    response.IsSucess = false;
			//    response.IsToken = false;
			//}

			return JsonUtility.Serialize(response);

		}


		public object GetLanguageType(int? langtypeID)
        {
            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
            BLLLanguage bllLanguage = new BLLLanguage();
            response = bllLanguage.GetLanguageType(langtypeID);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);

        }
        public object GetLanguageTypes(int? langtypeID)
        {
            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
            BLLLanguage bllLanguage = new BLLLanguage();
            response = bllLanguage.GetLanguageTypes(langtypeID);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);

        }
      
    }
}