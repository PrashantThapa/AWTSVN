using System;

namespace HRFA.ATT
{
    public class ATTOffice
    {
        public Int32? OfficeCode { get; set; }
        public string OfficeNameNep { get; set; }
        public string OfficeNameEng { get; set; }
        public string IRDCode { get; set; }
        public string HouseNo { get; set; }
        public string StreetName { get; set; }
        public string WardNo { get; set; }
        public string Vdc { get; set; }
        public string FaxNo { get; set; }
        public string PhoneNo { get; set; }
        public string DistrictCode { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string OfficeType { get; set; }
        public ATTOffice ParentOffice { get; set; }
        public string PayingOfficeCode { get; set; }
        public string NewPayingOfficeCode { get; set; }
        public string OfficeName { get; set; }
        public string Action { get; set; }
    }
}
