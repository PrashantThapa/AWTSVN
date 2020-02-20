using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using HRFA.ATT.REPORTING;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer.REPORTING
{
    public class DLLRepAttendence
	{
		public List<ATTRepAttendence> GetAttendenceReport(string fromdate, string todate, string symbolNO, Int64? officeCD)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUsers);

			try
			{
				string SP = "RPR_ATTENDANCE_DET";


				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", officeCD, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_SYMBOL_NO", symbolNO, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", fromdate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", todate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTRepAttendence> lst = new List<ATTRepAttendence>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTRepAttendence obj = new ATTRepAttendence();

					obj.POST_DESC = drow["POST_DESC"].ToString();
					obj.POST_DESC_ENG = string.IsNullOrEmpty(drow["POST_DESC_ENG"].ToString()) ? (Int64?)null : Int64.Parse(drow["POST_DESC_ENG"].ToString());
					obj.POST_ID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["POST_ID"].ToString());
					obj.EMP_ID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["EMP_ID"].ToString());
					obj.ATT_DATE = drow["ATT_DATE"].ToString();
					obj.IN_TIME = drow["IN_TIME"].ToString();
					obj.OUT_TIME = drow["OUT_TIME"].ToString();
					obj.SYMBOL_NO = drow["SYMBOL_NO"].ToString();
					obj.EMP_NAME = drow["EMP_NAME"].ToString();
					obj.OFFICE_NAME_NEPALI = drow["OFFICE_NAME_NEPALI"].ToString();
					obj.OFFICE_CD = string.IsNullOrEmpty(drow["OFFICE_CD"].ToString()) ? (Int64?)null : Int64.Parse(drow["OFFICE_CD"].ToString());

					lst.Add(obj);

				}
				return lst;
			}
			catch (Exception ex)
			{
				return new List<ATTRepAttendence>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

	}
}
