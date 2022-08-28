# User's Guide

## Introduction
The goal of the project is to streamline the process of retrieving/analyzing data from Rocket League games. The prerequisites for using the software are listed below:

&emsp;1.) Rocket League with BakkesMod installed your local machine\
&emsp;2.) The [RLCSV plugin.](https://bakkesplugins.com/plugins/view/94) This is available at the embedded link or as a .zip in the repository. \
&emsp;3.) Python installed on your local machine

## How-To

&emsp;1.) Launch Rocket League and open the BakkesMod menu. 
&emsp;2.) Navigate to the ```Plugins``` menu, and then to the ```RLCSV Plugin``` entry.\
&emsp;3.) Follow the instructions on the plugin page and set the path to a location of your choice on your machine. \
&emsp;&emsp;&emsp;a.) Be sure to include a trailing '/', otherwise the plugin will prepend the last characters of the path to each file
&emsp;&emsp;&emsp;&emsp;name.\
&emsp;
<p align="center">
  <img src="documentation/pics/rlcsv_path_cropped.jpg" />
</p>
&emsp;

&emsp;4.) Play the games you want to record. At the conclusion of each game, the results will be saved as a .csv in the 
&emsp;&emsp;directory you specified in step 2. When you open the directory, it should look like the below figure.\
&emsp;
<p align="center">
  <img src="documentation/pics/directory.png" />
</p>
&emsp;

&emsp;5.) Open a terminal window, and run the following command, replacing ```"INSERT_PATH_HERE"``` with the exact path 
&emsp;&emsp;entered during step 2:
```
py season-stats.py "INSERT_PATH_HERE"
```
&emsp;6.) Navigate to the generated 'bin' folder.\
&emsp;7.) The desired output of season statistics is ```stats.csv```.

