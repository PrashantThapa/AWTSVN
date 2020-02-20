//using System.Collections.Generic;
//using CrystalDecisions.CrystalReports.Engine;

//namespace HRFA.COMMON
//{


//    public class QueueManager
//    {
//        private static Queue<ReportDocument> _ReportQueue = new Queue<ReportDocument>();
//        public static Queue<ReportDocument> ReportQueue
//        {
//            get { return _ReportQueue; }
//            set { _ReportQueue = value; }
//        }

//        public static void Control()
//        {
//            if (QueueManager.ReportQueue.Count >= 70)
//            {
//                ReportDocument report = QueueManager.ReportQueue.Dequeue();
//                if (report != null)
//                {
//                    report.Close();
//                    report.Dispose();
//                }
//            }
//        }

//        public static void Clear()
//        {
//            for (int i = 0; i < QueueManager.ReportQueue.Count; i++)
//            {
//                ReportDocument report = QueueManager.ReportQueue.Dequeue();
//                if (report != null)
//                {
//                    report.Close();
//                    report.Dispose();
//                }
//            }
//        }
//    }

//}