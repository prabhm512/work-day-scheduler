$(document).ready(function() {

  // Dynamically changing date
  
  $("#currentDay").append(moment().format("dddd, MMMM Do YYYY"));

  // Dynamically generate new Time Blocks

var newDiv, newHour, newRow, newTextArea, newBlock;

var descArray = [];
var status = [];

function newRows() {
  
  for (i=0; i<=9; i++) {
    var time = i+8;
    var storedSchedule = JSON.parse(localStorage.getItem("descArray"));
    var storedStatus = JSON.parse(localStorage.getItem("status"));

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
      newBlock = $('<section>');
      newBlock.addClass('status');
      newBlock.attr("id", "block-" + i)
      newBlock.append("✔");
      newDiv.append(newBlock);
      
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

      if (storedStatus !== null) {
          status[i] = storedStatus[i];
          $("#block-"+i).text(status[i]);
      }

      else {
          status[i] = $("#block-"+i).text();
      }
  }
  
}
newRows();

  // Entered schedule gets stored when text is changed

  for (let i=0; i<descArray.length; i++) {

            $("#text-"+i).change(function() {
                descArray.splice(i, 1, $("#text-"+i).val());

                if ($("#text-"+i).val() === "") {
                    status.splice(i, 1, "✔");
                }

                else {
                    status.splice(i, 1, "⌛");
                }

                $("#block-"+i).text(status[i]);

                localStorage.setItem("descArray", JSON.stringify(descArray));
                localStorage.setItem("status", JSON.stringify(status));
            });

    }

  // Change background colour based on current time
  
  

  function timeBlockColor() {
    
    // reload page every hour so that green background moves down to next time block
    if (moment().minute() === 00 && moment().second() === 00) {
      
      location.reload();
    }

    for (i=0; i<descArray.length; i++) {
      if (parseInt($("#index-"+i +" > .hour").text()) === parseInt(moment().hour())) {
          $("#index-"+i+ " > .row").attr("style", "background-color: lightgreen;");
      } 

      if (parseInt($("#index-"+i +" > .hour").text()) < parseInt(moment().hour())){
          $("#index-"+i+ " > .row").attr("style", "background-color: #d3d3d3;");
      }
    }

  }

  // Call function every second
  setInterval(timeBlockColor, 1000);

});
