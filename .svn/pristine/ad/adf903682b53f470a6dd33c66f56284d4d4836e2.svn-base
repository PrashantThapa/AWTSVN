using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.CENTRALLOOKUP
{

    public class MaritalStatusHandler : BaseHandler
    {

        public object GetMaritalStatus(int? MarStatID)
        {
            BLLMaritalStatus bllMaritalStatus = new BLLMaritalStatus();
            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
            response = bllMaritalStatus.GetMaritalStatus(MarStatID);
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