using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;

namespace HRFA.BLL
{
    public class BLLOTSetting
    {
        public JsonResponse GetOTSetting()
        {
            JsonResponse response = new JsonResponse();
            List<ATTOvertimeSetup> lst = new List<ATTOvertimeSetup>();
            try
            {
                DLLOTSetting dllAddressType = new DLLOTSetting();
                lst = dllAddressType.GetOTSetting();
                response.ResponseData = lst;
                response.Message = "Success";
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }

            return response;
        }
    }
}
