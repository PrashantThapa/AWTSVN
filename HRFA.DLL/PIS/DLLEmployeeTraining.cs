using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLEmployeeTraining
    {
        public List<ATTEmpTraining> GetEmpTraining(Int64? ID, OracleConnection conn, bool isDirty = false)
        {
            List<ATTEmpTraining> lst = new List<ATTEmpTraining>();

            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                string sp = "CPR_GET_EMP_TRAINING";

                if (isDirty)
                {
                    sp = "DCPR_GET_EMP_TRAINING";
                }



                paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", ID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, sp, paramList.ToArray());

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ((DataTable)ds.Tables[0]).Rows)
                    {

                        ATTEmpTraining obj = new ATTEmpTraining();
                        obj.Title= dr["TITLE"].ToString();
                        obj.Country.CountryCode = dr["COUNTRY_CD"].ToString();
                        obj.Country.CountryName = dr["COUNTRY_NAME"].ToString();
                        obj.CertificateName = dr["CERTIFICATE_NAME"].ToString();
                        obj.Institution = dr["INSTITUTE"].ToString();
                        obj.Grade = dr["GRADE"].ToString();
                        obj.Percentage = string.IsNullOrEmpty(dr["PERCENTAGE"].ToString()) ? (Double?)null : Double.Parse(dr["PERCENTAGE"].ToString());
                        obj.MajorSubject = dr["MAJOR_SUBJECT"].ToString();
                        obj.Remarks = dr["REMARKS"].ToString();
                        obj.FromDate = dr["FROM_DATE"].ToString();
                        obj.ToDate = dr["TO_DATE"].ToString();
                        obj.EntryBy = dr["ENTRY_BY"].ToString();
                        obj.EntryDate = dr["ENTRY_DATE"].ToString();
                        obj.Status = dr["R_STATUS"].ToString();

                        lst.Add(obj);

                    }

                }

                return lst;

            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }

        #region Dirty
        public bool SaveDirtyEmployeeTraining(List<ATTEmpTraining> lst, Int64? submissionNo, Int32? seqNo, string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";

                foreach (ATTEmpTraining objEmpTraining in lst)
                {
                    if (objEmpTraining.Action == "E")
                    {
                        sp = "DCPR_EDIT_EMP_TRAINING";

                    }
                    else if (objEmpTraining.Action == "A")
                    {
                        sp = "DCPR_ADD_EMP_TRAINING";

                    }

                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();
                        objEmpTraining.EntryDate = null;

                        paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_SEQ_NO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_TITLE", objEmpTraining.Title, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_COUNTRY_CD", objEmpTraining.Country.CountryCode, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_CERTIFICATE_NAME", objEmpTraining.CertificateName, OracleDbType.Varchar2, System.Data.ParameterDirection.InputOutput));
                        paramList.Add(SqlHelper.GetOraParam(":p_INSTITUTE", objEmpTraining.Institution, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", objEmpTraining.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_TO_DATE", objEmpTraining.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_GRADE", objEmpTraining.Grade, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_PERCENTAGE", objEmpTraining.Percentage, OracleDbType.Double, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_MAJOR_SUBJECT", objEmpTraining.MajorSubject, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_REMARKS", objEmpTraining.Remarks, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objEmpTraining.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_R_STATUS", objEmpTraining.Status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));


                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());

                        paramList.Clear();

                    }
                    
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in Saving Employee Training !!!");
                throw (ex);
            }
        }
        #endregion
    }
}
