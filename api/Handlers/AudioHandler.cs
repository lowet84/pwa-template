using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
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
            var bookKey = key; // TODO check user token in key
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
            throw new NotImplementedException();
        }
    }
}
