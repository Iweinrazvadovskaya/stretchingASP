using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Stretching.MVC.Models;

namespace Stretching.Context
{
    public class StretchingContext : DbContext
    {
        public StretchingContext(DbContextOptions<StretchingContext> options) : base(options)
        { }
        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }
        public DbSet<Exercise> stretching_exercise { get; set; }
        public DbSet<ExerciseTranslation> exercise_translation_entity { get; set; }
        public DbSet<ProgramExercise> stretching_program { get; set; }
        public DbSet<UserAccount> user_account { get; set; }
        public DbSet<UserInfo> user_info { get; set; }
        public DbSet<WorkoutEntity> workout_entity { get; set; }
        public DbSet<CompletedWorkout> workout_plan { get; set; }

    }
}

