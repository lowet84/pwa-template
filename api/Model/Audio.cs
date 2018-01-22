using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using api.Utils;
using GraphQlRethinkDbLibrary.Handlers;

namespace api.Model
{
    public class Audio : IDefaultAudio
    {
        public Audio(Book book)
        {
            Key = book.Id.ToString();
            var files = Directory.GetFiles(book.Path)
                .Where(ImportRunner.IsAudioFile).ToList();
            var sortedFiles = files.Select(d => new { value = d, sorter = GetSortableString(d) })
                .OrderBy(d=>d.sorter)
                .ToList();
        }

        public string Key { get; set; }

        public string ContentType => "audio/mpeg";

        public int BlockSize => 10000;

        public long Length => 134000000;

        public class AudioFile
        {
            public string FilePath { get; set; }
            public long Length { get; set; }
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
    }
}
