$(document).ready(function() {

  // Dynamically changing date
  
  $("#currentDay").append(moment().format("dddd, MMMM Do YYYY"));

  // Dynamically generate new Time Blocks

var newDiv, newHour, newRow, newTextArea;

var descArray = [];

function newRows() {
  
  for (i=0; i<=9; i++) {
    var time = i+8;
    var storedSchedule = JSON.parse(localStorage.getItem("descArray"));

      // Clears from next time block from previous so that they can be show linearly
      newDiv = $('<div>');
      newDiv.addClass('clear');
      newDiv.attr('id', 'index-'+i);
     
      // Hour to hour time added
      newHour = $('<section>');
      newHour.addClass('hour');
      newHour.append(moment().format(time.toString()+":00"));
      newDiv.append(newHour);

      // New entry field created
      newRow = $('<section>').addClass('row');
      newTextArea = $('<textarea>').addClass('description');
      newTextArea.attr("id", "text-" + i);
      newRow.append(newTextArea);
      newDiv.append(newRow);

      // New save button created
      newButton = $('<button>');
      newButton.addClass('saveBtn');
      newButton.attr("id", "button-" + i)
      newButton.append("🔒");
      newDiv.append(newButton);
      
      // Time block appended to HTML
      $('.container').append(newDiv);
       
      // Renders current description of each time-block based on stored schedule
      if (storedSchedule !== null) {
        descArray[i] = storedSchedule[i];
        $("#text-"+i).val(descArray[i]);
      }
      
      else {
          descArray[i] = $("#text-"+i).val();
      }
  }
  
}
newRows();

  // Entered schedule gets stored on clicking save button

  for (let i=0; i<descArray.length; i++) {

    $("#button-"+i).on("click", function() {

            var isValDiff = $("#text-"+i).change();

            if (isValDiff) {
                descArray.splice(i, 1, $("#text-"+i).val());    
            }

        localStorage.setItem("descArray", JSON.stringify(descArray));
        console.log(descArray);
    })
  }

  // Background colour changes based on   
  // Previous days schedule is emptied once day changes
})
