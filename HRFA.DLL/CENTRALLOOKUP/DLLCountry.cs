﻿using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLCountry
    {
        public List<ATTCountry> GetCountry(int? CountryID)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            List<ATTCountry> lst = new List<ATTCountry>();

            try
            {
                string SP = "CPR_GET_COUNTRIES";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_country_cd", CountryID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());


                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {

                    ATTCountry obj = new ATTCountry();

                    obj.CountryCode = drow["COUNTRY_CODE"].ToString();
                    obj.CountryName = drow["COUNTRY_NAME"].ToString();
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
                conn.CloseDbConn();
            }
        }
    }
}
