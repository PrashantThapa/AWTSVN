using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.ATT.FAMS;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.FAMS
{
    
    public class SalarySheetHandler : BaseHandler
    {
        public object SaveSalarySheet(string args)
        {
            JsonResponse response = new JsonResponse();
            List<ATTSalarySheetEmployee> objSalarySheet = JsonUtility.DeSerialize(args, typeof(List<ATTSalarySheetEmployee>)) as List<ATTSalarySheetEmployee>;
            BLLSalarySheet bllSalarySheet = new BLLSalarySheet();
            response = bllSalarySheet.SaveSalarySheet(objSalarySheet);

            return JsonUtility.Serialize(response);

        }

        public object GenerateSalary(Int32? officeCode, string year, Int32? month, Int32? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLSalarySheet objSalarySheet = new BLLSalarySheet();
            try
            {
                response = objSalarySheet.GenerateSalary(officeCode, year, month, empID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        //public object GetSalaryItemByEmpID(Int16? empID, Int32? year, Int16? month)
        //{
        //    JsonResponse response = new JsonResponse();
        //    BLLSalarySheet bllSalarySheet = new BLLSalarySheet();
        //    response = bllSalarySheet.GetSalaryItemByEmpID(empID, year, month);

        //    return JsonUtility.Serialize(response);
        //}


        public object GetSalarySheetBySubmissionNo(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLSalarySheet bllSalarySheet = new BLLSalarySheet();
            try
            {
                response = bllSalarySheet.GetSalarySheetBySubmissionNo(submissionNo);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetYearAndMonth(Int32? officeCode)
        {
            JsonResponse response = new JsonResponse();
            BLLSalarySheet bllSalarySheet = new BLLSalarySheet();
            try
            {
                response = bllSalarySheet.GetYearAndMonth(officeCode);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetSalary(Int32? officeCode, string year, Int32? month, Int32? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLSalarySheet bllSalarySheet = new BLLSalarySheet();
            try
            {
                response = bllSalarySheet.GetSalary(officeCode, year, month, empID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }


        public object InitiateVerification(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();
            ATTEmpSalarySheet objSalarySheet = JsonUtility.DeSerialize(args, typeof(ATTEmpSalarySheet)) as ATTEmpSalarySheet;
            BLLSalarySheet bllSalarySheet = new BLLSalarySheet();
            response = bllSalarySheet.InitiateVerification(objSalarySheet,appID,modID);

            return JsonUtility.Serialize(response);

        }

       
    }
}