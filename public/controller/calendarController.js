$( document ).ready(function() {
    
    const calendarEl = $("#calendar");
    let maxEventid;
    let eventsId = [];

        const calendar = new FullCalendar.Calendar(calendarEl[0], {
          plugins: [ 'dayGrid' ,'interaction'],
          events: [ ]
        });

        getCalendarData = () => {

            eventsId.length = 0;

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
                        eventsId.push(data[i].CA_NUM);
                    }
                    
                },
                error: (err) => {
                    console.log(err);
                },
                complete: () => {
                }
            });
            calendar.render();
        }

        getCalendarData();    

    calendar.on('dateClick', (info) => {
        var i = 1;
        //console.log(info.dateStr);
        //console.log(info.view);
        //console.log(calendar.getEvents());
        //console.log(info);
            $('[data-popup=addCalendar]').fadeIn(350); //window.event.preventDefault();
            $('#selectedDate').text(info.dateStr);

    });

    calendar.on('eventClick', (info) => {
        //console.log(info.event);
        //isUse 'N'
    });

    removeCalendarData = (eventsId) => {
        eventsId.forEach(e => {
            let event = calendar.getEventById(e);
            event.remove();
        });
    }
    //----- CLOSE 팝업 클로즈
    
    $('[data-popup-close]').on('click', (e) => { // 팝업 닫기 버튼 클릭시 동작하는 이벤트입니다. 
        $('[data-popup=addCalendar]').fadeOut(350); e.preventDefault(); 
        $('#addText').text('');
    });

    
    $('#calendarAdd').on('click', () => {
        $.ajax({
            url: "http://localhost:8071/api/calendar/insertCalendarData",
            type: "post",
            dataType: "json",
            data :{"CA_EVDATE" : ($('#selectedDate').text()).replace(/-/g,''),
                   "CA_STEXT" :  $('#addText').val()
                },
            success: (responseData) => {
                var data = responseData.data;
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                removeCalendarData(eventsId);
                getCalendarData();
                $('[data-popup-close]').trigger('click');
            }
        });

    });
        
    
    

    
    


});
