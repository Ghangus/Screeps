var common = require('./../common/common');

var harvester = require('./role.harvester');
var upgrader = require('./role.upgrader');
var roleTower = require('./role.tower');
var defender = require('./role.defender');

var creepLogic = require('./../creeps');

var creep_runner =
{
    run: function(room)
    {

        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
    
            let role = creep.memory.role;
            if (creepLogic[role]) {
                creepLogic[role].run(creep, room);
            }
        }
       
        
        var towers = Game.rooms[common.RoomName(room)].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}})
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