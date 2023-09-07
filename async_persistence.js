///welcome to the matrix, neo.

require('./persistence');
const readline = require('readline').createInterface
({
    input: process.stdin,
    output: process.stdout,
});
String.prototype.async_LOAD = function()
{
    var t = this + "";
    return new Promise
    (
        function(callback)
        {
            t.LOAD
            (
                function(data)
                {
                    callback(data);
                }
            )
        }
    )
}
/**
 * 
 * @param {string} txt 
 * @returns {Promise}
 */
String.prototype.async_SAVE = function(txt)
{
    var t = this + "";
    return new Promise
    (
        function(callback)
        {
            t.SAVE
            (      
                txt
                ,
                function(data)
                {
                    callback(data);
                }
            )
        }
    )
}
String.prototype.GET_OBJECT = function()
{
	var t = this;
	return new Promise
	(
		function(callback)
		{
			t.LOAD
			(
				function(data)
				{
					callback(data?.TO_OBJECT());
				}
			)
		}
	);
}
String.prototype.SET_OBJECT = function(obj)
{
	var t = this;
	return new Promise
	(
		function(callback)
		{
			t.SAVE
			(
                obj.TO_JSON()
                ,
				function(data)
				{
					callback(data);
				}
			)
		}
	);
}
String.prototype.TERMINAL_GET = function()
{
	var t = this + '';
	return new Promise
	(
		function(callback)
		{
            readline.question
            (
                t
                ,
                function(data) 
                {
                    callback(data)
                }
            );
		}
	);
}
String.prototype.TERMINAL_CLOSE = function()
{
    readline.close();
}