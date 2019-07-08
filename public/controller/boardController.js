$(document).ready(function(){
    $.ajax({
        url: "http://localhost:8071/api/board/getBoardList",
        type: "get",
        dataType: "json",
        success: (responseData) => {
            let data = responseData.data;
            for (let i = 0; i < data.length; i++) {
                let option = $("<tr> <td>" + data[i].BOARD_NO + "</td> <td>" + data[i].BOARD_TITLE + "</td>"
                + "<td>" + data[i].BOARD_WRITER + "</td> <td>" + data[i].BOARD_DATE + "</td> </tr>");
                $("#board_list").append(option);
            }
        },
        error: (xhr, status, error) => {
            console.log(error);
            alert(error);
        }
    });

    $(document).off("click").on("click", "#table1 tbody tr", function(){ 
        // 테이블의 Row 클릭시 값 가져오기
        
            // 현재 클릭된 Row(<tr>)
            var tr = $(this);
            var td = tr.children();

            console.log("클릭한 Row의 모든 데이터 : "+tr.text());

            // td.eq(index)를 통해 값을 가져올 수도 있다.
            var BOARD_NO = td.eq(0).text();

            console.log("클릭한 Row의 모든 데이터 : "+BOARD_NO);
    
            $(location).attr('href', '#/boardDetail/'+ BOARD_NO);
    });
});

$("#write").click(() => { 
    $(location).attr('href', '#/form');
} );

