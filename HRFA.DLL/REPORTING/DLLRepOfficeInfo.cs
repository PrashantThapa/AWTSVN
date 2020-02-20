using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using HRFA.ATT.REPORTING;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer.REPORTING
{
    public class DLLRepOfficeInfo
	{
		public List<ATTRepOfficeEmployeeInfoReport> GetEmployeeInfo(Int64 officecd)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

			try
			{
				//string SP = "RPR_GET_OFFICEWISE_EMPLOYEE";

				string SP = "RPR_GET_OFFICEWISE_EMPLOYEE";


				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", officecd, OracleDbType.Int64, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTRepOfficeEmployeeInfoReport> lst = new List<ATTRepOfficeEmployeeInfoReport>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTRepOfficeEmployeeInfoReport obj = new ATTRepOfficeEmployeeInfoReport();

					obj.EMP_NAME = drow["EMP_NAME"].ToString();
					obj.SYMBOL_NO = drow["SYMBOL_NO"].ToString();
					obj.EMP_ID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["EMP_ID"].ToString());
					obj.POST_ID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["POST_ID"].ToString());
					obj.JOINING_DATE = drow["JOINING_DATE"].ToString();
					obj.OFFICE_CD = string.IsNullOrEmpty(drow["OFFICE_CD"].ToString()) ? (Int64?)null : Int64.Parse(drow["OFFICE_CD"].ToString());
					obj.OFFICE_NAME_NEPALI = drow["OFFICE_NAME_NEPALI"].ToString();
					obj.POST_DESC = drow["POST_DESC"].ToString();
				
					lst.Add(obj);

				}
				return lst;
			}
			catch (Exception ex)
			{
				return new List<ATTRepOfficeEmployeeInfoReport>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

	}
}
