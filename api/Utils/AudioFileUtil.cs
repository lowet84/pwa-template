using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
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

        public static string JoinFilesWithFfmpeg(string path)
        {
            var files = Directory.GetFiles(path)
                .Where(ImportRunner.IsAudioFile)
                .ToList();
            var joined = files.FirstOrDefault(d => d.Contains("_joined_"));
            if (joined != null) return joined;
            foreach (var file in files)
            {
                var oldFilename = Path.GetFileName(file);
                var newFilename = oldFilename.Replace(" ", "_");
                System.IO.File.Move(file, file.Replace(oldFilename, newFilename));
            }
            files = Directory.GetFiles(path)
                .Where(ImportRunner.IsAudioFile)
                .ToList();
            var sortedFiles = files
                .Select(d => new KeyValuePair<string, string>(d, GetSortableString(d)))
                .OrderBy(d => d.Value)
                .Select(d => Path.GetFileName(d.Key))
                .ToList();
            var lines = sortedFiles.Select(d => $"file '{d}'").ToArray();
            System.IO.File.WriteAllLines(Path.Combine(path, "ffmpeglist.txt"), lines);
            var filename = Path.GetFileNameWithoutExtension(sortedFiles.First()) + "_joined_";
            ConvertFiles(path, filename);
            return Path.Combine(path, filename);
        }

        private static string GetSortableString(string str)
        {
            var split = str.Split(' ', '-', '_', '.');
            for (var index = 0; index < split.Length; index++)
            {
                var item = split[index];
                if (int.TryParse(item, out var number))
                {
                    split[index] = number.ToString("D6");
                }
            }
            var ret = string.Join(string.Empty, split);
            return ret;
        }

        private static void ConvertFiles(string path, string filename)
        {
            var start = new ProcessStartInfo
            {
                Arguments = $"-f concat -i ffmpeglist.txt -c copy {filename}.mp3",
                FileName = "ffmpeg",
                WindowStyle = ProcessWindowStyle.Hidden,
                CreateNoWindow = true,
                WorkingDirectory = path
            };


            // Run the external process & wait for it to finish
            using (var proc = Process.Start(start))
            {
                proc.WaitForExit();

                // Retrieve the app's exit code
            }
        }
    }
}
