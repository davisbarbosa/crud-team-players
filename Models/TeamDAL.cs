using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace MvGame.Models
{
    public class TeamDAL
    {
        game_dbContext db = new game_dbContext();
        public IEnumerable<TblTeams> GetAllTeams()
        {
            try
            {
                return db.TblTeams.ToList();
            }
            catch
            {
                throw;
            }
        }
        //To Add new team record     
        public int AddTeam(TblTeams team)
        {
            try
            {
                db.TblTeams.Add(team);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar team    
        public int UpdateTeam(TblTeams team)
        {
            try
            {
                db.Entry(team).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular team    
        public TblTeams GetTeamData(int id)
        {
            try
            {
                TblTeams team = db.TblTeams.Find(id);
                return team;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a particular team    
        public int DeleteTeam(int id)
        {
            try
            {
                TblTeams emp = db.TblTeams.Find(id);
                db.TblTeams.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}