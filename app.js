// set event listeners
function init() {
  // listen for a form submit
  $("#move-form").on("submit", function(e) {
    // stop its default behavior
    e.preventDefault();
    // read the input from the user
    spacesToMove = parseInt($(e.target).find("#movesInput").val());
    // call the move function
    move(spacesToMove);
  })
}

// move the piece
function move(spacesToMove) {
  // count the cells in the game
  var cellCount = $(".cell").length;
  // grab the current position of the active cell
  var currentPosition = parseInt($(".active").attr("id"));
  // figure out it's new position
  var destination = currentPosition + spacesToMove;
  // return a message to the user if the new position is out of range
  if(destination >= cellCount || destination < 0) {
    alertUser("you are beyond the range of range of the board");
    return false;
  }
  // animate the movement
  var movePiece = setInterval(function() {
    // remove the class active from the occupied space
    $(".active").toggleClass("active");
    // if the movement is forward (a positive number)
    if (spacesToMove > 0) {
      // step forward
      currentPosition += 1;
    } else {
      // otherwise step backwards
      currentPosition -= 1;
    }
    // add the class active to the newly occupied space 
    $("#" + currentPosition).toggleClass("active");
    // determine if the movement is over by checking if the piece is at it's destination yet
    if(currentPosition === destination) {
      // stop the animation when the piece is at the destination
      clearInterval(movePiece);
    }
  }, 500) // each movement takes half a second
}

// display a message to the user
function alertUser(message) {
  // create a new promise
  var displayMessage = new Promise(function(resolve, reject) {
    // display a message to the user
    $("#user-message").text(message);
    setTimeout(function(){
      // after a second we resolve the promise
      resolve();
    }, 1000);
  });
  // once the promise is resolved, we remove the message
  displayMessage.then(function() {
    $("#user-message").text("");
  })
}