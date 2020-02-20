using HRFA.ATT;
using HRFA.DataLayer;
using System.Collections.Generic;

namespace HRFA.BLL
{
    public class BLLModuleFunction
    {
        public  List<ATTModuleFunction> GetModuleFunctions(string applicationID)
        {
            DLLModuleFunction objDLLModuleFunction = new DLLModuleFunction();
            return objDLLModuleFunction.GetModuleFunctions(applicationID);
        }

    }
}
