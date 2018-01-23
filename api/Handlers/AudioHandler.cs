using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
using api.Utils;
using GraphQlRethinkDbLibrary;
using GraphQlRethinkDbLibrary.Handlers;
using GraphQL.Conventions;

namespace api.Handlers
{
    public class AudioHandler : DefaultAudioHandler
    {
        public static readonly Dictionary<string, Audio> AudioCache = new Dictionary<string, Audio>();

        public override IDefaultAudio GetAudio(string key)
        {
            var split = key.Split('_');
            var user = LoginUtil.GetToken(split[0]);
            if (user == null) return null;
            var bookKey = split[1];
            if (!AudioCache.ContainsKey(bookKey))
            {
                var book = UserContext.GetShallow<Book>(new Id(bookKey));
                var audio = new Audio(book);
                AudioCache.Add(bookKey, audio);
                return AudioCache[bookKey];
            }
            return AudioCache[bookKey];
        }

        public override byte[] GetData(string key, int part)
        {
            var audio = AudioCache[key];
            var fileStream = File.OpenRead(audio.File);
            fileStream.Seek(part * audio.BlockSize, SeekOrigin.Begin);
            var buffer = new byte[audio.BlockSize];
            var readBytes = fileStream.Read(buffer, 0, buffer.Length);
            return buffer.Take(readBytes).ToArray();
        }
    }
}
