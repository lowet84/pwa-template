using System;
using System.Linq;
using api.Model;
using api.Schema.Results;
using api.Utils;
using GraphQlRethinkDbLibrary;
using GraphQlRethinkDbLibrary.Schema.Output;
using GraphQL.Conventions;
using GraphQL.Conventions.Relay;

namespace api.Schema
{
    [ImplementViewer(OperationType.Query)]
    public class Query
    {
        [Description("Log in and get login token")]
        public LoginResult Login(UserContext context, string username, string password)
        {
            var users = UserContext.GetAllShallow<User>();
            User user;
            if (!users.Any())
            {
                user = new User(username, password, true);
                UserContext.AddDefault(user);
            }
            else
            {
                user = users.SingleOrDefault(d => d.Username == username);
                if (user == null || !LoginUtil.ValidatePassword(password, user.PasswordHash)) return null;
            }
            return new LoginResult { Token = LoginUtil.CreateToken(user.Username), Admin = user.Admin };
        }
    }
}
