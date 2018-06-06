using ResultManagerApp.Models;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ResultManagerApp.Controllers
{
    public class EquipoAPIController : BaseAPIController
    {
        public HttpResponseMessage Get()
        {
            return ToJson(resultManager.equipoes.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]equipo value)
        {
            resultManager.equipoes.Add(value);
            return ToJson(resultManager.SaveChanges());
        }

        public HttpResponseMessage Put(int id, [FromBody]equipo value)
        {
            resultManager.Entry(value).State = EntityState.Modified;
            return ToJson(resultManager.SaveChanges());
        }
        public HttpResponseMessage Delete(int id)
        {
            resultManager.equipoes.Remove(resultManager.equipoes.FirstOrDefault(x => x.idEquipo == id));
            return ToJson(resultManager.SaveChanges());
        }

    }
}
