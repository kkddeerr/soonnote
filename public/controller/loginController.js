/**
 * login.html Controller
*/
function check() {
    var jwt;

    $.ajax({
        url: "http://localhost:8091/getsession",
        type: "get",
        dataType: "json",
        async:false,
        success: (responseData) => {
            if(responseData.Message === "Success") {
                jwt = responseData.data;
            } else {
                console.log(responseData.data);
            }
        },
        error: (xhr, status, error) => {
            console.log(error);
        }
    });

    $.ajax({
        // url: "http://222.117.225.28:8071/api/user/login",
        url: "http://localhost:8071/api/user/loginCheck",
        type: "post",
        dataType: "json",
        data: {"jwt":jwt},
        success: (responseData) => {
            if(responseData.data !== false) {
                alert(responseData.data.user_id+"님 안녕?");
                $(location).attr("href", "/");
            }
        },
        error: (xhr, status, error) => {
            console.log(error);
        }
    });
}

jQuery.readyWait++;
check();
jQuery.ready( true );

$(document).ready(function() {
    // var jwt;

    // $.ajax({
    //     url: "http://localhost:8091/getsession",
    //     type: "get",
    //     dataType: "json",
    //     async:false,
    //     success: (responseData) => {
    //         if(responseData.Message === "Success") {
    //             jwt = responseData.data;
    //         } else {
    //             console.log(responseData.data);
    //         }
    //     },
    //     error: (xhr, status, error) => {
    //         console.log(error);
    //     }
    // });

    // $.ajax({
    //     // url: "http://222.117.225.28:8071/api/user/login",
    //     url: "http://localhost:8071/api/user/loginCheck",
    //     type: "post",
    //     dataType: "json",
    //     data: {"jwt":jwt},
    //     success: (responseData) => {
    //         if(responseData.data !== false) {
    //             alert(responseData.data.user_id+"님 안녕?");
    //             $(location).attr("href", "/");
    //         }
    //     },
    //     error: (xhr, status, error) => {
    //         console.log(error);
    //     }
    // });

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