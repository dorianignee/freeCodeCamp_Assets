#!/bin/bash
# Number guessing game
# The computer will generate a random number between 1 and 1000
# You have to guess that number. The less tries, the better
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

# Ask for username
echo "Enter your username:"
read USERNAME

# Find user in database
GAMES_INFO=$($PSQL "SELECT games_played, best_game FROM players WHERE username = '$USERNAME';")

# If user exists
if [[ $GAMES_INFO ]]
then
  # print user info
  ORIGINAL_IFS=$IFS
  IFS="|"
  read GAMES_PLAYED BEST_GAME <<< "$GAMES_INFO"
  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  IFS="$ORIGINAL_IFS"
else
  # print welcome message
  echo "Welcome, $USERNAME! It looks like this is your first time here."

  # insert user into database
  INSERT_USER_RESULT=$($PSQL "INSERT INTO players(username) VALUES('$USERNAME');")
fi

# initialize game
SECRET_NUMBER=$(( $RANDOM % 1000 + 1 ))
GUESSES=0
(( GAMES_PLAYED++ ))

# guessing function. I made it a function, so it's able to restart
GUESS() {
  (( GUESSES++ ))
  read INPUT_NUMBER

  # if it's not a number
  if [[ ! $INPUT_NUMBER =~ ^[0-9]+$ ]]
  then
    echo "That is not an integer, guess again:"
    GUESS
  elif (( $SECRET_NUMBER < $INPUT_NUMBER ))
  then
    echo "It's lower than that, guess again:"
    GUESS
  elif (( $SECRET_NUMBER > $INPUT_NUMBER ))
  then
    echo "It's higher than that, guess again:"
    GUESS
  fi
  # return from function if the player guessed the correct number
}

# ask the player to guess the number
echo "Guess the secret number between 1 and 1000:"
GUESS

# print final message
echo "You guessed it in $GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"

# update player information in database
if [[ -z $BEST_GAME || $BEST_GAME -gt $GUESSES ]]
then
  BEST_GAME=$GUESSES
fi

UPDATE_PLAYER_RESULT=$($PSQL "UPDATE players SET games_played = $GAMES_PLAYED, best_game = $BEST_GAME WHERE username = '$USERNAME';")
