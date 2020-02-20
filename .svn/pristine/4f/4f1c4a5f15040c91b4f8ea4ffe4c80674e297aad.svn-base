using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace IDS.Handlers.CENTRALLOOKUP
{
   
    public class VDCHandler : BaseHandler
    {

        public object GetVDC(int? DistrictCD, int? VdcCD)
        {
            BLLVDC obj = new BLLVDC();
            List<ATTDistrictVDC> lstVDC = obj.GetVDC(DistrictCD, VdcCD);

            JsonResponse response = new JsonResponse
            {
                ResponseData = lstVDC
            };

            response.ResponseData = lstVDC;
            try
            {
                response.Message = "Success";
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }

            return JsonUtility.Serialize(response);

        }


	}
}