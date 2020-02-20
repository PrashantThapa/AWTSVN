using System;
using System.Data;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLPersonDependent
    {
        public bool SavePersonDependent(List<ATTPersonDependent> lst,Int64? PID,string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";

                foreach (ATTPersonDependent obj in lst)
                {
                    obj.Person.PID = PID;
                    obj.EntryBy = entryBy;

                    if (obj.Action == "E")
                    {
                        sp = "CPR_EDIT_PERSON_DEPENDENT";
                        DLLPerson dllPerson = new DLLPerson();
                        dllPerson.SavePerson(obj.Relative, tran);
                    }
                    else if (obj.Action == "A")
                    {
                        sp = "CPR_ADD_PERSON_DEPENDENT";

                        DLLPerson dllPerson = new DLLPerson();
                        dllPerson.SavePerson(obj.Relative, tran);

                    }
                    
                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                        paramList.Add(SqlHelper.GetOraParam(":p_PERSON_ID",PID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_RELATION_TYPE_ID",obj.RelType.RelTypeID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_RELATIVE_ID", obj.Relative.PID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", entryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE",null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", obj.Status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                        paramList.Clear();

                        if (obj.IsNominee)
                        {
                            DLLPersonNominee dllPersonNominee = new DLLPersonNominee();

                            dllPersonNominee.SaveNominee(obj, tran);
                        }
                    }

                  
                }

                return true;
            }
            catch (Exception ex)
            {
                throw (ex);
            }
        }

        public List<ATTPersonDependent> GetPersonDependent(Int64? ID, Int32? seqNo, OracleConnection conn, bool isDirty = false)
        {
            List<ATTPersonDependent> lst = new List<ATTPersonDependent>();
          
            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                string sp = "CPR_GET_PERSON_DEPENDENT";

                if (isDirty)
                {
                    sp = "DCPR_GET_PERSON_DEPENDENT";                    
                }

                

                paramList.Add(SqlHelper.GetOraParam(":p_ID", ID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_SEQNO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, sp, paramList.ToArray());


                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    ATTPersonDependent obj = new ATTPersonDependent();

                    if (isDirty)
                    {
                        obj.Person.SubmissionNo = Int64.Parse(dr["SUBMISSION_NO"].ToString());
                        obj.Person.SeqNo = int.Parse(dr["P_SEQ_NO"].ToString());
                        obj.Relative.SubmissionNo = Int64.Parse(dr["RELATIVE_ID"].ToString());
                        obj.Relative.SeqNo = int.Parse(dr["R_SEQ_NO"].ToString());
                    }
                    else
                    {
                        obj.Person.PID = Int64.Parse(dr["P_ID"].ToString());
                        obj.Relative.PID = Int64.Parse(dr["RELATIVE_ID"].ToString());
                    }


                    obj.RelType.RelTypeID = int.Parse(dr["RELTYPE_ID"].ToString());
                    obj.RelType.RelTypeName = dr["RELTYPE_NAME"].ToString();
                    obj.RelType.RelTypeNameEng = dr["RELTYPE_NAME_ENG"].ToString();
                    obj.Status = dr["R_STAUS"].ToString();

                    obj.Relative.FirstName = dr["FNAME_NEP"].ToString();
                    obj.Relative.MiddleName = dr["MNAME_NEP"].ToString();
                    obj.Relative.LastName = dr["LNAME_NEP"].ToString();

                    obj.Relative.FirstNameEn = dr["FNAME_ENG"].ToString();
                    obj.Relative.MiddleNameEn = dr["MNAME_ENG"].ToString();
                    obj.Relative.LastNameEn = dr["LNAME_ENG"].ToString();

                    obj.Relative.DOB = dr["DOB"].ToString();
                    obj.Relative.Gender = dr["GENDER"].ToString();
                    
                    
                    DLLPersonDoc dllPersonDoc = new DLLPersonDoc();
                    DLLPersonNominee dllPersonNominee = new DLLPersonNominee();

                    if (isDirty)
                    {
                        //obj.Relative = dllPerson.GetPerson(obj.Relative.SubmissionNo, user);
                        obj.PersonNominee = dllPersonNominee.GetPersonNominee(obj.Person.SubmissionNo, obj.Relative.SubmissionNo,obj.Person.SeqNo ,obj.Relative.SeqNo, conn,true);

                        //NB: If Nominee then Person Documents is required
                        //obj.Relative.PersonDocs = dllPersonDoc.GetPersonDocs(obj.Relative.SubmissionNo, obj.Relative.SeqNo , conn, true);
                    }
                    else
                    {
                        //obj.Relative = dllPerson.GetPerson(obj.Relative.PID, user);
                        obj.PersonNominee = dllPersonNominee.GetPersonNominee(obj.Person.PID, obj.Relative.PID, obj.Person.SeqNo , obj.RelType.RelTypeID, conn);


                        //NB: If Nominee then Person Documents is required
                        //obj.Relative.PersonDocs = dllPersonDoc.GetPersonDocs(obj.Relative.PID, obj.Relative.SeqNo, conn);              
                    }

                    if (obj.PersonNominee != null)
                    {
                        obj.IsNominee = true;
                        obj.PersonNominee.Relative = obj.Relative;
                    }
                    else
                    {
                        obj.IsNominee = false;
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

        public bool SaveDirtyPersonDependent(List<ATTPersonDependent> lst, Int64? submissionNo, Int32? seqNo, string entryBy, OracleTransaction tran)
        {
            try
            {
               string sp = "";

                foreach (ATTPersonDependent obj in lst)
                {
                    
                    obj.Person.SeqNo = seqNo;
                    obj.EntryBy = entryBy;

                    if (obj.Action == "E")
                    {
                        sp = "DCPR_EDIT_PERSON_DEPENDENT";
                        DLLPerson dllPerson = new DLLPerson();

						// obj.Relative.Source = "DIRTY";
						////obj.Relative.SubmissionNo = submissionNo;
						// obj.Relative.Status = obj.Status;
						var relID = obj.Relative.SubmissionNo;
						dllPerson.SavePerson(obj.Relative, tran);
						obj.Person.SubmissionNo = obj.Relative.SubmissionNo;
						obj.Relative.SubmissionNo = relID;

					}
					else if (obj.Action == "A")
                    {
                        sp = "DCPR_ADD_PERSON_DEPENDENT";
                        DLLPerson dllPerson = new DLLPerson();
                        obj.Relative.Source = "DIRTY";                        
                        obj.Relative.Status = obj.Status;
                        obj.Relative.PersonMaritalStatus = null;
                        dllPerson.SavePerson(obj.Relative, tran);
						obj.Person.SubmissionNo = obj.Relative.SubmissionNo;
						obj.Relative.SubmissionNo = null;
						obj.Relative.SubmissionNo = submissionNo;
					}

                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();
                        
                        paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", obj.Person.SubmissionNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_PERSON_SEQ_NO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_RELATION_TYPE_ID", obj.RelType.RelTypeID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_RELATIVE_ID", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_RELATIVE_SEQ_NO", obj.Relative.SeqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", entryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", obj.Status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                        paramList.Clear();

                        if (obj.IsNominee)
                        {
                            DLLPersonNominee dllPersonNominee = new DLLPersonNominee();
                            obj.PersonNominee.Person.SubmissionNo = submissionNo;
                            obj.PersonNominee.Person.SeqNo = seqNo;
                            obj.PersonNominee.Relative.SubmissionNo = obj.Relative.SubmissionNo;
                            obj.PersonNominee.Relative.SeqNo = obj.Relative.SeqNo;
                            obj.PersonNominee.Status = obj.Status;
                            
                            dllPersonNominee.SaveDirtyNominee(obj.PersonNominee, tran);
                       
                            DLLPersonDoc dllPerdoc = new DLLPersonDoc();
                            for (int i = 0; i < obj.PersonNominee.NomineeDoc.Count; i++)
                            {
                                obj.PersonNominee.NomineeDoc[i].Status = obj.Status;
                            }
                            dllPerdoc.SaveDirtyPersonDocs(obj.PersonNominee.NomineeDoc, submissionNo, obj.Relative.SeqNo, entryBy, tran);



                        }

                        else if (!obj.IsNominee && obj.prevIsNominee)
                        {
                            DLLPersonNominee dllPersonNominee = new DLLPersonNominee();
                            obj.PersonNominee = new ATTPersonNominee();
                            obj.PersonNominee.Person.SubmissionNo = submissionNo;
                            obj.PersonNominee.Person.SeqNo = seqNo;
                            obj.PersonNominee.Action = "D";

                            dllPersonNominee.SaveDirtyNominee(obj.PersonNominee, tran);
                        }



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
