﻿using System;
using System.Data;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLFunction
    {
        public double GetNoOfMonths(string fromDate, string toDate)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            try
            {

                string SQL = "SELECT trunc(CFN_no_of_months('" + fromDate + "','"
                                                          + toDate + "'),0)" +
                              " FROM DUAL";


                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.Text, SQL);

                DataTable tbl = new DataTable();
                tbl = (DataTable)ds.Tables[0];

                float noOfMonths = float.Parse(tbl.Rows[0][0].ToString());

                //float noOfMonths = float.Parse(tbl.Rows[0][0].ToString());

                //double celing = Math.Ceiling(noOfMonths);
                //double ce

                return (double)noOfMonths;
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
