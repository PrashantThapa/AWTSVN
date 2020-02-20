using HRFA.ATT;
using HRFA.DataLayer;
using System;
using System.Collections.Generic;

namespace HRFA.BLL
{
    public class BLLSECApplication
    {
        public  List<ATTApplication> GetAllApplication(Int32 offcode)
        {
            DLLSECApplication objDLLApplication = new DLLSECApplication();

            return objDLLApplication.GetAllApplication(offcode);
        }
    }
}
