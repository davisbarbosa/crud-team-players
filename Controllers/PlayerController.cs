using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MvGame.Models;
namespace MvGame.Controllers
{
    public class PlayerController : Controller
    {
        PlayerDAL objplayer = new PlayerDAL();
        [HttpGet]
        [Route("api/Player/Index")]
        public IEnumerable<TblPlayer> Index()
        {
            return objplayer.GetAllPlayers();
        }
        [HttpPost]
        [Route("api/Player/Create")]
        public int Create(TblPlayer player)
        {
            return objplayer.AddPlayer(player);
        }
        [HttpGet]
        [Route("api/Player/Details/{id}")]
        public TblPlayer Details(int id)
        {
            return objplayer.GetPlayerData(id);
        }
        [HttpPut]
        [Route("api/Player/Edit")]
        public int Edit(TblPlayer player)
        {
            return objplayer.UpdatePlayer(player);
        }
        [HttpDelete]
        [Route("api/Player/Delete/{id}")]
        public int Delete(int id)
        {
            return objplayer.DeletePlayer(id);
        }
        [HttpGet]
        [Route("api/Player/GetTeamList")]
        public IEnumerable<TblTeams> Details()
        {
            return objplayer.GetTeams();
        }
    }
}