
$( document ).ready(function() {
    
    const calendarEl = $("#calendar");
    let maxEventid;

        var calendar = new FullCalendar.Calendar(calendarEl[0], {
          plugins: [ 'dayGrid' ,'interaction'],
          events: [ ]
        });
    
        

        (function () {

            $.ajax({
                url: "http://localhost:8071/api/calendar/getCalendarData",
                type: "get",
                dataType: "json",
                data :{"CA_EVDATE" :commonModule.time.getYearMonth() },
                success: (responseData) => {
                    var data = responseData.data;
                    maxEventid = responseData.data[0].CA_MAXID;
                    for(let i=0 ; i < data.length ; i++) {
                        let st = data[i].CA_EVDATE.substring(0,4);
                        let mi = data[i].CA_EVDATE.substring(4,6);
                        let ed = data[i].CA_EVDATE.substring(6,8);
                        let evdate = st+'-'+mi+'-'+ed;
                        calendar.addEvent({id: data[i].CA_NUM, title : data[i].CA_STEXT, start : evdate, end: evdate ,backgroundColor : "#00ff99" , borderColor :"#00ff99"});
                    }
                    
                },
                error: (err) => {
                    console.log(err);
                },
                complete: () => {
                    
                }
            });
            calendar.render();
        })()


    calendar.on('dateClick', function(info,view) {
        var i = 1;
        console.log(info);
        console.log(view);
        console.log(calendar.getEvents());

    });    

});
