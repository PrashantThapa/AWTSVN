using HRFA.ATT.PAYROLL;
using HRFA.COMMON;
using HRFA.DataLayer.PAYROLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HRFA.BLL.PAYROLL
{
	public class BLLTiming
	{
		public JsonResponse GetSeason(string param1)

		{
			JsonResponse response = new JsonResponse();

			try
			{
				if (response.Message == "")
				{

					DLLTiming dllTiming = new DLLTiming();
					response.ResponseData = dllTiming.GetSeason(param1);
					response.Message = "Sucessful";
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

	}

}
