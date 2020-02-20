using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for EmployeeRawanaHandler
    /// </summary>
    public class EmployeeRawanaHandler : BaseHandler
    {

        public object SaveEmployeeRawana(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();


            ATTEmployeeRawana objRawana = JsonUtility.DeSerialize(args, typeof(ATTEmployeeRawana)) as ATTEmployeeRawana;
            BLLEmployeeRawana bllRawana = new BLLEmployeeRawana();
            response = bllRawana.SaveEmployeeRawana(objRawana, appID, modID);

            return JsonUtility.Serialize(response);

        }
        public object GetRawanaBySubNo(Int64? SubNo)
        {
            JsonResponse response = new JsonResponse();
            BLLEmployeeRawana objBLLRawana = new BLLEmployeeRawana();

            try
            {
                response = objBLLRawana.GetRawanaBySubNo(SubNo);
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