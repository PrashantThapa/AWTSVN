using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLPortalLogin
    {

		public ATTPortalLogin PortalLogin(ATTPortalLogin user)
		{
			GetConnection dbConn = new GetConnection();
			OracleConnection connection = dbConn.GetDbConn();
			DLLOfficeUser offUserDao = new DLLOfficeUser();
			DLLMenu dllMenu = new DLLMenu();

			try
			{
				string SP = "CPR_GET_PORTAL_LOGIN";// "CPR_get_USERS_OFFICE";
												   //string SP = "CPR_get_USERS_OFFICE";
				List<OracleParameter> paramList = new List<OracleParameter>();


				paramList.Add(SqlHelper.GetOraParam(":P_USER_ID", user.UserID, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_U_PASSWORD", user.Password, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_SSF_ID", user.SSID, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_UTYPE", user.UType, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(CommandType.StoredProcedure, SP, paramList.ToArray());

				paramList.Clear();

				if (ds.Tables[0].Rows.Count > 0)
				{

					user.LoggedIn = true;
					if (user.UType == "E" || user.UType == "A")
					{
						ATTPortalLogin objPortal = new ATTPortalLogin();

						DLLPortalLogin objdllBFI = new DLLPortalLogin();

						objPortal = objdllBFI.GetBFIIDByUserID(user.UserID, connection);
						user.OfficeCD = objPortal.OfficeCD;
						user.OfficeNameNepali = objPortal.OfficeNameNepali;
						user.EmpID = objPortal.EmpID;
						user.UserID = objPortal.UserID;
						user.UserName = objPortal.UserName;
						user.Menus = dllMenu.GetMenuListByPortalUser(user);

						return user;
					}
				}
				else
				{
					user.LoggedIn = false;
					return null;
					//PortalLogin.LoggedIn = false;
					//return null;
				}
				user.LoggedIn = true;
				return user;

			}
			catch (Exception ex)
			{
				//user.LoggedIn = false;
				//gc.CloseDbConn();
				//throw (new Exception("" + oex.Message));
				throw new Exception(ex.Message);
			}
			//finally
			//{
			//	gc.CloseDbConn();
			//}


		}



		public string SaveChangePassword(ATTPortalLogin objChangePassword)
        {
            string msg = "";
            string SP = "CPR_CHANGE_PORTAL_LOGINPW";

            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn();
            OracleTransaction tran = dbConn.BeginTransaction();

            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_USER_ID", objChangePassword.UserID, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_BFIID", objChangePassword.EmpID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_OLD_PASSWORD", objChangePassword.OldPassword, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_UPASSWORD", objChangePassword.NewPassword, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());

                tran.Commit();

                msg = "Successfully Changed";

            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw new Exception("Error" + ex.Message);
            }

            finally
            {
                conn.CloseDbConn();

            }
            return msg;
        }

        public ATTPortalLogin GetBFIIDByUserID(string essID, OracleConnection conn)
        {
            try
            {



                string sp = "CPR_GET_EMP_DET";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_USERID", essID, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
               // paramList.Add(SqlHelper.GetOraParam(":p_status", 'V', OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, sp, paramList.ToArray());
                ATTPortalLogin objATTPortalLogin = new ATTPortalLogin();

                if (ds.Tables[0].Rows.Count > 0)
                {
                    DataRow dr = ((DataTable)ds.Tables[0]).Rows[0];
                    
                    objATTPortalLogin.UserID = DBNull.Value.Equals(dr["USER_ID"])?string.Empty: dr["USER_ID"].ToString();
                    objATTPortalLogin.UserName = DBNull.Value.Equals(dr["EMP_NAME"]) ? string.Empty : dr["EMP_NAME"].ToString();
                    objATTPortalLogin.EmpID = DBNull.Value.Equals(dr["EMP_ID"]) ? (Int64?)null : Int64.Parse(dr["EMP_ID"].ToString());
                    objATTPortalLogin.OfficeCD = DBNull.Value.Equals(dr["OFFICE_CD"]) ? (Int64?)null : Int64.Parse(dr["OFFICE_CD"].ToString());
                    objATTPortalLogin.OfficeNameNepali = DBNull.Value.Equals(dr["OFFICE_NAME_NEPALI"]) ? string.Empty : dr["OFFICE_NAME_NEPALI"].ToString();
                }

                return objATTPortalLogin;

            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                conn.Close();

            }

        }
              
    }
}
