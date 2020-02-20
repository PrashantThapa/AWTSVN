
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.CENTRALLOOKUP
{

    public class CountryHandler : BaseHandler
    {

        public object GetCountry(int? CountryID)
        {
            JsonResponse response = new JsonResponse();
            
            //if (token == CurrentToken())
            //{
            BLLCountry bllCountry = new BLLCountry();
            response = bllCountry.GetCountry(CountryID);
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