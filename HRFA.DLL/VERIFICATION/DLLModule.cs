﻿using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLModule
    {

        public List<ATTModule> GetMuduleByApplicationID(string applicationID)
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            try
            {
                string SP = "CPR_GET_VERIFICATION_MODULES";
                List<OracleParameter> ParamList = new List<OracleParameter>();
                ParamList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", applicationID, OracleDbType.Varchar2, ParameterDirection.Input));
                ParamList.Add(SqlHelper.GetOraParam(":P_MODULE_ID", null, OracleDbType.Varchar2, ParameterDirection.Input));
                ParamList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, ParamList.ToArray());   //

                List<ATTModule> lst = new List<ATTModule>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTModule obj = new ATTModule();

                    obj.ApplicationID = drow["APPLICATION_ID"].ToString();
                    obj.ModuleID = drow["MODULE_ID"].ToString();
                    obj.ModuleDesc = drow["MODULE_DESCRIPTION"].ToString();
                    obj.FromDate = drow["FROM_DATE"].ToString();
                    obj.ToDate = drow["TO_DATE"].ToString();
                    obj.LevelOfVerification = int.Parse(drow["LEVEL_OF_VERIFICATION"].ToString());

                    lst.Add(obj);
                }

                return lst;
            }
            catch (Exception ex)
            {

                throw (ex);
            }
            finally
            {
                GetConn.CloseDbConn();
            }
        }


        
    }
}