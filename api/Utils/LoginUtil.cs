using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace api.Utils
{
    public static class LoginUtil
    {
        private static Dictionary<string, string> _tokens = new Dictionary<string, string>();

        public static string CreateToken(string username)
        {
            if (_tokens.ContainsKey(username))
                _tokens.Remove(username);

            var token = Guid.NewGuid().ToString();
            _tokens.Add(username, token);
            return token;
        }

        public static string GetToken(string username)
        {
            return _tokens.ContainsKey(username)
                ? _tokens[username]
                : null;
        }

        public static string GetUser(string token)
        {
            return _tokens.SingleOrDefault(d => d.Value == token).Key;
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
