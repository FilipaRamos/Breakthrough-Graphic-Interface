# Breakthrough-Graphic-Interface

Graphic interface for the game Breakthrough developed in PROLOG by [Pedro Castro](https://github.com/F0lha). The communication between languages was achieved through sockets. The graphic interface is a WebGL based software using JavaScript and xml for scene definition and rendering. 

## Rules of the Game

A player has a golden fleet which includes the red ship and twelve guards. The objective of this player is to avoid capture whilst he/she conducts the red ship towards the end of the board. The other player has a silver fleet of 20 ships and his/her objective is to capture the red ship.
Each player can move a piece on the horizontal or vertical direction. Each move has a cost depending on the executed movement. For example, moving the red ship has the maximum cost which is 2. At the start of the game, each player has 2 move points as well as 1 capture point to spend. A simple movement has the cost of 1.

## Interface

The interface allows costumization of some game options listed below.

+ UNDO
  - to undo de move
+ THEME
  - to chose the theme
+ LEVEL
  - two difficulties are available (hard and random)
+ GAME MODE
  - there are 3 game modes (HumanvsHuman/HumanvsBot/BotvsBot)
+ ON/OFF
  - play with the lights

## Getting Started

In order to have the system running on your local machine for development and testing purposes see the notes below.

### Prerequisites

To run the simulation you must have the following software:

+ [SICStus Prolog](https://sicstus.sics.se/) (take into consideration that this software needs a license) - to run the game's logic in prolog
+ [Mongoose](https://www.cesanta.com/) - web server to connect

### Installing

To get the game up and running follow these steps:

```
1. Open SICStus console
2. Go to File->Consult
3. Navigate to the folder reader\prolog and select the file server.pl
4. Write server. on the console (the point is necessary)
5. Execute mongoose and navigate to the reader folder
```

## Authors

* **Inês Santos** - [IneSantos](https://github.com/IneSantos)
* **Filipa Ramos** - [FilipaRamos](https://github.com/FilipaRamos)

## Acknowledgments

* All the rights of the prolog code belong to [Pedro Castro](https://github.com/F0lha).
