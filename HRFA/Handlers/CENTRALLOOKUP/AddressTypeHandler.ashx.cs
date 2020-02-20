﻿using System.Collections.Generic;
using HRFA.ATT;
using HRFA.ATT.COMMON;
using HRFA.ATT.PAYROLL;
using HRFA.BLL;
using HRFA.BLL.PAYROLL;
using HRFA.COMMON;
namespace IDS.Handlers.CENTRALLOOKUP
{
    /// Summary description for AddressTypeHandler
    public class AddressTypeHandler : BaseHandler
    {
        public object SaveAddressType(string addtype, string token)
        {
            JsonResponse response = new JsonResponse();
            //if (token == CurrentToken())
            //{
                BLLAddressType bllAddressType = new BLLAddressType();
                List<ATTAddressType> objAddressType = JsonUtility.DeSerialize(addtype, typeof(List<ATTAddressType>)) as List<ATTAddressType>;
                response = bllAddressType.SaveAddressType(objAddressType);
           // }
            //else
            //{

            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}


            return JsonUtility.Serialize(response);
        }

		public object DeleteAddressType(int? addresstypeid, string token)
        {
            JsonResponse response = new JsonResponse();

            
                BLLAddressType bllAddressType = new BLLAddressType();
                response = bllAddressType.DeleteAddressType(addresstypeid);
           
            return JsonUtility.Serialize(response);

            
        }

        public object DeleteExtraAllowance(int? extraallowanceid)
        {
            JsonResponse response = new JsonResponse();

            BLLExtraAllowance bllExtraAllowance = new BLLExtraAllowance();
            response = bllExtraAllowance.DeleteExtraAllowance(extraallowanceid);
          
            return JsonUtility.Serialize(response);


        }

       

        public object GetExtraAllowance(int? SPID)
        {
            JsonResponse response = new JsonResponse();
			BLLExtraAllowance bllAddressType = new BLLExtraAllowance();

            response = bllAddressType.GetExtraAllowance(SPID);
            
            return JsonUtility.Serialize(response);


        }

		public object GetGrade(int? gradeid)
		{
			JsonResponse response = new JsonResponse();
			BLLGrades bLLGrade = new BLLGrades();

			response = bLLGrade.GetGrade(gradeid);

			return JsonUtility.Serialize(response);


		}


		public object GetAddressType(int? addresstypeid, string token)
        {
            JsonResponse response = new JsonResponse();
            BLLAddressType bllAddressType = new BLLAddressType();
           
            //if (token == CurrentToken())
            //{
                response = bllAddressType.GetAddressType(addresstypeid);
            //}
            //else
            //{
            //    response.Message = "Suspicious Activity !!!";
            //    response.IsSucess = false;
            //    response.IsToken = false;
            //}

            return JsonUtility.Serialize(response);


        }

		//public object SaveGrade(string grade)
		//{
		//	JsonResponse response = new JsonResponse();
		//	//if (token == CurrentToken())
		//	//{
		//	BLLGrades bllGrade = new BLLGrades();
		//	List<ATTGrades> objGrade = JsonUtility.DeSerialize(grade, typeof(List<ATTGrades>)) as List<ATTGrades>;
		//	response = bllGrade.SaveGrade(objGrade);
		//	// }
		//	//else
		//	//{

		//	//    response.Message = "Suspicious Activity !!!";
		//	//    response.IsSucess = false;
		//	//    response.IsToken = false;
		//	//}


		//	return JsonUtility.Serialize(response);
		//}

		public object DeleteGrade(int? gradeid)
		{
			JsonResponse response = new JsonResponse();

	
			BLLGrades bLLGrade = new BLLGrades();
			response = bLLGrade.DeleteGrade(gradeid);
			

			return JsonUtility.Serialize(response);


		}
	}
}