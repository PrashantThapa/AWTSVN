﻿using System;

namespace HRFA.ATT
{
    public class ATTLevel
    {
        public ATTLevel() { }

        //public Int16? LevelID { get; set; }
        //public string LevelDesc { get; set; }
        //public string LevelDescEng { get; set; }
        public Int16? AvailableLevel { get; set; }
        public string Status { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string EntryBy { get; set; }
        public string EntryDate { get; set; }
        public string Action { get; set; }
    }
}