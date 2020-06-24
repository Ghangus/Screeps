var spawnName = 'Spawn1';
var roomName = 'W34N41';

var prevLogMessage = '';

var common =
{
    SpawnName: function()
    {
        return spawnName
    },

    RoomName: function()
    {
        return roomName;
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
