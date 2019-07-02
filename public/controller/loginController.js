/**
 * login.html Controller
*/

$(document).ready(function() {
    $("#loginBtn").click(() => {
        let user_id = $("#user_id").val();

        if(user_id === "") {
            alert("아이디를 입력해주세요.");
            $("#user_id").focus();
            return false;
        }

        let user_pw = $("#user_pw").val();

        if(user_pw === "") {
            alert("비밀번호를 입력해주세요.");
            $("#user_pw").focus();
            return false;
        }

        $.ajax({
            // url: "http://222.117.225.28:8071/api/user/login",
            url: "http://localhost:8071/api/user/login",
            type: "post",
            dataType: "json",
            data: {"user_id":user_id, "user_pw":user_pw},
            success: (responseData) => {
                let message = responseData.Message;
                if(message === 'Success') {
                    let jwtoken = responseData.data;

                    $.ajax({
                        url: "http://localhost:8091/setsession",
                        type: "post",
                        dataType: "json",
                        data: {"jwtoken":jwtoken},
                        success: (responseData) => {
                            if(responseData.Message === "Success") {
                                alert("로그인에 성공했습니다.");
                                $(location).attr("href", "/");
                            }
                        },
                        error: (xhr, status, error) => {
                            console.log(error);
                        }
                    });
                }
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    });
});