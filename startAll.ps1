cd..
cd ap-generator-base
mvn install
cd..
cd ap-summonerwar
Start-Process -FilePath "./database/start.bat" -WorkingDirectory "./database/"
Start-Process -FilePath "./server/start.bat" -WorkingDirectory "./server/"
Start-Process -FilePath "./front/start.bat" -WorkingDirectory "./front/"
