using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using api.Utils;
using GraphQlRethinkDbLibrary.Schema.Types;

namespace api.Model
{
    public class User : NodeBase<User>
    {
        public string Username { get; }
        public bool Admin { get; }
        public string PasswordHash { get; }

        public User(string username, string password, bool admin)
        {
            Username = username;
            Admin = admin;
            PasswordHash = LoginUtil.CreatePasswordHash(password);
        }
    }
}
