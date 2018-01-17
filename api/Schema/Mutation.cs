using api.Utils;
using GraphQlRethinkDbLibrary;
using GraphQL.Conventions;
using GraphQL.Conventions.Relay;

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

            return true;
        }
    }
}
