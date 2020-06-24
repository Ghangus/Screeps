var common = require('common');

var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var roleTower = require('role.tower');
var defender = require('role.defender');

var creep_runner =
{
    run: function()
    {
        for (var name in Game.creeps)
        {
            var creep = Game.creeps[name];
            if (creep.memory.role === 'harvester')
            {
                harvester.run(creep);
            }
            else if (creep.memory.role === 'upgrader')
            {
                
                upgrader.run(creep);
            }
            else if (creep.memory.role === 'defender')
            {
                defender.run(creep);
            }
        }
        
        
        var towers = Game.rooms[common.RoomName()].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}})
        if(towers)
        {
            for (var tower in towers)
            {
    
                roleTower.run(towers[tower]);
            }
        }
    }
}

module.exports = creep_runner;