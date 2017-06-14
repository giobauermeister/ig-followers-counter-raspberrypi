#!/bin/bash

while true
do
	forever start /home/pi/ig-followers-counter-raspberrypi/app.js
	sleep 3
	export DISPLAY=:0
	/usr/bin/chromium-browser --incognito --window-size=800,480 --kiosk "http://localhost:8080/authorize_user"
done
