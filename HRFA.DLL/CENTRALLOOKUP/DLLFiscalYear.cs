﻿using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public  class DLLFiscalYear
    {
      public List<ATTFiscalYear> GetFiscalYear(int? fiscalYearID)
      {
          GetConnection conn = new GetConnection();
          OracleConnection dbConn = conn.GetDbConn();

          List<ATTFiscalYear> lstFiscalYear = new List<ATTFiscalYear>();

          try
          {
              string SP = "CPR_GET_FISCAL_YR";

              List<OracleParameter> paramList = new List<OracleParameter>();
              paramList.Add(SqlHelper.GetOraParam(":P_FISCAL_YRID", fiscalYearID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
              paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));
              DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());
             foreach (DataRow drow in ds.Tables[0].Rows)
             {
                    ATTFiscalYear objFiscalYear = new ATTFiscalYear
                    {
                        FiscalYearID = drow["FISCAL_YR_ID"] == null ? Int32.Parse(null) : Int32.Parse(drow["FISCAL_YR_ID"].ToString()),
                        FiscalYearName = drow["FISCAL_YEAR"] == null ? string.Empty : drow["FISCAL_YEAR"].ToString(),
                        IsActive = drow["ISACTIVE"] == null ? string.Empty : drow["ISACTIVE"].ToString(),
                        Action = "E"
                    };
                    lstFiscalYear.Add(objFiscalYear);
             }

             return lstFiscalYear;
          }
          catch (Exception ex)
          {

              throw (ex);
          }
          finally
          {
              dbConn.Close();
          }

      }
    }
}
