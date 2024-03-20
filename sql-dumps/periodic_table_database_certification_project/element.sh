#! /bin/bash
# This script prints information about a given element
# usage: ./element.sh <atomic_number> | <symbol> | <name>
PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

if [[ $1 ]]
then
  # find atomic_number by atomic_number or symbol or name
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    CONDITION="atomic_number = $1"
  else
    CONDITION="symbol = '$1' OR name = '$1'"
  fi

  RECORD=$($PSQL "SELECT atomic_number, name, symbol, type, atomic_mass, melting_point_celsius, boiling_point_celsius FROM elements INNER JOIN properties USING(atomic_number) INNER JOIN types USING(type_id) WHERE $CONDITION;")

  # if not found
  if [[ -z $RECORD ]]
  then
    # tell the user, that the element wasn't found
    echo "I could not find that element in the database."

  else
    # gather information about the element
    # print information about the element
    # example: The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu. Hydrogen has a melting point of -259.1 celsius and a boiling point of -252.9 celsius.
    IFS="|"
    read ATOMIC_NUMBER NAME SYMBOL TYPE ATOMIC_MASS MELTING_POINT BOILING_POINT <<< "$RECORD"
    echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
  fi
else
  echo "Please provide an element as an argument."
fi