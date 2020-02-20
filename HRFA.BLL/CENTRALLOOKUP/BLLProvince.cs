using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.DataLayer.CENTRALLOOKUP;

namespace HRFA.BLL

{
	public class BLLProvince
	{
		public List<ATTProvince> GetProvince(int? PROVINCE_CD)
		{
			try
			{
				DLLProvince lst = new DLLProvince();

				return lst.GetProvince(PROVINCE_CD);
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
	}
}
