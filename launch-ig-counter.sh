#!/bin/bash

while true
do
	forever start /home/pi/ig-followers-counter/app.js
	sleep 3
	export DISPLAY=:0
	/usr/bin/chromium-browser --incognito --window-size=800,480 --kiosk "http://igcounter.local:8080/authorize_user"
done
