﻿using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLOfficeUser
    {
        public ATTOfficeUser GetUserOffice(string userID,string Password, GenericUser user)
        {
            GetConnection GetConn = new GetConnection();
			//OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
			try
            {
                string SP = "CPR_get_USERS_OFFICE";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                paramList.Add(SqlHelper.GetOraParam(":P_USER_ID", userID.ToUpper(), OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam("P_PASSWORD", Password, OracleDbType.Varchar2, ParameterDirection.Input));
				DataSet ds = SqlHelper.ExecuteDataset(user, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTOfficeUser> lst = new List<ATTOfficeUser>();
                ATTOfficeUser obj = new ATTOfficeUser();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    //Office office = new Office();
                    obj.UserName = DBNull.Value.Equals(drow["USER_NAME"]) ? string.Empty : drow["USER_NAME"].ToString();
					obj.RoleID = int.Parse(drow["ROLE_ID"].ToString());
					obj.OfficeCode = int.Parse(drow["office_code"].ToString());
                    obj.OfficeNameNepali = drow["OFFICE_NAME_NEPALI"].ToString();
                    obj.AccountStatus = drow["ACCOUNT_STATUS"].ToString();
                    obj.EmpID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());
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

		public ATTOfficeUser GetUserPortalOffice(string userID, PortalUser user)
		{
			GetConnection GetConn = new GetConnection();
			// OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
			try
			{
				string SP =  "CPR_get_USERS_OFFICE";

				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
				paramList.Add(SqlHelper.GetOraParam(":P_USER_ID", userID.ToUpper(), OracleDbType.Varchar2, ParameterDirection.Input));
				DataSet ds = SqlHelper.ExecutePortalDataset(user, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTOfficeUser> lst = new List<ATTOfficeUser>();
				ATTOfficeUser obj = new ATTOfficeUser();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					//Office office = new Office();
					obj.UserName = DBNull.Value.Equals(drow["USER_NAME"]) ? string.Empty : drow["USER_NAME"].ToString();
					//office.OfficeCode = int.Parse(drow["office_code"].ToString());
					obj.OfficeCode = int.Parse(drow["office_code"].ToString());
					obj.OfficeNameNepali = drow["OFFICE_NAME_NEPALI"].ToString();
					obj.AccountStatus = drow["ACCOUNT_STATUS"].ToString();
					obj.EmpID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());

					//obj.UserID = drow["USER_ID"].ToString();
					//obj.UserName = drow["USER_NAME"].ToString();
					//obj.Office = office;

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


		internal ATTOfficeUser GetUserOffice(string userID, ATTPortalLogin user)
		{
			throw new NotImplementedException();
		}

		public bool SaveOfficeUser(ATTOfficeUser objOfficeUser,string action, OracleTransaction tran)
        {
            try
            {
                string SP = "";

                if (action=="E")
                {
                    return false;
                }//NB: End of if
                else
                {
                    SP = "CPR_ADD_OFFICE_USERS";

                    List<OracleParameter> paramList = new List<OracleParameter>();

                    paramList.Add(SqlHelper.GetOraParam(":P_ OFFICE_CODE", objOfficeUser.OfficeCode, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_USER_ID", objOfficeUser.UserID, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objOfficeUser.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objOfficeUser.ToDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_AUTH_NO", objOfficeUser.AuthorizationNo, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_AUTH_BY", objOfficeUser.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_AUTH_DATE", objOfficeUser.EntryDate, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objOfficeUser.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objOfficeUser.EntryDate, OracleDbType.Varchar2, ParameterDirection.Input));

                    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());

                    paramList.Clear();
                
                }  //NB:End of Else



                return true;

            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }
    }
}