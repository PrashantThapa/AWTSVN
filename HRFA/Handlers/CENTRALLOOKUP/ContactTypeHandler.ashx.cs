using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace IDS.Handlers.CENTRALLOOKUP
{
    /// Summary description for ContactTypeHandler
    public class ContactTypeHandler : BaseHandler
    {

        public object SaveContactType(string contype, string token)
        {
            JsonResponse response = new JsonResponse();
            //if (token == CurrentToken())
            //{
                BLLContactType bllContactType = new BLLContactType();
                List<ATTContactType> objContactType = JsonUtility.DeSerialize(contype, typeof(List<ATTContactType>)) as List<ATTContactType>;
                response = bllContactType.SaveContactType(objContactType);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}
            
            return JsonUtility.Serialize(response);
           
        }

        public object GetContactType(int? contacttypeid, string token)
        {
            JsonResponse response = new JsonResponse();
            BLLContactType bllContactType = new BLLContactType();

            //if (token == CurrentToken())
            //{
                response = bllContactType.GetContactType(contacttypeid);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);

        }

        public object DeleteContactType(int? contacttypeid, string token)
        {
            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
                BLLContactType bllContactType = new BLLContactType();
                response = bllContactType.DeleteContactType(contacttypeid);
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