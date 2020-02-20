using System;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLEmpPosting
    {
        public JsonResponse GetEmpApptPromo(int? empID)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpPosting objDll = new DLLEmpPosting();
            try
            {
                response.ResponseData = objDll.GetEmpApptPromo(empID);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse SaveEmpPosting(ATTEmpPosting objEmpPosting, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            try
            {
                if (response.Message == "")
                {

                    DLLEmpPosting dllEmpPosting = new DLLEmpPosting();
                    response.Message = dllEmpPosting.SaveEmpPosting(objEmpPosting,appID,modID);
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

        public JsonResponse GetEmpPosting(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpPosting objDll = new DLLEmpPosting();
            try
            {
                response.ResponseData = objDll.GetEmpPosting(submissionNo);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }
        public JsonResponse GetEmpPostingByOffice(Int64? Office)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpPosting objDll = new DLLEmpPosting();
            try
            {
                response.ResponseData = objDll.GetEmpPostingByOffice(Office);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }
            return response;
        }

        public JsonResponse GetEmpPostingByEmpID(long? empID)
        {
            JsonResponse response = new JsonResponse();
            DLLEmpPosting objDll = new DLLEmpPosting();
            try
            {
                response.ResponseData = objDll.GetEmpPostingByEmpID(empID);
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
