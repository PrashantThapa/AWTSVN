﻿using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLQualification
    {
        public List<ATTQualification> GetQualification(int? qualID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            List<ATTQualification> lst = new List<ATTQualification>();

            try
            {
                string SP = "CPR_GET_QUALIFICATION";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_QUAL_ID", qualID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));



                DataSet ds = SqlHelper.ExecuteDataset(conn,CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTQualification obj = new ATTQualification();

                    obj.QualID = string.IsNullOrEmpty(drow["QUAL_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["QUAL_ID"].ToString());
                    obj.QualName = drow["QUAL_NAME"].ToString();
                  


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
    }
}
