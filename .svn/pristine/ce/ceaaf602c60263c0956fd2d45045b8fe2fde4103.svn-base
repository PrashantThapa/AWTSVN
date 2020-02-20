using System;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for LevelHandler
    /// </summary>
    public class LevelHandler : BaseHandler
    {
        public object GetLevel(int? levelID)
        {
            JsonResponse response = new JsonResponse();
            BLLLevel objBLLevel = new BLLLevel();
            try
            {
                response = objBLLevel.GetLevel(levelID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }
    }
}
