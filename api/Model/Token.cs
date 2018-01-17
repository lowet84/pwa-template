using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Types;

namespace api.Model
{
    public class Token : NodeBase<Token>
    {
        public string Username { get; }
        public string LoginToken { get; }

        public Token(string username)
        {
            Username = username;
            LoginToken = Guid.NewGuid().ToString();
        }
    }
}
