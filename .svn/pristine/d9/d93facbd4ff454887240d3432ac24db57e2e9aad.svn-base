using HRFA.ATT.COMMON;
using HRFA.COMMON;
using HRFA.DataLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace HRFA.BLL.PAYROLL
{
	public class BLLExtraAllowance
	{

		public JsonResponse GetExtraAllowance(int? SPID)
		{
			JsonResponse response = new JsonResponse();
			List<ATTExtraAllowance> lst = new List<ATTExtraAllowance>();
			try
			{
				DLLAddressType dllAddressType = new DLLAddressType();
				lst = dllAddressType.GetExtraAllowance(SPID);
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

		

		private string Validate(List<ATTExtraAllowance> lstExtraAllowance)
		{
			throw new NotImplementedException();
		}

		public JsonResponse DeleteExtraAllowance(int? extraallowanceid)
		{
			JsonResponse response = new JsonResponse();
			try
			{
				DLLAddressType dllAddressType = new DLLAddressType();
				response.Message = dllAddressType.DeleteExtraAllowance(extraallowanceid);
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
