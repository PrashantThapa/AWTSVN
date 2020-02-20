using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.DataLayer;
using HRFA.COMMON;
namespace HRFA.BLL
{
    public class BLLOffice
    {

		public JsonResponse DeleteOffice(Int32? officeCode)
		{
			JsonResponse response = new JsonResponse();

			try
			{
				DLLOffice dLLOffice = new DLLOffice();
				response.Message = dLLOffice.DeleteOffice(officeCode);
				response.IsSucess = true;
			}
			catch (Exception ex)
			{
				response.IsSucess = false;
				response.Message = ex.Message;
			}
			return response;
		}

		public List<ATTOffice> GetAllOffice(Int32? officeCode)
		{
			try
			{
				DLLOffice obj = new DLLOffice();
				return obj.GetAllOffice(officeCode);
			}
			catch (Exception ex)
			{

				throw (ex);
			}

		}
		public string SaveOffice(ATTOffice objOffice)
        {
            try
            {
                DLLOffice objSaveOfficeDLL = new DLLOffice();
                return objSaveOfficeDLL.SaveOffice(objOffice);

                

            }
            catch (Exception ex)
            {
                throw (ex);
            }


        }


        public List<ATTOffice> GetPortalOffice(Int32? officeCode)
        {
            try
            {
                DLLOffice obj = new DLLOffice();
                return obj.GetPortalOffice(officeCode);
            }
            catch (Exception ex)
            {

                throw (ex);
            }

        }
    }
}
