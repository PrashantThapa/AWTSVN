using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
using System.Collections.Generic;

namespace IDS.Handlers.CENTRALLOOKUP
{
    /// Summary description for DocumentTypeHandler
    public class DocumentTypeHandler : BaseHandler
    {
        public object SaveDocumentType(string doctype, string token)
        {
            JsonResponse response = new JsonResponse();
            //if (token == CurrentToken())
            //{
                BLLDocumentType bllDocumentType = new BLLDocumentType();
                List<ATTDocumentType> objDocumentType = JsonUtility.DeSerialize(doctype, typeof(List<ATTDocumentType>)) as List<ATTDocumentType>;
                response = bllDocumentType.SaveDocumentType(objDocumentType);
            //}
            //else
            //{

            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}
            return JsonUtility.Serialize(response);
           
        }

        public object DeleteDocumentType(int? doctypeid, string token)
        {
            JsonResponse response = new JsonResponse();

            BLLDocumentType bllDocumentType = new BLLDocumentType();

            //if (token == CurrentToken())
            //{
                response = bllDocumentType.DeleteDocumentType(doctypeid);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);

        }

        public object GetDocumentType(int? doctypeid, string usedfor, string token) // parameter usedfor added by shanjeev  for Employer DocType
        {
            BLLDocumentType bllDocumentType = new BLLDocumentType();
            JsonResponse response = new JsonResponse();
            
            //if (token == CurrentToken())
            //{
                response = bllDocumentType.GetDocumentType(doctypeid, usedfor);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}
            return JsonUtility.Serialize(response);
            
         }

        public object GetDocumentTypes(int? doctypeid, string token)
        {
            BLLDocumentType bllDocumentType = new BLLDocumentType();
            JsonResponse response = new JsonResponse();
            
            //if (token == CurrentToken())
            //{
                response = bllDocumentType.GetDocumentTypes(doctypeid);
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