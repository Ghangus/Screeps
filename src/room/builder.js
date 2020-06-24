var common = require('common');

var builder =
{
    BuildRoadTo: function( spawn, target )
    {
        var goals = Game.spawns[spawn].room.find(target);

        for ( var index in goals )
        {
            var shortestPath = Game.spawns[spawn].pos.findPathTo(goals[index].pos);

            for ( var index in shortestPath )
            {
                Game.spawns[spawn].room.createConstructionSite(shortestPath[index].x, shortestPath[index].y, STRUCTURE_ROAD);
            }
        }
    },

    run: function( )
    {
        this.BuildRoadTo(common.SpawnName(), FIND_SOURCES);
    }
}

module.exports = builder;
