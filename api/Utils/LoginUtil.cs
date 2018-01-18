using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using api.Model;
using GraphQlRethinkDbLibrary;

namespace api.Utils
{
    public static class LoginUtil
    {

        public static Token CreateToken(string username)
        {
            var existing = UserContext.SearchShallow<Token>(expr => expr.Filter(item => item.G("Username") == username))
                .SingleOrDefault();
            var newToken = new Token(username);
            if (existing != null)
            {

                UserContext.UpdateDefault(newToken, existing.Id);
            }
            else
            {
                UserContext.AddDefault(newToken);
            }
            return newToken;
        }

        public static Token GetTokenByUsername(string username)
        {
            return UserContext.SearchShallow<Token>(expr => expr.Filter(item => item.G("Username") == username))
                .SingleOrDefault();
        }

        public static Token GetToken(string token)
        {
            return UserContext.SearchShallow<Token>(expr => expr.Filter(item => item.G("LoginToken") == token))
                .SingleOrDefault();
        }

        public static string CreatePasswordHash(string password)
        {
            var salt = new byte[16];
            new RNGCryptoServiceProvider().GetBytes(salt);
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            var hash = pbkdf2.GetBytes(20);
            var hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);
            var passwordHash = Convert.ToBase64String(hashBytes);
            return passwordHash;
        }

        public static User ValidateUser(this UserContext context, bool admin = false)
        {
            var user = UserContext.SearchShallow<User>(expr => expr.Filter(item => item.G("Username") == context.UserName))
                .SingleOrDefault();
            if(user==null) throw new Exception("User does not exist");
            if(admin && !user.Admin) throw new Exception("User is not admin");
            return user;
        }

        public static bool ValidatePassword(string password, string passwordHash)
        {
            var hashBytes = Convert.FromBase64String(passwordHash);
            /* Get the salt */
            var salt = new byte[16];
            Array.Copy(hashBytes, 0, salt, 0, 16);
            /* Compute the hash on the password the user entered */
            var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000);
            var hash = pbkdf2.GetBytes(20);
            /* Compare the results */
            for (var i = 0; i < 20; i++)
                if (hashBytes[i + 16] != hash[i])
                    return false;
            return true;
        }
    }
}
