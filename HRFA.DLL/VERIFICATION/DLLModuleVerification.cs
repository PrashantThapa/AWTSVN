﻿using System;
using System.Collections.Generic;
using System.Linq;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
	public class DLLModuleVerification
	{
		public List<ATTModuleVerification> GetUnverifiedModulesWithCount(int roleID)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
			try
			{

				string SP = "CPR_GET_UNVERIFIED_MODULE";
				List<OracleParameter> ParamList = new List<OracleParameter>();
				//ParamList.Add(SqlHelper.GetOraParam(":P_USER_ID", userID.ToUpper(), OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_ROLE_ID", roleID, OracleDbType.Int64, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, ParamList.ToArray());   //

				List<ATTModuleVerification> lst = new List<ATTModuleVerification>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTModuleVerification obj = new ATTModuleVerification();
					obj.RoleID = int.Parse(drow["ROLE_ID"].ToString());
					obj.ModuleID = drow["MODULE_ID"].ToString();
					obj.ModuleCount = drow["MODULE_COUNT"].ToString();
					obj.VerifyLevel = int.Parse(drow["VERI_LEVEL"].ToString());
					obj.EntryBY = drow["ENTRY_BY"].ToString();
					obj.Action = "";
					lst.Add(obj);
				}
				lst = lst.OrderBy(x => x.RoleID).ThenBy(x => x.ModuleID).ToList();

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


		//NB: Getting Transaction while clicking row of Modules-------------------------------------------------------------------------------------------
		public List<ATTTranAuthentication> GetUnverifiedTransactions(string roleID, string moduleID)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
			try
			{

				string SP = "CPR_GET_UNVERIFIED_TRANSACTION";
				List<OracleParameter> ParamList = new List<OracleParameter>();
				ParamList.Add(SqlHelper.GetOraParam(":P_MODULE_ID", moduleID, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_ROLE_ID", roleID, OracleDbType.Varchar2, ParameterDirection.Input));
				ParamList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, ParamList.ToArray());

				List<ATTTranAuthentication> lst = new List<ATTTranAuthentication>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTTranAuthentication obj = new ATTTranAuthentication();
					obj.TranNo = double.Parse(drow["TRAN_NO"].ToString());
					obj.PreviousStatus = drow["PREV_STATUS"].ToString();
					obj.Remarks = drow["VERIFIED_STATUS"].ToString();
					obj.Action = "";
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

		// NB: Search Module By Module Name
		//    public List<ATTModuleVerification> SearchModuleByName(ATTModuleVerification objSearch)
		//    {
		//        GetConnection GetConn = new GetConnection();
		//        OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
		//        try
		//        {
		//            string SP = "CPR_GET_UNVERI_MODULE_SEARCH";
		//            List<OracleParameter> ParamList = new List<OracleParameter>();
		//ParamList.Add(SqlHelper.GetOraParam(":P_ROLE_ID", roleID, OracleDbType.Int64, ParameterDirection.Input));
		//ParamList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

		//DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, ParamList.ToArray());

		//            List<ATTModuleVerification> lst = new List<ATTModuleVerification>();

		//            foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
		//            {
		//                ATTModuleVerification obj = new ATTModuleVerification();
		//	obj.roleID = int.Parse(drow["roleID"].ToString());

		//	obj.ModuleID = drow["MODULE_ID"].ToString();
		//	obj.ModuleCount = drow["MODULE_COUNT"].ToString();

		//	obj.VerifyLevel = int.Parse(drow["VERI_LEVEL"].ToString());
		//	//obj.UnverifiedTransactions = UnverifiedTransaction.GetUnverifiedTransactions(obj.ApplicationID, obj.ModuleID, obj.VMFromDate, obj.UserID, obj.VerifyLevel, user);
		//	obj.Action = "";
		//	lst.Add(obj);
		//            }
		//            return lst;
		//        }
		//        catch (Exception ex)
		//        {

		//            throw (ex);
		//        }
		//        finally
		//        {
		//            GetConn.CloseDbConn();
		//        }


		//    }



	}
}
