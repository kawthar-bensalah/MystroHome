# MystroHome

![alt text](https://raw.githubusercontent.com/kawthar-bensalah/MystroHome/master/logo2.PNG)


Web of Things based system including a client application to create and execute domotic scenarios in a smarthouse. 

## Description

MystroHome is developped to orchestrate all connected devices at home, with a focus on confort, time-saving and uniqueness. It's possible to control all  home appliances including refrigerator, washer, air conditioner, alarm, bulbs and more through a smartphone or a computer. It includes a BPEL process editing tool orchestrating the services offered by smart objects. This tool is able to execute these process so that users observe the result on the objects concerned. Every BPEL process is associated to a domotic scenario that start at the time of user's choice.

## Getting Started

### Requirements

* Windows/Linux/Mac OS.
* Eclipse IDE.
* Java Development Kit (JDK).
* Spring Boot framework.
* AngularJS.
* MongoDB (database).

### Executing program

* Preparation of the database

1 - Access to MongoDB  
2 - Create a SmartHomeDB database  
3 - Create three collections: Scenarios, Users and Objects.

* SmartHomeDB Web Service 

 Launch the data service ( SmartHomeDB )

![alt text](https://raw.githubusercontent.com/kawthar-bensalah/MystroHome/master/screen12.PNG)

* Android Apps

 Launch the three Android Applications from Android Studio.

![alt text](https://raw.githubusercontent.com/kawthar-bensalah/MystroHome/master/screen13.PNG)

  Set the IP address displayed in each application to the Application.java class of the corresponding WS. 

![alt text](https://raw.githubusercontent.com/kawthar-bensalah/MystroHome/master/screen14.PNG)

* WebServices associated to Objects 

 Launch the three Web services (WS Alarm , WS Bulb, WS TV)

![alt text](https://raw.githubusercontent.com/kawthar-bensalah/MystroHome/master/screen15.PNG)

* Mediator WebService

  Launch the Mediator (Mediateur)

![alt text](https://raw.githubusercontent.com/kawthar-bensalah/MystroHome/master/screen16.PNG)

* Client App

  Launch the client application (Angular Project)


![alt text](https://raw.githubusercontent.com/kawthar-bensalah/MystroHome/master/screen17.PNG)

## Screenshots

![alt text](https://raw.githubusercontent.com/kawthar-bensalah/MystroHome/master/screen9.PNG)

![alt text](https://raw.githubusercontent.com/kawthar-bensalah/MystroHome/master/screen10.PNG)

![alt text](https://raw.githubusercontent.com/kawthar-bensalah/MystroHome/master/screen11.PNG)




## Authors

BENSALAH Kawthar 
bensalahkawthar9@gmail.com

