using System;
using System.IO;

namespace HRFA.COMMON
{

    public class Converter
    {
        public static string EngToNep(string enValue)
        {
            if (enValue == "")
            {
                return "";
            }
            else
            {
                string npValue = "";
                string[] arrNp = { "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", ".", "/", "-" };
                string[] arrEn = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "/", "-" };
                char[] inputChars = enValue.ToString().ToCharArray();

                for (int j = 0; j < enValue.Length; j++)
                {
                    for (int i = 0; i < 13; i++)
                    {
                        string value = arrEn[i].ToString();
                        string value1 = inputChars[j].ToString();
                        if (value == value1)
                        {
                            npValue += arrNp[i].ToString();
                        }
                    }

                }
                return npValue;
            }
        }

        public static string NepToEng(string npValue)
        {
            if (npValue == "")
            {
                return "";
            }
            else
            {
                int k = 0;
                string enValue = "";
                string[] arrEn = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "/", "-" };
                string[] arrNp = { "०", "१", "२", "३", "४", "५", "६", "७", "८", "९", ".", "/", "-" };
                char[] inputChars = npValue.ToString().ToCharArray();
                for (int j = 0; j < npValue.Length; j++)
                {
                    for (int i = 0; i < 13; i++)
                    {
                        string value = arrNp[i].ToString();
                        string value1 = inputChars[j].ToString();
                        if (value == value1)
                        {
                            enValue += arrEn[i].ToString();
                            k++;
                        }
                    }
                    if (k == 0)
                    {
                        return enValue = npValue;
                    }
                }
                return enValue;
            }
        }

        //HttpPostedFile posted = Context.Request.Files[0];
        //byte[] bytes = ReadToEnd(posted.InputStream);

        public static byte[] ReadToEnd(Stream stream)
        {
            long originalPosition = 0;

            if (stream.CanSeek)
            {
                originalPosition = stream.Position;
                stream.Position = 0;
            }

            try
            {
                byte[] readBuffer = new byte[4096];

                int totalBytesRead = 0;
                int bytesRead;

                while ((bytesRead = stream.Read(readBuffer, totalBytesRead, readBuffer.Length - totalBytesRead)) > 0)
                {
                    totalBytesRead += bytesRead;

                    if (totalBytesRead == readBuffer.Length)
                    {
                        int nextByte = stream.ReadByte();
                        if (nextByte != -1)
                        {
                            byte[] temp = new byte[readBuffer.Length * 2];
                            Buffer.BlockCopy(readBuffer, 0, temp, 0, readBuffer.Length);
                            Buffer.SetByte(temp, totalBytesRead, (byte)nextByte);
                            readBuffer = temp;
                            totalBytesRead++;
                        }
                    }
                }

                byte[] buffer = readBuffer;
                if (readBuffer.Length != totalBytesRead)
                {
                    buffer = new byte[totalBytesRead];
                    Buffer.BlockCopy(readBuffer, 0, buffer, 0, totalBytesRead);
                }
                return buffer;
            }
            finally
            {
                if (stream.CanSeek)
                {
                    stream.Position = originalPosition;
                }
            }
        }
    }
}
