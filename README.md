# Bowling Club

## Instructions

- Click on the green "Code" button to clone this project
- Click either Github CLI to clone it on the command line or "Open with Github Desktop"
- Use the command `npm i` to install required dependecies (node_modules have been removed)
- If using Github Desktop to clone, click "Open in Visual Studio Code"
- In Terminal, enter `open index.html` and this will run the bowling calculator in the browser

### Application

- One player
- Each frame allows the bowler 2 tries to knock down all the pins
- The score is the sum of all the pins knocked down in the frame
- 10 pins in a frame
- 10 frames in a game

#### Spare

- If the bowler knocks down all the pins in 2 bowls, their next bowl will also be added to the frame with the spare.

#### Strike

- If the bowler knocks down all the pins on the first try, their next 2 bowls will also be added to the frame with the strike

#### Last Frame

- If the bowler gets a spare, they get a third bowl and the frame score is sum of all three bowls
- If the bowler gets a strike, they get an additional 2 more bowls and the frame score is sum of all three bowls
- If the bowler gets a strike on every turn, the score is 300

### Process

The first part of the process in building the 10 Pin Bowling club was to first create a roll function. So that each time the button 'Roll' is clicked, it will give back a number between 0 and 10 with roll(). Then roll() stores the value of the first roll and for the second roll it will give a number between 0 and (10 - the amount of pins knocked down on the first roll). If it is strike, the second roll is not required and it moves onto the next frame.

roll() passes the number of pins knocked down to scoring(), which checks if it is a strike, spare or neither of those. It then builds up an object with frame number, first roll of pins knocked down, second roll of pins knocked down, total of those pins and lastly if it is a strike or spare or done. It then pushes the object into an array storing all the data - gameData[].

If the frame is the final one (10), it doesn't use the roll() or scoring() functions. It uses handleFrameTen(). Which generates number of pins knocked down for the first and second roll in the same way as roll(). However it does a check on those pins to see if the first roll was a strike or a spare, which would mean and additional roll. The additional (third) roll checks if the second roll had all it's pins knocked over. If it has, it generates anumber between 0 and 10, otherwise it wil generate a number between 0 and (10 - the amount of pins knocked down on the second roll)

scoring() and handleFrameTen() both check check for spares and strikes and apply the bonus as mentioned above in the instructions. Each time the Roll button is clicked, the score() function runs through gameData and sums up frameScore and appends it on the page. And at the end of each frame appendFrame() displays the frame score on the page and updates the bonus if there was a strike or spare.

At the end of the game (after frame 10), it is displayed 'End Game'. If the player keeps clicking the Roll button, it will display 'Click REset to start new game'.

The Reset button removes all data and starts a new game.
