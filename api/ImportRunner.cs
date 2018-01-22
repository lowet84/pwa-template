using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Timers;
using api.Model;
using api.Utils;
using GraphQlRethinkDbLibrary;
using Microsoft.AspNetCore.StaticFiles;
using SPath = System.IO.Path;

namespace api
{
    public static class ImportRunner
    {
        public static void Start()
        {
            Trigger(null, null);
            var timer = new Timer(60000) { AutoReset = true };
            timer.Elapsed += Trigger;
            timer.Enabled = true;
        }

        private static void Trigger(object sender, ElapsedEventArgs e)
        {
            var path = AudioFileUtil.DataPath;
            var imports = UserContext.GetAllShallow<Import>();
            var books = UserContext.GetAllShallow<Book>();
            var paths = FindAudioFolders(path);
            var newImportPaths = paths.Where(p => books.All(book => book.Path != p) && imports.All(book => book.Path != p)).ToList();
            newImportPaths.ForEach(d=>UserContext.AddDefault(new Import(d)));
        }

        private static List<string> FindAudioFolders(string path)
        {
            var ret = new List<string>();
            var files = Directory.GetFiles(path);
            if (files.Any(IsAudioFile)) 
                ret.Add(path);

            foreach (var subDirectory in Directory.GetDirectories(path))
            {
                ret.AddRange(FindAudioFolders(subDirectory));
            }

            return ret;
        }

        public static bool IsAudioFile(string path)
        {
            new FileExtensionContentTypeProvider().TryGetContentType(path, out var contentType);
            return contentType?.StartsWith("audio") ?? false;
        }
    }
}
