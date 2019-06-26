/**
 * conferenceRegistry.html Controller
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
                    $("#sc_num").append(option);
                }
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    });

    $("#registBtn").click(() => {
        let app_name = $("#app_name").val();
        if(app_name === "") {
            alert("이름을 입력해주세요.");
            $("#app_name").focus();
            return false;
        }

        let app_phone = $("#app_phone").val();
        if(app_phone === "") {
            alert("휴대폰 번호를 입력해주세요.");
            $("#app_phone").focus();
            return false;
        }
        app_phone = app_phone.replace(/-/g, "");

        let sc_num = $("#sc_num").val(); // 학교 코드
        if($("#loc_num").val() === "" || sc_num === "") {
            alert("학교를 선택해주세요.");
            return false;
        }

        let conf_no = $("#conf_no").val();
        let app_id = $("#app_id").val();

        $.ajax({
            //url: "http://222.117.225.28:8071/api/conference/confRegistry",
            url: "http://localhost:8071/api/conference/confRegistry",
            type: "post",
            dataType: "json",
            data: {"conf_no":conf_no, "app_id":app_id, "app_name":app_name, "app_phone":app_phone, "sc_num":sc_num},
            success: (responseData) => {
                let error = responseData.Error;
                console.log(responseData.data);
                if(error === false) { // 성공했다면
                    alert("신청이 완료되었습니다.");
                    $(location).attr('href', '#/summerConference2019');
                }
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    });
});