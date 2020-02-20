using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEmployeeTransfer
    {
        public JsonResponse SaveEmployeeTransfer(ATTEmployeeTransfer objEmployeeTransfer, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLEmployeeTransfer dllAppointment = new DLLEmployeeTransfer();
                    response.Message = dllAppointment.SaveEmployeeTransfer(objEmployeeTransfer, appID, modID);
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
        public JsonResponse GetTransferBySubNo(Int64? SubNo)
        {
            JsonResponse response = new JsonResponse();
            DLLEmployeeTransfer objDll = new DLLEmployeeTransfer();
            try
            {
                response.ResponseData = objDll.GetTransferBySubNo(SubNo);
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
