using System;
using ProtoBuf;

namespace MvcModelPage.Models
{
    [Serializable]
    [ProtoContract]
    public class model
    {
        [ProtoMember(1)]
        public int ModelId {get; set;}
        [ProtoMember(2)]
        public string ModelName {get; set;}
        [ProtoMember(3)]
        public int Rating {get; set;}
     
       [ProtoMember(4)]
        public string ImageUrl {get; set;}
       
     
    }
}