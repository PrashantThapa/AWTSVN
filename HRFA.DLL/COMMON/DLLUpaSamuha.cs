using System;
using System.Collections.Generic;

using System.Data;
using HRFA.ATT;
using HRFA.COMMON;
using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLUpaSamuha
    {
        public List<ATTUpaSamuha> GetUpaSamuha(int? samuhaID, int? upaSamuhaID)
        {
            GetConnection getConn = new GetConnection();
            OracleConnection conn = getConn.GetDbConn(getConn.LoginUser);

            List<ATTUpaSamuha> lstUpaSamuha = new List<ATTUpaSamuha>();

            try
            {
                string SP = "CPR_GET_UPASAMUHA";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_SAMUHA_ID", samuhaID, OracleDbType.Int16, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_UPASAMUHA_ID", upaSamuhaID, OracleDbType.Int16, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(conn,CommandType.StoredProcedure, SP, paramList.ToArray());

                foreach (DataRow drow in ds.Tables[0].Rows)
                {
                    ATTUpaSamuha objUpaSamuha = new ATTUpaSamuha();
                    objUpaSamuha.UpaSamuhaID = string.IsNullOrEmpty(drow["UPA_SAMUHA_ID"].ToString()) ? (Int16?)null : Int16.Parse(drow["UPA_SAMUHA_ID"].ToString());
                    objUpaSamuha.UpaSamuhaName = drow["UPA_SAMUHA_NAME"].ToString();
                    //objPost.EntryBy = drow["ENTRY_BY"].ToString();
                    //objPost.EntryDate = drow["ENTRY_DATE"].ToString();
                    //objPost.RStatus = drow["R_STATUS"].ToString();
                    //objPost.TranNo = string.IsNullOrEmpty(drow["Tran_No"].ToString()) ? (Int64?)null : Int64.Parse(drow["Tran_No"].ToString());
                    objUpaSamuha.Action = "";
                    lstUpaSamuha.Add(objUpaSamuha);

                }

                return lstUpaSamuha;
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
