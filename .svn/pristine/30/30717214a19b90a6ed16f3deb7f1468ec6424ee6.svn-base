using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLCountry
    {
        public JsonResponse GetCountry(int? CountryID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTCountry> lst = new List<ATTCountry>();
            DLLCountry dllCountry = new DLLCountry();
            try
            {

                lst = dllCountry.GetCountry(CountryID);

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
