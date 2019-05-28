$(document).ready(function() {
    $.ajax({
        url: "http://222.117.225.28:8071/api/user/getAllLocation",
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

    $("#loc_num").change(()=>{
        let selectNum = $("#loc_num option:selected").val();
        $.ajax({
            url: "http://222.117.225.28:8071/api/user/getLocSchools",
            type: "get",
            dataType: "json",
            data: {"loc_num":selectNum},
            success: (responseData) => {
                let data = responseData.data;
                for (let i = 0; i < data.length; i++) {
                    let option = $("<option value='"+data[i].SC_NUM+"'>"+data[i].SC_NAME+"</option>");
                    $("#sn_code").append(option);
                }
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    });

    $("#dupleCheck").click(()=>{
        let checkID = $("#user_id").val();
        if(checkID === "") {
            alert("아이디를 입력해주세요.");
            $("#user_id").focus();
            return false;
        }

        $.ajax({
            url: "http://222.117.225.28:8071/api/user/dupleCheck",
            type: "get",
            dataType: "json",
            data: {"checkID":checkID},
            success: (responseData) => {
                let data = responseData.data;
                if(parseInt(data[0].count) === 0) { // 해당 아이디의 count 가 0 이라면 즉, 중복되지 않는다면
                    $("#checked").val("true");
                    alert("사용가능한 아이디입니다.");
                } else { // 해당 아이디의 count 가 0 이 아니라면 즉, 중복된다면
                    alert("중복되는 아이디입니다. 다시 입력해주세요");
                    $("#user_id").focus();
                }
            },
            error: (xhr, status, error) => {
                console.log(error);
            }
        });
    });
});