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
                .Where(ImportRunner.IsAudioFile)
                .ToList();
            var file = files.Count == 1 ?
                    files.First() :
                    files.FirstOrDefault(d => d.Contains("_joined_"));
            Length = new FileInfo(file).Length;
            File = file;
        }

        public string Key { get; set; }

        public string ContentType => "audio/mpeg";

        public int BlockSize => 10000;

        public long Length { get; }

        public string File { get; }
    }
}
