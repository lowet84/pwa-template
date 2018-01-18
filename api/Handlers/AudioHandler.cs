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
        public override IDefaultAudio GetAudio(string key)
        {
            //return UserContext.GetShallow<Audio>(new Id(key));
            return new Audio();
        }

        public override byte[] GetData(string key, int part)
        {
            throw new NotImplementedException();
        }
    }
}
