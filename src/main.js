let prototypes = require('./prototypes');
var creep_runner = require('./creeps/creep_runner');
var spawn_runner = require('./room/spawn_runner');
var builder = require('./room/builder');
const { forEach } = require('lodash');

module.exports.loop = function ()
{
    Game.myRooms = _.filter(Game.rooms, r => r.controller && r.controller.level > 0 && r.controller.my);

    Game.myRooms.forEach(room => {
        builder.run(room);
        creep_runner.run(room);
        spawn_runner.run(room);
    });
}