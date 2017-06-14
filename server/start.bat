call mvn clean
call mvn install -DskipTests=true
call mvn tomcat7:run
