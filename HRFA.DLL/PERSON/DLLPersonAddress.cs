using System;
using System.Data;
using System.Collections.Generic;

using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLPersonAddress
    {
        public  bool SavePersonAddress(List<ATTPersonAddress> lst,Int64? PID,string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";

                foreach (ATTPersonAddress objPersonAddress in lst)
                {

                    if (objPersonAddress.Action == "E")
                    {
                        sp = "CPR_EDIT_PERSON_ADDRESS";

                        DLLAddress dllAddress = new DLLAddress();

                        objPersonAddress.Person.PID = PID;
                        objPersonAddress.EntryBy = entryBy;
                        objPersonAddress.Address.EntryBy = objPersonAddress.EntryBy;
                        objPersonAddress.Address.AddressID = dllAddress.SaveAddress(objPersonAddress.Address, tran);

                    }
                    else if (objPersonAddress.Action == "A")
                    {
                        sp = "CPR_ADD_PERSON_ADDRESS";

                        DLLAddress dllAddress = new DLLAddress();

                        objPersonAddress.Person.PID = PID;
                        objPersonAddress.EntryBy = entryBy;
                        objPersonAddress.Address.EntryBy = objPersonAddress.EntryBy;
                        objPersonAddress.Address.AddressID = dllAddress.SaveAddress(objPersonAddress.Address, tran);
                        
                    }

                    if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                        paramList.Add(SqlHelper.GetOraParam(":p_PERSON_ID", objPersonAddress.Person.PID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ADDRESS_TYPE_ID", objPersonAddress.AddrType.AddressTypeID, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ADDRESS_ID", objPersonAddress.Address.AddressID, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", objPersonAddress.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.InputOutput));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objPersonAddress.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", objPersonAddress.Status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                        paramList[3].Size = 16;

                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());
                        
                        if (objPersonAddress.FromDate == "" && (paramList[3].Value.ToString() != null || paramList[3].Value.ToString() != ""))
                        {
                            objPersonAddress.FromDate = paramList[3].Value.ToString();
                        }

                        paramList.Clear();

                        DLLPersonContPri dllPersonContPri = new DLLPersonContPri();
                        dllPersonContPri.SavePersonAddressPri(objPersonAddress, tran);
                    }
                   
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in Saving Person Address !!!");
                throw (ex);
            }
        }

        public List<ATTPersonAddress> GetPersonAddress(Int64? PID, Int32? seqNo ,  OracleConnection conn, bool isDirty = false)
        {
            List<ATTPersonAddress> lst = new List<ATTPersonAddress>();

            try
            {
                List<OracleParameter> paramList = new List<OracleParameter>();
                string sp = "";

                if (isDirty)
                {
                    sp = "DCPR_GET_PERSON_ADDRESS";
                    paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", PID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_sno", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                }
                else {
                    sp = "CPR_GET_PERSON_ADDRESS";
                    paramList.Add(SqlHelper.GetOraParam(":p_PERSON_ID", PID, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":p_sno", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                    paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                }

                

                DataSet ds = SqlHelper.ExecuteDataset(conn, CommandType.StoredProcedure, sp, paramList.ToArray());


                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    ATTPersonAddress obj = new ATTPersonAddress();

                    if (isDirty)
                    {
                        obj.Person.SubmissionNo = string.IsNullOrEmpty(dr["SUBMISSION_NO"].ToString()) ? (Int64?)null : Int64.Parse(dr["SUBMISSION_NO"].ToString());
                        obj.Person.SeqNo = string.IsNullOrEmpty(dr["SEQ_NO"].ToString()) ? (Int32?)null : Int32.Parse(dr["SEQ_NO"].ToString());
                    }
                    else
                    {
                        obj.Person.PID = string.IsNullOrEmpty(dr["P_ID"].ToString()) ? (Int64?)null : Int64.Parse(dr["P_ID"].ToString());
                    }

                    obj.Address.AddressID =  string.IsNullOrEmpty(dr["ADDRESS_ID"].ToString()) ? (Int32?)null : Int32.Parse(dr["ADDRESS_ID"].ToString());
                    obj.AddrType.AddressTypeID = string.IsNullOrEmpty(dr["ADTYPE_ID"].ToString()) ? (Int32?)null : Int32.Parse(dr["ADTYPE_ID"].ToString());
					//obj.AddrType.AddressName = dr["ADTYPE_NAME"].ToString();
					obj.AddrType.AddressName = dr["ADTYPE_NAME_ENG"].ToString();

					//obj.AddrType.AddressNameEng = dr["ADTYPE_NAME_ENG"].ToString();
					obj.FromDate = dr["FROM_DATE"].ToString();
                    obj.Status = dr["R_STAUS"].ToString();
                    obj.Address.Province.ProvinceCD = string.IsNullOrEmpty(dr["PROVINCE_CD"].ToString()) ? (Int32?)null : Int32.Parse(dr["PROVINCE_CD"].ToString());
					obj.Address.Province.ProvinceNameNepali = dr["NAME_NEP"].ToString();
					obj.Address.Province.ProvinceNameEnglish = dr["NAME_ENG"].ToString();
					obj.Address.District.DistrictCD = string.IsNullOrEmpty(dr["DISTRICT_CD"].ToString()) ? (Int32?)null : Int32.Parse(dr["DISTRICT_CD"].ToString());
                    obj.Address.District.DistrictNameEnglish = dr["DIS_NAME_ENG"].ToString();
                    obj.Address.District.DistrictNameNepali = dr["DIS_NAME_NEP"].ToString();
                    obj.Address.Vdc.VdcCD = string.IsNullOrEmpty(dr["VDC_CD"].ToString()) ? (Int32?)null : Int32.Parse(dr["VDC_CD"].ToString());
                    obj.Address.Vdc.VDCName = dr["VDC_NAME_NEP"].ToString();
                    obj.Address.Vdc.VDCEn = dr["VDC_NAME_ENG"].ToString();
					//obj.Address.Vdc.TotalCount = string.IsNullOrEmpty(dr["WARD_NO"].ToString()) ? (Int32?)null : Int32.Parse(dr["WARD_NO"].ToString());
					obj.Address.Ward =  Int32.Parse(dr["WARD_NO"].ToString());
					//obj.Address.Ward.WardNameNep = dr["VW_NAME_NEP"].ToString();
					//obj.Address.Ward.WardNameEn = dr["VW_NAME_ENG"].ToString();
					obj.Address.Tole = dr["TOLE_NEP"].ToString();
                    obj.Address.ToleEn = dr["TOLE_ENG"].ToString();
                    obj.Address.HouseNumber = dr["HOUSE_NUMBER"].ToString();
                    obj.Address.Status = dr["ADD_STATUS"].ToString();

                    DLLPersonContPri dllPersonContPri = new DLLPersonContPri();

                    if (isDirty)
                    {
                        obj.AddressPriority = dllPersonContPri.GetPersonAddressPri(PID, seqNo, obj.AddrType.AddressTypeID, obj.Address.AddressID, obj.FromDate, conn, true);                       
                    }
                    else
                    {
                        obj.AddressPriority = dllPersonContPri.GetPersonAddressPri(obj.Person.PID, seqNo, obj.AddrType.AddressTypeID, obj.Address.AddressID, obj.FromDate, conn);
                    }

                    lst.Add(obj);

                }
            }
            catch (Exception ex)
            {

                throw(ex);
            }

            return lst;
        }

        #region Dirty
        public bool SaveDirtyPersonAddress(List<ATTPersonAddress> lst, Int64? submissionNo, Int32? seqNo, string entryBy, OracleTransaction tran)
        {
            try
            {
                string sp = "";

                foreach (ATTPersonAddress objPersonAddress in lst)
                {                    
                    if (objPersonAddress.Action == "E")
                    {
                        sp = "DCPR_EDIT_PERSON_ADDRESS";
                        DLLAddress dllAddress = new DLLAddress();
                        objPersonAddress.Person.SubmissionNo = submissionNo;
                        objPersonAddress.Person.SeqNo = seqNo;
                        objPersonAddress.EntryBy = entryBy;
                        objPersonAddress.Address.EntryBy = objPersonAddress.EntryBy;
                        objPersonAddress.Address.Status = objPersonAddress.Status;
                        dllAddress.SaveDirtyAddress(objPersonAddress.Address, tran);
                    }
                    else if (objPersonAddress.Action == "A")
                    {
                        sp = "DCPR_ADD_PERSON_ADDRESS";
                        DLLAddress dllAddress = new DLLAddress();
                        objPersonAddress.Person.SubmissionNo = submissionNo;
                        objPersonAddress.Person.SeqNo = seqNo;
                        objPersonAddress.EntryBy = entryBy;
						objPersonAddress.Address.EntryBy = objPersonAddress.EntryBy;
						objPersonAddress.Address.Status = objPersonAddress.Status;
						objPersonAddress.Address.AddressID = dllAddress.SaveDirtyAddress(objPersonAddress.Address, tran);

					}

					if (sp != "")
                    {
                        List<OracleParameter> paramList = new List<OracleParameter>();

                        paramList.Add(SqlHelper.GetOraParam(":p_SUBMISSION_NO", submissionNo, OracleDbType.Int64, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_SEQ_NO", seqNo, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ADDRESS_TYPE_ID", objPersonAddress.AddrType.AddressTypeID, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_ADDRESS_ID", objPersonAddress.Address.AddressID, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":p_FROM_DATE", objPersonAddress.FromDate, OracleDbType.Varchar2, System.Data.ParameterDirection.InputOutput));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objPersonAddress.EntryBy, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", null, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));
                        paramList.Add(SqlHelper.GetOraParam(":P_R_STATUS", objPersonAddress.Status, OracleDbType.Varchar2, System.Data.ParameterDirection.Input));

                        paramList[4].Size = 16;

                        SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, sp, paramList.ToArray());

                        if (objPersonAddress.FromDate == "" && (paramList[4].Value.ToString() != null || paramList[4].Value.ToString() != ""))
                        {
                            objPersonAddress.FromDate = paramList[4].Value.ToString();
                        }

                        paramList.Clear();

                        //if (objPersonAddress.AddressPriority == null)
                        //{

                        //}
                        //else
                        //{
                        //    DLLPersonContPri dllPersonContPri = new DLLPersonContPri();
                        //    dllPersonContPri.SaveDirtyPersonAddressPri(objPersonAddress, tran);
                        //}
                    }
                    
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("Error in Saving Person Address !!!" + ex.Message);
                throw (ex);
            }
        }
        #endregion
    }
 }

