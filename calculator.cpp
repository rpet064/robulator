#include <iostream>
#include <string> 
using namespace std;
#include "calculator.h"
#include <cmath>
#include <iomanip>

int calculateAnswer(string operation, double first_num, double second_num)
{
    int answer{};
    if (operation == "+" )
    {
        answer = first_num + second_num;
    } 
    else if (operation == "-" )
    {
        answer = first_num - second_num;
    }
    else if (operation == "*" )
    {
        answer = first_num * second_num;
    }
    else if (operation == "/" )
    {
        answer = floor(first_num / second_num);
    } 
    return answer;
}

// gets numeric value from user and returns to main
int getNumValue()
{
    double userInput {};
    std::cout << "Please enter a number" << "\n";
    std::cin >> userInput;
    return userInput;
}

int main()
{
    // Assign first number from input
    double first_num {};
    first_num = getNumValue();

    // Assign operator number from input
    string operation = "";
    std::cout << "What would you like to do with it? \n";
    std::cin >> operation;

    // Assign second number from input
    double second_num {};
    second_num = getNumValue();

    // Calculate and pring answer
    std::cout << setprecision(13);
    double answer = calculateAnswer(operation, first_num, second_num);
    std::cout << answer;

    // catch if user puts in letter instead of number
    if (!std::cin.good())
    {
        throw std::invalid_argument( "Why did you put in a letter?" );
    }
    return 0;
}