This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Goal of the game:
Choose the artist that sings a specific line of lyrics, winning points for every correct choice

## Must have features:
  - quiz card with one line of lyrics and 3 artists to choose from
  - the game ends after completing N quiz cards, one after the other
  - ask the name of the player with the ability to log off so that another user could play
  - count the points and save them at the end of the game
  - the screens of the game should be:
    - the quiz screen
    - the user's screen where they can see their name and the points of the last N games
    - the high score screen where you can see a chart of the best players

## Nice to have:
  - game time countdown for every quiz card, once it runs out you pass to the next quiz card without getting any points

### Notes:
  - you can use localStorage for saving data and user session, no need for a DB
  - don't worry too much about the design, we'll not judge that :) you can also use some CSS library if you want to
  - the app should be built using React (or React Native if you feel like experimenting)
  - other technology choices like various JS libs, are up to you

### TODO:
  - ~~Make the API calls fill in the questions, async broken at the moment~~ -
    well, it does while I have enough calls left from the free API account
  - ~~Save user data to localStorage. This is half broken at the moment, updates
    just fine except `score` doesn't match the printed (actual) score.~~ - fixed
  - ~~Log off button~~ - done
  - ~~history game~~ - done
  - Make the countdown clock do something when it ends
  - re-jig screens so they match the "must have features: precisely.
