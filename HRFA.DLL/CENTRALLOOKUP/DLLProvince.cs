﻿using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer.CENTRALLOOKUP
{
	public class DLLProvince
	{
		public List<ATTProvince> GetProvince(int? PROVINCE_CD)
		{
			GetConnection conn = new GetConnection();
			OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
			List<ATTProvince> lst = new List<ATTProvince>();
			try
			{
				//string status;
				string SP = "CPR_GET_PROVINCES";

				List<OracleParameter> paramList = new List<OracleParameter>
				{
					SqlHelper.GetOraParam(":p_PROVINCE_CODE", PROVINCE_CD, OracleDbType.Int32, System.Data.ParameterDirection.Input),
					SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output)
				};

				DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTProvince> lstProvince = new List<ATTProvince>();

				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{

					ATTProvince objProvince = new ATTProvince();
					objProvince.ProvinceCD = int.Parse(drow["PROVINCE_CD"].ToString());
					objProvince.ProvinceNameNepali = drow["NAME_NEP"].ToString();
					objProvince.ProvinceNameEnglish = drow["NAME_ENG"].ToString();
				
					lstProvince.Add(objProvince);
				}

				return lstProvince;
			}
			catch (Exception)
			{
				return new List<ATTProvince>();

			}
			finally
			{
				conn.CloseDbConn();
			}

		}

	}
}
