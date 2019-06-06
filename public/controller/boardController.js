$(document).ready(function(){
    $.ajax({
        url: "http://222.117.225.28:8071/api/user/getAllLocation",
        type: "get",
        dataType: "json",
        success: (responseData) => {
            let data = responseData.data;
            for (let i = 0; i < data.length; i++) {
                let option = $("<tr> <td>" + data[i].BOARD_NUM + "</td> <td>" + data[i].BOARD_TITLE + "</td>"
                + "<td>" + data[i].BOARD_WRITER + "</td> <td>" + data[i].BOARD_DATE + "</td> <tr>");
                $("#board_list").append(option);
            }
        },
        error: (xhr, status, error) => {
            console.log(error);
            alert(error);
        }
    });
});

$("#write").click(() => { 
    $(location).attr('href', '#/form');
} );