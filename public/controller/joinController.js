/**
 * join.html Controller
*/

$(document).ready(function() {
    $.ajax({
        //url: "http://222.117.225.28:8071/api/user/getAllLocation",
        url: "http://localhost:8071/api/user/getAllLocation",
        type: "get",
        dataType: "json",
        success: (responseData) => {
            let data = responseData.data;
            for (let i = 0; i < data.length; i++) {
                let option = $("<option value='"+data[i].LOC_NUM+"'>"+data[i].LOC_NAME+"</option>");
                $("#loc_num").append(option);
            }
        },
        error: (xhr, status, error) => {
            console.log(error);
            alert(error);
        }
    });

    $("#loc_num").change(() => {
        let selectNum = $("#loc_num option:selected").val();
        $.ajax({
            //url: "http://222.117.225.28:8071/api/user/getLocSchools",
            url: "http://localhost:8071/api/user/getLocSchools",
            type: "get",
            dataType: "json",
            data: {"loc_num":selectNum},
            success: (responseData) => {
                let data = responseData.data;
                for (let i = 0; i < data.length; i++) {
                    let option = $("<option value='"+data[i].SC_NUM+"'>"+data[i].SC_NAME+"</option>");
                    $("#sn_num").append(option);
                }
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    });

    $("#dupleCheck").click(() => {
        let checkID = $("#user_id").val();
        if(checkID === "") {
            alert("아이디를 입력해주세요.");
            $("#user_id").focus();
            return false;
        }

        $.ajax({
            //url: "http://222.117.225.28:8071/api/user/dupleCheck",
            url: "http://localhost:8071/api/user/dupleCheck",
            type: "get",
            dataType: "json",
            data: {"checkID":checkID},
            success: (responseData) => {
                let data = responseData.data;
                if(parseInt(data[0].count) === 0) { // 해당 아이디의 count 가 0 이라면 즉, 중복되지 않는다면
                    $("#checked").val("true");
                    alert("사용가능한 아이디입니다.");
                } else { // 해당 아이디의 count 가 0 이 아니라면 즉, 중복된다면
                    $("#checked").val("false");
                    alert("중복되는 아이디입니다. 다시 입력해주세요");
                    $("#user_id").focus();
                }
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    });

    $("#joinSubmitBtn").click(() => {
        let user_id = $("#user_id").val(); // 아이디
        if(user_id === "") {
            alert("아이디를 입력해주세요.");
            $("#user_id").focus();
            return false;
        }

        let user_pw = $("#user_pw").val(); // 비밀번호
        if(user_pw === "") {
            alert("비밀번호를 입력해주세요.");
            $("#user_pw").focus();
            return false;
        }

        let user_name = $("#user_name").val(); // 이름
        if(user_name === "") {
            alert("이름을 입력해주세요.");
            $("#user_name").focus();
            return false;
        }

        let sn_num = $("#sn_num").val(); // 학교 코드
        if($("#loc_num").val() === "" || sn_num === "") {
            alert("학교를 선택해주세요.");
            return false;
        }

        let user_hak = $("#user_hak").val(); // 학번
        if(user_hak === "") {
            alert("학번을 입력해주세요. (ex 19)");
            $("#user_hak").focus();
            return false;
        }

        if($("#checked").val() === "false") {
            alert("아이디 중복체크를 해주세요.");
            return false;
        }

        $.ajax({
            //url: "http://222.117.225.28:8071/api/user/joinUser",
            url: "http://localhost:8071/api/user/joinUser",
            type: "post",
            dataType: "json",
            data: {"user_id":user_id, "user_pw":user_pw, "user_name":user_name, "user_hak":user_hak, "sn_num":sn_num},
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