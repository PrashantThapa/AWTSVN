﻿
using HRFA.BLL;
using HRFA.COMMON;
namespace HRFA.Handlers.CENTRALLOOKUP
{
    /// <summary>
    /// Summary description for LoanTypeHandler
    /// </summary>
    public class LoanTypeHandler : BaseHandler
    {
        public object GetLoanType(int? LoanTypeID)
        {
            JsonResponse response = new JsonResponse();
            BLLLoanType bllLoanType = new BLLLoanType();
            response = bllLoanType.GetLoanType(LoanTypeID);
            return JsonUtility.Serialize(response);
        }

		public object GetGradeUnit()
		{
			JsonResponse response = new JsonResponse();
			BLLLoanType bllLoanType = new BLLLoanType();
			response = bllLoanType.GetGradeUnit();
			return JsonUtility.Serialize(response);
		}

        public object GetGradeLevelName(int? GradeID)
        {
            JsonResponse response = new JsonResponse();
            BLLLoanType bllLoanType = new BLLLoanType();
            response = bllLoanType.GetGradeLevelName(GradeID);
            return JsonUtility.Serialize(response);
        }

        public object GetTaxCat()
        {
            JsonResponse response = new JsonResponse();
            BLLLoanType bllLoanType = new BLLLoanType();
            response = bllLoanType.GetTaxCat();
            return JsonUtility.Serialize(response);
        }


    }
}