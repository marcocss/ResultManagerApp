using ResultManagerApp.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ResultManagerApp.Controllers
{
    public class RolAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(resultManager.rols.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]rol value)
        {
            resultManager.rols.Add(value);
            return ToJson(resultManager.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]rol value)
        {
            resultManager.Entry(value).State = EntityState.Modified;
            return ToJson(resultManager.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            resultManager.rols.Remove(resultManager.rols.FirstOrDefault(x => x.idRol == id));
            return ToJson(resultManager.SaveChanges());
        }
    }
}
