using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.ALMS
{
    /// <summary>
    /// Summary description for DeviceRegistrationHandler
    /// </summary>
    public class DeviceRegistrationHandler : BaseHandler
    {
        public object SaveDeviceRegistration(string officeCode)
        {
            JsonResponse response = new JsonResponse();
            //if (token == CurrentToken())
            //{
            BLLDeviceRegistration bllDeviceRegistration = new BLLDeviceRegistration();
            List<ATTDeviceRegistration> lstDeviceRegistration = JsonUtility.DeSerialize(officeCode, typeof(List<ATTDeviceRegistration>)) as List<ATTDeviceRegistration>;
            response = bllDeviceRegistration.SaveDeviceRegistration(lstDeviceRegistration);
            // }
            //else
            //{

            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}


            return JsonUtility.Serialize(response);
        }


        public object GetDeviceRegistration(int? officeCode)
        {
            JsonResponse response = new JsonResponse();
            BLLDeviceRegistration bllDeviceReg = new BLLDeviceRegistration();

            response = bllDeviceReg.GetDeviceRegistration(officeCode);


            return JsonUtility.Serialize(response);


        }

        public object DeleteDeviceRegistration(string del)
        {
            JsonResponse response = new JsonResponse();
            ATTDeviceRegistration deviceRegistration = JsonUtility.DeSerialize(del, typeof(ATTDeviceRegistration)) as ATTDeviceRegistration;

            //if (token == CurrentToken())
            //{
            BLLDeviceRegistration bllDeviceReg = new BLLDeviceRegistration();
            response = bllDeviceReg.DeleteDeviceRegistration(deviceRegistration);
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