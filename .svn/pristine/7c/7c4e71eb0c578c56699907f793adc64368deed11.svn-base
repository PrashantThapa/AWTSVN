using System.Drawing;
using System.Drawing.Imaging;
using System.IO;


namespace HRFA.COMMON
{
    public class image2byteConverter
    {
        public static byte[] image2byte(string docfilepath)
        {
            Image img = Image.FromFile(docfilepath);
            ImageConverter converter = new ImageConverter();
            byte[] imgByte = (byte[])converter.ConvertTo(img, typeof(byte[]));
            img.Dispose();
            return imgByte;
        }
        public static string Byte2Photo(byte[] byteArray, string docfilepath)
        {
            using (MemoryStream ms = new MemoryStream(byteArray))
            {
                bool isExists = Directory.Exists(docfilepath);
                if (!isExists)
                    Directory.CreateDirectory(docfilepath);

                Bitmap img = (Bitmap)Image.FromStream(ms);
                string imageName = "temp." + ImageFormat.Bmp;
                img.Save(docfilepath + "\\" + imageName);
                ms.Close();
                return imageName;
            }
        }
    }
    
}
