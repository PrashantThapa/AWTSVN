
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.CENTRALLOOKUP
{
    /// <summary>
    /// Summary description for FiscalYearHandler
    /// </summary>
    public class FiscalYearHandler : BaseHandler
    {

        public object GetFiscalYear(int? fiscalYearID)
        {
            BLLFiscalYear bllFiscalYear = new BLLFiscalYear();
            JsonResponse response = new JsonResponse();
            response = bllFiscalYear.GetFiscalYear(fiscalYearID);
            return JsonUtility.Serialize(response);
        }
    }
}
