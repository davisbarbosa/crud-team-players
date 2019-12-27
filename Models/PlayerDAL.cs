using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace MvGame.Models
{
    public class PlayerDAL
    {
        game_dbContext db = new game_dbContext();
        public IEnumerable<TblPlayer> GetAllPlayers()
        {
            try
            {
                return db.TblPlayer.ToList();
            }
            catch
            {
                throw;
            }
        }
        //To Add new player record     
        public int AddPlayer(TblPlayer player)
        {
            try
            {
                db.TblPlayer.Add(player);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar player    
        public int UpdatePlayer(TblPlayer player)
        {
            try
            {
                db.Entry(player).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular player    
        public TblPlayer GetPlayerData(int id)
        {
            try
            {
                TblPlayer player = db.TblPlayer.Find(id);
                return player;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a particular player    
        public int DeletePlayer(int id)
        {
            try
            {
                TblPlayer emp = db.TblPlayer.Find(id);
                db.TblPlayer.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Get the list of Cities    
        public List<TblTeams> GetTeams()
        {
            List<TblTeams> lstTeam = new List<TblTeams>();
            lstTeam = (from TeamList in db.TblTeams select TeamList).ToList();
            return lstTeam;
        }
    }
}