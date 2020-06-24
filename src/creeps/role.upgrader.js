var common = require('common');

var verbose = false;

module.exports =
{
    harvest: function (creep)
    {
        common.CreepSay(creep, verbose, 'Harvesting');
        var closest_sources = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(closest_sources) === ERR_NOT_IN_RANGE)
        {
            creep.moveTo(closest_sources);
        }
    },
    
    
    upgrade: function (creep)
    {
        common.CreepSay(creep, verbose, 'Upgrading');
        var controller = creep.room.controller;
        if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE)
        {
            creep.moveTo(controller);
        }
    },
    
    select_task: function (creep)
    {
        if (creep.memory.state == 'harvesting')
        {
            if (creep.carry.energy == creep.carryCapacity)
            {
                creep.memory.state = 'upgrading';
            }
        }
        else
        {
            
            if (creep.carry.energy == 0)
            {
                creep.memory.state = 'harvesting';
            }
        }
    },
    
    run: function (creep)
    {
        this.select_task(creep);
        if (creep.memory.state == 'harvesting')
        {
            this.harvest(creep);
        }
        else if (creep.memory.state == 'upgrading')
        {
            this.upgrade(creep);
        }
    }
};





