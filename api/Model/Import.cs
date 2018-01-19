﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using GraphQlRethinkDbLibrary.Schema.Types;
using GraphQL.Conventions;
using TagLib;
using SPath = System.IO.Path;

namespace api.Model
{
    public class Import : NodeBase<Import>
    {
        public string Path { get; }
        public string Title { get; }
        public string Author { get; }
        public string Album { get; }
        public string Filename { get; }

        public Import(string path)
        {
            Path = SPath.GetFileName(path);
            var file = Directory.GetFiles(path).First(ImportRunner.IsAudioFile);
            Filename = SPath.GetFileNameWithoutExtension(file);
            using (var readStream = new FileStream(file, FileMode.Open, FileAccess.Read))
            {
                var tagFile = TagLib.File.Create(new StreamFileAbstraction(file, readStream, null));
                Album = tagFile.Tag.Album ?? string.Empty;
                Author = tagFile.Tag.FirstAlbumArtist ?? string.Empty;
                Title = tagFile.Tag.Title ?? string.Empty;
            }
        }
    }
}
