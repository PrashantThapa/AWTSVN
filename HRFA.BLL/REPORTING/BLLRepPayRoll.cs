//using HRFA.COMMON;
//using HRFA.DataLayer.REPORTING;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;

//namespace HRFA.BLL.REPORTING
//{
//	public class BLLRepPayRoll
//	{
//		public JsonResponse GetPayRoll(Int64? officeCd, Int64? year, Int64? month)
//		{
//			JsonResponse response = new JsonResponse();

//			try
//			{
//				if (response.Message == "")
//				{
//					DLLRepHoliday dLLRepHoliday = new DLLRepHoliday();
//					var data = dLLRepHoliday.GetPayRoll(officeCd, year, month);
//					response.ResponseData = data;
//					response.IsSucess = true;

//				}

//			}
//			catch (Exception ex)
//			{
//				response.Message = ex.Message;
//				response.IsSucess = false;
//			}


//			return response;

//		}

//	}
//}
