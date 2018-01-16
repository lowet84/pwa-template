using GraphQlRethinkDbLibrary;
using GraphQlRethinkDbLibrary.Schema.Output;
using GraphQL.Conventions;
using GraphQL.Conventions.Relay;

namespace api.Schema
{
    [ImplementViewer(OperationType.Query)]
    public class Query
    {
        [Description("Test method")]
        public DefaultResult<string> Test(UserContext context)
        {
            return new DefaultResult<string>("Dummy");
        }
    }
}
