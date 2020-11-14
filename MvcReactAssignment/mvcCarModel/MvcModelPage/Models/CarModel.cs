using System;
using ProtoBuf;

namespace MvcModelPage.Models
{
    [Serializable]
    [ProtoContract]
    public class CarModel
    {
        [ProtoMember(1)]
        public int CompanyId {get; set;}
        [ProtoMember(2)]
        public string CompanyName {get; set;}
        [ProtoMember(3)]
        public int ModelId {get; set;}
        [ProtoMember(4)]
        public string ModelName {get; set;}
        [ProtoMember(6)]
        public int Rating {get; set;}
        [ProtoMember(7)]
        public int VersionId {get; set;}
        [ProtoMember(8)]
        public string ImageUrl {get; set;}
        [ProtoMember(9)]
        public string VersionName {get; set;}
        [ProtoMember(10)]
        public int Price {get; set;}
    }
}