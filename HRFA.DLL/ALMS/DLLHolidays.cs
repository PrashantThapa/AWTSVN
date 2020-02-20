﻿using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLHolidays
    {

        public string SaveHolidays(ATTHolidays objHoliday)
        {
            string sp = "";
            string msg = "No Data To Save !!!";
            string status = "A";

            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();

            try
            {
                if (objHoliday.Action == "A")
                {
                    sp = "CPR_ADD_HOLIDAYS";
                    msg = "Successfully Saved!!";
                }
                else if (objHoliday.Action == "E")
                {
                    sp = "CPR_EDIT_HOLIDAYS";
                    msg = "Successfully Updated!!";
                }

                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();

                    paramList.Add(SqlHelper.GetOraParam(":p_HOLIDAY_ID", objHoliday.HolidayID, OracleDbType.Int32, System.Data.ParameterDirection.InputOutput));
                    paramList.Add(SqlHelper.GetOraParam(":p_HOLIDAY_DESC", objHoliday.HolidayDesc, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_FIXED_HOLIDAYS", objHoliday.FixedHolidays, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objHoliday.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objHoliday.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objHoliday.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objHoliday.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_STATUS ", status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));


                    SqlHelper.ExecuteNonQuery(tran, System.Data.CommandType.StoredProcedure, sp, paramList.ToArray());
                    paramList.Clear();
                }
                tran.Commit();
                return msg;
            }
            catch (Exception ex)
            {
                tran.Rollback();
                return ex.Message;
            }
            finally
            {
                GetConn.CloseDbConn();
            }


        }


        //Get Shift

        public List<ATTHolidays> GetHolidays(Int32? HolidayValue)
        {

            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            string SP = "CPR_GET_HOLIDAYS";
            List<ATTHolidays> lst = new List<ATTHolidays>();

            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_HOLIDAY_ID", HolidayValue, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(conn,CommandType.StoredProcedure, SP, paramList.ToArray());
                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTHolidays obj = new ATTHolidays();

                    obj.HolidayID = Convert.ToInt32(drow["HOLIDAY_ID"].ToString());
                    obj.HolidayDesc = drow["HOLIDAY_DESC"].ToString();
                    obj.FixedHolidays = drow["FIXED_HOLIDAYS"].ToString();
                    obj.FromDate = drow["FROM_DATE"].ToString();
                    obj.ToDate = drow["TO_DATE"].ToString();


                    lst.Add(obj);

                }
                return lst;

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

		public string DeleteHolidaySetup(Int32? holidays)
		{
			GetConnection conn = new GetConnection();
			OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);


			try
			{
				string SP = "CPR_DELETE_HOLIDAYS";
				List<OracleParameter> ParamList = new List<OracleParameter>();
				ParamList.Add(SqlHelper.GetOraParam(":p_HOLIDAY_ID ", holidays, OracleDbType.Int32, ParameterDirection.InputOutput));
				SqlHelper.ExecuteNonQuery(dbConn, CommandType.StoredProcedure, SP, ParamList.ToArray());

				return "Deleted Successfully!!!";


			}
			catch (Exception ex)
			{

				return ex.Message;

			}
			finally
			{

				conn.CloseDbConn();
			}

		}



	}
}