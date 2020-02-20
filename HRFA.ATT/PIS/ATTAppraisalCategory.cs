using System;

namespace HRFA.ATT
{
    public class ATTAppraisalCategory
    {
        public ATTAppraisalCategory(int id = 0)
        {
            // Signifies a new category.
            // If id = 0, new value is added to database
            // else, update existing one.
            this.Id = id;
            this.GivenPointsInt = 0;
            this.Points = 0;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }
        public string GivenPoints { get; set; }
        public int GivenPointsInt
        {
            get
            {
                return int.Parse(GivenPoints);
            }
            set
            {
                GivenPoints = value.ToString();
            }
        }
    }
}
