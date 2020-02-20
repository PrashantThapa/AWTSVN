using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;
namespace IDS.Handlers.CENTRALLOOKUP
{
    public class DistrictHandler : BaseHandler
    {

        public object GetDistrict(int? ProvinceCD, int? DistrictCD)
        {
            BLLDistrict obj = new BLLDistrict();
            List<ATTDistrict> lstContactType = obj.GetDistricts(ProvinceCD, DistrictCD);

            JsonResponse response = new JsonResponse
            {
                ResponseData = lstContactType
            };


            try
            {
                response.Message = "Success";
                response.IsSucess = true;
            }
            catch (Exception ex)
            {
                response.IsSucess = false;
                response.Message = ex.Message;
            }

            return JsonUtility.Serialize(response);

        }

		public object GetProvince(int? ProvinceCD)
		{
			BLLProvince obj = new BLLProvince();
			List<ATTProvince> lstContactType = obj.GetProvince(ProvinceCD);

			JsonResponse response = new JsonResponse
			{
				ResponseData = lstContactType
			};


			try
			{
				response.Message = "Success";
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}

			return JsonUtility.Serialize(response);

		}

	}
}