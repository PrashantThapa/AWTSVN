using HRFA.ATT;
using HRFA.BLL.PAYROLL;
using HRFA.COMMON;
using System;
using System.Web;

namespace HRFA.Handlers.PAYROLL
{
    /// <summary>
    /// Summary description for GradeScaleSetupHandler
    /// </summary>
    public class GradeScaleSetupHandler : BaseHandler
    {
        public object SaveGradeScaleSetup(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            ATTGradeScaleSetup objgradeScale = JsonUtility.DeSerialize(args, typeof(ATTGradeScaleSetup)) as ATTGradeScaleSetup;
            // objgradeScale.EntryDate = DateTime.Now.ToString();            
            BLLGradeScaleSetup bllEmpGrade = new BLLGradeScaleSetup();
            response = bllEmpGrade.SaveGradeScaleSetup(objgradeScale, appID, modID);

            return JsonUtility.Serialize(response);
        }


		// Get all Grade Scale Setup values for drop down lists.
		public object GetAllGradeScalesForDdl()
		{
			var response = new JsonResponse();
			BLLGradeScaleSetup objBll = new BLLGradeScaleSetup();
			try
			{
				response = objBll.GetAllGradesForDdl();
			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
				response.IsSucess = false;
			}
			return JsonUtility.Serialize(response);
		}

		public object GetALLGradeScaleSettings()
        {
            JsonResponse response = new JsonResponse();
            BLLGradeScaleSetup objBLL = new BLLGradeScaleSetup();
            try
            {
                response = objBLL.GetALLGradeScaleSettings();
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetGradeScaleSettingsByEmpLevel(string EmpLevel)
        {
            JsonResponse response = new JsonResponse();
            BLLGradeScaleSetup objBLL = new BLLGradeScaleSetup();
            try
            {
                response = objBLL.GetGradeScaleSettingsByEmpLevel(Convert.ToInt32(EmpLevel.Trim()));
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
