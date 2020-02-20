using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLFiscalYear
    {
        public JsonResponse GetFiscalYear(int? fiscalYearID)
        {
            JsonResponse response = new JsonResponse();
            List<ATTFiscalYear> lstFiscalYear = new List<ATTFiscalYear>();
            try
            {
                DLLFiscalYear dllFiscalYear = new DLLFiscalYear();
                lstFiscalYear = dllFiscalYear.GetFiscalYear(fiscalYearID);
                response.ResponseData = lstFiscalYear;
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
