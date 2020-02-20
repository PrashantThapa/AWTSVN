using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using HRFA.ATT.REPORTING;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer.REPORTING
{
    public class DLLRepShiftSchedule
	{
		public List<ATTRepShiftSchedule> GetShiftScheduleReport(Int64 officecd, Int64 deptid)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

			try
			{
				string SP = "RPR_SHIFT_SCHEDULE_INFO";

				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", officecd, OracleDbType.Int64, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_DEPT_ID", deptid, OracleDbType.Int64, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTRepShiftSchedule> lst = new List<ATTRepShiftSchedule>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTRepShiftSchedule obj = new ATTRepShiftSchedule();

					obj.OFFICE_CD = string.IsNullOrEmpty(drow["OFFICE_CD"].ToString()) ? (Int64?)null : Int64.Parse(drow["OFFICE_CD"].ToString());
					obj.DEPT_ID = string.IsNullOrEmpty(drow["DEPT_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["DEPT_ID"].ToString());
					obj.OFFICE_NAME_NEPALI = drow["OFFICE_NAME_NEPALI"].ToString();
					obj.DEPT_DESC = drow["DEPT_DESC"].ToString();
					obj.SHIFT_NAME = drow["SHIFT_NAME"].ToString();
					obj.SCHEDULE = drow["SCHEDULE"].ToString();
					
					lst.Add(obj);

				}
				return lst;
			}
			catch (Exception ex)
			{
				return new List<ATTRepShiftSchedule>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

	}
}
