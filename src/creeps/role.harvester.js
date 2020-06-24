var common = require('common');

var verbose = false;

var harvester = 
{
    build: function(creep)
    {
        common.CreepSay(creep, verbose, 'Building');
        var site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (creep.build(site) === ERR_NOT_IN_RANGE)
        {
            creep.moveTo(site);
        }
    },

    turn_in: function(creep)
    {
        if(Game.spawns[common.SpawnName()].energy !== Game.spawns[common.SpawnName()].energyCapacity)
        {
            common.CreepSay(creep, verbose, 'Turning in');
            if (creep.transfer(Game.spawns[common.SpawnName()], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
            {
                creep.moveTo(Game.spawns[common.SpawnName()]);
            }
        }
        else
        {
            var storages = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
            var extensions = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
            var extensions_full = true;
            var storage_full = true;

            if (extensions !== undefined)
            {
                for (var extension_node in extensions)
                {
                    if(extensions[extension_node] !== undefined)
                    {
                        if (extensions[extension_node].energy < extensions[extension_node].energyCapacity)
                        {
                            extensions_full = false;
                            common.CreepSay(creep, verbose, 'Turning in');
                            if (creep.transfer(extensions[extension_node], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(extensions[extension_node]);
                            }
                        }
                    }
                }              
            }

            if (storages !== undefined)
            {
                for (var storage_node in extensions)
                {
                    if(extensions[storage_node] !== undefined)
                    {
                        if (extensions[storage_node].energy < extensions[storage_node].energyCapacity)
                        {
                            storage_full = false;
                            common.CreepSay(creep, verbose, 'Turning in');
                            if (creep.transfer(extensions[storage_node], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                            {
                                creep.moveTo(extensions[storage_node]);
                            }
                        }
                    }
                }
            }


            if(storage_full && extensions_full)
            {
                creep.memory.state = 'harvesting';
            }
        }
    },
    
    repair_wall: function (creep)
    {
      var walls = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_WALL});  
      if (walls)
      {
          for (var wall in walls)
          {
              if (walls[wall].hits < walls[wall].hitsMax/1000)
              {
                  if (creep.repair(walls[wall]) == ERR_NOT_IN_RANGE)
                  {
                      creep.moveTo(walls[wall]);
                      break;
                  }
              }
          }
      }
    },
    
    repair: function (creep)
    {
        common.CreepSay(creep, verbose, 'Repairing');
        this.repair_wall(creep);  
    },

    harvest: function(creep)
    {
        common.CreepSay(creep, verbose, 'Harvesting');
        var closest_sources = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(closest_sources) === ERR_NOT_IN_RANGE)
        {
            creep.moveTo(closest_sources);
        }
    },
    
    fillTowers: function(creep)
    {
        var towers = Game.rooms[common.RoomName()].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        
        for ( var index = 0; index < towers.length; index++ )
        {
            if ( towers[index].energy < 500 )
            {
                if ( creep.transfer(towers[index], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE )
                {
                    creep.moveTo(towers[index]);
                }
            }
        }
    },
    
    checkTowersNotFull: function()
    {
        var towers = Game.rooms[common.RoomName()].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        
        for ( var index = 0; index < towers.length; index++ )
        {
            if ( towers[index].energy < 500 )
            {
                return true;
            }
        }
        return false;
    },
    
    check_extensions_not_full: function (creep)
    {
        var extensions = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
        
        if (extensions)
        {
            for (var extension in extensions)
            {
                if (extensions[extension] !== undefined)
                {
                    if (extensions[extension].energy < extensions[extension].energyCapacity)
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    
    
    select_task: function (creep)
    {
        if (creep.memory.state === 'harvesting')
        {
            if (creep.carry.energy === creep.carryCapacity)
            {
                if(Game.spawns[common.SpawnName()].energy < Game.spawns[common.SpawnName()].energyCapacity || this.check_extensions_not_full(creep) || this.checkTowersNotFull())
                {
                    if ( this.checkTowersNotFull() )
                    {
                        creep.memory.state = 'fill_towers';  
                    }
                    else
                    {
                        creep.memory.state = 'turning_in';
                    }
                }
                else if (creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) != null)
                {
                    creep.memory.state = 'building';
                }
                else
                {
                    creep.memory.state = 'repair';
                }
            }
        }
        else if (creep.memory.state === 'building' && creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) == null)
        {
            creep.memory.state = 'harvesting';
        }
        else if(creep.memory.state === 'fill_towers' && !this.checkTowersNotFull())
        {
            creep.memory.state = 'harvesting';
        }
        else
        {
            if (creep.carry.energy === 0)
            {
                creep.memory.state = 'harvesting';
            }
        }
    },


    /** @param {Creep} creep **/
    run: function(creep) 
    {
        
        this.select_task(creep);
        if (creep.memory.state === 'harvesting')
        {
            this.harvest(creep);
        }
        else if (creep.memory.state === 'building')
        {
            this.build(creep)
        }
        else if (creep.memory.state === 'turning_in')
        {
            this.turn_in(creep);
        }
        else if (creep.memory.state === 'repair')
        {
            this.repair(creep);
        }
        else if (creep.memory.state === 'fill_towers')
        {
            this.fillTowers(creep);
        }
    }
};

module.exports = harvester;