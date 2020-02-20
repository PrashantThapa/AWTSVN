using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLEmployeeExperience
    {
        public List<ATTEmpExperience> GetEmpExperiences(Int64? ID, OracleConnection conn, bool isDirty = false)
        {
            List<ATTEmpExperience> lst = new List<ATTEmpExperience>();

            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                string sp = "CPR_GET_EXPERIENCE";

                if (isDirty)
                {
                    sp = "DCPR_GET_EXPERIENCE";
                }



                paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", ID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, sp, paramList.ToArray());

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ((DataTable)ds.Tables[0]).Rows)
                    {

                        ATTEmpExperience obj = new ATTEmpExperience();


                        obj.JobLocation = dr["JOB_LOCATION"].ToString();
                        obj.Country.CountryCode = dr["COUNTRY_CD"].ToString();
                        obj.Country.CountryName = dr["COUNTRY_NAME"].ToString();
                        obj.FromDate = dr["FROM_DATE"].ToString();
                        obj.ToDate = dr["TO_DATE"].ToString();
                        obj.Remarks = dr["REMARKS"].ToString();
                        obj.EntryBy = dr["ENTRY_BY"].ToString();
                        obj.RStatus = dr["R_STATUS"].ToString();

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
        public bool SaveDirtyEmployeeExperience(List<ATTEmpExperience> lst, Int64? submissionNo, Int32? seqNo, string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";

                foreach (ATTEmpExperience objEmpExperience in lst)
                {
                    if (objEmpExperience.Action == "E")
                    {
                        sp = "DCPR_EDIT_EMP_EXPERIENCE";

                    }
                    else if (objEmpExperience.Action == "A")
                    {
                        sp = "DCPR_ADD_EMP_EXPERIENCE";

                    }

                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                        paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_SEQ_NO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", objEmpExperience.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_TO_DATE", objEmpExperience.ToDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_POSTING_LOCATION", null, OracleDbType.Varchar2, System.Data.ParameterDirection.InputOutput));
                        paramList.Add(SqlHelper.GetOraParam(":p_JOB_LOCATION", objEmpExperience.JobLocation, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_CLASSIFICATION", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_REMARKS", objEmpExperience.Remarks, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_BY", objEmpExperience.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ENTRY_DATE", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_R_STATUS", objEmpExperience.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_COUNTRY_CD", objEmpExperience.Country.CountryCode, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());

                        paramList.Clear();

                    }
                    
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in Saving Employee Experience !!!" + ex.Message);
                throw (ex);
            }
        }
        #endregion
    }
}
