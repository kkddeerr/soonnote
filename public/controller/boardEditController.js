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
                // let option = $("<tr> <td>" +  data[0].BOARD_TITLE + "</td> </tr>" + " <tr> <td>" + data[0].BOARD_WRITER + "</td> </tr>" + "<tr> <td>" 
                // + data[0].BOARD_CONTENT + "</td> </tr>");
                // $("#board_detail").append(option);
              //$('#title').text(data[0].BOARD_TITLE);
              $('#title').val(data[0].BOARD_TITLE);
              //$('#writer').text(data[0].BOARD_WRITER);
              $('#writer').val(data[0].BOARD_WRITER);
              //$('#content').text(data[0].BOARD_CONTENT);
              $('#content').val(data[0].BOARD_CONTENT);

            //  console.log(data[0]);  
         },
         error: (xhr, status, error) => {
             console.log(error);
             console.log('getBoardDetail error');
             alert(error); 
         }   
     });
     //수정버튼 onclick
     $("#update").click(() => {
        //제목
        let boardTitle = $("#title").val();
        //작성자
        let boardWriter = $("#writer").val();
        //내용
        let boardContent = $("#content").val();
        // boardDetail 페이지 상단 h1 태그값.
        let boardNo = $("#BOARD_NO").text(); 

        if(boardTitle === "") {
            alert("제목을 입력해주세요.");
            $("#title").focus(); 
            return false;
        }
        if(boardWriter === "") {
            alert("작성자를 입력해주세요.");
            $("#writer").focus();
            return false;
        }
        if(boardContent === "") {
            alert("내용을 입력해주세요.");
            $("#content").focus();
            return false;
        } 
        //상세보기 페이지로 이동.
        Common.Dialog.confirm({
            content: '게시글 수정하시겠습니까?'
            ,ok: function(){
                console.log('확인 클릭'); 
                $.ajax({
                    url: "http://localhost:8071/api/board/boardUpdate",
                    type: "post",
                    dataType: "json",
                    data:{"BOARD_NO":boardNo
                        ,"BOARD_TITLE":boardTitle
                        ,"BOARD_WRITER":boardWriter
                        ,"BOARD_CONTENT":boardContent 
                        },
                
                    success: (responseData) => {
                        let error = responseData.Error;
                        console.log(responseData.data);
                        if(error === false) { // 성공했다면
                            alert("수정완료");
                            $(location).attr('href', '#/board');
                        }
                    },
                    error: (xhr, status, error) => {
                        console.log(error);
                    }
                });              
            } 
        }); 
    });
    //돌아가기 버튼 onclick
    $("#backBtn").click(() => {  
        $(location).attr('href', '#/boardDetail/'+ BOARD_NO);
    });
});  