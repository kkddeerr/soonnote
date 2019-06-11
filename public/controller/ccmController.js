$(document).ready(function() {
    
    $.ajax({
       // url: "http://222.117.225.28:8071/api/user/getAllLocation",
        //url: "http://222.117.225.28:8071/api/ccm/getCCMList",
        url: "http://localhost:8071/api/ccm/getCCMList",
        type: "get", 
        dataType: "json",
        success: (responseData) => {
            
            console.log('조회 성공');
            let data = responseData.data;
            for (let i = 0; i < data.length; i++) {
                //let option = $("<option value='"+data[i].CM_ID+"'>"+data[i].CM_TITLE+"</option>");
                let option = $(`<tr>
                <td>`+ Number(i+1) +`</td> 
                <td>`+data[i].CM_TITLE+`</td>
                <td>`+data[i].CM_USER+`</td>
                <td>`+data[i].PC_DT+`</td>
                <td>`+data[i].CM_LOOKUP_COUNT+`</td>
                <td style="display:none;">`+data[i].CM_ID+`</td> 
            </tr>`) /* 순번,제목,작성자,날짜,조회수 */
                
                $("#ccmlist").append(option); 
            } 
        },
        error: (xhr, status, error) => {
            console.log(error);
            console.log('gogo error');
            alert(error);
        }  
    });

    $("#regCcm").click(() => { 
        $(location).attr('href', '#/ccmAdd');
    } );



    $(document).on("click", "#example-table-1 tr", function(){
    
     
        // 테이블의 Row 클릭시 값 가져오기
       // $("#example-table-1 tr").click(function(){ 	
            
            var str = ""
            var tdArr = new Array();	// 배열 선언
        
            // 현재 클릭된 Row(<tr>)
            var tr = $(this);
            var td = tr.children();
        
            // tr.text()는 클릭된 Row 즉 tr에 있는 모든 값을 가져온다.
            console.log("클릭한 Row의 모든 데이터 : "+tr.text());
        
            // 반복문을 이용해서 배열에 값을 담아 사용할 수 도 있다.
            td.each(function(i){
                tdArr.push(td.eq(i).text());
            });
        
            console.log("배열에 담긴 값 : "+tdArr);
        
            // td.eq(index)를 통해 값을 가져올 수도 있다.
            var no = td.eq(0).text();
            var userid = td.eq(1).text();
            var name = td.eq(2).text();
            var date = td.eq(3).text();
            var count = td.eq(4).text();
            var cmid = td.eq(5).text();
        
            str +=	" * 클릭된 Row의 td값 = No. : <font color='red'>" + no + "</font>" +
                    ", 제목 : <font color='red'>" + userid + "</font>" +
                    ", 게시자 : <font color='red'>" + name + "</font>" +
                    ", 날짜 : <font color='red'>" + date + "</font>" +
                    ", 조회수 : <font color='red'>" + count + "</font>" +
                    ", 키값 : <font color='red'>" + cmid + "</font>";  //hidden 으로 가지고있음.		
        
            $("#ex1_Result1").html(" * 클릭한 Row의 모든 데이터 = " + tr.text());		
            $("#ex1_Result2").html(str);
    
            
            //상세보기 페이지로 이동.
            Common.Dialog.confirm({
                content: '해당 노래['+userid+']의 상세보기로 이동하시겠습니까?'
                ,ok: function(){
                    console.log('확인 클릭'); 
                     $(location).attr('href', '#/ccmDetail?cmid=1');
                    //$(location).attr('href', '#/ccmDetail'); 
                    /* $.ajax({
                         url: "#/ccmDetail",
                         type: "get", 
                         dataType: "json",
                         success: (responseData) => {
                             console.log('ccmDetail이동 성공');
                         },
                         error: (xhr, status, error) => {
                             console.log(error);
                             console.log('ccmDetail이동 error');
                             alert(error);
                         }  
                     }); */

                    /*  $.ajax({

                        type: 'POST',
                        url: '/#'+'/ccmDetail',
                        async:true,
                        data: "",
                        contentType:"application/x-www-form-urlencoded; charset=UTF-8",
                        success: function(data) {
                            console.log('ccmDetail이동 성공');
                        
                        },
                        error: function(request, status, error) {
                            alert(error); 
                        }
                    }); */
                } 
            }); 
           
    });
});  


