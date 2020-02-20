using System;
using System.Web;
using HRFA.ATT;
using HRFA.BLL;
using HRFA.COMMON;

namespace HRFA.Handlers.PIS
{
   

    public class EmployeeRegistrationHandler : BaseHandler
    {

        public object SaveEmployee(string args, string appID, string modID)
        {
            JsonResponse response = new JsonResponse();

            ATTPISEmployee objEmployee = JsonUtility.DeSerialize(args, typeof(ATTPISEmployee)) as ATTPISEmployee;
            BLLEmployee bllEmployee = new BLLEmployee();
            objEmployee.Person.PersonImage = HttpContext.Current.Server.MapPath("../../PhotoHandle/temp/temp" + objEmployee.Person.PersonImage);
            response = bllEmployee.SaveEmployee(objEmployee,appID,modID);
            return JsonUtility.Serialize(response);
        }

        public object CheckUniqueSymbolNo(string SymbolNo) // returns true if the symbol number is unique else false
        {
            JsonResponse response = new JsonResponse();

            BLLEmployee bllEmployee = new BLLEmployee();
            response = bllEmployee.CheckUniqueSymbolNo(SymbolNo);
            return JsonUtility.Serialize(response);
        }

        public object GetEmployee(Int64? submissionNo)
        {
            JsonResponse response = new JsonResponse();
            BLLEmployee objbllemployee = new BLLEmployee();
            try
            {
                string filepath = HttpContext.Current.Server.MapPath("../../PhotoHandle/temp/");
                //functionname(subno, filepath);           
                response = objbllemployee.GetEmployee(submissionNo, filepath);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.IsSucess = false;
            }
            return JsonUtility.Serialize(response);
        }
        


    }
}