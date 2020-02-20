using HRFA.ATT;
using HRFA.COMMON;

using System;
using System.Collections.Generic;
using System.Data;
using System.Configuration;
using HRFA.DataLayer.PAYROLL;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public  class DLLGradeScaleSetup
    {
        public string SaveGradeScaleSetup(ATTGradeScaleSetup GradeScale, string appID, string modID)
        {
            string sp = "";
            string msg = "";
            string entryby = "";
            Int64? submissionNo = null;
            Int64? oldSubmissionNo = null;
            Int32? gradeId = null; 

            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();

            try
            {
                sp = "DCPR_INS_UP_GRADE_SCALE_SETUP";
                msg = "Successfully Saved.";
                GradeScale.EntryDate = DateTime.Now.ToShortDateString();
                if (sp != "")
                {
                    List<OracleParameter> paramList = new List<OracleParameter>();
                    paramList.Add(SqlHelper.GetOraParam(":P_SUBMISSION_NO", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.InputOutput));
                    paramList.Add(SqlHelper.GetOraParam(":P_GRADE_ID", GradeScale.GradeID, OracleDbType.Int32, System.Data.ParameterDirection.InputOutput));
                    paramList.Add(SqlHelper.GetOraParam(":P_MIN_BASIC_SALARY", GradeScale.MinBasicSalary, OracleDbType.Decimal, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_MIN_ALLOWANCE", GradeScale.MinAllowance, OracleDbType.Decimal, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_MAX_BASIC_SALARY", GradeScale.MaxBasicSalary, OracleDbType.Decimal, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_MAX_ALLOWANCE", GradeScale.MaxAllowance, OracleDbType.Decimal, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_REMARKS", GradeScale.Remarks, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));                    
                    paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", GradeScale.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", GradeScale.EntryDate  , OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", GradeScale.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_GRADE_NAME", GradeScale.GradeName, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_ALLOWANCE", GradeScale.Allowance, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                    var result = SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
					if (oldSubmissionNo != null)
                    {
                        DLLUserTranVerification dllUTV = new DLLUserTranVerification();
                        dllUTV.SaveVerifyLog(tran, entryby, oldSubmissionNo, submissionNo, appID, modID);
                    }
                    
                    //if (result == -1) { tran.Rollback();throw new Exception("Data cannot be saved"); }
                    submissionNo = Int64.Parse(paramList[0].Value.ToString());
                    oldSubmissionNo = submissionNo;
                    gradeId = Int32.Parse(paramList[1].Value.ToString());
                    entryby = GradeScale.EntryBy;
                    paramList.Clear();
                    if (GradeScale.GradeLevels != null)
                        new DLLGrade().SaveGrade(GradeScale.GradeLevels,gradeId,tran);
                }
               
                
                tran.Commit();
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
            return msg + "Data saved! Please Note your submission number!! " + "</b>" + submissionNo + "</b>";
        }

		public List<ATTGradeScaleSetupDdl> GetAllGradesForDdl()
		{
			GetConnection getConn = new GetConnection();
			OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

			try
			{
				string SP = "CPR_GET_EMPGRADESCALEFORDDL";

				var paramList = new List<OracleParameter>();
				paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

				var lst = new List<ATTGradeScaleSetupDdl>();

				foreach (DataRow drow in ds.Tables[0].Rows)
				{
					var objEmpGradeScale = new ATTGradeScaleSetupDdl();
					objEmpGradeScale.EmpLevel = DBNull.Value.Equals(drow["EMP_LEVEL"]) ? string.Empty : drow["EMP_LEVEL"].ToString();
					objEmpGradeScale.GradeScaleSetupId = DBNull.Value.Equals(drow["GRADESCALESETUP_ID"]) ? 0 : Convert.ToInt32(drow["GRADESCALESETUP_ID"]);
					lst.Add(objEmpGradeScale);
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

		public List<ATTGradeScaleSetup> GetALLGradeScaleSettings()
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);


            try
            {
                string SP = "CPR_GET_EMPGRADESCALEDATA";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTGradeScaleSetup> lst = new List<ATTGradeScaleSetup>();

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTGradeScaleSetup objEmpGradeScale = new ATTGradeScaleSetup();
                    objEmpGradeScale.SubmissionNo =  DBNull.Value.Equals(drow["SUBMISSION_NO"])? (Int64?)null : Int64.Parse(drow["SUBMISSION_NO"].ToString());
                    objEmpGradeScale.GradeID = DBNull.Value.Equals(drow["GRADE_ID"]) ? (Int32?)null : Int32.Parse(drow["GRADESCALE_LEVEL"].ToString());
                    objEmpGradeScale.MinBasicSalary = DBNull.Value.Equals(drow["MIN_BASIC_SALARY"]) ? 0 : Convert.ToDecimal(drow["MIN_BASIC_SALARY"]);
                    objEmpGradeScale.MinAllowance = DBNull.Value.Equals(drow["MIN_ALLOWANCE"]) ? 0 : Convert.ToDecimal(drow["MIN_ALLOWANCE"]);
                    objEmpGradeScale.MaxBasicSalary = DBNull.Value.Equals(drow["MAX_BASIC_SALARY"]) ? 0 : Convert.ToDecimal(drow["MAX_BASIC_SALARY"]);
                    objEmpGradeScale.MaxAllowance = DBNull.Value.Equals(drow["MAX_ALLOWANCE"]) ? 0 : Convert.ToDecimal(drow["MAX_ALLOWANCE"]);
                    objEmpGradeScale.Remarks = DBNull.Value.Equals(drow["REMARKS"]) ? string.Empty : drow["REMARKS"].ToString();
                    objEmpGradeScale.EntryBy = DBNull.Value.Equals(drow["ENTRY_BY"]) ? string.Empty : drow["ENTRY_BY"].ToString();
                    objEmpGradeScale.EntryDate = DBNull.Value.Equals(drow["ENTRY_DATE"]) ? string.Empty : drow["ENTRY_DATE"].ToString();
                    // objEmpGradeScale.EntryDate = DBNull.Value.Equals(drow["ENTRY_DATE"]) ? DateTime.MinValue : Convert.ToDateTime(drow["ENTRY_DATE"]);
                    objEmpGradeScale.RStatus = DBNull.Value.Equals(drow["R_STATUS"]) ? string.Empty : drow["R_STATUS"].ToString();
                    objEmpGradeScale.GradeName = DBNull.Value.Equals(drow["GRADE_NAME"]) ? string.Empty : drow["GRADE_NAME"].ToString();
                    objEmpGradeScale.Allowance = DBNull.Value.Equals(drow["ALLOWANCE"]) ? string.Empty : drow["ALLOWANCE"].ToString();


                    lst.Add(objEmpGradeScale);
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

        public List<ATTGradeScaleSetup> GetGradeScaleSettingsByEmpLevel(int EmpLevel)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);


            try
            {
                string SP = "DCPR_GET_GRADESCALE";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":P_EMP_LEVEL", EmpLevel, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTGradeScaleSetup> lst = new List<ATTGradeScaleSetup>();

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTGradeScaleSetup objEmpGradeScale = new ATTGradeScaleSetup();
                    objEmpGradeScale.SubmissionNo = DBNull.Value.Equals(drow["SUBMISSION_NO"]) ? (Int64?)null : Int64.Parse(drow["SUBMISSION_NO"].ToString());
                    objEmpGradeScale.GradeID = DBNull.Value.Equals(drow["GRADE_ID"]) ? (Int32?)null : Int32.Parse(drow["GRADE_ID"].ToString());
                    objEmpGradeScale.MinBasicSalary = DBNull.Value.Equals(drow["MIN_BASIC_SALARY"]) ? 0 : Convert.ToDecimal(drow["MIN_BASIC_SALARY"]);
                    objEmpGradeScale.MinAllowance = DBNull.Value.Equals(drow["MIN_ALLOWANCE"]) ? 0 : Convert.ToDecimal(drow["MIN_ALLOWANCE"]);
                    objEmpGradeScale.MaxBasicSalary = DBNull.Value.Equals(drow["MAX_BASIC_SALARY"]) ? 0 : Convert.ToDecimal(drow["MAX_BASIC_SALARY"]);
                    objEmpGradeScale.MaxAllowance = DBNull.Value.Equals(drow["MAX_ALLOWANCE"]) ? 0 : Convert.ToDecimal(drow["MAX_ALLOWANCE"]);
                    objEmpGradeScale.Remarks = DBNull.Value.Equals(drow["REMARKS"]) ? string.Empty : drow["REMARKS"].ToString();
                    objEmpGradeScale.EntryBy = DBNull.Value.Equals(drow["ENTRY_BY"]) ? string.Empty : drow["ENTRY_BY"].ToString();
                    //objEmpGradeScale.EntryDate = DBNull.Value.Equals(drow["ENTRY_DATE"]) ? DateTime.MinValue : Convert.ToDateTime(drow["ENTRY_DATE"]);
                    objEmpGradeScale.EntryDate = DBNull.Value.Equals(drow["ENTRY_DATE"]) ? string.Empty : drow["ENTRY_DATE"].ToString();
                    objEmpGradeScale.RStatus = DBNull.Value.Equals(drow["R_STATUS"]) ? string.Empty : drow["R_STATUS"].ToString();
                    objEmpGradeScale.GradeName = DBNull.Value.Equals(drow["GRADE_NAME"]) ? string.Empty : drow["GRADE_NAME"].ToString();

                    lst.Add(objEmpGradeScale);
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

        public bool LevelNameUnique(string levelName)
        {
            var nameUnique = false;

            var getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            try
            {
                string sp = "DCPR_CHECK_UNIQUE_LEVELNAME";

                var paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":LevelName", levelName, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":IsUnique", null, OracleDbType.Int16, ParameterDirection.Output));

                SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, sp, paramList.ToArray());

                nameUnique = Convert.ToBoolean(paramList[1].Value ?? 0);
            }
            catch (Exception ex)
            {
            }
            finally
            {
                getConn.CloseDbConn();
            }

            return nameUnique;
        }
    }
}
