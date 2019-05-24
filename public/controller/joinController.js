$(document).ready(function() {
    $.ajax({
        url: "222.117.225.28:8071/api/user/getAllLocation",
        type: "get",
        dataType: "json",
        success: (responseData) => {
            let data = responseData['data'];
            for (let i = 0; i < data.length; i++) {
                let option = $(`<option value="{data[i]['LOC_NUM']}">{data[i]['LOC_NAME']}</option>`);
                $("#loc_num").append(option);
            }
        },
        error: (e) => {
            console.log(e);
            alert(e);
        }
    });

    $("#loc_num").change(()=>{
        let selectNum = $("#loc_num option:selected").val();
        $.ajax({
            url: "222.117.225.28:8071/api/user/getLocSchools",
            type: "get",
            dataType: "json",
            data: {"loc_num":selectNum},
            success: (responseData) => {
                let data = responseData['data'];
                for (let i = 0; i < data.length; i++) {
                    let option = $(`<option value="{data[i]['SC_NUM']}">{data[i]['SC_NAME']}</option>`);
                    $("#sn_code").append(option);
                }
            },
            error: (e) => {
                console.log(e['message']);
                alert(e['message']);
            }
        });
    });
});