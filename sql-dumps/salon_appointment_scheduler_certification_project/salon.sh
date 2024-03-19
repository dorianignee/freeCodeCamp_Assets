#! /bin/bash
PSQL="psql --username=freecodecamp --dbname=salon --no-align --tuples-only -c"

echo -e "\n~~~~~ DORIAN'S SALON ~~~~~\n"

MAIN_MENU() {
  # If a message is passed as an argument, print it
  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi  

  # ask for service
  SERVICES=$($PSQL "SELECT service_id, name FROM services ORDER BY service_id;")
  echo "$SERVICES" | sed 's/|/) /'
  read SERVICE_ID_SELECTED

  # if not a number
  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then
    # send to main menu
    MAIN_MENU "Please tell me the number of the service you wish."
  else
    # find service
    SERVICE=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED;")

    # if service not exists
    if [[ -z $SERVICE ]]
    then
      # send to main menu
      MAIN_MENU "Sorry, I don't offer that service. What else would you like today?"
    else
      # find customer by phone number
      echo -e "\nWhat's your phone number?"
      read CUSTOMER_PHONE
      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE';")

      # if not in database
      if [[ -z $CUSTOMER_ID ]]
      then
        # insert record
        echo -e "\nSeems like I don't know you, yet. What's your name?"
        read CUSTOMER_NAME
        INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES ('$CUSTOMER_PHONE', '$CUSTOMER_NAME');")

        # read new customer_id
        CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE';")
      fi

      # read customer name
      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE customer_id = $CUSTOMER_ID;")

      # ask for time
      echo -e "\nWhat time would you like your $SERVICE, $CUSTOMER_NAME?"
      read SERVICE_TIME

      # add appointment
      INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments (customer_id, service_id, time) VALUES ($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME');")
      if [[ $INSERT_APPOINTMENT_RESULT == "INSERT 0 1" ]]
      then
        echo -e "\nI have put you down for a $SERVICE at $SERVICE_TIME, $CUSTOMER_NAME."
      fi
    fi
  fi
}

MAIN_MENU "Welcome to Dorian's Salon. How can I help you?"