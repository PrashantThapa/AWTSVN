﻿using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLRoleModuleFunction
    {
        public  List<ATTRoleModuleFunctions> GetRoleModuleFunctions(string applicationID,string roleID)
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

            try
            {
                string SP = "CPR_GET_ROLES_APP_MODULE_FUNC";


                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", applicationID, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_role_id", roleID, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTRoleModuleFunctions> lst = new List<ATTRoleModuleFunctions>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTRoleModuleFunctions obj = new ATTRoleModuleFunctions();

                    obj.ApplicationID = applicationID;
                    obj.ModuleID = drow["MODULE_ID"].ToString();
                    obj.FunCD = drow["fun_cd"].ToString();
                    obj.FromDate = drow["from_date"].ToString();
                    obj.RoleID = drow["role_id"].ToString();
                    obj.DBRole = drow["DB_ROLE"].ToString();
                    obj.ModuleDesc = drow["MODULE_DESCRIPTION"].ToString();
                    obj.FunDesc = drow["FUN_DESC"].ToString();

                    lst.Add(obj);
                }
                return lst;
            }
            catch (Exception)
            {
                return new List<ATTRoleModuleFunctions>();

            }
            finally
            {
                GetConn.CloseDbConn();
            }
        }


        public  void SaveRoleModuleFunctions(List<ATTRoleModuleFunctions> lstRoleModuleFunctions, OracleTransaction Tran)
        {
            string SP = "";
            string msg = string.Empty;

            try
            {
                foreach (ATTRoleModuleFunctions objRMF in lstRoleModuleFunctions)
                {

                    if (objRMF.Action == "A")
                    {
                        SP = "CPR_ADD_ROLE_MODULE_FUNCS";
                        msg = "Record Added Successfully";
                    }
                    else if (objRMF.Action == "D")
                    {
                        SP = "CPR_DEL_SEC_ROLE_MODULE_FUNCS";
                        msg = "Record Updated Successfully";


                    }

                    List<OracleParameter> ParamList = new List<OracleParameter>();
                    if (objRMF.Action == "A")
                    {
                        ParamList.Add(SqlHelper.GetOraParam(":P_ROLE_ID", objRMF.RoleID, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", objRMF.ApplicationID, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_MODULE_ID", objRMF.ModuleID, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_FUN_CD", objRMF.FunCD, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objRMF.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                        SqlHelper.ExecuteNonQuery(Tran, CommandType.StoredProcedure, SP, ParamList.ToArray());
                        ParamList.Clear();
                    }
                    else if (objRMF.Action == "D")
                    {
                        ParamList.Add(SqlHelper.GetOraParam(":P_ROLE_ID", objRMF.RoleID, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", objRMF.ApplicationID, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_MODULE_ID", objRMF.ModuleID, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_FUN_CD", objRMF.FunCD, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objRMF.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_to_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input)); 
                        SqlHelper.ExecuteNonQuery(Tran, CommandType.StoredProcedure, SP, ParamList.ToArray());
                        ParamList.Clear();
                       /*
                        SP = "CPR_EDIT_ROLE_MODULE_FUNCS";
                        ParamList.Add(SqlHelper.GetOraParam(":P_ROLE_ID", objRMF.RoleID, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", objRMF.ApplicationID, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_MODULE_ID", objRMF.ModuleID, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_FUN_CD", objRMF.FunCD, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objRMF.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                        ParamList.Add(SqlHelper.GetOraParam(":P_TO_DATE", toDate, OracleDbType.Varchar2, ParameterDirection.Input));
                        SqlHelper.ExecuteNonQuery(Tran, CommandType.StoredProcedure, SP, ParamList.ToArray());
                        ParamList.Clear();
                       */
                    }
                }

                //return msg;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
