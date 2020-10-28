"# workout-log" 
<!-- 
This is a workout log server - user data is hashed for login and tokens are set as well.

The default requirements for the .env configuration should look like the following:

PORT= 
NAME=
PASS=
JWT_SECRET=

You need to have node_modules installed

Access to the following endpoints is available:

USER Specific
/user/register	POST	Allows a new user to be created with a username and password.
/user/login	    POST	   Allows log in with an existing user.

WORKOUT LOG ENTRY Specific

/log/	    POST	    Allows users to create a workout log with descriptions, definitions, results, and owner properties.
/log/	    GET	        Gets all logs for an individual user.
/log/:id	GET	        Gets individual logs by id for an individual user.
/log/:id	PUT	        Allows individual logs to be updated by a user.
/log/:id	DELETE	    Allows individual logs to be deleted by a user.

/log/	POST


 -->