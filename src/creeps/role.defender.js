var common = require('common');

var verbose = false;

module.exports =
{
    run: function (creep)
    {
        var hostiles = Game.rooms[common.RoomName()].find(FIND_HOSTILE_CREEPS);
        if(hostiles.length > 0) 
        {
            var username = hostiles[0].owner.username;
            if (creep.attack(hostiles[0]) === ERR_NOT_IN_RANGE)
            {
                creep.moveTo(hostiles[0]);
            }
        }
        else
        {
            creep.moveTo(10,43);
        }
    }
};
