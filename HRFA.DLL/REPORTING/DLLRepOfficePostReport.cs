﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using HRFA.ATT.REPORTING;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer.REPORTING
{
    public class DLLRepOfficePostReport
	{
		public List<ATTRepOfficePostReport> GetPostReport(Int64 officecd, Int64 postid)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

			try
			{
				//string SP = "RPR_GET_OFFICE_DARBANDI_DET";
				string SP = "RPR_GET_OFFICE_DARBANDI_DET";


				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CODE", officecd, OracleDbType.Int64, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_POST_ID", postid, OracleDbType.Int64, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTRepOfficePostReport> lst = new List<ATTRepOfficePostReport>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTRepOfficePostReport obj = new ATTRepOfficePostReport();

					obj.OFFICE_CD = string.IsNullOrEmpty(drow["OFFICE_CODE"].ToString()) ? (Int64?)null : Int64.Parse(drow["OFFICE_CODE"].ToString());
					obj.POST_ID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["POST_ID"].ToString());
					obj.TOTAL_SEAT = drow["TOTAL_SEAT"].ToString();
					obj.OCCUPIED = drow["OCCUPIED"].ToString();
					obj.VACANT = drow["VACANT"].ToString();
					obj.POST_DESC = drow["POST_DESC"].ToString();
					obj.OFFICE_NAME_NEPALI = drow["OFFICE_NAME_NEPALI"].ToString();

					lst.Add(obj);

				}
				return lst;
			}
			catch (Exception ex)
			{
				return new List<ATTRepOfficePostReport>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

	}
}