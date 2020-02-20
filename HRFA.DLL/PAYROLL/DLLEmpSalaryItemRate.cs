﻿using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLEmpSalaryItemRate
    {
        public bool SaveEmpSalaryItemRate(ATTEmpSalaryItem objEmpSalaryItemRate, Int64? subNo, string esFromDate, OracleTransaction tran)
        {
            try
            {
                string SP = "";
                //if (objEmpSalaryItemRate.Action == "A")
                //{
                    SP = "DCPR_ADD_EMP_SAL_ITEM_RATE";
                //}
                //else
                //{
                //    SP = "DCPR_EDIT_EMP_SAL_ITEM_RATE";
                //}

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", subNo, OracleDbType.Int64, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_EMP_ID", objEmpSalaryItemRate.EmpID, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_SALARY_ITEM_ID", objEmpSalaryItemRate.SalaryItem.SalaryItemID, OracleDbType.Int16, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_ESFROM_DATE", esFromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_RATE_FROM_DATE", objEmpSalaryItemRate.FromDate, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_RATE_TO_DATE", objEmpSalaryItemRate.ToDate, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_RATE_MODE", objEmpSalaryItemRate.Mode.ModeID, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_AMOUNT", objEmpSalaryItemRate.Amount, OracleDbType.Double, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_R_STATUS", objEmpSalaryItemRate.RStatus, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objEmpSalaryItemRate.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", objEmpSalaryItemRate.EntryDate, OracleDbType.Date, ParameterDirection.Input));

                SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());

                return true;
            }  
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        //public List<ATTEmpSalaryItemRate> GetEmpSalaryItemRate(Int64? EmpID)
        //{
        //    GetConnection conn = new GetConnection();
        //    OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
        //    var DllSalaryItem = new DLLSalaryItem();
        //    try
        //    {
        //        string SP = "CPR_GET_EMP_SALARY_ITEM";

        //        List<OracleParameter> paramList = new List<OracleParameter>();

        //        paramList.Add(SqlHelper.GetOraParam(":P_EMP_ID", EmpID, OracleDbType.Int64, ParameterDirection.Input));
        //        paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, ParameterDirection.Output));
        //        DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

        //        List<ATTEmpSalaryItemRate> lst = new List<ATTEmpSalaryItemRate>();

        //        foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
        //        {
        //            ATTEmpSalaryItemRate obj = new ATTEmpSalaryItemRate();
        //            obj.EmpID = Convert.ToInt32(drow["EMP_ID"]);
        //            obj.Action = "E";
        //            obj.EntryBy = drow["ENTRY_BY"].ToString();
        //            obj.EntryDate = drow["ENTRY_DATE"].ToString();
        //            obj.RStatus = drow["R_STATUS"].ToString();
        //            obj.SalaryItem = DllSalaryItem.GetSalaryItem(Convert.ToInt32(drow["EMP_ID"])) !=null?DllSalaryItem.GetSalaryItem(Convert.ToInt32(drow["SALARY_ITEM_ID"]))[0]:null; 
        //            obj.Mode = drow["RATE_MODE"].ToString();
        //            obj.Amount = string.IsNullOrEmpty(drow["AMOUNT"].ToString()) ? (double?)null : double.Parse(drow["AMOUNT"].ToString());



        //            lst.Add(obj);
        //        }
        //        return lst;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw (ex);
        //    }
        //    finally
        //    {
        //        conn.CloseDbConn();
        //    }
        //}


        
    }
}
