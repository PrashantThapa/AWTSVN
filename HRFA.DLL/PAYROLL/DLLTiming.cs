using HRFA.ATT.PAYROLL;
using HRFA.COMMON;

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer.PAYROLL
{
	public class DLLTiming
	{
		public object GetSeason(string param1)

		{
			string SP = "";
			

			GetConnection getConn = new GetConnection();
			OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
			OracleTransaction tran = conn.BeginTransaction();

			try
			{
				SP = "TIMING";

				List<OracleParameter> paramList = new List<OracleParameter>();
				paramList.Add(SqlHelper.GetOraParam(":P_ATT_DATE", param1, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));
				//paramList[0].Size = 20;
				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				List<ATTTiming> lstPostWise = new List<ATTTiming>();

				foreach (DataRow dr in ds.Tables[0].Rows)
				{
					ATTTiming objPostWise = new ATTTiming();
					objPostWise.SEASON = dr["SEASON"].ToString();
					objPostWise.SeasonFromDate = dr["SEASON_FROMDATE"].ToString();
					objPostWise.SeasonToDate = dr["SEASON_TODATE"].ToString();
					objPostWise.SeasonOutTime = dr["SEASON_OUTTIME"].ToString();
					objPostWise.SeasonInTime = dr["SEASON_INTIME"].ToString();

					lstPostWise.Add(objPostWise);

				}

				tran.Commit();
				return lstPostWise;
			}
			catch (Exception ex)
			{
				tran.Rollback();
				throw (ex);
			}
			finally
			{
				getConn.CloseDbConn();
			}
			//return msg;
			//return null;
		}
	
	}
}
