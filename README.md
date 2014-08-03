#Clock Dashlet

Clock Dashlet is a tiny dashlet to display clock as a dashlet in Alfresco Share.


![alt clock-dashlet-image](https://github.com/bandetech/clock-dashlet/blob/master/screenshot/clock-dashlet.png)


##INSTALL

The easiest way to install the app is to download whole structure as zip and change extension (e.g. clock-dashlet-share.amp).
Then put the amp file to amps_share directory and install the amp using alfresc-mmt tool (before installing the app, stop 
alfresco server).


```
# cd ${alfresco.install.directory}/bin
# java -jar alfresc-mmt.jar install ../amps_share/clock-dashlet-share.amp ../tomcat/webapps/share.war
# ./clean_tomcat.sh
```

## Caution
I've tested the app in Alfresco One 4.2.0 but it would work with other 4.2.x version of Alfresco.

