using System;
using System.Collections.Generic;
using HRFA.ATT;
using HRFA.DataLayer;
namespace HRFA.BLL
{
    public class BLLDistrict{
        public List<ATTDistrict> GetDistricts(int? PROVINCE_CD, int? DISTRICT_CD)
        {
            try
            {
                DLLDistrict lst = new DLLDistrict();

                return lst.GetDistricts(PROVINCE_CD, DISTRICT_CD);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
