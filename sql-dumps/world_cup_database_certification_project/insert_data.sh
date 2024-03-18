#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

# Truncate tables before inserting
TRUNCATE_RESULT=$($PSQL "TRUNCATE teams, games;")
if [[ $TRUNCATE_RESULT == "TRUNCATE TABLE" ]]
then
  echo truncated tables
fi

cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  if [[ $YEAR != year ]]
  then
    ### insert teams ###

    # get id of winner team
    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$WINNER';")
    # if winner is not in table
    if [[ -z $WINNER_ID ]]
    then
      # insert winner
      INSERT_WINNER_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$WINNER');")
      if [[ $INSERT_WINNER_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted team $WINNER
      fi
      
      # get id of inserted team
      WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$WINNER';")
    fi

    # get id of opponent team
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$OPPONENT';")
    # if opponent is not in table
    if [[ -z $OPPONENT_ID ]]
    then
      # insert opponent
      INSERT_OPPONENT_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT');")
      if [[ $INSERT_OPPONENT_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted team $OPPONENT
      fi
      
      # get id of inserted team
      OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$OPPONENT';")
    fi

    ### insert games ###
    INSERT_GAME_RESULT=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS);")
    if [[ $INSERT_GAME_RESULT == "INSERT 0 1" ]]
    then
      echo "inserted game [ year: $YEAR, round: $ROUND, score: $WINNER $WINNER_GOALS - $OPPONENT $OPPONENT_GOALS ]"
    fi 
  fi
done