var common = require('./../common/common');

var verbose = false;

module.exports =
{
    run: function (tower, room)
    {
        var hostiles = Game.rooms[common.RoomName()].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) 
        {
            var username = hostiles[0].owner.username;
            var towers = Game.rooms[common.RoomName(room)].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            towers.forEach(tower => tower.attack(hostiles[0]));
        }
    }
}