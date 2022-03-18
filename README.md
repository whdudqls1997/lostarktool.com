# Project LostArkTool

Currently hosted under https://lostarktool.com

## Honing Calculation

Uses realistic probability model to calculate and find the best method.
Takes a confidence level (%), and locates the cheapest (and near cheapest) 
methods that matches the confidence level.

A confidence level can be understood as:
If the calculator tells you that **3** attemps are required and your confidence level is **70**,
at least once out of those 3 attemps will succeed at a 70% chance.

Confidence level of 70 ~ 90 is recommended.

## Ability Stone Simulator

**Currently under update**
Using a combination of EM and regression, finds the best path to solution amongst 2^30 nodes.
Currently fixing the EM model's transition rate (also thinking about approaching this with deep learning).
Or could just take the time and build a mega data structure to store all best paths.

**Update (03-18)**
Creating a mega data structure seems like the most accurate way to approach this.
There aren't *too* many datas, but just **a lot** of datas.
Running minimax algorithm multiple times to figure out and map all routes.