using ResultManagerApp.Models;
using Newtonsoft.Json;
using System.Text;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ResultManagerApp.Controllers
{
    public class BaseAPIController : ApiController
    {
        protected readonly ResultManagerEntities resultManager = new ResultManagerEntities();
        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }
    }
}
