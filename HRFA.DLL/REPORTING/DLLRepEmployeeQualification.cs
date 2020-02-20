﻿using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLRepEmployeeQualification
	{
		public List<ATTRepEmployeeDetails> GetEmployeeQualification(Int64 pid)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

			try
			{
				string SP = "RPR_GET_PERSON_QUALIFICATION";

				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_P_ID", pid, OracleDbType.Int64, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTRepEmployeeDetails> lst = new List<ATTRepEmployeeDetails>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTRepEmployeeDetails obj = new ATTRepEmployeeDetails();

					obj.P_ID = string.IsNullOrEmpty(drow["P_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["P_ID"].ToString());
					obj.COUNTRY_CD = drow["COUNTRY_CD"].ToString();
					obj.EDUCATION_EQUIVALENCE = drow["EDUCATION_EQUIVALENCE"].ToString();
					obj.FROM_DATE = drow["FROM_DATE"].ToString();
					obj.GRADE = drow["GRADE"].ToString();
					obj.INSTITUTE = drow["INSTITUTE"].ToString();
					obj.MAJOR_SUBJECT = drow["MAJOR_SUBJECT"].ToString();
					obj.OPTIONAL_SUBJECT = drow["OPTIONAL_SUBJECT"].ToString();
					obj.PERCENTAGE = string.IsNullOrEmpty(drow["PERCENTAGE"].ToString()) ? (Int64?)null : Int64.Parse(drow["PERCENTAGE"].ToString());
					obj.REMARKS = drow["REMARKS"].ToString();
					obj.TITLE = drow["TITLE"].ToString();
					obj.TO_DATE = drow["TO_DATE"].ToString();
					obj.QUAL_ID = string.IsNullOrEmpty(drow["QUAL_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["QUAL_ID"].ToString());
					obj.QUAL_NAME = drow["QUAL_NAME"].ToString();
					obj.COUNTRY_NAME = drow["COUNTRY_NAME"].ToString();


					//obj.SYMBOL_NO = drow["SYMBOL_NO"].ToString();
					//obj.CIT_NO = drow["CIT_NO"].ToString();
					//obj.EMP_ID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["EMP_ID"].ToString());
					//obj.IDENTITY_MARK = drow["IDENTITY_MARK"].ToString();
					//obj.PROVIDENT_FUND_NO = drow["PROVIDENT_FUND_NO"].ToString();
					////obj.IMAGE_FILE = drow.  Convert.ToByte(drow["IMAGE_FILE"]);
					//obj.IMAGE_FILE = drow["IMAGE_FILE"].ToString();
					//obj.ALERT_SOURCE = drow["ALERT_SOURCE"].ToString();
					//obj.ALT_SOURCE_VAL = drow["ALT_SOURCE_VAL"].ToString();
					////obj.COUNTRY_CODE = drow["COUNTRY_CODE"] == null ? (Int64?)null : Int64.Parse(drow["COUNTRY_CODE"].ToString());
					//obj.DOB = drow["DOB"].ToString();
					//obj.GENDER = drow["GENDER"].ToString();
					//obj.REL_ID = drow["REL_ID"] == null ? (Int64?)null : Int64.Parse(drow["REL_ID"].ToString());
					//obj.P_ID = string.IsNullOrEmpty(drow["P_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["P_ID"].ToString());
					//obj.EMP_NAME_NEP = drow["EMP_NAME_NEP"].ToString();
					//obj.EMP_NAME_ENG = drow["EMP_NAME_ENG"].ToString();
					//obj.MARST_ID = drow["MARST_ID"] == null ? (Int64?)null : Int64.Parse(drow["MARST_ID"].ToString());
					//obj.MARST_NAME = drow["MARST_NAME"].ToString();
					//obj.COUNTRY_NAME = drow["COUNTRY_NAME"].ToString();
					//obj.REL_NAME = drow["REL_NAME"].ToString();
					//obj.OFFICE_NAME_NEPALI = drow["OFFICE_NAME_NEPALI"].ToString();
					//obj.POST_DESC = drow["POST_DEC"].ToString();
					//obj.POST_DESC_ENG = drow["POST_DESC_ENG"].ToString();
					//obj.POST_ID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["POST_ID"].ToString());



					lst.Add(obj);

				}
				return lst;
			}
			catch (Exception ex)
			{
				return new List<ATTRepEmployeeDetails>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

	}

}
