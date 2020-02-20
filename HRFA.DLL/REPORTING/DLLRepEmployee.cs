using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using HRFA.ATT.REPORTING;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public static class conversion
	{
		//public static Stream ToStream(this byte byteArray)
		//{
		//	OracleBinary obj = reader.GetOracleBinary(5);
		//	byte[] bytes = obj.Value;
		//	int value = BitConverter.ToInt32(bytes);
		//}
		//	Stream stream = new MemoryStream(byteArray);
		//	return stream;
		//}\
	}
		public class DLLRepEmployee
	{
		public List<ATTRepEmployeeDetail> GetEmployeeDetails(string SymbolNo)
		{
			GetConnection GetConn = new GetConnection();
			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

			try
			{
				string SP = "RPR_GET_EMP_PERSON";

				//string SP = "RPR_GET_EMP_PERSON";

				List<OracleParameter> paramList = new List<OracleParameter>();

				paramList.Add(SqlHelper.GetOraParam(":P_SYMBOL_NO", SymbolNo, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTRepEmployeeDetail> lst = new List<ATTRepEmployeeDetail>();
				
				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{
					ATTRepEmployeeDetail obj = new ATTRepEmployeeDetail();

					obj.SYMBOL_NO= drow["SYMBOL_NO"].ToString();
					obj.CIT_NO = drow["CIT_NO"].ToString();
					obj.EMP_ID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["EMP_ID"].ToString());
					obj.IDENTITY_MARK = drow["IDENTITY_MARK"].ToString();
					obj.PROVIDENT_FUND_NO = drow["PROVIDENT_FUND_NO"].ToString();
					//obj.IMAGE_FILE = drow.  Convert.ToByte(drow["IMAGE_FILE"]);
					obj.IMAGE_FILE = "data:image/jpeg;base64," + Convert.ToBase64String((Byte[])drow["IMAGE_FILE"]);
					obj.ALERT_SOURCE = drow["ALERT_SOURCE"].ToString();
					obj.ALT_SOURCE_VAL = drow["ALT_SOURCE_VAL"].ToString();
					obj.COUNTRY_CODE = drow["COUNTRY_CODE"].ToString();
					obj.DOB = drow["DOB"].ToString();
					obj.GENDER = drow["GENDER"].ToString();
					obj.REL_ID =drow["REL_ID"]==null ? (Int64?)null : Int64.Parse(drow["REL_ID"].ToString());
					obj.P_ID = string.IsNullOrEmpty(drow["P_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["P_ID"].ToString());
					obj.EMP_NAME_NEP = drow["EMP_NAME_NEP"].ToString();
					obj.EMP_NAME_ENG = drow["EMP_NAME_ENG"].ToString();
					obj.MARST_ID = drow["MARST_ID"] == null? (Int64?)null : Int64.Parse(drow["MARST_ID"].ToString());
					obj.MARST_NAME = drow["MARST_NAME"].ToString();
					obj.COUNTRY_NAME = drow["COUNTRY_NAME"].ToString();
					obj.REL_NAME = drow["REL_NAME"].ToString();
					obj.OFFICE_NAME_NEPALI = drow["OFFICE_NAME_NEPALI"].ToString();
					obj.POST_DESC = drow["POST_DESC"].ToString();
					//obj.POST_DESC_ENG = drow["POST_DESC_ENG"].ToString();
					obj.POST_ID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int64?)null : Int64.Parse(drow["POST_ID"].ToString());
					obj.FROM_DATE = drow["FROM_DATE"].ToString();
					obj.DECISION_DATE = drow["DECISION_DATE"].ToString();

					lst.Add(obj);

				}
				return lst;
			}
			catch (Exception ex)
			{
				return new List<ATTRepEmployeeDetail>();

			}
			finally
			{
				GetConn.CloseDbConn();
			}
		}

	}

}
