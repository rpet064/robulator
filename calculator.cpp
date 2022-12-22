#include <iostream>
#include <string> 
using namespace std;

int addNum(int first_num, int second_num)
{
    return first_num + second_num;
}

int subtractNum(int first_num, int second_num)
{
        return first_num - second_num;
}

int multiplyNum(int first_num, int second_num)
{
        return first_num * second_num;
}

int divideNum(int first_num, int second_num)
{
    return first_num / second_num;
}

void calculateAnswer(string operation, int first_num, int second_num)
{
    int answer{};
    if (operation == "+" )
    {
        answer = addNum(first_num, second_num);
    } 
    else if (operation == "-" )
    {
        answer = subtractNum(first_num, second_num);
    }
    else if (operation == "*" )
    {
        answer = multiplyNum(first_num, second_num);
    }
    else if (operation == "/" )
    {
        answer = divideNum(first_num, second_num);
    } else {

        // end function if user inputs unsupported operator 
        std::cout << "Sorry, at this stage only +, -, / or * can be used \n";
        return;
    }
    std::cout << first_num << operation << second_num << "=" << answer << "\n";
}

// gets numeric value from user and returns to main
int getNumValue()
{
    int userInput {};
    std::cout << "Please enter a number" << "\n";
    std::cin >> userInput;
    return userInput;
}

int main()
{
    int first_num {};
        first_num = getNumValue();
    string operation = "";
    std::cout << "What would you like to do with it? \n";
    std::cin >> operation;    
    int second_num {};
    second_num = getNumValue();
    calculateAnswer(operation, first_num, second_num);

    // catch if user puts in letter instead of number
    if (!std::cin.good())
    {
        throw std::invalid_argument( "Why did you put in a letter?" );
    }
    return 0;
}