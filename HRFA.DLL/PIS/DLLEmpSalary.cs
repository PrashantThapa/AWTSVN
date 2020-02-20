﻿using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT.PIS;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer.PIS
{
	public class DLLEmpSalary
	{
		public ATTEmpSalary ViewReport(int? OfficeCD, int? CostCenterID, int? SalYear, int? SalMonth)
		{
			GetConnection getConn = new GetConnection();
			OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

			try
			{
				string SP = "RPR_GET_SALARY_ITEM";

				List<OracleParameter> paramList = new List<OracleParameter>();
				paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", OfficeCD, OracleDbType.Int16, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_COSTCENTER", CostCenterID, OracleDbType.Int16, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_SAL_YEAR", SalYear, OracleDbType.Int16, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_SAL_MONTH", SalMonth, OracleDbType.Int16, ParameterDirection.Input));

				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());
				DataRow drow = ds.Tables[0].Rows[0];

				ATTEmpSalary objEmpSalary = new ATTEmpSalary();

				objEmpSalary.OfficeNameNepali = drow["OFFICE_NAME_NEPALI"].ToString();
				//objEmpSalary.EmpID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());
				objEmpSalary.EmpName = drow["EMP_NAME"].ToString();
				objEmpSalary.EditedAmount = string.IsNullOrEmpty(drow["EDITED_AMOUNT"].ToString()) ? (Int16?)null : Int16.Parse(drow["EDITED_AMOUNT"].ToString());
				objEmpSalary.CostCenterName = drow["COSTCENTER_NAME"].ToString();
				objEmpSalary.PostDesc = drow["POST_DESC"].ToString();


				return objEmpSalary;
			}
			catch (Exception ex)
			{

				throw (ex);
			}
			finally
			{
				getConn.CloseDbConn();
			}
		}
	}
}
