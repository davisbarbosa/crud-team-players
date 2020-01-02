using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MvGame.Models
{
    public partial class game_dbContext : DbContext
    {
        public game_dbContext()
        {
        }

        public game_dbContext(DbContextOptions<game_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblPlayer> TblPlayer { get; set; }
        public virtual DbSet<TblTeams> TblTeams { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=tcp:crudteamserver.database.windows.net,1433;Initial Catalog=game_db;Persist Security Info=False;User ID=davisbarbosa;Password=Theozinho2017;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblPlayer>(entity =>
            {
                entity.HasKey(e => e.PlayerId);

                entity.ToTable("TblPlayer");

                entity.Property(e => e.PlayerId).HasColumnName("PlayerID");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Team)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblTeams>(entity =>
            {
                entity.HasKey(e => e.TeamId);

                entity.ToTable("tblTeams");

                entity.Property(e => e.TeamId).HasColumnName("TeamID");

                entity.Property(e => e.TeamName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });
        }
    }
}
