using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.CENTRALLOOKUP
{
    /// <summary>
    /// Summary description for QualificationHandler
    /// </summary>
    public class QualificationHandler : BaseHandler
    {

        public object GetQualification(int? qualID)
        {
            JsonResponse response = new JsonResponse();

            //if (token == CurrentToken())
            //{
            BLLQualification bllQualification = new BLLQualification();
            response = bllQualification.GetQualification(qualID);
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