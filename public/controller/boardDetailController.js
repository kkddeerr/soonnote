$(document).ready(function() {
    let BOARD_NO = $('#BOARD_NO').text();
    console.log("받아온 키값 :" +BOARD_NO);

    $.ajax({
         url: "http://localhost:8071/api/board/getBoardDetail",
         type: "get", 
         dataType: "json",
         data: {"BOARD_NO":BOARD_NO},
         success: (responseData) => {
             console.log('getBoardDetail 조회 성공');
             let data = responseData.data;
                let option = $("<tr> <td>" +  data[0].BOARD_TITLE + "</td> </tr>" + " <tr> <td>" + data[0].BOARD_WRITER + "</td> </tr>" + "<tr> <td>" 
                + data[0].BOARD_CONTENT + "</td> </tr>");
                $("#board_detail").append(option);
            //  $('#title').val(data[0].BOARD_TITLE);
            //  $('#writer').val(data[0].BOARD_WRITER);
            //  $('#content').val(data[0].BOARD_CONTENT);

            //  console.log(data[0]);  
         },
         error: (xhr, status, error) => {
             console.log(error);
             console.log('getBoardDetail error');
             alert(error); 
         }   
     });
    //ajax 조회
});  