var common = require('./../common/common');

var verbose = true;
var moduleName = 'Spawn runner';

//var BODYPART_COST: { "move": 50, "work": 100, "attack": 80, "carry": 50, "heal": 250, "ranged_attack": 150, "tough": 10, "claim": 600 };

var min_nr_harvesters = 2;
var spawn_level = 0;
var max_spawn_level = 10;
var harvester_level_0_cost = 200;
var harvester_level_5_cost = 400;
var harvester_level_10_cost = 600;
var harvester_level_30_cost = 1200;


var spawn_runner =
{
    spawn_level_4_creeps: function()
    {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender');

        if(harvesters.length < 3)
        {
            var newName = 'Harvester' + Game.time;
            common.Log(verbose, 'Spawning new lvl 4 harvester: ' + newName, moduleName)
            Game.spawns[common.SpawnName()].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,{memory: {role: 'harvester', state: 'harvesting'}});
        }
        else if (upgraders.length < 3)
        {
            var newName = 'Upgrader' + Game.time;
            common.Log(verbose, 'Spawning new lvl 4 upgrader: ' + newName, moduleName)
            Game.spawns[common.SpawnName()].spawnCreep([WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,{memory: {role: 'upgrader', state: 'harvesting'}});
        }
        else if (defenders.length < 1)
        {
            var newName = 'defender' + Game.time;
            common.Log(verbose, 'Spawning new lvl 4 defender: ' + newName, moduleName)
            Game.spawns[common.SpawnName()].spawnCreep([RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE], newName,{memory: {role: 'defender'}});
        }
    },
    
    spawn_level_3_creeps: function()
    {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender');

        if(harvesters.length < 4)
        {
            var newName = 'Harvester' + Game.time;
            common.Log(verbose, 'Spawning new lvl 3 harvester: ' + newName, moduleName)
            Game.spawns[common.SpawnName()].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,{memory: {role: 'harvester', state: 'harvesting'}});
        }
        else if (upgraders.length < 4)
        {
            var newName = 'Upgrader' + Game.time;
            common.Log(verbose, 'Spawning new lvl 3 upgrader: ' + newName, moduleName)
            Game.spawns[common.SpawnName()].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], newName,{memory: {role: 'upgrader', state: 'harvesting'}});
        }
        else if (defenders.length < 1)
        {
            var newName = 'defender' + Game.time;
            common.Log(verbose, 'Spawning new lvl 3 defender: ' + newName, moduleName)
            Game.spawns[common.SpawnName()].spawnCreep([ATTACK, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE, MOVE, MOVE], newName,{memory: {role: 'defender'}});
        }
    },
    
    spawn_level_2_creeps: function()
    {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender');

        if(harvesters.length < 4)
        {
            var newName = 'Harvester' + Game.time;
            common.Log(verbose, 'Spawning new lvl 2 harvester: ' + newName, moduleName);
            Game.spawns[common.SpawnName()].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,{memory: {role: 'harvester', state: 'harvesting'}});
        }
        else if (upgraders.length < 4)
        {
            var newName = 'Upgrader' + Game.time;
            common.Log(verbose, 'Spawning new lvl 2 upgrader: ' + newName, moduleName);
            Game.spawns[common.SpawnName()].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,{memory: {role: 'upgrader', state: 'harvesting'}});
        }
        else if (defenders.length < 1)
        {
            var newName = 'defender' + Game.time;
            common.Log(verbose, 'Spawning new lvl 2 defender: ' + newName, moduleName);
            Game.spawns[common.SpawnName()].spawnCreep([ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE], newName,{memory: {role: 'defender'}});
        }
    },

    spawn_level_1_creeps: function ()
    {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        var defenders = _.filter(Game.creeps, (creep) => creep.memory.role === 'defender');

        if(harvesters.length < 4)
        {
            var newName = 'Harvester' + Game.time;
            common.Log(verbose, 'Spawning new lvl 1 harvester: ' + newName, moduleName);
            Game.spawns[common.SpawnName()].spawnCreep([WORK, CARRY, MOVE], newName,{memory: {role: 'harvester', state: 'harvesting', errors: 0}});
        }
        else if (upgraders.length < 4)
        {
            var newName = 'Upgrader' + Game.time;
            common.Log(verbose, 'Spawning new lvl 1 upgrader: ' + newName, moduleName);
            Game.spawns[common.SpawnName()].spawnCreep([WORK, CARRY, MOVE], newName,{memory: {role: 'upgrader', state: 'harvesting', errors: 0}});
        }
        else if (defenders.length < 1)
        {
            var newName = 'defender' + Game.time;
            common.Log(verbose, 'Spawning new lvl 1 defender: ' + newName, moduleName);
            Game.spawns[common.SpawnName()].spawnCreep([ATTACK, ATTACK, MOVE], newName,{memory: {role: 'defender', errors: 0}});
        }
    },

    spawn_creeps: function(room)
    {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');

        if(harvesters.length < min_nr_harvesters)
        {
            common.Log(verbose, 'Emergency spawn!!', moduleName);
            if(spawn_level >= 2)
            {
                spawn_level = 1;
            }
        }
        else
        {
            common.Log(verbose, 'Updating spawn level', moduleName);
            spawn_level = this.get_spawn_level(Game.rooms[common.RoomName(room)]);
        }

        switch (spawn_level)
        {
            case 1:
                this.spawn_level_1_creeps();
                break;

            case 2:
                this.spawn_level_2_creeps();
                break;

            case 3:
                this.spawn_level_3_creeps();
                break;
                
            case 4:
                this.spawn_level_4_creeps();
                break;
        }
    },

    get_spawn_level: function (game_room)
    {
        return game_room.controller.level;
    },
    
    clear_dead_creeps: function ()
    {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                common.Log(verbose, 'Clearing non-existing creep memory:' + name, moduleName);
            }
        }
    },

    check_should_spawn: function (room)
    {
      if(Game.rooms[common.RoomName(room)].find(FIND_MY_CREEPS).length < ((max_spawn_level * 2) - spawn_level))
      {
          common.Log(verbose, 'Creep should spawn', moduleName);
          return true;
      }
      common.Log(verbose, 'Creep should not spawn', moduleName);
      return false;
    },
    
    run: function (room)
    {
        this.clear_dead_creeps();
        if(this.check_should_spawn(room))
        {
            this.spawn_creeps(room);
        }
    }
};



module.exports = spawn_runner;