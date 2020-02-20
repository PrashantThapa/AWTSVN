﻿using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLDate
    {

        public ATTDate GetDates()
        {
            string nepaliDate = "";

            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn();


            try
            {
                string sql = "select  CFN_GET_CURRENT_NEP_DATE  from DUAL";
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.Text, sql);

                DataTable tbl = new DataTable();
                tbl = (DataTable)ds.Tables[0];
                nepaliDate = tbl.Rows[0][0].ToString();

                return new ATTDate { NepaliDate = nepaliDate, EnglishDate = DateTime.Now.ToShortDateString() };

            }
            catch (Exception ex)
            {

                throw (ex);
            }
            finally
            {
                conn.CloseDbConn();
            }
        }


        public string  GetCurrentDate()
        {
            string nepaliDate = "";

            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn();


            try
            {
                string sql = "select  CFN_GET_CURRENT_NEP_DATE  from DUAL";
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.Text, sql);

                DataTable tbl = new DataTable();
                tbl = (DataTable)ds.Tables[0];
                nepaliDate = tbl.Rows[0][0].ToString();

                return nepaliDate;

            }
            catch (Exception ex)
            {

                throw (ex);
            }
            finally
            {
                conn.CloseDbConn();
            }
        }       

        public string ValidateNepDate(string nepDate, string futureDate)
        {
            string msg = "";
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn();


            try
            {
                string sql = "SELECT CFN_VALIDATE_NEP_DATE('" + nepDate + "','" + futureDate + "') FROM DUAL";
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.Text, sql);

                DataTable tbl = new DataTable();
                tbl = (DataTable)ds.Tables[0];
                msg = tbl.Rows[0][0].ToString();

                return msg;

            }
            catch (Exception ex)
            {

                throw (ex);
            }
            finally
            {
                conn.CloseDbConn();
            }
        }
        public Int64 GetNoOfMonth(string fromDate, string toDate)
        {
           
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn();

            try
            {

                string SQL = "SELECT trunc(CFN_no_of_months('" + fromDate + "','"
                                                          + toDate + "'),0)" +
                              " FROM DUAL";


                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.Text, SQL);

                DataTable tbl = new DataTable();
                tbl = (DataTable)ds.Tables[0];

                Int64 noOfMonths = Int64.Parse(tbl.Rows[0][0].ToString());


                return noOfMonths;
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

      
        public int GetDaysDifference(string date1, string date2)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn();
            string sp = "CPR_GET_DIFFDATE";
            int noOfDays = 0;
            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_date1", date1, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_date2", date2, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_DATE3", null, OracleDbType.Int16, ParameterDirection.Output));
                paramList[2].Size = 4;
                SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, sp, paramList.ToArray());

                noOfDays = int.Parse(paramList[2].Value.ToString());

                //DataTable tbl = new DataTable();
                //tbl = (DataTable)ds.Tables[0];

                //Int16 noOfDays = Int16.Parse(tbl.Rows[0][0].ToString());

                return noOfDays;
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

        public int GetDaysDifferenceWithHoliday(string date1, string date2)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn();
            string sp = "CPR_GET_DIFFDATEWITHHOLIDAY";
            int noOfDays = 0;
            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_date1", date1, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_date2", date2, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_DATE3", null, OracleDbType.Int16, ParameterDirection.Output));
                paramList[2].Size = 4;
                SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, sp, paramList.ToArray());

                noOfDays = int.Parse(paramList[2].Value.ToString());

                //DataTable tbl = new DataTable();
                //tbl = (DataTable)ds.Tables[0];

                //Int16 noOfDays = Int16.Parse(tbl.Rows[0][0].ToString());

                return noOfDays;
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