﻿using System;
using System.Data;
using System.Collections.Generic;

using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLPersonContact
    {
        
        public bool SavePersonContact(List<ATTPersonContact> lst, Int64? PID, string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";

                foreach (ATTPersonContact obj in lst)
                {

                    if (obj.Action == "A")
                    {
                        //sp = "CPR_ADD_PERSON_CONTACT";
						sp = "CPR_ADD_PERSON_CONTACT";
						obj.Person.PID = PID;
                        obj.EntryBy = entryBy;
                    }
                    else if (obj.Action == "E")
                    {
                        //sp = "CPR_EDIT_PERSON_CONTACT";
						sp = "CPR_EDIT_PERSON_CONTACT";

						obj.Person.PID = PID;
                        obj.EntryBy = entryBy;
                    }

                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                        paramList.Add(SqlHelper.GetOraParam(":p_PERSON_ID", obj.Person.PID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_CONTACT_TYPE_ID", obj.ContactType.TypeID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.InputOutput));
                        paramList.Add(SqlHelper.GetOraParam(":p_CONTACT_VALUE", obj.CTypeValue, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", null, OracleDbType.Date, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", "F", OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                        paramList[2].Size = 16;

                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                        
                        if (obj.FromDate == "" && (paramList[2].Value.ToString() != null || paramList[2].Value.ToString() != ""))
                        {
                            obj.FromDate = paramList[2].Value.ToString();
                        }

                        paramList.Clear();

                        DLLPersonContPri dllPersonContPri = new DLLPersonContPri();

                        dllPersonContPri.SavePersonContactPri(obj, tran);

                    }
                }

                return true;

            }
            catch (Exception ex)
            {

                throw (ex);
            }
        }

        public List<ATTPersonContact> GetPersonContact(Int64? ID, Int32? seqNo, OracleConnection conn, bool isDirty = false)
        {
            List<ATTPersonContact> lst = new List<ATTPersonContact>();

            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();

                string sp = "";
                if (isDirty)
                {
					//sp = "DCPR_GET_PERSON_CONTACT";

					sp = "DCPR_GET_PERSON_CONTACT";

					paramList.Add(SqlHelper.GetOraParam(":p_ID", ID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_SEQNO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                }
                else
                {
					//sp = "CPR_GET_PERSON_CONTACT";
					sp = "CPR_GET_PERSON_CONTACT";

					paramList.Add(SqlHelper.GetOraParam(":p_PERSON_ID", ID, OracleDbType.Int64, System.Data.ParameterDirection.Input));                    
                    paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                }
                


                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, sp, paramList.ToArray());
                
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    ATTPersonContact obj = new ATTPersonContact();

                    if (isDirty)
                    {
                        obj.Person.SubmissionNo = Int64.Parse(dr["SUBMISSION_NO"].ToString());
                        obj.Person.SeqNo = int.Parse(dr["SEQ_NO"].ToString());
                    }
                    else
                    {
                        obj.Person.PID = Int64.Parse(dr["P_ID"].ToString());
                    }
                    
                    obj.ContactType.TypeID = int.Parse(dr["CTYPE_ID"].ToString());
                    obj.ContactType.TypeName = dr["CTYPE_NAME"].ToString();
                    obj.CTypeValue = dr["C_VALUE"].ToString();

                    obj.FromDate = dr["FROM_DATE"].ToString();
                    obj.Status = dr["R_STAUS"].ToString();
                    obj.EntryBy = dr["ENTRY_BY"].ToString();
                    obj.EntryDate = dr["ENTRY_DATE"].ToString();
                    //obj.TranNo = string.IsNullOrEmpty(dr["TRAN_NO"].ToString()) ? (Int64?)null : Int64.Parse(dr["TRAN_NO"].ToString());
                    
                    DLLPersonContPri dllPersonContPri = new DLLPersonContPri();

                    if (isDirty)
                    {
                        obj.ContactPriority = dllPersonContPri.GetPersonContactPri(ID, seqNo, obj.ContactType.TypeID, obj.FromDate, conn, true);
                    }
                    else
                    {
                        obj.ContactPriority = dllPersonContPri.GetPersonContactPri(obj.Person.PID, seqNo, obj.ContactType.TypeID, obj.FromDate, conn);
                    }

                    lst.Add(obj);

                }
            }
            catch (Exception ex)
            {

                throw (ex);
            }

            return lst;
        }
        
        

        #region Dirty
        public bool SaveDirtyPersonContact(List<ATTPersonContact> lst, Int64? submissionNo, Int32? seqNo, string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";

                foreach (ATTPersonContact obj in lst)
                {

                    if (obj.Action == "A")
                    {
                        sp = "DCPR_ADD_PERSON_CONTACT";
                        obj.Person.SubmissionNo = submissionNo;
                        obj.Person.SeqNo = seqNo;
                        obj.EntryBy = entryBy;
                    }
                    else if (obj.Action == "E")
                    {
                        sp = "DCPR_EDIT_PERSON_CONTACT";
                    }

					//else if (obj.Action == "D")
					//{
					//	sp = "DCPR_DELETE_PERSON_CONTACT";
					//}

					if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();


                        paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_SEQ_NO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_CONTACT_TYPE_ID", obj.ContactType.TypeID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", obj.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.InputOutput));
                        paramList.Add(SqlHelper.GetOraParam(":p_CONTACT_VALUE", obj.CTypeValue, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
						paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", obj.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", null, OracleDbType.Date, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", obj.Status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                        paramList[3].Size = 16;

                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                        

                        if (obj.FromDate == "" && (paramList[3].Value.ToString() != null || paramList[3].Value.ToString() != ""))
                        {
                            obj.FromDate = paramList[3].Value.ToString();
                        }

                        paramList.Clear();

                        //DLLPersonContPri dllPersonContPri = new DLLPersonContPri();

                      //  dllPersonContPri.SaveDirtyPersonContactPri(obj, tran);

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
