using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLDistrict
    {
        public List<ATTDistrict> GetDistricts(int? PROVINCE_CD,int? DISTRICT_CD)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            List<ATTDistrict> lst = new List<ATTDistrict>();
            try
            {

                //string status;
                string SP = "CPR_GET_DISTRICTS";


                List<OracleParameter> paramList = new List<OracleParameter>
                {
					SqlHelper.GetOraParam(":p_DISTRICT_CODE", DISTRICT_CD, OracleDbType.Int32, System.Data.ParameterDirection.Input),
					SqlHelper.GetOraParam(":p_PROVINCE_CODE", PROVINCE_CD, OracleDbType.Int32, System.Data.ParameterDirection.Input),
					SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output)
                };

                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTDistrict> lstDistrict = new List<ATTDistrict>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {

                    ATTDistrict objDistrict = new ATTDistrict();
                    //if (drow["TO_DATE"].ToString() == "")
                    //{
                    objDistrict.DistrictCD = int.Parse(drow["DISTRICT_CD"].ToString());
                    objDistrict.DistrictNameNepali = drow["NAME_NEP"].ToString();
                    objDistrict.DistrictNameEnglish = drow["NAME_ENG"].ToString();
                

                    lstDistrict.Add(objDistrict);
                    //}

                }

                return lstDistrict;
            }
            catch (Exception ex)
            {
                return new List<ATTDistrict>();

            }
            finally
            {
                conn.CloseDbConn();
            }

        }
    }
}
