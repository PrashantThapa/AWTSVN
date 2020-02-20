﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using HRFA.ATT.REPORTING;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer.REPORTING
{
    public class DLLRepHoliday

	{
		public List<ATTRepHoliday> GetHolidayReport(string fromdate, string todate)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUsers);

			try
			{
				//string SP = "RPR_HOLIDAY_DET";
				string SP = "RPR_HOLIDAY_DET";


				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", fromdate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", todate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTRepHoliday> lst = new List<ATTRepHoliday>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTRepHoliday obj = new ATTRepHoliday();

					obj.HOLIDAY_ID = string.IsNullOrEmpty(drow["HOLIDAY_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["HOLIDAY_ID"].ToString());
					obj.HOLIDAY_DESC = drow["HOLIDAY_DESC"].ToString();
					obj.FROM_DATE = drow["FROM_DATE"].ToString();
					obj.TO_DATE = drow["TO_DATE"].ToString();
					obj.FIXED_HOLIDAYS = drow["FIXED_HOLIDAYS"].ToString();

					lst.Add(obj);

				}
				return lst;
			}
			catch (Exception ex)
			{
				return new List<ATTRepHoliday > ();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

		public List<ATTRepHoliday> GetHolidayReports(string fromdate, string todate)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

			try
			{
				string SP = "RPR_HOLIDAY_DET";

				//string SP = "RPR_HOLIDAY_DET";

				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", fromdate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", todate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTRepHoliday> lst = new List<ATTRepHoliday>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTRepHoliday obj = new ATTRepHoliday();

					obj.HOLIDAY_ID = string.IsNullOrEmpty(drow["HOLIDAY_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["HOLIDAY_ID"].ToString());
					obj.HOLIDAY_DESC = drow["HOLIDAY_DESC"].ToString();
					obj.FROM_DATE = drow["FROM_DATE"].ToString();
					obj.TO_DATE = drow["TO_DATE"].ToString();
					obj.FIXED_HOLIDAYS = drow["FIXED_HOLIDAYS"].ToString();

					lst.Add(obj);

				}
				return lst;
			}
			catch (Exception ex)
			{
				return new List<ATTRepHoliday>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}


	}
}