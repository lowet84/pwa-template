﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Schema.Results
{
    public class LoginResult
    {
        public string Token { get; set; }
        public bool Admin { get; set; }
    }
}
