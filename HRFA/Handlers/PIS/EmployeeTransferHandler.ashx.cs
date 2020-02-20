using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{
    /// <summary>
    /// Summary description for EmployeeTransferHandler
    /// </summary>
    public class EmployeeTransferHandler : BaseHandler
    {

        public object SaveEmployeeTransfer(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();


            ATTEmployeeTransfer objAppointment = JsonUtility.DeSerialize(args, typeof(ATTEmployeeTransfer)) as ATTEmployeeTransfer;
            BLLEmployeeTransfer bllAppointment = new BLLEmployeeTransfer();
            response = bllAppointment.SaveEmployeeTransfer(objAppointment, appID, modID);

            return JsonUtility.Serialize(response);

        }
        public object GetTransferBySubNo(Int64? SubNo)
        {
            JsonResponse response = new JsonResponse(); 
            BLLEmployeeTransfer objBLLPromotion = new BLLEmployeeTransfer();
            try
            {
                response = objBLLPromotion.GetTransferBySubNo(SubNo);
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