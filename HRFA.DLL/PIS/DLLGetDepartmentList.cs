﻿//using System;
//using System.Collections.Generic;
//
//using System.Data;
//using HRFA.ATT.PIS;
//using HRFA.COMMON;
//using System.Configuration;

//namespace HRFA.DataLayer
//{
//	public class DLLGetDepartmentList
//	{
//		public List<ATTGetDepartmentList> GetDepartmentList(Int64 officecd)
//		{
//			GetConnection GetConn = new GetConnection();
//			OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

//			try
//			{
//				//string SP = "RPR_GET_OFFICEWISE_EMPLOYEE";

//				string SP = "RPR_GET_OFFICEWISE_EMPLOYEE";

//				List<OracleParameter> paramList = new List<OracleParameter>();

//				paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", officecd, OracleDbType.Int64, System.Data.ParameterDirection.Input));
//				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

//				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

//				List<ATTGetDepartmentList> lst = new List<ATTGetDepartmentList>();

//				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
//				{
//					ATTGetDepartmentList obj = new ATTGetDepartmentList();

//					//obj.EMP_NAME = drow["EMP_NAME"].ToString();
//					//obj.SYMBOL_NO = drow["SYMBOL_NO"].ToString();
					
//					//obj.POST_DESC = drow["POST_DESC"].ToString();

//					lst.Add(obj);

//				}
//				return lst;
//			}
//			catch (Exception ex)
//			{
//				return new List<ATTGetDepartmentList>();

//			}
//			finally
//			{
//				GetConn.CloseDbConn();
//			}
//		}

//	}
//}
