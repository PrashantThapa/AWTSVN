using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using HRFA.ATT.REPORTING;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer.REPORTING
{
    public class DLLRepEmployeePostHist
	{
		public List<ATTRepEmployeePostHistory> GetEmployeePostHistory(string SymbolNo)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

			try
			{

				string SP = "RPR_GET_EMPLOYEE_POST_HIST";

				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_SYMBOL_NO", SymbolNo, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTRepEmployeePostHistory> lst = new List<ATTRepEmployeePostHistory>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTRepEmployeePostHistory obj = new ATTRepEmployeePostHistory();

					obj.SYMBOL_NO = drow["SYMBOL_NO"].ToString();
					obj.EMP_ID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["EMP_ID"].ToString());
					obj.POST_ID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["POST_ID"].ToString());
					obj.POST_DESC = drow["POST_DESC"].ToString();
					obj.POSTING_TYPE_ID = drow["POSTING_TYPE_ID"].ToString();
					obj.FROM_DATE = drow["FROM_DATE"].ToString();
					obj.DECISION_DATE = drow["DECISION_DATE"].ToString();

					lst.Add(obj);

				}
				return lst;
			}
			catch (Exception ex)
			{
				return new List<ATTRepEmployeePostHistory>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

	}
}
