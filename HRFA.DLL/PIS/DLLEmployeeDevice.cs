using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLEmployeeDevice
    {
       public string SaveEmpDevice(ATTEmployeeDevice objApp)
       {
           string msg = "";
           string sp = "";
           sp = "CPR_UPDATE_ENROLL_NO";
           msg = "Successfully Saved.";
           GetConnection conn = new GetConnection();
           OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
           OracleTransaction tran = dbConn.BeginTransaction();

           try
           {
               if (sp != "")
               {
                   List<OracleParameter> paramList = new List<OracleParameter>();
                   paramList.Add(SqlHelper.GetOraParam(":P_EMP_ID", objApp.EmpID, OracleDbType.Int32, ParameterDirection.Input));
                   paramList.Add(SqlHelper.GetOraParam(":P_ENROLL_NO", objApp.DeviceEnrollID, OracleDbType.Varchar2, ParameterDirection.Input));
                   
                   SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                   tran.Commit();
                   paramList.Clear();
               }
               else
               {
                   msg = "Error in Saving.";
                   throw new Exception(msg);
               }
           }
           catch (Exception ex)
           {
               msg = "Error in Saving.";
               tran.Rollback();
               throw (ex);
           }
           finally
           {
               conn.CloseDbConn();
           }
           return msg;
       }
    }
}
