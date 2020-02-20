
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;


namespace IDS.Handlers.SECURITY
{
    
    public class Menu : BaseHandler
    {

        public object GetMenus()
        {
            JsonResponse response = new JsonResponse();

            List<ATTMenu> lstMenu = GetLoginMenus();

            if (lstMenu.Count > 0)
            {
                response.IsSucess = true;
                response.ResponseData = lstMenu;
            }
            else
            {
                response.IsSucess = false;
            }

            return JsonUtility.Serialize(response);
        }

		public object GetPortalMenu()
		{
			JsonResponse response = new JsonResponse();

			List<ATTMenu> lstMenu = GetPortalMenus();

			if (lstMenu.Count > 0)
			{
				response.IsSucess = true;
				response.ResponseData = lstMenu;
			}
			else
			{
				response.IsSucess = false;
			}

			return JsonUtility.Serialize(response);
		}



	}
}