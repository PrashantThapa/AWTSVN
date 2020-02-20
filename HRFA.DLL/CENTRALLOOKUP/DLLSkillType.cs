using System;
using System.Data;
using System.Collections.Generic;

using HRFA.COMMON;
using HRFA.ATT;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLSkillType
    {
        /// <summary>
        /// This method Save/Update Skill Type
        /// </summary>
        /// <param name="lst"></param>
        /// <returns>String as a Message about Save/Update Skill Type</returns>
        /// 
        public  string SaveSkillType(List<ATTSkillType> lst)
        {
            string sp = "";
            string msg = "No Data To Save !!!";
            string status = "";

            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);
            OracleTransaction tran = conn.BeginTransaction();


            try
            {
                foreach (ATTSkillType obj in lst)
                {

                    if (obj.Status == true)
                    {
                        status = "A";
                    }
                    else
                    {
                        status = "I";
                    }


                    if (obj.Action == "A")
                    {
                        sp = "CPR_ADD_SKILLS";
                        msg = "Successfully Saved.";
                    }
                    else if (obj.Action == "E")
                    {
                        sp = "CPR_EDIT_SKILLS";
                        msg = "Successfully Updated.";
                    }

                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                       // obj.EntryBy = "SOSYS_MAIN";

                        paramList.Add(SqlHelper.GetOraParam(":p_SKILLS_ID", obj.SkillTypeID, OracleDbType.Int32, System.Data.ParameterDirection.InputOutput));
                        paramList.Add(SqlHelper.GetOraParam(":p_SKILLS_NAME", obj.SkillTypeName, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_SKILLS_NAME_ENG", obj.SkillTypeNameEng, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_STATUS", status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", obj.EntryDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        SqlHelper.ExecuteNonQuery(tran, System.Data.CommandType.StoredProcedure, sp, paramList.ToArray());
                        paramList.Clear();
                    }
                }
                tran.Commit();
                return msg;
            }
            catch (Exception ex)
            {
                tran.Rollback();
                throw new Exception("Error" + ex.Message);
            }
            finally
            {
                GetConn.CloseDbConn();
            }

        }

        /// <summary>
        /// This method Delete Skill Type
        /// </summary>
        /// <param name="skillTypeID">skillTypeID to be deleted</param>
        /// <returns>String as a Message about Delete Skill Type</returns>
        ///
        public  List<ATTSkillType> GetSkillType(int? skillTypeID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            List<ATTSkillType> lst = new List<ATTSkillType>();

            try
            {
                string SP = "CPR_GET_SKILLS";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_SKILLS_ID", skillTypeID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn,CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTSkillType obj = new ATTSkillType();

                    obj.SkillTypeID = Int32.Parse(drow["SKILL_ID"].ToString());
                    obj.SkillTypeName = drow["SKILL_NAME"].ToString();
                    obj.SkillTypeNameEng = drow["SKILL_NAME_ENG"].ToString();
                    obj.Status = drow["STATUS"].ToString() == "A" ? true : false;
                    obj.FromDate = drow["FROM_DATE"].ToString();
                    obj.ToDate = drow["TO_DATE"].ToString();
                    obj.Action = "";

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
                getConn.CloseDbConn();
            }
        }

        /// <summary>
        /// Retrives a list of Skill Type(s)
        /// </summary>
        /// <param name="skillTypeID"></param>
        /// <returns>Skill Type or Null if Skill Type does not exist</returns>
        /// 

        public  string DeleteSkillType(int? skillTypeID)
        {
            GetConnection GetConn = new GetConnection();
            OracleConnection conn = GetConn.GetDbConn(GetConn.LoginUser);

            try
            {
                string SP = "CPR_DEL_SKILLS";

                List<OracleParameter> ParamList = new List<OracleParameter>();
                ParamList.Add(SqlHelper.GetOraParam(":p_SKILLS_ID", skillTypeID, OracleDbType.Int32, ParameterDirection.InputOutput));
                ParamList.Add(SqlHelper.GetOraParam(":P_TO_DATE", "", OracleDbType.Varchar2, ParameterDirection.InputOutput));
                //ParamList.Add(SqlHelper.GetOraParam(":p_status", "I", OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                SqlHelper.ExecuteNonQuery(conn, CommandType.StoredProcedure, SP, ParamList.ToArray());

                return "Deleted Successfully.";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                GetConn.CloseDbConn();
            }
        }

        public bool SavePersonSkills(List<ATTSkillType> lst, Int64? PID, string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";

                foreach (ATTSkillType obj in lst)
                {

                    if (obj.Action == "E")
                    {
                        sp = "CPR_EDIT_PERSON_SKILLS";

                    }
                    else if (obj.Action == "A")
                    {
                        sp = "CPR_ADD_PERSON_SKILLS";
                    }

                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                        paramList.Add(SqlHelper.GetOraParam(":p_PERSON_ID", PID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_SKILL_ID", obj.SkillTypeID, OracleDbType.Int16, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", entryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", null, OracleDbType.Date, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", obj.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                        paramList.Clear();
                    }
                    else
                    {
                        throw new Exception("Error in Saving Person Skill !!!");
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public List<ATTSkillType> GetPersonSkills(Int64? ID, Int32? seqNo, OracleConnection conn, bool isDirty = false)
        {
            List<ATTSkillType> lst = new List<ATTSkillType>();

            try
            {
                
                string sp = "CPR_GET_PERSON_SKILLS";

                if (isDirty)
                {
                    sp = "DCPR_GET_PERSON_SKILLS";                    
                }


                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":p_ID", ID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_SEQNO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, sp, paramList.ToArray());

                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ((DataTable)ds.Tables[0]).Rows)
                    {

                        ATTSkillType obj = new ATTSkillType();

                        obj.SkillTypeID = int.Parse(dr["SKILL_ID"].ToString());
                        obj.SkillTypeName = dr["SKILL_NAME"].ToString();
                        obj.SkillTypeNameEng = dr["SKILL_NAME_ENG"].ToString();
                        obj.FromDate = dr["FROM_DATE"].ToString();
                        obj.RStatus = dr["R_STAUS"].ToString();

                        lst.Add(obj);

                    }

                }

                return lst;

            }
            catch (Exception)
            {

                throw;
            }
        }

        #region Dirty

        public bool SaveDirtyPersonSkills(List<ATTSkillType> lst, Int64? submissionNo, int seqNo, string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";

                foreach (ATTSkillType obj in lst)
                {

                    if (obj.Action == "E")
                    {
                        sp = "DCPR_EDIT_PERSON_SKILLS";

                    }
                    else if (obj.Action == "A")
                    {
                        sp = "DCPR_ADD_PERSON_SKILLS";
                    }

                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();


                        paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_SEQ_NO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_SKILL_ID", obj.SkillTypeID, OracleDbType.Int16, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", entryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", null, OracleDbType.Date, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", obj.RStatus, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                        paramList.Clear();
                    }
                    else
                    {
                        throw new Exception("Error in Saving Person Skill !!!");
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        #endregion
    }
}
