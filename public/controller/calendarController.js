$( document ).ready(function() {
    
    const calendarEl = $("#calendar");
    let maxEventid;
    let eventsId = [];

    const calendar = new FullCalendar.Calendar(calendarEl[0], {
          plugins: [ 'dayGrid' ,'interaction'],
          events: [ ]
        });
        //달력 데이터를 가져온다
        getCalendarData = () => {

            eventsId.length = 0;

            $.ajax({
                url: "http://localhost:8071/api/calendar/getCalendarData",
                type: "get",
                dataType: "json",
                data :{"CA_EVDATE" :commonModule.time.getYear() },
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

    getCalendarData(); //명시적 함수이기 때문에 한번 실행 시켜줌    
    

    //달력에서 날짜를 눌렀을 때 
    calendar.on('dateClick', (info) => {
        //console.log(info.dateStr);
        //console.log(info.view);
        //console.log(calendar.getEvents());
        //console.log(info);
        $('[data-popup=addCalendar]').fadeIn(350); //window.event.preventDefault();
        $('#selectedDate').text(info.dateStr);
    });

    //달력에서 이벤트를 눌렀을 때
    calendar.on('eventClick', (info) => {
        //console.log(info.event);
        //isUse 'N'
    });

    //달력 데이터를 지운다.
    removeCalendarData = (eventsId) => {
        eventsId.forEach(e => {
            let event = calendar.getEventById(e);
            event.remove();
        });
    }
    
    //팝업 닫기
    $('[data-popup-close]').on('click', (e) => {
        $('[data-popup=addCalendar]').fadeOut(350); e.preventDefault(); 
        $('#addText').text('');
    });

    //달력에 이벤트 추가
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
                removeCalendarData(eventsId); //달력에 이벤트를 모두 지우고
                getCalendarData(); //다시 DB에서 가져온다.
                $('[data-popup-close]').trigger('click'); //팝업을 닫는다.
            }
        });

    });
        
});
