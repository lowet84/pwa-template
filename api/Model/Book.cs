using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Types;

namespace api.Model
{
    public class Book : NodeBase<Book>
    {
        public string Title { get; }
        public string Author { get; }
        public Audio Audio { get; }
        public string Path { get; }
        public string Cover { get; }
        public int Length { get; }

        public Book(string title, string author, Audio audio, string path, string cover, int length)
        {
            Title = title;
            Author = author;
            Audio = audio;
            Path = path;
            Cover = cover;
            Length = length;
        }
    }
}
