@ECHO OFF

:choice
set /P c=Fetch movie/series details freshly? (Check your OMDb API key's daily limit before choosing Y) [Y/N]: 
if /I "%c%" EQU "Y" goto :fetch
if /I "%c%" EQU "N" goto :run
goto :choice

:fetch
echo Fetching details...
node get_details.js
goto :run

:run
echo .
echo Application running... goto http://localhost:5000/
node index.js