using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLResignation
    {

       public string SaveResignation(ATTResignation objResignationATT, string appID, string modID)
       {
           try
           {
               DLLResignation objResignationDll = new DLLResignation();
               return objResignationDll.SaveResignation(objResignationATT, appID, modID);
           }
           catch (Exception ex)
           {
               throw (ex);
           
           }
       }

       public List<ATTResignation> GetResignationBySubNo(Int64? SubmissionNo)
       {
           try
           {
               DLLResignation obj = new DLLResignation();
               return obj.GetResignationBySubNo(SubmissionNo);

           }
           catch (Exception ex)
           {
               throw (ex);
           }

       }
       

    }
}
