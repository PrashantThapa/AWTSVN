using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLUserDesignation
    {
        public  List<ATTUserDesignationLoad> GetUserDesignation()
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            try
            {
                string SP = "CPR_GET_DESIGNATION";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_USER_ID", null, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTUserDesignationLoad> lst = new List<ATTUserDesignationLoad>();

                if ((ds.Tables[0]).Rows.Count > 0)
                {
                    foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                    {
                        ATTUserDesignationLoad obj = new ATTUserDesignationLoad();
                        obj.DesID = Convert.ToInt32(drow["DES_ID"].ToString());
                        obj.DesName = drow["DES_NAME"].ToString();
                        obj.DesNameEng = drow["DES_NAME_ENG"].ToString().Trim();
                        obj.Status = drow["STATUS"].ToString();
                        obj.FromDate = drow["FROM_DATE"].ToString();
                        obj.ToDate = drow["TO_DATE"].ToString();
                        obj.EntryBy = drow["ENTRY_BY"].ToString();
                        obj.EntryDate = Convert.ToDateTime(drow["ENTRY_DATE"].ToString());

                        lst.Add(obj);
                    }

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


        public  ATTUserDesignation GetUserDesignationBYUserId(string userID)
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            try
            {
                string SP = "CPR_GET_SEC_USERS_DESIG";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_USER_ID", userID, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                ATTUserDesignation obj = new ATTUserDesignation();

                if ((ds.Tables[0]).Rows.Count > 0)
                {
                    DataRow drow = ((DataTable)ds.Tables[0]).Rows[0];

                    obj.UserID = drow["USER_ID"].ToString();
                    obj.DES_ID = drow["DES_ID"].ToString().Trim();
                }

                return obj;
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


        public bool SaveUserDesignation(ATTUserDesignation obj,string action,OracleTransaction tran)
        {


           GetConnection conn = new GetConnection();
         // OracleTransaction tran = conn.GetDbConn().BeginTransaction();
           try
           {
               if (obj.Action == "A")
               {

                   string SP = "CPR_ADD_SEC_USERS_DESIG";

                   List<OracleParameter> paramList = new List<OracleParameter>();

                   paramList.Add(SqlHelper.GetOraParam(":P_USER_ID", obj.UserID, OracleDbType.Varchar2, ParameterDirection.Input));
                   paramList.Add(SqlHelper.GetOraParam(":P_DES_ID", obj.DES_ID.Trim(), OracleDbType.Varchar2, ParameterDirection.Input));
                   paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                   paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));
                   paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                   paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", obj.EntryDate, OracleDbType.Varchar2, ParameterDirection.Input));
                   paramList.Add(SqlHelper.GetOraParam(":P_AUTH_NO", obj.AuthorizationNo, OracleDbType.Varchar2, ParameterDirection.Input));
                   paramList.Add(SqlHelper.GetOraParam(":P_AUTH_BY", obj.AuthorizationBy, OracleDbType.Varchar2, ParameterDirection.Input));
                   paramList.Add(SqlHelper.GetOraParam(":P_AUTH_DATE", obj.AuthorizationDate, OracleDbType.Varchar2, ParameterDirection.Input));

                   SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());

               }
               return true;
               
           }
           catch (Exception ex)
           {

               throw (ex);
           }
           finally
           {
               conn.CloseDbConn();
           }

        }

    }
}
