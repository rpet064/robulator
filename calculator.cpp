#include <iostream>
using namespace std;

int addNum(int first_num, int second_num){
    return first_num + second_num;
}

// int subtractNum(){
    
// }

// int multiplyNum(){
    
// }

// int divideNum(){
    
// }

int main()
{
    int first_num {}, second_num{};
    string operation {};

    std::cout << "Welcome to the calculator. What's your first number? \n";
    std::cin >> first_num;
    std::cout << "What would you like to do with it? \n";
    std::cin >> operation;
    std::cout << "What's your second number? \n";
    std::cin >> second_num;
    int answer{addNum(first_num, second_num)};
    std::cout << "Answer is " << answer << "\n";

    return 0;
}