using System;
using System.Collections.Generic;

using System.Data;
using HRFA.COMMON;
using HRFA.ATT;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLVerificationModule
    {

        //NB: Selection of verification Module
        public string SaveSelectionofVerificationModule(List<ATTVerificationModule> lst)
        {

            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();
            string msg = "No Record To Submit";
                        
            try
            {
                
                foreach (ATTVerificationModule obj in lst)
                {
                    string SP = "";
                    if (obj.Action == "A")
                    {
                        SP = "CPR_ADD_VERIFICATION_MODULES";
                        msg = "Record Added Successfully";
                    }
                   
                    //else if (obj.Action == "E")
                    //{
                    //    SP = "CPR_EDIT_VERIFICATION_MODULES";

                    //}
                    
                    if (SP != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                        paramList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", obj.ApplicationID, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_MODULE_ID", obj.ModuleID, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_LEVEL_OF_VERIFICATION", obj.LevelOfVerification, OracleDbType.Int32, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE",null,OracleDbType.Date,ParameterDirection.Input));
                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
                        paramList.Clear();

                    }
                }
                tran.Commit();
                return msg;

            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw new Exception(ex.Message);
            }
            finally
            {
                GetConn.CloseDbConn();
            }

        }

    

    }
}
