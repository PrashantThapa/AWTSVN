using HRFA.COMMON;
using HRFA.BLL;

namespace HRFA.Handlers.CENTRALLOOKUP
{

    public class ReligionHandler : BaseHandler
    {

        public object GetReligionType(int? reltypeID)
        {
            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
            BLLReligionType bllReligionType = new BLLReligionType();
            response = bllReligionType.GetReligionType(reltypeID);
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