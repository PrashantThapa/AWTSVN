using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.ATT.FAMS;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLSalarySheet
    {
        public string SaveSalarySheet(List<ATTSalarySheetEmployee> lst)
        {
            string sp = "";
            string msg = "";
            Int64? submissionNo = null;
            //var flag = false;
            ATTSalarySheetEmployee objSalarySheet1 = new ATTSalarySheetEmployee();
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();
             int i = 0;
            try
            {
                foreach (ATTSalarySheetEmployee objSalarySheet in lst)
                {
                    objSalarySheet1 = objSalarySheet;
                    if (objSalarySheet.Action == "E")
                    {
                        sp = "DCPR_EDIT_EMP_SALARY";
                        msg = "Successfully Edited.";
                       // submissionNo = objSalarySheet.SubmissionNo;
                    }

                    else if (objSalarySheet.Action == "A")
                    {
                        sp = "DCPR_ADD_EMP_SALARY";
                        msg = "Successfully Saved.";
                        //if (flag == false)
                        //{
                        //  //  submissionNo = objSalarySheet.SubmissionNo;
                        //    flag = true;
                        //}
                    }

                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                        paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.InputOutput));
                        paramList.Add(SqlHelper.GetOraParam(":p_EMP_ID", objSalarySheet.EmpID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_SAL_YEAR", objSalarySheet.SalaryYear, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_SAL_MONTH", objSalarySheet.SalaryMonth, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_SALARY_ITEM_ID", objSalarySheet.SalaryItemID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_AMOUNT", objSalarySheet.Amount, OracleDbType.Decimal, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_EDITED_AMOUNT", objSalarySheet.EditedAmount, OracleDbType.Decimal, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", objSalarySheet.OfficeCode, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_POST_ID", objSalarySheet.PostID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_R_STATUS", objSalarySheet.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objSalarySheet.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", objSalarySheet.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_DEPARTMENT", objSalarySheet.DepartmentID == (int?)null? 0 : objSalarySheet.DepartmentID, OracleDbType.Int32, System.Data.ParameterDirection.Input));

                        paramList[0].Size = 16;
                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                        submissionNo = Int64.Parse(paramList[0].Value.ToString());
                        paramList.Clear();
                        i++;
                    }


                }
                tran.Commit();
            }
            catch (Exception ex)
            {
                msg = "Error Found while saving Data!";                
                tran.Rollback();
                return msg;
               // throw (ex);
            }
            finally
            {
                getConn.CloseDbConn();
            }
            return msg + "Data is saved । Please note the submission number । " + submissionNo + "</b>";
        }


        public List<ATTSalarySheetEmployee> GenerateSalary(Int32? officeCode, string year, Int32? month, Int32? empID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();//new OracleTransaction();

            List<ATTSalarySheetEmployee> lstEmp = new List<ATTSalarySheetEmployee>();

            try
            {
                string SP = "CPR_GET_EMPLOYEE_LIST";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", officeCode, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_YEAR", year, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_MONTH", month, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTSalarySheetEmployee objEmployee = new ATTSalarySheetEmployee();

                    objEmployee.EmpID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());
                    objEmployee.SalaryItemID = string.IsNullOrEmpty(drow["SALARY_ITEM_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["SALARY_ITEM_ID"].ToString());
                    objEmployee.PostID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["POST_ID"].ToString());
                    //objEmployee.DepartmentID = string.IsNullOrEmpty(drow["DEPARTMENT"].ToString()) ? (Int32?)null : Int32.Parse(drow["DEPARTMENT"].ToString());
                    objEmployee.SalaryYear = year;
                    objEmployee.SalaryMonth = month;
                    objEmployee.OfficeCode = officeCode;


                    if (objEmployee.EmpID == null || objEmployee.EmpID == -1)
                        throw new Exception();


                    string SP1 = "CPR_GENERATE_SALARY";

                    List<OracleParameter> paramList1 = new List<OracleParameter>();
                    paramList1.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", officeCode, OracleDbType.Int32, ParameterDirection.Input));
                    paramList1.Add(SqlHelper.GetOraParam(":P_YEAR", year, OracleDbType.Varchar2, ParameterDirection.Input));
                    paramList1.Add(SqlHelper.GetOraParam(":P_MONTH", month, OracleDbType.Int32, ParameterDirection.Input));
                    paramList1.Add(SqlHelper.GetOraParam(":p_emp_id", objEmployee.EmpID, OracleDbType.Int32, ParameterDirection.Input));
                    //paramList1.Add(SqlHelper.GetOraParam(":p_emp_id", 10, OracleDbType.Int32, ParameterDirection.Input));
                    paramList1.Add(SqlHelper.GetOraParam(":p_salary_item_id", objEmployee.SalaryItemID, OracleDbType.Int32, ParameterDirection.Input));
                    paramList1.Add(SqlHelper.GetOraParam(":p_out", null, OracleDbType.Decimal, ParameterDirection.Output));


                    DataSet ds1 = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP1, paramList1.ToArray());
                    var ddd = paramList1[5].Value;
                    objEmployee.Amount= decimal.Parse(paramList1[5].Value.ToString());
                    objEmployee.EditedAmount= decimal.Parse(paramList1[5].Value.ToString());
                    //switch (objEmployee.SalaryItemID)
                    //{
                    //    case 1:
                    //        objEmployee.BasicSalary = decimal.Parse(paramList1[5].Value.ToString());
                    //        break;
                    //    case 2:
                    //        objEmployee.Allowance = decimal.Parse(paramList1[5].Value.ToString());
                    //        break;
                    //    case 3:
                    //        objEmployee.PF = decimal.Parse(paramList1[5].Value.ToString());
                    //        break;
                    //    case 4:
                    //        objEmployee.Insurance = decimal.Parse(paramList1[5].Value.ToString());
                    //        break;
                    //    case 5:
                    //        objEmployee.IncomeTax = decimal.Parse(paramList1[5].Value.ToString());
                    //        break;
                    //    case 6:
                    //        objEmployee.TaxableIncome = decimal.Parse(paramList1[5].Value.ToString());
                    //        break;
                    //    default:

                    //        break;
                    //};
                    //DataSet ds1 = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP1, paramList1.ToArray());
                    //DataRow row1 = ds1.Tables[0].Rows[0];

                    //objEmployee.IncomeTaxAmount = decimal.Parse(row1[0].ToString());
                    //objEmployee.BasicSalary = decimal.Parse(row1[1].ToString());
                    //objEmployee.CIT = decimal.Parse(row1[2].ToString());
                    //objEmployee.PF = decimal.Parse(row1[3].ToString());
                    //objEmployee.Insurance = decimal.Parse(row1[4].ToString());
                    //objEmployee.Gender = row1[5].ToString();
                    //objEmployee.AttendedDays = decimal.Parse(row1[6].ToString());
                    //objEmployee.GradeAmount = decimal.Parse(row1[7].ToString());
                    //objEmployee.TaxIncome = decimal.Parse(row1[8].ToString());
                    //objEmployee.TotalSalary = decimal.Parse(row1[9].ToString());
                    //objEmployee.Allowance = decimal.Parse(row1[10].ToString());

                    lstEmp.Add(objEmployee);
                }
                return lstEmp;
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


		public List<ATTSalarySheetEmployee> GetSalary(Int32? officeCode, string year, Int32? month, Int32? empID)
		{
			   GetConnection getConn = new GetConnection();
			OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
			OracleTransaction tran = conn.BeginTransaction();//new OracleTransaction();

			List<ATTSalarySheetEmployee> lstEmp = new List<ATTSalarySheetEmployee>();

			try
			{

				{
					string SP = "CPR_GET_SALARY";

					List<OracleParameter> paramList = new List<OracleParameter>();
					paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", officeCode, OracleDbType.Int32, ParameterDirection.Input));
					paramList.Add(SqlHelper.GetOraParam(":P_YEAR", year, OracleDbType.Varchar2, ParameterDirection.Input));
					paramList.Add(SqlHelper.GetOraParam(":P_MONTH", month, OracleDbType.Int32, ParameterDirection.Input));
					paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

					DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

					foreach (DataRow drow in ds.Tables[0].Rows)
					{
						ATTSalarySheetEmployee objSalary = new ATTSalarySheetEmployee();

						objSalary.EmpID = string.IsNullOrEmpty(drow["EMP_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());
						//objSalary.SalaryItemID = string.IsNullOrEmpty(drow["SALARY_ITEM_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["SALARY_ITEM_ID"].ToString());
						objSalary.PostID = string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["POST_ID"].ToString());
						//objSalary.DepartmentID = string.IsNullOrEmpty(drow["DEPARTMENT"].ToString()) ? (Int32?)null : Int32.Parse(drow["DEPARTMENT"].ToString());
						objSalary.SalaryYear = year;
						objSalary.SalaryMonth = month;
						objSalary.OfficeCode = officeCode;
                        objSalary.PostDesc = drow["POST_DESC"].ToString();
                        objSalary.DepartmentDesc = string.IsNullOrEmpty(drow["DEPT_DESC"].ToString()) ? (string)null : drow["DEPT_DESC"].ToString();
                        //objSalary.EditedAmount = Decimal.Parse(drow["Edited_Amount"].ToString());
                        //objSalary.SalaryItemDesc = drow["SALARY_ITEM_DESC"].ToString();
                        objSalary.PF = Decimal.Parse(drow["PF"].ToString());
                        objSalary.TAXABLEINCOME = drow["TAXABLEINCOME"].ToString()==string.Empty ? 0 : Decimal.Parse(drow["TAXABLEINCOME"].ToString());
                        objSalary.ALLOWANCE = Decimal.Parse(drow["ALLOWANCE"].ToString());
                        objSalary.INSURANCE = Decimal.Parse(drow["INSURANCE"].ToString());
                        objSalary.BASIC_SALARY = Decimal.Parse(drow["BASIC_SALARY"].ToString());
                        objSalary.INCOMETAX = Decimal.Parse(drow["INCOMETAX"].ToString());
                        objSalary.LUNCH = Decimal.Parse(drow["LUNCH"].ToString());
                        objSalary.ADVANCE = Decimal.Parse(drow["ADVANCE"].ToString());
                        objSalary.FNAME_ENG = drow["NAME_ENG"].ToString();
                        //objSalary.LNAME_ENG = drow["LNAME_ENG"].ToString();


                        lstEmp.Add(objSalary);
					}
					return lstEmp;
				}
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


        public ATTEmpSalarySheet GetYearAndMonth(Int32? officeCode)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            ATTEmpSalarySheet objSalarySheet = new ATTEmpSalarySheet();

            try
            {
                string SP = "DCPR_YEAR_NMONTH";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", officeCode, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));


                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                if (ds.Tables[0].Rows.Count == 0)
                {
                    objSalarySheet.SalaryYear = (Int32?)null;
                    objSalarySheet.SalaryMonth = (Int32?)null;
                }
                else
                {
                    DataRow drow = ds.Tables[0].Rows[0];
                    objSalarySheet.SalaryYear = string.IsNullOrEmpty(drow["SAL_YEAR"].ToString()) ? (Int32?)null : Int32.Parse(drow["SAL_YEAR"].ToString());
                    objSalarySheet.SalaryMonth = string.IsNullOrEmpty(drow["SAL_MONTH"].ToString()) ? (Int32?)null : Int32.Parse(drow["SAL_MONTH"].ToString());
                }

                return objSalarySheet;
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

        //public List<ATTEmpSalarySheet> GetSalaryItemByEmpID(Int16? empID, Int32? year, Int16? month)
        //{
        //    GetConnection getConn = new GetConnection();
        //    OracleConnection conn = getConn.GetDbConn();

        //    List<ATTEmpSalarySheet> lst = new List<ATTEmpSalarySheet>();

        //    try
        //    {
        //        string SP = "GET_SALARY_BYOFFICE";

        //        List<OracleParameter> paramList = new List<OracleParameter>();
        //        paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", empID, OracleDbType.Int16, System.Data.ParameterDirection.Input));
        //        paramList.Add(SqlHelper.GetOraParam(":p_SAL_YEAR", year, OracleDbType.Int32, System.Data.ParameterDirection.Input));
        //        paramList.Add(SqlHelper.GetOraParam(":p_SAL_MONTH", month, OracleDbType.Int16, System.Data.ParameterDirection.Input));
        //        paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

        //        DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

        //        foreach (DataRow drow in ds.Tables[0].Rows)
        //        {
        //            ATTEmpSalarySheet objEmp = new ATTEmpSalarySheet();

        //            objEmp.SubmissionNo = Int64.Parse(drow["SUBMISSION_NO"].ToString());
        //            objEmp.SalaryItem.SalaryItemID = string.IsNullOrEmpty(drow["SALARY_ITEM_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["SALARY_ITEM_ID"].ToString());
        //            objEmp.SalaryItem.SalaryItemDesc = drow["SALARY_ITEM_DESC"].ToString();
        //            objEmp.OrignalAmount = string.IsNullOrEmpty(drow["ORIGINAL_AMOUNT"].ToString()) ? (Double?)null : Double.Parse(drow["ORIGINAL_AMOUNT"].ToString());
        //            objEmp.EditedAmount = string.IsNullOrEmpty(drow["EDITED_AMOUNT"].ToString()) ? (Double?)null : Double.Parse(drow["EDITED_AMOUNT"].ToString());
        //            objEmp.SalaryYear =  string.IsNullOrEmpty(drow["SAL_YEAR"].ToString()) ? (Int32?)null : Int32.Parse(drow["SAL_YEAR"].ToString());
        //            objEmp.SalaryMonth =  string.IsNullOrEmpty(drow["SAL_MONTH"].ToString()) ? (Int32?)null : Int32.Parse(drow["SAL_MONTH"].ToString());
        //            objEmp.PostID =  string.IsNullOrEmpty(drow["POST_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["POST_ID"].ToString());
        //            objEmp.PFromDate = drow["PS_FROM_DATE"].ToString();
        //            objEmp.EFromDate = drow["ES_FROM_DATE"].ToString();

        //            lst.Add(objEmp);
        //        }

        //        return lst;
        //    }
        //    catch (Exception ex)
        //    {

        //        throw (ex);
        //    }
        //    finally
        //    {
        //        conn.Close();
        //    }
        //}

        public List<ATTPISEmployee> GetSalaryByOffice(Int32? officeCode, Int32? costCenterID, Int32? year, Int16? month)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            try
            {
                string SP = "DCPR_GET_SALARY_BYOFFICE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", officeCode, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_COSTCENTER", costCenterID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_SAL_YEAR", year, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_SAL_MONTH", month, OracleDbType.Int16, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTPISEmployee> lst = new List<ATTPISEmployee>();
                List<ATTEmpSalarySheet> lstSalarySheet = new List<ATTEmpSalarySheet>();
                ATTPISEmployee objEmployee = new ATTPISEmployee();
                objEmployee.SalarySheet = new List<ATTEmpSalarySheet>();
                Int32? prevEmpID = 0;
                int count = 0;

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    if (!DBNull.Value.Equals(drow["EMP_ID"]))
                    {
                        count++;
                        if (prevEmpID != 0)
                        {
                            lst.Add(objEmployee);
                            objEmployee = new ATTPISEmployee();
                            objEmployee.SalarySheet = new List<ATTEmpSalarySheet>();
                        }

                        prevEmpID =  Int32.Parse(drow["EMP_ID"].ToString());
                        objEmployee.EmpID = prevEmpID;
                        objEmployee.EmployeeName = DBNull.Value.Equals(drow["EMP_NAME"]) ?string.Empty: drow["EMP_NAME"].ToString();
                        objEmployee.SubmissionNo = DBNull.Value.Equals(drow["SUBMISSION_NO"].ToString()) ? (Int64?)null : Int64.Parse(drow["SUBMISSION_NO"].ToString());
                    }

                    if (prevEmpID == Int16.Parse(drow["EMP_ID"].ToString()))
                    {
                        ATTEmpSalarySheet objSalarySheet = new ATTEmpSalarySheet();
                        objSalarySheet.SubmissionNo = DBNull.Value.Equals(drow["SUBMISSION_NO"].ToString()) ? (Int64?)null : Int64.Parse(drow["SUBMISSION_NO"].ToString());
                        objSalarySheet.EmpID = DBNull.Value.Equals(drow["EMP_ID"]) ? (Int32?)null : Int32.Parse(drow["EMP_ID"].ToString());
                        objSalarySheet.SalaryItem.SalaryItemID = DBNull.Value.Equals(drow["SALARY_ITEM_ID"]) ? (Int32?)null : Int32.Parse(drow["SALARY_ITEM_ID"].ToString());
                        objSalarySheet.SalaryItem.SalaryItemDesc = DBNull.Value.Equals(drow["SALARY_ITEM_DESC"])?string.Empty: drow["SALARY_ITEM_DESC"].ToString();
                        objSalarySheet.OrignalAmount = DBNull.Value.Equals(drow["ORIGINAL_AMOUNT"]) ? (Double?)null : Double.Parse(drow["ORIGINAL_AMOUNT"].ToString());
                        objSalarySheet.EditedAmount = DBNull.Value.Equals(drow["EDITED_AMOUNT"]) ? (Double?)null : Double.Parse(drow["EDITED_AMOUNT"].ToString());
                        objSalarySheet.SalaryYear = DBNull.Value.Equals(drow["SAL_YEAR"]) ? (Int32?)null : Int32.Parse(drow["SAL_YEAR"].ToString());
                        objSalarySheet.SalaryMonth = DBNull.Value.Equals(drow["SAL_MONTH"]) ? (Int32?)null : Int32.Parse(drow["SAL_MONTH"].ToString());
                        objSalarySheet.PostID = DBNull.Value.Equals(drow["POST_ID"]) ? (Int32?)null : Int32.Parse(drow["POST_ID"].ToString());
                        objSalarySheet.PFromDate = DBNull.Value.Equals(drow["PS_FROM_DATE"])?string.Empty: drow["PS_FROM_DATE"].ToString();
                        objSalarySheet.EFromDate = DBNull.Value.Equals(drow["ES_FROM_DATE"])?string.Empty: drow["ES_FROM_DATE"].ToString();

                        objEmployee.SalarySheet.Add(objSalarySheet);
                    }
                }
                if (count > 0)
                {
                    lst.Add(objEmployee);
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

        public string InitiateVerification(ATTEmpSalarySheet objSalarySheet, string appID, string modID)
        {
            string msg = "";
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();

            try
            {
                string sp = "CPR_INITIATE_VERIFICATION";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_APPLICATION_ID", appID, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_MODULE_ID", modID, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_TRAN_NO", objSalarySheet.SubmissionNo, OracleDbType.Int64, System.Data.ParameterDirection.InputOutput));
                paramList.Add(SqlHelper.GetOraParam(":P_OUT", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Output));
                paramList.Add(SqlHelper.GetOraParam(":p_dirty", "Y", OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                paramList[2].Size = 16;
                paramList[3].Size = 500;
                SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                objSalarySheet.SubmissionNo = string.IsNullOrEmpty(paramList[2].Value.ToString()) ? (Int64?)null : Int64.Parse(paramList[2].Value.ToString());
                  

                if (objSalarySheet.OldSubmissionNo != null)
                {
                    DLLUserTranVerification dllUTV = new DLLUserTranVerification();
                    dllUTV.SaveVerifyLog(tran, objSalarySheet.EntryBy, objSalarySheet.OldSubmissionNo, objSalarySheet.SubmissionNo, appID, modID);
                }

                msg = "Successfully Submitted for Verification." + "</br> Please Note Your Submission No.</br><b>" + objSalarySheet.SubmissionNo + "</b>"; ;
                tran.Commit();

            }

            catch (Exception ex)
            {
                tran.Rollback();
                throw ex;
            }

            finally
            {
                getConn.CloseDbConn();
            }
            return msg;
        }


        public ATTEmpSalarySheet GetSalarySheetBySubmissionNo(Int64? submissionNo)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            try
            {
                string SP = "DCPR_GET_EMPSAL_OFFICE";

                ATTEmpSalarySheet objSalarySheet = new ATTEmpSalarySheet();
                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_SUBMISSION_NO", submissionNo, OracleDbType.Int64, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_OFFICE_CD", null, OracleDbType.Int32, System.Data.ParameterDirection.Output));
                paramList.Add(SqlHelper.GetOraParam(":p_SAL_YEAR", null, OracleDbType.Int32, System.Data.ParameterDirection.Output));
                paramList.Add(SqlHelper.GetOraParam(":p_SAL_MONTH", null, OracleDbType.Int32, System.Data.ParameterDirection.Output));

                paramList[1].Size = 16;
                paramList[2].Size = 16;
                paramList[3].Size = 16;
                SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, SP, paramList.ToArray());
                objSalarySheet.Office.OfficeCode = Int32.Parse(paramList[1].Value.ToString());
                objSalarySheet.SalaryYear = Int32.Parse(paramList[2].Value.ToString());
                objSalarySheet.SalaryMonth = Int32.Parse(paramList[3].Value.ToString());

                return objSalarySheet;


            }
            catch (Exception ex)
            {

                throw (ex);
            }
            finally
            {
                conn.Close();
            }
        }


    }
}
