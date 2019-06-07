$(document).ready(function() {
   
   
    $("#ccmReg").click(() => {
        
        //제목
        let sTitle = $("#title").val();
        //가수
        let sSinger = $("#singer").val();
        //가사
        let sLyrics = $("#lyrics").val();
        //내용
        let sContent = $("#content").val();

        let sCmId = "t0003" ; //임의 id부여 차후 채번모듈추가예정.
        console.log(sTitle);
        //validation check

        if(sTitle === "") {
            alert("제목을 입력해주세요.");
            $("#title").focus();
            return false;
        }
        if(sSinger === "") {
            alert("가수를 입력해주세요.");
            $("#singer").focus();
            return false;
        }
        if(sContent === "") {
            alert("내용을 입력해주세요.");
            $("#content").focus();
            return false;
        }
        
        $.ajax({
            
            url: "http://localhost/api/ccm/ccmReg", //등록 
            type: "post",
            dataType: "json",
            data:{},
            /* data:{"CM_ID":sCmId
                 ,"CM_TITLE":sTitle
                 ,"CM_LYRICS":sLyrics
                 ,"CM_CONTENT":sContent 
                 ,"CM_SINGER":sSinger
                 ,"CM_IMAGE":""
                 ,"CM_SONG":""
                 ,"CM_THEME":""
                 ,"CM_LOOKUP_COUNT":""
                 ,"CM_USER":""
                 ,"PC_DT":""
                 ,"FST_PC_DT":""
                 ,"DEL_YN":""
                }, */
          
            success: (responseData) => {
                let error = responseData.Error;
                console.log(responseData.data);
                if(error === false) { // 성공했다면
                    alert("회원가입에 성공했습니다.");
                    $(location).attr('href', '#/');
                }
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    });
});