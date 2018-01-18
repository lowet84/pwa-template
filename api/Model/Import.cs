using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Types;

namespace api.Model
{
    public class Import : NodeBase<Import>
    {
        public string Path { get; }

        public Import(string path)
        {
            Path = path;
        }
    }
}
