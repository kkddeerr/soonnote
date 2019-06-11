$("#saveButton").click(() => { 
    $.ajax({
        url: "http://localhost:8071/api/board/boardReg",
        type: "post",
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