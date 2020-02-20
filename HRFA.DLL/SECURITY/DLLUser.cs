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
	public class DLLUser
	{


		public List<ATTUser> GetUsers()
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
			string SP = "CPR_GET_OFFICE_USERS";
			List<OracleParameter> paramList = new List<OracleParameter>();
			paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
			paramList.Add(SqlHelper.GetOraParam(":p_off_code", null, OracleDbType.Int32, ParameterDirection.Input));
			DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());
			List<ATTUser> lst = new List<ATTUser>();
			try
			{
				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTUser obj = new ATTUser();
					obj.UserName = drow["USER_NAME"].ToString();


					lst.Add(obj);
				}
			}
			catch (Exception ex)
			{
				throw (new Exception("" + ex.Message));

			}
			finally
			{
				GetConn.CloseDbConn();
			}

			return lst;
		}

		public List<ATTUser> GetOfficeUsers(int? officeCode)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
			try
			{
				string SP = "CPR_get_OFFICE_USERS";

				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
				paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CODE", officeCode, OracleDbType.Int32, ParameterDirection.Input));
				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTUser> lst = new List<ATTUser>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTUser obj = new ATTUser();

					obj.UserID = drow["USER_ID"].ToString();
					obj.UserName = drow["USER_NAME"].ToString();

					//obj.UserName = drow["USER_NAME"].ToString();

					lst.Add(obj);
				}
				return lst;
			}
			catch (Exception)
			{
				return new List<ATTUser>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}
		public List<ATTUser> GetOfficeUsersForUV()
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
			try
			{
				string SP = "CPR_get_OFFICE_USERS";

				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
				paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CODE", null, OracleDbType.Int32, ParameterDirection.Input));
				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTUser> lst = new List<ATTUser>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTUser obj = new ATTUser();

					obj.UserID = drow["USER_ID"].ToString();
					obj.UserName = drow["USER_NAME"].ToString();
					//obj.UserID = drow["USER_ID"].ToString();
					//obj.UserName = drow["USER_NAME"].ToString();

					lst.Add(obj);
				}
				return lst;
			}
			catch (Exception)
			{
				return new List<ATTUser>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

		public ATTUser LogIn(ATTUser user)
		{
			GetConnection gc = new GetConnection();
			OracleConnection objConn;
			DLLOfficeUser offUserDao = new DLLOfficeUser();
			DLLMenu dllMenu = new DLLMenu();

			try
			{
				objConn = gc.GetDbConn(user);
				user.LoggedIn = true;
				user.OfficeUser = offUserDao.GetUserOffice(user.UserID, user.Password, user);
				user.Menus = dllMenu.GetMenuListByUser(user, user.OfficeUser.RoleID);
			}
			catch (OracleException oex)
			{
				user.LoggedIn = false;
				gc.CloseDbConn();
				throw (new Exception("" + oex.Message));
			}
			finally
			{
				gc.CloseDbConn();
			}
			return user;

		}

		public bool SaveChangePassword(ATTUser objUser)
		{
			GetConnection conn = new GetConnection();

			OracleTransaction tran = conn.GetDbConn(conn.LoginUser).BeginTransaction();
			string SP = "CPR_CHANGE_DB_USER_PASSWORD";

			try
			{
				List<OracleParameter> paramList = new List<OracleParameter>();
				paramList.Add(SqlHelper.GetOraParam("P_USER_ID", objUser.UserID, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam("P_PASSWORD", objUser.Password, OracleDbType.Varchar2, ParameterDirection.Input));
				SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
				tran.Commit();
				return true;
			}
			catch (Exception ex)
			{
				tran.Rollback();
				throw ex;
			}
			finally
			{
				conn.CloseDbConn();
			}

		}


		public ATTUser GetUserDetails(string userID)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
			try
			{
				string SP = "CPR_get_USERS_BY_ID";

				List<OracleParameter> paramList = new List<OracleParameter>();


				paramList.Add(SqlHelper.GetOraParam(":P_user_ID", userID, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				ATTUser objUser = new ATTUser();

				if ((ds.Tables[0]).Rows.Count > 0)
				{
					DataRow drow = (ds.Tables[0]).Rows[0];

					objUser.UserID = drow["USER_ID"].ToString();
					objUser.UserName = drow["USER_NAME"].ToString();
					objUser.AccountStatus = drow["ACCOUNT_STATUS"].ToString();
					//objUser.TranDate = drow["TRAN_DATE"].ToString();
					//objUser.Machine = drow["MACHINE"].ToString();
					//objUser.IPAddress = drow["IP_ADDRESS"].ToString();
					objUser.Action = "E";
					objUser.EmpID = drow["EMP_ID"].ToString();
					objUser.EmployeeName = drow["EMP_NAME"].ToString();
					objUser.UserNameNep = drow["USER_NAME_NEPALI"].ToString();
					DLLApplicationRole dllApplicationRole = new DLLApplicationRole();
					DLLUserDesignation dllUserDesignation = new DLLUserDesignation();
					objUser.UserDesignation = dllUserDesignation.GetUserDesignationBYUserId(userID);
					DLLModuleFunction dllModuleFunction = new DLLModuleFunction();
					objUser.UserModuleFunctions = dllModuleFunction.GetModuleFunctionsBYUserId(userID);
				}

				return objUser;
			}
			catch (Exception ex)
			{
				return new ATTUser();
			}
			finally
			{
				GetConn.CloseDbConn();
			}


		}

		//NB: Submit---------------------------------------------------
		public string SaveUser(ATTUser objUser)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection DBConn = GetConn.GetDbConn(GetConn.LoginUser);
			OracleTransaction tran = DBConn.BeginTransaction();


			try
			{
				string SP = "CPR_ADD_USER";
				List<OracleParameter> paramList = new List<OracleParameter>();
				//objUser.IPAddress = "";

				paramList.Add(SqlHelper.GetOraParam(":P_USER_ID", objUser.UserID.Trim(), OracleDbType.Varchar2, ParameterDirection.InputOutput));
				paramList.Add(SqlHelper.GetOraParam(":P_USER_NAME", objUser.UserName, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_ACCOUNT_STATUS", objUser.AccountStatus, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_EMP_ID", objUser.EmpID, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_USER_NAME_NEPALI", objUser.UserName, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_ROLE_ID", objUser.RoleID, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":p_office_cd", objUser.OfficeCode, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":p_password", objUser.Password, OracleDbType.Varchar2, ParameterDirection.Input));

				SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());

				paramList.Clear();

				tran.Commit();

				return "Added Successfully !!!";


			}   //NB: End of Else

			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

		public string DeleteAssignModule(string appID, string userID, string moduleID, string funCD, string toDate)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection DBConn = GetConn.GetDbConn();
			OracleTransaction tran = DBConn.BeginTransaction();
			try
			{
				string SP = "CPR_DEL_SEC_USER_MODULE_FUNCS";
				List<OracleParameter> ParamList = new List<OracleParameter>();
				ParamList.Add(SqlHelper.GetOraParam(":P_TO_DATE", toDate, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_USER_ID", userID, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_MODULE_ID", moduleID, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", appID, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_FUN_CD", funCD, OracleDbType.Int32, ParameterDirection.Input));

				SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, ParamList.ToArray());

				//SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, SP, ParamList.ToArray());
				tran.Commit();
				return "Deleted Successfully !!!";
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}
		public string DeleteAssignedRole(string applicationId, string userID, string roleID, string fromDate, string toDate)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection DBConn = GetConn.GetDbConn();
			OracleTransaction tran = DBConn.BeginTransaction();
			try
			{
				string SP = "CPR_DEL_user_roles";
				List<OracleParameter> ParamList = new List<OracleParameter>();
				ParamList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", applicationId, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_USER_ID", userID, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_ROLE_ID", roleID, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", fromDate, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_TO_DATE", toDate, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", null, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_AUTH_NO", null, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_AUTH_BY", null, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_AUTH_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_TRAN_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));

				SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, ParamList.ToArray());
				tran.Commit();
				return "Deleted Successfully !!!";
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}


		public string DeleteAssignedModule(string applicationId, string roleId, string fromDate, string userId)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn();


			try
			{
				string SP = "CPR_DEL_user_roles";

				List<OracleParameter> ParamList = new List<OracleParameter>();
				ParamList.Add(SqlHelper.GetOraParam(":p_application_id", applicationId, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":p_user_id", userId, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":p_role_id", roleId, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":p_from_date", fromDate, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", null, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_AUTH_NO", null, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_AUTH_BY", null, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_AUTH_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_TRAN_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));

				SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, SP, ParamList.ToArray());

				return "Deleted Successfully.";
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

		//new to delete mahuli
		public string DeleteAssignedModuleFunction(string applicationId, string moduleId, string funCD, string userId, string fromDate)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn();



			try
			{
				string SP = "CPR_DEL_SEC_USER_MODULE_FUNCS";
				List<OracleParameter> ParamList = new List<OracleParameter>();
				ParamList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", fromDate, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_TO_DATE", null, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_USER_ID", userId, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_MODULE_ID", moduleId, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", applicationId, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":p_user_id", funCD, OracleDbType.Varchar2, ParameterDirection.Input));


				SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, SP, ParamList.ToArray());

				return "Deleted Successfully.";
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}
	}
}
