using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;


namespace HRFA.Handlers.COMMON
{
    /// <summary>
    /// Summary description for ShiftHandler
    /// </summary>
    public class ShiftHandler : BaseHandler
    {

        public object SaveShift(string args)
        {
            BLLShift objShiftBll = new BLLShift();
            ATTShift objShiftAtt = (ATTShift)JsonUtility.DeSerialize(args, typeof(ATTShift));
            JsonResponse response = new JsonResponse();
            try
            {
                response.Message = objShiftBll.SaveShift(objShiftAtt);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }


        public object GetShift(Int32? ShiftValues)
        {
            BLLShift obj = new BLLShift();

            List<ATTShift> lst = new List<ATTShift>();

            JsonResponse response = new JsonResponse();
            response.ResponseData = lst;
            try
            {
                response.Message = "Success";
                response.ResponseData = obj.GetShift(ShiftValues);
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);

        }
		public object DeleteShift(Int32? shiftSetup)
		{
			JsonResponse response = new JsonResponse();

			BLLShift bLLShift = new BLLShift();

			
			response = bLLShift.DeleteShift(shiftSetup);
			

			return JsonUtility.Serialize(response);

		}





	}


}