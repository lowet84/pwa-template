using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Handlers;
using GraphQlRethinkDbLibrary.Schema.Types;
using Newtonsoft.Json;

namespace api.Model
{
    public class Audio : NodeBase<Audio>, IDefaultAudio
    {
        string IDefaultAudio.Key => Id.ToString();

        public string ContentType => "audio/mpeg";

        public int BlockSize => 10000;

        public long Length => 134000000;
    }
}
