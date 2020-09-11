$(document).ready(function() {

  // Dynamically changing date
  
  $("#currentDay").append(moment().format("dddd, MMMM Do YYYY"));

  // Dynamically generate new Time Blocks

function newRows() {
  
  for (i=8; i<=17; i++) {
    
      // Clears from next time block from previous so that they can be show linearly
      var newDiv = $('<div>');
      newDiv.addClass('clear');
      $(newDiv).attr('id', 'index-'+i);

      // Hour to hour time added
      var newHour = $('<section>');
      newHour.addClass('hour');
      $(newHour).append(moment().format(i.toString()+":00"));
      newDiv.append(newHour);

      // New entry field created
      var newRow = $('<section>').addClass('row');
      var newTextArea = $('<textarea>').addClass('description');
      newRow.append(newTextArea);
      newDiv.append(newRow);

      // New save button created
      var newButton = $('<button>');
      newButton.addClass('saveBtn');
      newButton.append("🔒");
      newDiv.append(newButton);
      
      // Time block appended to HTML
      $('.container').append(newDiv);
      
  }
  
}
  newRows();

  // Entered schedule gets stored on clicking save button

  
  // Previous days schedule is emptied once day changes
})
