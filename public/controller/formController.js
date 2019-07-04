$("#saveButton").click(() => {
    let brdwriter = $("#brdwriter").val();
    let brdtitle = $("#brdtitle").val();
    let brdmemo = $("#brdmemo").val();
    
    $.ajax({
        url: "http://localhost:8071/api/board/boardReg",
        type: "post",
        dataType: "json",
        data: {"BOARD_TITLE":brdwriter, "BOARD_WRITER":brdtitle, "BOARD_CONTENT":brdmemo },
        success: (responseData) => {
            console.log("저장성공");
            $(location).attr('href', '#/board');
        },
        error: (xhr, status, error) => {
            console.log(error);
        }
    });
} );