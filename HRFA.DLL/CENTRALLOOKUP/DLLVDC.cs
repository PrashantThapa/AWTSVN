﻿using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLVDC
    {
        public List<ATTDistrictVDC> GetVDC(int? DistrictCD, int? VdcCD)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            List<ATTDistrictVDC> lst = new List<ATTDistrictVDC>();
            try
            {

                string SP = "CPR_GET_VDC";


                List<OracleParameter> paramList = new List<OracleParameter>
                {
                    SqlHelper.GetOraParam(":p_DISTRICT_CODE", DistrictCD, OracleDbType.Int32, System.Data.ParameterDirection.Input),
					SqlHelper.GetOraParam(":p_VDC_CODE", VdcCD, OracleDbType.Int32, System.Data.ParameterDirection.Input),
					SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output)
                };

                DataSet ds = SqlHelper.ExecuteDataset(dbConn,CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTDistrictVDC> lstVDC = new List<ATTDistrictVDC>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {

                    ATTDistrictVDC objVDC = new ATTDistrictVDC();
                    objVDC.DistrictCD = int.Parse(drow["DISTRICT_CD"].ToString());
                    objVDC.VdcCD = int.Parse(drow["VDC_CD"].ToString());
                    objVDC.VDCName = drow["NAME_NEP"].ToString();
                    objVDC.VDCEn = drow["NAME_ENG"].ToString();
					objVDC.TotalCount = int.Parse(drow["TOTAL_WARD"].ToString());

					lstVDC.Add(objVDC);
                }

                return lstVDC;
            }
            catch (Exception)
            {
                return new List<ATTDistrictVDC>();

            }
            finally
            {
                conn.CloseDbConn();
            }

        }
    }
}
