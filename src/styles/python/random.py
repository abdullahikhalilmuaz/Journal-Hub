my_list()

# THE ADD FUNCTION
def add():
    user_input = input(" enter a file to save: ")
    my_list.append(0,user_input)
    print(user_input," file added ")

# THE DISPLAY FUNCTION
def display():
    print(my_list)

# THE REMOVE FUNCTION
def remove():
    user_input = input(" enter file to delete ")
    if user_input == 0:
         my_list.pop(user_input)
    elif user_input>=0 and user_input < len(my_list):
         my_list.pop(user_input)
    else:
        print("invalid option")    

# the main function
def main():
    while true:
        print("\n 1: add File: ")
        print("\n 2: display File: ")]
        print("\n 3: remove File: ")
        print("\n 4: quit")

        option = input(" select option: ")
        if option == 1:
            add()
        elif option == 2:
            display()
        elif option == 3:
            remove()
        elif option == 4:
            break
        else:
            print(: invalid option )

main()