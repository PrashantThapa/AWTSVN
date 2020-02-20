using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
using System.Collections.Generic;

namespace IDS.Handlers.CENTRALLOOKUP
{
    /// Summary description for RelationTypeHandler
    public class RelationTypeHandler : BaseHandler
    {

        public object SaveRelationType(string args, string token)
        {

            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
                BLLRelationType bllRelationType = new BLLRelationType();
                List<ATTRelationType> objRelType = JsonUtility.DeSerialize(args, typeof(List<ATTRelationType>)) as List<ATTRelationType>;
                response = bllRelationType.SaveRelationType(objRelType);
            //}
            //else
            //{

            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);

        }

        public object GetRelationType(int? relType, string token)
        {
            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
                BLLRelationType bllRelationType = new BLLRelationType();
                response = bllRelationType.GetRelationType(relType);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);

        }

        public object DeleteRelationType(int? relType, string token)
        {

            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
                BLLRelationType bllRelationType = new BLLRelationType();
                response = bllRelationType.DeleteRelationType(relType);
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