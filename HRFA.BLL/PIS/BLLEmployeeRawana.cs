using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEmployeeRawana
    {

        public JsonResponse SaveEmployeeRawana(ATTEmployeeRawana objEmployeeRawana, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLEmployeeRawana dllRawana = new DLLEmployeeRawana();
                    response.Message = dllRawana.SaveEmployeeRawana(objEmployeeRawana, appID, modID);
                    response.IsSucess = true;

                }

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }


            return response;

        }
        public JsonResponse GetRawanaBySubNo(Int64? SubNo)
        {
            JsonResponse response = new JsonResponse();
            DLLEmployeeRawana objDll = new DLLEmployeeRawana();
            try
            {
                response.ResponseData = objDll.GetRawanaBySubNo(SubNo);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
    }
}
