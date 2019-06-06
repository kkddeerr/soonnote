$("#joinSubmitBtn").click(() => { 
    $.ajax({
        url: "http://222.117.225.28:8071/api/user/joinUser",
        type: "get",
        dataType: "json",
        data: {"brdwriter":brdwriter, "brdtitle":brdtitle, "brdmemo":brdmemo },
        success: (responseData) => {
            $(location).attr('href', '#/board');
        },
        error: (xhr, status, error) => {
            console.log(error);
        }
    });
} );