var common = require('./../common/common');
var builder = require('./../room/builder');

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

    anything_to_repair: function (creep)
    {
        var walls = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_WALL});  
        if (walls)
        {
            for (var wall in walls)
            {
                if (walls[wall].hits < walls[wall].hitsMax/1000)
                {
                    return true;
                }
            }
        }
        return false;
    },
    
    repair_wall: function (creep)
    {
        var walls = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_WALL});  
        if (walls)
        {
            for (var wall in walls)
            {
                if (walls[wall].hits < walls[wall].hitsMax/100)
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
    
    fillTowers: function(creep, room)
    {
        var towers = Game.rooms[common.RoomName(room)].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        
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
    
    checkTowersNotFull: function(room)
    {
        var towers = Game.rooms[common.RoomName(room)].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        
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

    
    
    
    select_task: function (creep, room)
    {
        if (creep.carry.energy === 0)
        {
            creep.memory.state = 'harvesting';
        }

        switch (creep.memory.state) {
            case 'harvesting':
                if (creep.carry.energy === creep.carryCapacity)
                {
                    if(Game.spawns[common.SpawnName()].store[RESOURCE_ENERGY] < Game.spawns[common.SpawnName()].store.getCapacity(RESOURCE_ENERGY) || this.check_extensions_not_full(creep) || this.checkTowersNotFull(room))
                    {
                        if ( this.checkTowersNotFull(room) )
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
                break;
            
            case 'building':
                if (creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES) == null)
                {
                    creep.memory.state = 'harvesting';
                }
                break;

            case 'fill_towers':
                if (!this.checkTowersNotFull(room))
                {
                    creep.memory.state = 'harvesting';
                }
                break;

            case 'repair':
                if (!this.anything_to_repair(creep))
                {
                    creep.memory.state = 'harvesting';
                }
                break;
        
            default:
                creep.memory.state = 'harvesting';
                break;
        }
    },


    /** @param {Creep} creep **/
    run: function(creep, room) 
    {
        this.select_task(creep, room);

        builder.BuildRoadAtCreepLocation(creep);

        if(verbose)
        {
            creep.say(creep.memory.state)
        }

        switch (creep.memory.state) 
        {
            case 'harvesting':
                this.harvest(creep);
                break;
    
            case 'building':
                this.build(creep);
                break;

            case 'turning_in':
                this.turn_in(creep);
                break;
        
            case 'repair':
                this.repair(creep);
                break;

            case 'fill_towers':
                this.fillTowers(creep, room);
                break;

            default:
                break;
        }
    }
};

module.exports = harvester;