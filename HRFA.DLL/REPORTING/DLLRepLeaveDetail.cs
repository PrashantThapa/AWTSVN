using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT.REPORTING;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer.REPORTING
{
    public class DLLRepLeaveDetail
	{
		public List<ATTRepLeaveDetail> GetLeaveDetail( Int64? empId)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUsers);

			try
			{
				string SP = "RPR_LEAVE_DETAIL";

				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_EMP_ID", empId, OracleDbType.Int64, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTRepLeaveDetail> lst = new List<ATTRepLeaveDetail>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTRepLeaveDetail obj = new ATTRepLeaveDetail();

					obj.EMP_ID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["EMP_ID"].ToString());
					obj.APP_NO_OF_DAYS = drow["APP_NO_OF_DAYS"].ToString();
					obj.APP_FROM_DATE = drow["APP_FROM_DATE"].ToString();
					obj.REMARKS = drow["REMARKS"].ToString();
					obj.L_TYPE_ID = string.IsNullOrEmpty(drow["L_TYPE_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["L_TYPE_ID"].ToString());
					obj.FORWARDED_TO = string.IsNullOrEmpty(drow["FORWARDED_TO"].ToString()) ? (Int64?)null : Int64.Parse(drow["FORWARDED_TO"].ToString());
					obj.APP_STATUS = drow["APP_STATUS"].ToString();
					obj.LEAVE_TYPE_NAME = drow["LEAVE_TYPE_NAME"].ToString();
					obj.APP_TO_DATE = drow["APP_TO_DATE"].ToString();
					obj.APP_DATE = drow["APP_DATE"].ToString();
					obj.EMP_NAME = drow["EMP_NAME"].ToString();
					obj.FORWARDED_EMP = drow["FORWARDED_EMP"].ToString();
					obj.C_FROM_DATE = drow["C_FROM_DATE"].ToString();
					obj.C_NO_OF_DAYS = string.IsNullOrEmpty(drow["C_NO_OF_DAYS"].ToString()) ? (Int64?)null : Int64.Parse(drow["C_NO_OF_DAYS"].ToString());
					obj.C_TO_DATE = drow["C_TO_DATE"].ToString();
					obj.CANCEL_DATE = drow["CANCEL_DATE"].ToString();
					obj.CANCEL_REASON = drow["CANCEL_REASON"].ToString();

					lst.Add(obj);

				}
				return lst;
			}
			catch (Exception ex)
			{
				return new List<ATTRepLeaveDetail>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

	}
}
