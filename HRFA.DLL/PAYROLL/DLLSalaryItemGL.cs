﻿using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public  class DLLSalaryItemGL
    {

      //public void SaveSalaryItemGL(ATTSalaryItem objSalaryItem,OracleTransaction tran)
      //{
      //    string SP = "";
      //    //string SP2 = "";
         

      //    ATTSalaryItemGL objSalaryItemGL = objSalaryItem.SalaryItemGL;
      //    objSalaryItemGL.FromDate = objSalaryItem.FromDate;
      //    try
      //    {

      //        if (objSalaryItemGL.Action == "A")
      //        {
      //              SP = "CPR_ADD_SALARY_ITEM";
      //        }
      //        else if (objSalaryItemGL.Action == "E")
      //        {
      //            SP = "CPR_EDIT_SALARY_ITEM";
      //            //SP2 = "CPR_EDIT_SALARY_ITEM_GL";
      //        }
      //        if (SP != "" )
      //        {
      //           List<OracleParameter> paramList = new List<OracleParameter>();
      //           paramList.Add(SqlHelper.GetOraParam(":p_SALARY_ITEM_ID", objSalaryItem.SalaryItemID, OracleDbType.Int32, System.Data.ParameterDirection.InputOutput));
      //           paramList.Add(SqlHelper.GetOraParam(":p_AC_CODE", objSalaryItemGL.ParentGL.AccCode, OracleDbType.Int32, System.Data.ParameterDirection.Input));
      //           paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objSalaryItemGL.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
      //           paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objSalaryItemGL.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
      //           paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objSalaryItemGL.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
      //           paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objSalaryItemGL.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
      //           SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());
      //        }
      //           //if (SP2 != "")
      //           //{
      //           //    List<OracleParameter> paramList1 = new List<OracleParameter>();
      //           //    paramList1.Add(SqlHelper.GetOraParam(":p_SALARY_ITEM_ID", objSalaryItem.SalaryItemID, OracleDbType.Int32, System.Data.ParameterDirection.InputOutput));
      //           //    paramList1.Add(SqlHelper.GetOraParam(":p_AC_CODE", objSalaryItemGL.ParentGL.AccCode, OracleDbType.Int32, System.Data.ParameterDirection.Input));
      //           //    paramList1.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objSalaryItemGL.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
      //           //    paramList1.Add(SqlHelper.GetOraParam(":P_TO_DATE", objSalaryItemGL.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
      //           //    paramList1.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objSalaryItemGL.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
      //           //    paramList1.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objSalaryItemGL.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
      //           //    SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP2, paramList1.ToArray());
      //           //}
               
              
      //    }
      //    catch (Exception ex)
      //    {
              
      //        throw new Exception("Error" + ex.Message);
      //    }
          


      //}


      //public List<ATTSalaryItemGL> GetItemGL(Int64? GLCode)
      //{
      //    GetConnection conn = new GetConnection();
      //    OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

      //    try
      //    {
      //        string SP = "CLK_SAL_ITEM_GL";

      //        List<OracleParameter> paramList = new List<OracleParameter>();

      //        paramList.Add(SqlHelper.GetOraParam(":p_GLCode", GLCode, OracleDbType.Int64, ParameterDirection.Input));
      //        paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, ParameterDirection.Output));
      //        DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

      //        List<ATTSalaryItemGL> lst = new List<ATTSalaryItemGL>();

      //        foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
      //        {
      //            ATTSalaryItemGL obj = new ATTSalaryItemGL();

      //            obj.SalaryItem.SalaryItemID = string.IsNullOrEmpty(drow["SALARY_ITEM_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["SALARY_ITEM_ID"].ToString());
      //            obj.SalaryItem.SalaryItemGL.ParentGL.AccCode = string.IsNullOrEmpty(drow["AC_CODE"].ToString()) ? (Int32?)null : Int32.Parse(drow["AC_CODE"].ToString());
      //            obj.SalaryItem.SalaryItemGL.FromDate = drow["FROM_DATE"].ToString();
      //            obj.SalaryItem.SalaryItemGL.ToDate = drow["TO_DATE"].ToString();
      //            lst.Add(obj);
      //        }

      //        return lst;

      //    }
      //    catch (Exception ex)
      //    {
      //        throw (ex);
      //    }
      //}
    }
}
