using System;
using System.Collections.Generic;
using System.Linq;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLRole
    {

        //NB: After clicking Application (and getting Module-Functions and Role)--------------------------------------------------------------------------
        public  List<ATTModuleFunction> GetModuleFunctionsAndRole(string applicationID)
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            try
            {
                string SP = "CPR_get_SEC_MODULE_FUNCTIONS";

                List<OracleParameter> paramList = new List<OracleParameter>
                {
                    SqlHelper.GetOraParam(":P_APPLICATION_ID", applicationID, OracleDbType.Varchar2, ParameterDirection.Input),
                    SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output)
                };

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTModuleFunction> lst = new List<ATTModuleFunction>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTModuleFunction obj = new ATTModuleFunction
                    {
                        ApplicationID = applicationID,
                        ModuleID = drow["MODULE_ID"].ToString(),
                        ModuleDesc = drow["MODULE_DESCRIPTION"].ToString(),
                        ModuleType = drow["MODULE_TYPE"].ToString(),
                        MenuName = drow["MENU_NAME"].ToString(),
                        McRestricted = drow["MC_RESTRICTED"].ToString(),
                        FunCD = drow["FUN_CD"].ToString(),
                        FunDesc = drow["FUN_DESC"].ToString()
                    };

                    lst.Add(obj);
                }
                return lst;
            }
            catch (Exception )
            {
                return new List<ATTModuleFunction>();

            }
            finally
            {
                GetConn.CloseDbConn();
            }
        }


        //NB: Loading Role by ApplicatinID
        public List<ATTRole> GetRoles()
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            try
            {
                string SP = "CPR_GET_ROLES";
                List<OracleParameter> ParamList = new List<OracleParameter>
                {
                    SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, ParameterDirection.Output),
                };

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, ParamList.ToArray());

                List<ATTRole> lst = new List<ATTRole>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTRole obj = new ATTRole
                    {
                        RoleDescription = drow["ROLE_DESCRIPTION"].ToString(),
                        RoleID = drow["ROLE_ID"].ToString(),
                        Action = "E"
                    };
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


        public string SaveRole(ATTRole objR)
        {
            string SP = "";
            string msg = "";



            if (objR.Action == "A")
            {
                SP = "CPR_ADD_ROLES";
                msg = "Roles Added Successfully";
            }
            else
            {
                SP = "CPR_EDIT_ROLES";
                msg = "Roles Updated Successfully";
            }


                GetConnection GetConn = new GetConnection();
                OracleConnection DBConn = GetConn.GetDbConn(GetConn.LoginUser);
                OracleTransaction Tran = DBConn.BeginTransaction();

              // msg= DLLRoleModuleFunction.SaveRoleModuleFunctions(objR.RoleModFunLst, Tran);

                List<OracleParameter> ParamList = new List<OracleParameter>();
                try
                {
                    //ParamList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", objR.ApplicationID, OracleDbType.Varchar2, ParameterDirection.Input));
                    ParamList.Add(SqlHelper.GetOraParam(":P_ROLE_ID", objR.RoleID, OracleDbType.Varchar2, ParameterDirection.Input));
                    ParamList.Add(SqlHelper.GetOraParam(":P_ROLE_DESCRIPTION", objR.RoleDescription, OracleDbType.Varchar2, ParameterDirection.Input));
                    //ParamList.Add(SqlHelper.GetOraParam(":P_DB_ROLE", objR.DbRole, OracleDbType.Varchar2, ParameterDirection.Input));

                    SqlHelper.ExecuteNonQuery(Tran, CommandType.StoredProcedure, SP, ParamList.ToArray());
                    if (objR.RoleModFunLst.Count > 0)
                    {
                        DLLRoleModuleFunction dllRoleModuleFunction = new DLLRoleModuleFunction();
                        dllRoleModuleFunction.SaveRoleModuleFunctions(objR.RoleModFunLst, Tran);
                    }
                    Tran.Commit();
                    return msg;
                }
                catch (Exception ex)
                {
                    Tran.Rollback();
                    throw new Exception("Error" + ex.Message);
                }
                finally
                {
                    GetConn.CloseDbConn();
                }
           
           // return msg;
        }



        public List<ATTUserRoleAppModule> CheckingRoleModuleFunctionLoading(string userID, string applicationID,string roleID)
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            try
            {
                string SP = "CPR_GET_USER_ROLE_APP_MOD_FUN"; //HR_OWNER_DEMO.CPR_GET_ROLES_APP_MODULE_FUNC
                List<OracleParameter> ParamList = new List<OracleParameter>();
                ParamList.Add(SqlHelper.GetOraParam(":p_user_id", userID, OracleDbType.Varchar2, ParameterDirection.Input));
                ParamList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, ParameterDirection.Output));
                ParamList.Add(SqlHelper.GetOraParam(":p_application_id", applicationID, OracleDbType.Varchar2, ParameterDirection.Input));
                ParamList.Add(SqlHelper.GetOraParam(":p_role_id", roleID, OracleDbType.Varchar2, ParameterDirection.Input));



                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, ParamList.ToArray());

                List<ATTUserRoleAppModule> lst = new List<ATTUserRoleAppModule>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTUserRoleAppModule obj = new ATTUserRoleAppModule
                    {
                        FunCD = drow["FUN_CD"].ToString(),
                        RoleID = drow["ROLE_ID"].ToString(),
                        ModuleID = drow["MODULE_ID"].ToString(),

                        Action = ""
                    };
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
