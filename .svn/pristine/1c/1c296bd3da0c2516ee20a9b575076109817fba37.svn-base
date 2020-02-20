using System;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{
    public class EmpPostingHandler : BaseHandler
    {
        public object GetEmpApptPromo(int? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpPosting objBLLEmpPosting = new BLLEmpPosting();
            try
            {
                response = objBLLEmpPosting.GetEmpApptPromo(empID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object SaveEmpPosting(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();


            ATTEmpPosting objEmpPosting = JsonUtility.DeSerialize(args, typeof(ATTEmpPosting)) as ATTEmpPosting;
            BLLEmpPosting bllEmpPosting = new BLLEmpPosting();
            response = bllEmpPosting.SaveEmpPosting(objEmpPosting,appID,modID);

            return JsonUtility.Serialize(response);

        }


        public object GetEmpPosting(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpPosting objBLLEmpPosting = new BLLEmpPosting();
            try
            {
                response = objBLLEmpPosting.GetEmpPosting(submissionNo);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetEmpPostingByEmpID(Int64? empID)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpPosting objBLLEmpPosting = new BLLEmpPosting();
            try
            {
                response = objBLLEmpPosting.GetEmpPostingByEmpID(empID);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }

        public object GetEmpPostingByOffice(Int64? Office)
        {
            JsonResponse response = new JsonResponse();
            BLLEmpPosting objBLLEmpPosting = new BLLEmpPosting();
            try
            {
                response = objBLLEmpPosting.GetEmpPostingByOffice(Office);
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