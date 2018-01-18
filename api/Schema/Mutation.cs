using System.Linq;
using api.Model;
using api.Utils;
using GraphQlRethinkDbLibrary;
using GraphQL.Conventions;
using GraphQL.Conventions.Relay;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace api.Schema
{
    [ImplementViewer(OperationType.Mutation)]
    public class Mutation
    {
        [Description("Add new user")]
        public bool AddUser(UserContext context, string username, string password, bool admin)
        {
            context.ValidateUser(true);
            if (string.IsNullOrEmpty(username)
                || string.IsNullOrEmpty(password))
                return false;
            if (UserContext.SearchShallow<User>(expr => expr.Filter(item => item.G("Username") == username)).Any())
                return false;

            UserContext.AddDefault(new User(username, password, admin));

            return true;
        }

        [Description("Delete a user")]
        public bool DeleteUser(UserContext context, string username)
        {
            context.ValidateUser(true);
            if (context.UserName == username) return false;
            var user = UserContext.SearchShallow<User>(expr => expr.Filter(item => item.G("Username") == username))
                .SingleOrDefault();
            if (user == null) return false;
            UserContext.Remove<User>(user.Id);
            return true;
        }

        [Description("Change your password")]
        public bool ChangePassword(UserContext context, string oldPass, string newPass)
        {
            var user = context.ValidateUser();
            if (!LoginUtil.ValidatePassword(oldPass, user.PasswordHash)) return false;
            var newUser = new User(user.Username, newPass, user.Admin);
            UserContext.UpdateDefault(newUser, user.Id);
            return true;
        }

        [Description("Change user type")]
        public bool ChangeUserType(UserContext context, string username, bool admin)
        {
            context.ValidateUser(true);
            var user = UserContext.SearchShallow<User>(expr => expr.Filter(item => item.G("Username") == username))
                .SingleOrDefault();
            if (user == null) return false;
            var newUser = new User(admin, user.Username, user.PasswordHash);
            UserContext.UpdateDefault(newUser, user.Id);
            return true;
        }
    }
}
