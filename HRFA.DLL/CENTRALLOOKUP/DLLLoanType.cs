using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.ATT.COMMON;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLLoanType
    {
        public List<ATTLoanType> GetLoanType(int? LoanTypeID)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            List<ATTLoanType> lst = new List<ATTLoanType>();

            try
            {
                string SP = "CPR_GET_LOANTYPES";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_LOANTYPE_ID", LoanTypeID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());


                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {

                    ATTLoanType obj = new ATTLoanType();

                    obj.LoanTypeID = string.IsNullOrEmpty(drow["LOANTYPE_ID"].ToString()) ? (int?)null : Int32.Parse(drow["LOANTYPE_ID"].ToString());
                    obj.LoanTypeName = drow["LOANTYPE_NAME"].ToString();
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
                conn.CloseDbConn();
            }
        }

        public List<ATTTaxCat> GetTaxCat()
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            List<ATTTaxCat> lst = new List<ATTTaxCat>();

            try
            {
                string SP = "CPR_GET_TAX_CAT";

                List<OracleParameter> paramList = new List<OracleParameter>();
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());


                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {

                    ATTTaxCat obj = new ATTTaxCat();

                    obj.NCatID = string.IsNullOrEmpty(drow["NCAT_ID"].ToString()) ? (int?)null : Int32.Parse(drow["NCAT_ID"].ToString());
                    obj.TaxCatID = drow["TAX_CAT_ID"].ToString();
                    obj.DescNep = drow["DESC_NEP"].ToString();
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
                conn.CloseDbConn();
            }
        }

		public List<ATTGradeUnit> GetGradeUnit()
		{
			GetConnection conn = new GetConnection();
			OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

			List<ATTGradeUnit> lst = new List<ATTGradeUnit>();

			try
			{
				string SP = "CPR_GET_GRADE_UNIT";

				List<OracleParameter> paramList = new List<OracleParameter>();
				paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

				DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());


				foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
				{

					ATTGradeUnit obj = new ATTGradeUnit();

                    obj.GradeID = string.IsNullOrEmpty(drow["GRADE_ID"].ToString()) ? (int?)null : Int32.Parse(drow["GRADE_ID"].ToString());
                    obj.GradeName = drow["GRADE_NAME"].ToString();

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
				conn.CloseDbConn();
			}
		}


        public List<ATTGradeUnit> GetGradeLevelName(int? GradeID)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);

            List<ATTGradeUnit> lst = new List<ATTGradeUnit>();

            try
            {
                string SP = "CPR_GET_GRADELEVELNAME";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_GRADE_ID", GradeID, OracleDbType.Int32, System.Data.ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, System.Data.ParameterDirection.Output));

                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());


                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {

                    ATTGradeUnit obj = new ATTGradeUnit();

                    obj.LevelID = string.IsNullOrEmpty(drow["LEVEL_ID"].ToString()) ? (int?)null : Int32.Parse(drow["LEVEL_ID"].ToString());
                    obj.GradeID = string.IsNullOrEmpty(drow["GRADE_ID"].ToString()) ? (int?)null : Int32.Parse(drow["GRADE_ID"].ToString());
                    obj.GradeLevelName = drow["GRADE_LEVEL_NAME"].ToString();
                    obj.GradeAmount = drow["GRADE_AMOUNT"].ToString();
                    obj.GradeName = drow["GRADE_NAME"].ToString();

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
                conn.CloseDbConn();
            }
        }

    }
}
