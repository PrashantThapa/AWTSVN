using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLApplicationRole
    {
        public  List<ATTApplicationRole> GetApplicationRoles(string applicationID)
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

            try
            {
                string SP = "CPR_get_APPL_ROLES";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                paramList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", applicationID, OracleDbType.Varchar2, ParameterDirection.Input));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTApplicationRole> lst = new List<ATTApplicationRole>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTApplicationRole obj = new ATTApplicationRole();

                    obj.ApplicationID = drow["APPLICATION_ID"].ToString();
                    obj.RoleID = drow["ROLE_ID"].ToString();
                    obj.RoleDescription = drow["ROLE_DESCRIPTION"].ToString();
                    obj.DBRole = drow["DB_ROLE"].ToString();
                    obj.Action = "";
                    obj.AuthBy = "";
                    obj.AuthDate = "";
                    obj.AuthNo = "";
                    obj.EntryBy = "";
                    obj.FromDate = "";
                    obj.ToDate = "";
                    obj.TranDate = "";
                    obj.UserID = "";
                    lst.Add(obj);
                }
                return lst;
            }
            catch (Exception )
            {
                return new List<ATTApplicationRole>();

            }
            finally
            {
                GetConn.CloseDbConn();
            }
        }


        public  List<ATTApplicationRole> GetUserRolesByUserID(string userid)
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

            try
            {
                string SP = "CPR_get_user_roles";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":p_user_ID", userid, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTApplicationRole> lst = new List<ATTApplicationRole>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTApplicationRole obj = new ATTApplicationRole();

                    obj.ApplicationID = drow["APPLICATION_ID"].ToString();
                    obj.RoleID = drow["ROLE_ID"].ToString();
                    obj.FromDate = drow["FROM_DATE"].ToString();
                    obj.UserID = drow["User_ID"].ToString();
                    obj.Action = "E";
                    // obj.ROLE_DESCRIPTION = drow["ROLE_DESCRIPTION"].ToString();
                    // obj.DB_ROLE = drow["DB_ROLE"].ToString();

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




        public bool SaveApplicationRole(List<ATTApplicationRole> applRoleLST, OracleTransaction tran)
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection DBConn = GetConn.GetDbConn(GetConn.LoginUser);
            string SP = "";
            //OracleTransaction tran = DBConn.BeginTransaction();
            try
            {
               
                   

                    foreach (ATTApplicationRole obj in applRoleLST)
                    {
                       
                        if(obj.Action=="A")
                        {
                            SP = "CPR_ADD_USER_ROLES";

                            
                                List<OracleParameter> paramList = new List<OracleParameter>();
                                paramList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", obj.ApplicationID, OracleDbType.Varchar2, ParameterDirection.Input));
                                paramList.Add(SqlHelper.GetOraParam(":P_USER_ID", obj.UserID, OracleDbType.Varchar2, ParameterDirection.Input));
                                paramList.Add(SqlHelper.GetOraParam(":P_ROLE_ID", obj.RoleID, OracleDbType.Varchar2, ParameterDirection.Input));
                                paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                                paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));
                                paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                                paramList.Add(SqlHelper.GetOraParam(":P_AUTH_NO", obj.AuthNo, OracleDbType.Varchar2, ParameterDirection.Input));
                                paramList.Add(SqlHelper.GetOraParam(":P_AUTH_BY", obj.AuthBy, OracleDbType.Varchar2, ParameterDirection.Input));
                                paramList.Add(SqlHelper.GetOraParam(":P_AUTH_DATE", obj.AuthDate, OracleDbType.Varchar2, ParameterDirection.Input));
                                paramList.Add(SqlHelper.GetOraParam(":P_TRAN_DATE", obj.TranDate, OracleDbType.Varchar2, ParameterDirection.Input));

                                SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());

                                paramList.Clear();                            
                        }                       
                    }        

                return true;

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
