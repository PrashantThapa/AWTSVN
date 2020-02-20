using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.DataLayer;
using HRFA.COMMON;

namespace HRFA.BLL
{
    public class BLLShift
    {

       public string SaveShift(ATTShift objShiftAtt)
       {
           try
           {
               DLLShift objShiftDll = new DLLShift();
               return objShiftDll.SaveShift(objShiftAtt);

           }
           catch (Exception ex)
           {
               throw (ex);
           }
       }
		public JsonResponse DeleteShift(Int32? shiftSetup)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				DLLShift dLLShift = new DLLShift();
				response.Message = dLLShift.DeleteShift(shiftSetup);
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}
			return response;
		}


		public List<ATTShift> GetShift(Int32? ShiftValues)
       {
           try
           {
               DLLShift obj = new DLLShift();
               return obj.GetShift(ShiftValues);

           }
           catch (Exception ex)
           {
               throw (ex);
           }

       }

    }
}
