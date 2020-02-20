using HRFA.ATT;
using HRFA.DataLayer;
using System.Collections.Generic;

namespace HRFA.BLL
{
    public class BLLApplicationRole
    {
        public  List<ATTApplicationRole> GetApplicationRoles(string applicationID)
        {
            DLLApplicationRole objDLLApplicationRole = new DLLApplicationRole();
            return objDLLApplicationRole.GetApplicationRoles(applicationID);
        }
    }
}
