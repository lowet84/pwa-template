using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TagLib;

namespace api.Utils
{
    public static class AudioFileUtil
    {
        public static double GetLength(string file)
        {
            using (var readStream = new FileStream(file, FileMode.Open, FileAccess.Read))
            {
                var tagFile = TagLib.File.Create(new StreamFileAbstraction(file, readStream, null));
                return tagFile.Properties.Duration.TotalSeconds;
            }
        }

        public static string DataPath => Environment.GetEnvironmentVariable("DATAPATH") ?? @"C:\temp\books";
    }
}
