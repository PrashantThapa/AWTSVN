using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace SOSYS.Handlers.CENTRALLOOKUP
{
    public class ServiceTypeHandler : BaseHandler
    {
        public object SaveServiceType(string SerType, string token)
        {
            JsonResponse response = new JsonResponse();
            if (token == CurrentToken())
            {
                BLLServiceType bllServiceType = new BLLServiceType();
                List<ATTServiceType> objServiceType = JsonUtility.DeSerialize(SerType, typeof(List<ATTServiceType>)) as List<ATTServiceType>;
                response = bllServiceType.SaveServiceType(objServiceType);
            }
            else
            {

                response.Message = "Suspicious Activity !!!";
                response.IsSucess = false;
                response.IsToken = false;
            }
            return JsonUtility.Serialize(response);

        }

        public object DeleteServiceType(int? sertypeid, string token)
        {
            JsonResponse response = new JsonResponse();

            if (token == CurrentToken())
            {
                BLLServiceType bllServiceType = new BLLServiceType();
                response = bllServiceType.DeleteServiceType(sertypeid);
            }
            else
            {
                response.Message = "Suspicious Activity !!!";
                response.IsSucess = false;
                response.IsToken = false;
            }

            return JsonUtility.Serialize(response);

        }

        public object GetServiceType(int? sertypeid, string token)
        {
            JsonResponse response = new JsonResponse();
            BLLServiceType bllServiceType = new BLLServiceType();
            response = bllServiceType.GetServiceType(sertypeid);
            //if (token == CurrentToken())
            //{
            //    response = BLLServiceType.GetServiceType(sertypeid);
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