using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using HRFA.DataLayer;



namespace HRFA.BLL
{
    public class BLLPortalLogin
    {
        /*
           Auther shanjeev
           Date : 2015.05.30
 
       */

        public JsonResponse SaveChangePassword(ATTPortalLogin objChangePassword)
        {
            JsonResponse response = new JsonResponse();
            //string msg = "";

            try
            {
                if (response.Message == "")
                {

                    DLLPortalLogin dllPortalLogin = new DLLPortalLogin();
                    response.Message = dllPortalLogin.SaveChangePassword(objChangePassword);
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
		public JsonResponse PortalLogin(ATTPortalLogin user)
		{
			JsonResponse response = new JsonResponse();
			try
			{
				ATTPortalLogin objPort = new ATTPortalLogin();

				DLLPortalLogin dllportalLog = new DLLPortalLogin();
				if (user.UType == "E" || user.UType == "A")
				{
					objPort = dllportalLog.PortalLogin(user);

				}
				else
				{
					// objCon = conLog.CContributorLogin(contributorLoginDetails);
				}
				if (user.LoggedIn)
				{
					response.IsSucess = true;
					if (user.UType == "E" || user.UType == "A")
					{
						response.ResponseData = objPort;
					}
					//else
					//{
					//    response.Message = objCon.Employer.EmployerID.ToString() + "," + objCon.FromDate.ToString() +
					//        "," + objCon.Person.FirstName.ToString() + ","
					//        + objCon.Person.MiddleName.ToString() + ","
					//        + objCon.Person.LastName.ToString();
					//    response.ResponseData = objCon;
					//}
				}
				else
				{
					response.IsSucess = false;
					response.Message = "Login Failed!!!";
				}

			}
			catch (Exception ex)
			{
				response.Message = ex.Message;
			}

			return response;
		}

		//public List<ATTPortalLogin> GetOfficePortalUsers(Int32? OfficeCD)
		//{
		//	DLLPortalLogin dLLPortalLogin = new DLLPortalLogin();
		//	return dLLPortalLogin.GetOfficePortalUsers(OfficeCD);
		//}

	}
}
