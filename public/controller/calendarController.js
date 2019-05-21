
$( document ).ready(function() {

    var calendarEl = $("#calendar");

        var calendar = new FullCalendar.Calendar(calendarEl[0], {
          plugins: [ 'dayGrid' ,'interaction'],
          events: [
           
          ]
        });

        calendar.render();

    calendar.on('dateClick', function(info) {
        console.log('clicked on ' + info.dateStr);
        calendar.addEvent({start : info.dateStr, end: info.dateStr ,overlap : false , rendering: 'background'});
    });    

});
