$(document).ready(function() {

    
    //수정작업시 변경여부 확인.
    let bUpdateYn = false;
    
    let cmId = $('#cmId').text();
    console.log("받아온 키값 :" +cmId);
    $.ajax({
  
         //url: "http://222.117.225.28:8071/api/ccm/getCCMDetail",
         url: "http://localhost:8071/api/ccm/getCCMDetail",
         type: "get", 
         dataType: "json",
         data: {"cmId":cmId},
         success: (responseData) => {
             
             console.log('getCCMDetail 조회 성공');
             let data = responseData.data;
             $('#title').val(data[0].CM_TITLE);
             $('#user').val(data[0].CM_USER);
             $('#singer').val(data[0].CM_SINGER);
             $('#lyrics').val(data[0].CM_LYRICS);
             $('#content').val(data[0].CM_CONTENT);


             console.log(data[0]);  
         },
         error: (xhr, status, error) => {
             console.log(error);
             console.log('getCCMDetail error');
             alert(error); 
         }   
     });
    
     $(".form-control").change(() => {
        bUpdateYn = true;
    });
     //수정버튼 onclick
     $("#update").click(() => {
        
        //제목
        let sTitle = $("#title").val();
        //가수
        let sSinger = $("#singer").val();
        //가사
        let sLyrics = $("#lyrics").val();
        //내용
        let sContent = $("#content").val();
        //작성자 
        let sUser = $("#user").val();

        let sCmId = $("#cmId").text(); // ccmDetail 페이지 상단 h1 태그값.
        //validation check

        

        if(sTitle === "") {
            alert("제목을 입력해주세요.");
            $("#title").focus(); 
            return false;
        }
        if(sContent === "") {
            alert("내용을 입력해주세요.");
            $("#content").focus();
            return false;
        } 
        
        if(!bUpdateYn){
            alert('변경사항이 존재하지 않습니다.');
            return;
        }
        //상세보기 페이지로 이동.
        Common.Dialog.confirm({
            content: '해당 노래['+sTitle+']를 수정하시겠습니까?'
            ,ok: function(){
                console.log('확인 클릭'); 
                $.ajax({
                    
                    url: "http://localhost:8071/api/ccm/ccmUdate", //수정
                    type: "post",
                    dataType: "json",
                    //data:{},
                    data:{"CM_ID":sCmId
                        ,"CM_TITLE":sTitle
                        ,"CM_LYRICS":sLyrics
                        ,"CM_CONTENT":sContent 
                        ,"CM_SINGER":sSinger
                        ,"CM_IMAGE":""
                        ,"CM_SONG":""
                        ,"CM_THEME":""
                        ,"CM_LOOKUP_COUNT":""
                        ,"CM_USER":sUser
                        ,"PC_DT":""
                        ,"FST_PC_DT":""
                        ,"DEL_YN":"N"
                        },
                
                    success: (responseData) => {
                        let error = responseData.Error;
                        console.log(responseData.data);
                        if(error === false) { // 성공했다면
                            alert("수정완료");
                            //$(location).attr('href', '#/ccmDetail/'+sCmId);
                        }
                    },
                    error: (xhr, status, error) => {
                        console.log(error);
                    }
                });              
                
            } 
        }); 

        

    });
    //삭제버튼 onclick
    $("#delete").click(() => {  
        
        //제목
        let sTitle = $("#title").val();
        //가수
        let sSinger = $("#singer").val();
        //가사
        let sLyrics = $("#lyrics").val();
        //내용
        let sContent = $("#content").val();
        //작성자
        let sUser = $("#user").val();

        let sCmId = $("#cmId").text(); // ccmDetail 페이지 상단 h1 태그값.
        
        //validation check
        Common.Dialog.confirm({
            content: '해당 노래['+sTitle+']를 삭제하시겠습니까?'
            ,ok: function(){
                console.log('확인 클릭'); 
                $.ajax({
                    
                    url: "http://localhost:8071/api/ccm/ccmDelete", //수정
                    type: "post",
                    dataType: "json",

                    data:{"CM_ID":sCmId
                        },
                
                    success: (responseData) => {
                        let error = responseData.Error;
                        console.log(responseData.data);
                        if(error === false) { // 성공했다면
                            alert("삭제완료");
                            $(location).attr('href', '#/ccm');
                        }
                    },
                    error: (xhr, status, error) => {
                        console.log(error);
                    }
                });   
                 
                
            } 
        }); 


    });
     //목록보기 버튼 onclick
     $("#showList").click(() => {  
        $(location).attr('href', '#/ccm');
    });
});

