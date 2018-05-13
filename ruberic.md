# MEMORY GAME RUBERIC

## Behavior

* ___Memory Game Logic__ - The game randomly shuffles the cards. A user wins once all cards have successfully been matched.

* __Congratulations Popup__ - When a user wins the game, a modal appears to congratulate the player and ask if they want to play again. It should also tell the user how much time it took to win the game, and what the star rating was.

* __Restart Button__ - A restart button allows the player to reset the game board, the timer, and the star rating.

* __Star Rating__ - The game displays a star rating (from 1 to at least 3) that reflects the player's performance. At the beginning of a game, it should display at least 3 stars. After some number of moves, it should change to a lower star rating. After a few more moves, it should change to a even lower star rating (down to 1).  The number of moves needed to change the rating is up to you, but it should happen at some point.

* __Timer__ - When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.

* __Move Counter__ - Game displays the current number of moves a user has made.

## INTERFACE DESIGN

* __Styling__ - Application uses CSS to style components for the game.

* __Usability__ - All application components are usable across modern desktop, tablet, and phone browsers.

## DOCUMENTATION

* __README__ - A `README` file is included detailing the game and all dependencies.

* __Comments__ - Comments are present and effectively explain longer code procedure when necessary.

* __Code Quality__ - Code is formatted with consistent, logical, and easy-to-read formatting as described in the [Udacity JavaScript Style Guide](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)

## EXTRA CREDIT

* Add CSS animations when cards are clicked, unsuccessfully matched, and successfully matched.

* Add unique functionality beyond the minimum requirements (Implement a leaderboard, store game state using local storage, etc.)

* Implement additional optimizations that improve the performance and user experience of the game (keyboard shortcuts for gameplay, etc).
