﻿using System;



namespace HRFA.ATT
{
    public class ATTLeaveApprovedRecommend
    {
        public ATTLeaveApprovedRecommend() { }

            public Int32? EmpID { get; set; }
            public string UserID { get; set; }
            public string EmpName { get; set; }
            public string FromDate { get; set; }
            public string ToDate { get; set; }
            public double? SeqNo { get; set; }
            public string ApplicationDate { get; set; }
            public Int64? LeaveTypeID { get; set; }
            public double? NoOfDays { get; set; }
            public string ApprovedType { get; set; }
            public Int64? ForwardedToID { get; set; }
            public string ForwardedToName { get; set; }
            public string Action { get; set; }
            public string Status { get; set; }
            
            public string EntryBy { get; set; }
            public string EntryDate { get; set; }
       
    }
}