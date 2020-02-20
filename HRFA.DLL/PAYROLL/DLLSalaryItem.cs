using System;
using System.Collections.Generic;
using System.Data;
using HRFA.ATT;
using HRFA.COMMON;

using System.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace HRFA.DataLayer
{
    public class DLLSalaryItem
    {
        public string SaveSalaryItem(ATTSalaryItem objSalaryItem)
        {
            string SP = "";
            string msg = "No Data To Save !!!";
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            OracleTransaction tran = dbConn.BeginTransaction();
            try
            {

                if (objSalaryItem.Action == "A")
                {
                    SP = "CPR_ADD_SALARY_ITEM";
                    msg = "Successfully Saved.";
                }
                else if (objSalaryItem.Action == "E")
                {
                    SP = "CPR_EDIT_SALARY_ITEM";
                    msg = "Successfully Updated.";
                }

				List<OracleParameter> paramList = new List<OracleParameter>();
				//objSalaryItem.SalaryItems.SalaryItemID,
				paramList.Add(SqlHelper.GetOraParam(":p_SALARY_ITEM_ID", objSalaryItem.SalaryItemID, OracleDbType.Int32, ParameterDirection.InputOutput));
				paramList.Add(SqlHelper.GetOraParam(":p_SALARY_ITEM_DESC", objSalaryItem.SalaryItemDesc, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_ITEM_TYPE", objSalaryItem.ItemType, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_FROM_DATE", objSalaryItem.FromDate, OracleDbType.Varchar2, ParameterDirection.InputOutput));
				paramList.Add(SqlHelper.GetOraParam(":P_TO_DATE", objSalaryItem.ToDate, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_BY", objSalaryItem.EntryBy, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_ENTRY_DATE", objSalaryItem.EntryDate, OracleDbType.Date, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_STATUS", objSalaryItem.Status, OracleDbType.Varchar2, ParameterDirection.Input));
				paramList.Add(SqlHelper.GetOraParam(":P_TAXABLE", objSalaryItem.Taxable, OracleDbType.Varchar2, ParameterDirection.Input));

				paramList[0].Size = 50;
				SqlHelper.ExecuteNonQuery(tran, CommandType.StoredProcedure, SP, paramList.ToArray());

				objSalaryItem.SalaryItemID = Int32.Parse(paramList[0].Value.ToString());
				// objSalaryItem.FromDate = paramList[3].Value.ToString();
				objSalaryItem.FromDate = "2074.04.01";

				//DLLSalaryItemGL objSalaryItemGL = new DLLSalaryItemGL();
				//objSalaryItemGL.SaveSalaryItemGL(objSalaryItem, tran);

				tran.Commit();
			return msg;
		}
            catch (Exception ex)
            {
                tran.Rollback();
                return ex.Message;
            }

        }


		public string DeleteSalaryItem(Int32? SalaryItems)
		{

			GetConnection conn = new GetConnection();
			OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);


			try
			{
				string SP = "CPR_DELETE_SALARYITEM";
				//SP1 = "CPR_DELETE_SALARYITEM_GL";
				//msg = "asd";

				//if (SP != "" && SP1 != "")
				//{
					List<OracleParameter> ParamList = new List<OracleParameter>();
					ParamList.Add(SqlHelper.GetOraParam(":p_SALARY_ITEM_ID", SalaryItems, OracleDbType.Int32, ParameterDirection.InputOutput));
					SqlHelper.ExecuteNonQuery(dbConn, CommandType.StoredProcedure, SP, ParamList.ToArray());

					return "Deleted Successfully!!!";
				//}
				//return msg;



			}
			catch (Exception ex)
			{

				return ex.Message;

			}
			finally
			{

				conn.CloseDbConn();
			}

		}
		//public List<ATTSalaryItem> GetSalaryItem(Int32? SalaryItems)
  //      {
  //          GetConnection conn = new GetConnection();
  //          OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
  //          try
  //          {
  //              string SP = "CPR_GET_SALARY_ITEM";
  //              string SP1 = "CPR_GET_SALARY_ITEM_GL";

  //              List<OracleParameter> paramList = new List<OracleParameter>();

  //              paramList.Add(SqlHelper.GetOraParam(":P_SALARY_ITEM_ID", SalaryItems, OracleDbType.Int32, ParameterDirection.Input));
  //              paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, ParameterDirection.Output));
  //              DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

  //              List<ATTSalaryItem> lst = new List<ATTSalaryItem>();
  //              ATTSalaryItemGL objSalaryItemGL = new ATTSalaryItemGL();
  //              ATTAccountChart objAccountChart = new ATTAccountChart();

  //              foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
  //              {
  //                  ATTSalaryItem obj = new ATTSalaryItem();

  //                  obj.SalaryItemID = string.IsNullOrEmpty(drow["SALARY_ITEM_ID"].ToString()) ? (Int32?)null : Int32.Parse(drow["SALARY_ITEM_ID"].ToString());
  //                  //Convert.ToInt32(drow["SALARY_ITEM_ID"].ToString());
  //                  obj.SalaryItemDesc = drow["SALARY_ITEM_DESC"].ToString();
  //                  obj.ItemType = drow["ITEM_TYPE"].ToString();

  //                  obj.Taxable = drow["TAXABLE"].ToString();

  //                  obj.FromDate = drow["FROM_DATE"].ToString();
  //                  obj.ToDate = drow["TO_DATE"].ToString();
                    
  //                  List<OracleParameter> paramList1 = new List<OracleParameter>();

  //                  paramList1.Add(SqlHelper.GetOraParam(":P_SALARY_ITEM_ID", SalaryItems, OracleDbType.Int32, ParameterDirection.Input));
  //                  paramList1.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, ParameterDirection.Output));
  //                  DataSet ds1 = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP1, paramList1.ToArray());
  //                  if (ds1.Tables[0].Rows.Count > 0)
  //                  {
  //                      DataRow dr = ds1.Tables[0].Rows[0];
  //                      obj.SalaryItemGL.ParentGL.AccCode = string.IsNullOrEmpty(dr["AC_CODE"].ToString()) ? (Int32?)null : Int32.Parse(dr["AC_CODE"].ToString());
  //                      obj.SalaryItemGL.FromDate = dr["FROM_DATE"].ToString();
  //                  }
  //                  lst.Add(obj);
  //              }

  //              return lst;

  //          }
  //          catch (Exception ex)
  //          {
  //              throw (ex);
  //          }
  //          finally
  //          {
  //              conn.CloseDbConn();
  //          }
  //      }
        public List<ATTSalaryItem> GetSalaryItemByOffice(Int32? officecode,Int32? postcode)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            try
            {
                string SP = "CPR_GET_SALARY_ITEM_BYOFFICE";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", officecode, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_POST_ID", postcode, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTSalaryItem> lst = new List<ATTSalaryItem>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTSalaryItem obj = new ATTSalaryItem();

                    obj.SalaryItemID = Convert.ToInt32(drow["SALARY_ITEM_ID"].ToString());
                    obj.SalaryItemDesc = drow["SALARY_ITEM_DESC"].ToString();
                    obj.ItemType = drow["ITEM_TYPE"].ToString();
                    obj.FromDate = drow["FROM_DATE"].ToString();
                    obj.ToDate = drow["TO_DATE"].ToString();

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
        public List<ATTSalaryItem> GetSalaryItemByOfficeSub(Int32? officecode, Int32? postcode, Int64? subno)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            try
            {
                string SP = "DCPR_GET_SALARY_ITEM_BYSUB";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_SUBMISSION_NO", subno, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_OFFICE_CD", officecode, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_POST_ID", postcode, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_RC", null, OracleDbType.RefCursor, ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTSalaryItem> lst = new List<ATTSalaryItem>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTSalaryItem obj = new ATTSalaryItem();

                    obj.SalaryItemID = Convert.ToInt32(drow["SALARY_ITEM_ID"].ToString());
                    obj.SalaryItemDesc = drow["SALARY_ITEM_DESC"].ToString();
                    obj.ItemType = drow["ITEM_TYPE"].ToString();
                    obj.FromDate = drow["FROM_DATE"].ToString();
                    obj.ToDate = drow["TO_DATE"].ToString();

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
        public List<ATTFunction> GetFunction(string Mode)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            try
            {
                string SP = "CPR_GET_CALCULATED_ITEM";

                List<OracleParameter> paramList = new List<OracleParameter>();

                //paramList.Add(SqlHelper.GetOraParam(":P_SALARY_ITEM_ID", Mode, OracleDbType.Int32, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":p_rc", null, OracleDbType.RefCursor, ParameterDirection.Output));
                DataSet ds = SqlHelper.ExecuteDataset(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                List<ATTFunction> lst = new List<ATTFunction>();

                foreach (DataRow drow in ((DataTable)ds.Tables[0]).Rows)
                {
                    ATTFunction obj = new ATTFunction();

                    obj.FunID = drow["PROCEDURE_NAME"].ToString();
                    obj.FunDesc = drow["PROCEDURE_DESC"].ToString();

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
        public ATTFuncAmount CPR_GET_PF( Int64 EmpID)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            try
            {
                string SP = "CPR_GET_PF";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_ID", EmpID, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_TYPE", null, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_AMOUNT", null, OracleDbType.Double, ParameterDirection.Output));
                paramList[2].Size = 100;
                SqlHelper.ExecuteNonQuery(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                ATTFuncAmount obj = new ATTFuncAmount();
                string a = paramList[2].Value.ToString();
                if (a == "null")
                {
                    obj.Amount = 0;
                }
                else
                {
                    obj.Amount = double.Parse(a);
                }
                //obj.Amount = string.IsNullOrEmpty(paramList[2].Value.ToString()) ? (double?)0 : double.Parse(paramList[2].Value.ToString()); 

                return obj;

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
        public ATTFuncAmount CPR_GET_TAX(Int64 EmpID)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            try
            {
                string SP = "CPR_GET_TAX";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_ID", null, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_TYPE", null, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_AMOUNT", null, OracleDbType.Double, ParameterDirection.Output));
                paramList[2].Size = 100;
                SqlHelper.ExecuteNonQuery(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                ATTFuncAmount obj = new ATTFuncAmount();
                string a = paramList[2].Value.ToString();
                if (a == "null")
                {
                    obj.Amount = 0;
                }
                else
                {
                    obj.Amount = double.Parse(a);
                }
                return obj;

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
        public ATTFuncAmount CPR_GET_NLK( Int64 EmpID)
        {
            GetConnection conn = new GetConnection();
            OracleConnection dbConn = conn.GetDbConn(conn.LoginUser);
            try
            {
                string SP = "CPR_GET_NLK";

                List<OracleParameter> paramList = new List<OracleParameter>();

                paramList.Add(SqlHelper.GetOraParam(":P_ID", EmpID, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_TYPE", null, OracleDbType.Varchar2, ParameterDirection.Input));
                paramList.Add(SqlHelper.GetOraParam(":P_AMOUNT", null, OracleDbType.Double, ParameterDirection.Output));
                paramList[2].Size = 100;
                SqlHelper.ExecuteNonQuery(dbConn, CommandType.StoredProcedure, SP, paramList.ToArray());

                ATTFuncAmount obj = new ATTFuncAmount();
                string a = paramList[2].Value.ToString();
                if (a == "null")
                {
                    obj.Amount = 0;
                }
                else
                {
                    obj.Amount = double.Parse(a);
                }
                return obj;

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
