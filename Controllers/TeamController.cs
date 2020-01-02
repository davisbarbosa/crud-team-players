using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MvGame.Models;
namespace MvGame.Controllers
{
    public class TeamController : Controller
    {
        TeamDAL objteam = new TeamDAL();
        [HttpGet]
        [Route("api/Team/Index")]
        public IEnumerable<TblTeams> Index()
        {
            return objteam.GetAllTeams();
        }
        [HttpPost]
        [Route("api/Team/Create")]
        public int Create(TblTeams team)
        {
            return objteam.AddTeam(team);
        }
        [HttpGet]
        [Route("api/Team/Details/{id}")]
        public TblTeams Details(int id)
        {
            return objteam.GetTeamData(id);
        }
        [HttpPut]
        [Route("api/Team/Edit")]
        public int Edit(TblTeams team)
        {
            return objteam.UpdateTeam(team);
        }
        [HttpDelete]
        [Route("api/Team/Delete/{id}")]
        public int Delete(int id)
        {
            return objteam.DeleteTeam(id);
        }
        [HttpGet]
        [Route("api/Player/GetPlayableTeams")]
        public IEnumerable<TblTeams> Details()
        {
            return objteam.GetPlayableTeams();
        }
    }
}