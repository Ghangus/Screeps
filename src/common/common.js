var spawnName = 'Spawn1';
var roomName = 'E33S23';

var prevLogMessage = '';

var common =
{
    SpawnName: function()
    {
        return spawnName
    },

    RoomName: function( room )
    {
        return room.name;
    },

    CreepSay: function ( creep, verbose, message )
    {
        if ( verbose )
        {
            creep.say( message );
        }
    },

    Log: function ( verbose, message, origin )
    {
        if( verbose)
        {
            if ( prevLogMessage != message )
            {
                console.log(origin + ": " + message);
                prevLogMessage = message;    
            }
        }
    }
}

module.exports = common;
