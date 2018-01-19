using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;
using GraphQL.Conventions;

namespace api.Schema.Results
{
    public class BookResult
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public Id Id { get; set; }
        public string Source { get; set; }
        public string Cover { get; set; }
        public DateTime LastPlayed { get; set; }
        public double Length { get; set; }
        public double Progress { get; set; }
        public Id ProgressId { get; set; }

        public BookResult(){}

        public BookResult(Progress progress)
        {
            Title = progress.Book.Title;
            Author = progress.Book.Author;
            Id = progress.Book.Id;
            //Source = $"/audio/{book.Id}";
            Cover = progress.Book.Cover;
            ProgressId = progress.Id;
            LastPlayed = progress.LastPlayed;
            Progress = progress.Value;

            // TODO, get real values
            Source = "/static/audio/test.mp3";
            Length = 4201;
        }
    }
}
