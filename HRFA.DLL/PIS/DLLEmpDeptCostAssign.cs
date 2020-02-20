using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLEmpDeptCostAssign
    {
       public string SaveEmpDeptCostAssign(ATTEmpDeptCostAssign objEmpDeptCostAssign, string modID, string appID)
       {
           string sp1 = "";
           string sp2 = "";
           Int64? submissionNo = null;
           string msg = "No Data To Save !!!";

           GetConnection GetConn = new GetConnection();
           OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
           OracleTransaction tran = conn.BeginTransaction();

           try
           {
               if (objEmpDeptCostAssign.Action == "A")
               {
                   sp1 = "DCPR_ADD_EMP_DEPARTMENT";
                   sp2 = "DCPR_ADD_EMP_COSTCENTER";
;
                   msg = "Successfully Saved.";
               }
               //else if (objOffice.Action == "E")
               //{
               //    sp = "CPR_EDIT_OFFICES";
               //    msg = "पद सफलतापूर्वक अद्यावधिक भयो!!";
               //}

               if (sp1 != "" && sp2 != "")
               {
                   List<OracleParameter> paramList1 = new List<OracleParameter>();

                   paramList1.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", objEmpDeptCostAssign.SubmissionNo, OracleDbType.Int64, System.Data.ParameterDirection.InputOutput));

                   paramList1.Add(SqlHelper.GetOraParam(":p_EMP_ID", objEmpDeptCostAssign.EmpID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                   paramList1.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", objEmpDeptCostAssign.Office.OfficeCode, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                   paramList1.Add(SqlHelper.GetOraParam(":p_DEPT_ID", objEmpDeptCostAssign.Department.DeptID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                   paramList1.Add(SqlHelper.GetOraParam(":p_FROM_DATE", objEmpDeptCostAssign.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                   paramList1.Add(SqlHelper.GetOraParam(":p_TO_DATE", objEmpDeptCostAssign.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.InputOutput));
                   paramList1.Add(SqlHelper.GetOraParam(":p_R_STATUS", objEmpDeptCostAssign.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                   paramList1.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objEmpDeptCostAssign.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                   paramList1.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", objEmpDeptCostAssign.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                   paramList1[0].Size = 16;
                   SqlHelper.ExecuteNonQuery(tran, System.Data.CommandType.StoredProcedure, sp1, paramList1.ToArray());

                   submissionNo = Int64.Parse(paramList1[0].Value.ToString());

                   List<OracleParameter> paramList2 = new List<OracleParameter>();

                   paramList2.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.InputOutput));

                   paramList2.Add(SqlHelper.GetOraParam(":p_EMP_ID", objEmpDeptCostAssign.EmpID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                   paramList2.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", objEmpDeptCostAssign.Office.OfficeCode, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                   paramList2.Add(SqlHelper.GetOraParam(":p_COSTCENTER_ID", objEmpDeptCostAssign.CostCenter.CostCenterID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                   paramList2.Add(SqlHelper.GetOraParam(":p_FROM_DATE", objEmpDeptCostAssign.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                   paramList2.Add(SqlHelper.GetOraParam(":p_TO_DATE", objEmpDeptCostAssign.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                   paramList2.Add(SqlHelper.GetOraParam(":p_R_STATUS", objEmpDeptCostAssign.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                   paramList2.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objEmpDeptCostAssign.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                   paramList2.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", objEmpDeptCostAssign.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                   
                   SqlHelper.ExecuteNonQuery(tran, System.Data.CommandType.StoredProcedure, sp2, paramList2.ToArray());

                   objEmpDeptCostAssign.SubmissionNo = Int64.Parse(paramList1[0].Value.ToString());

                   if (objEmpDeptCostAssign.OldSubmissionNo != null)
                   {
                       DLLUserTranVerification dllUTV = new DLLUserTranVerification();
                       dllUTV.SaveVerifyLog(tran, objEmpDeptCostAssign.EntryBy, objEmpDeptCostAssign.OldSubmissionNo, objEmpDeptCostAssign.SubmissionNo, appID, modID);

                   }

                   paramList1.Clear();

               }
               tran.Commit();
               return msg + "</br> Please Note Your Submission No.</br><b>" + objEmpDeptCostAssign.SubmissionNo + "</b>";
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

           //return msg;
           //return msg + "</br> Please Note Your Submission No.</br><b>" + objEmpDeptCostAssign.SubmissionNo + "</b>";	
 
       }


       public ATTEmpDeptCostAssign GetEmpDeptCostAssignBySubNo(Int64? SubmissionNo)
       {
           GetConnection getConn = new GetConnection();
           OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

           string SP = "DCPR_GET_EMP_DEPARTMENT";
           string SP1 = "DCPR_GET_EMP_COSTCENTER";

           try
           {
               List<OracleParameter> paramList = new List<OracleParameter>();
               paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", SubmissionNo, OracleDbType.Int64, ParameterDirection.Input));
               paramList.Add(SqlHelper.GetOraParam(":p_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
               DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());
               DataRow drow = ds.Tables[0].Rows[0];
               
                   ATTEmpDeptCostAssign obj = new ATTEmpDeptCostAssign();
                   obj.Office = new ATTOffice();
                   obj.Department = new ATTDepartment();
                   obj.CostCenter = new ATTCostCenter();
                   obj.Post = new ATTPost();
                   obj.Employee = new ATTPISEmployee();
                   
                   obj.SubmissionNo = string.IsNullOrEmpty(drow["SUBMISSION_NO"].ToString()) ? (Int64?)null : Int64.Parse(drow["SUBMISSION_NO"].ToString());
                   obj.EmpID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());
                   obj.EmpName = drow["EMP_NAME"].ToString();
                   obj.Office.OfficeCode = string.IsNullOrEmpty(drow["OFFICE_CD"].ToString()) ? (Int32?)null : Int32.Parse(drow["OFFICE_CD"].ToString());
                   obj.Department.DeptID = string.IsNullOrEmpty(drow["DEPT_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["DEPT_ID"].ToString());
                   obj.Office.OfficeName = drow["OFFICE_NAME_NEPALI"].ToString();
                   obj.Post.PostDesc = drow["POST_DESC"].ToString();

                   obj.Employee.EmployeeName = drow["EMP_NAME"].ToString();
               


                   obj.FromDate = drow["FROM_DATE"].ToString();
                   //obj.ToDate = drow["TO_DATE"].ToString();
                   obj.RStatus = drow["R_STATUS"].ToString();
                   //obj.EntryBy = drow["ENTRY_BY"].ToString();
                   //obj.EntryDate = drow["ENTRY_DATE"].ToString();

                   DataSet ds1 = SqlHelper.ExecuteDataset(CommandType.StoredProcedure, SP1, paramList.ToArray());
                   DataRow drow1 = ds1.Tables[0].Rows[0];
                   obj.CostCenter.CostCenterID = string.IsNullOrEmpty(drow1["COSTCENTER_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow1["COSTCENTER_ID"].ToString());
                   return obj;
               
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
