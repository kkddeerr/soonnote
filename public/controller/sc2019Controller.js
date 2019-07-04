/**
 * summerConference2019.html Controller
*/

$(document).ready(function() {
    $("#appliBtn").click(()=>{
        let conf_num = $("#conf_num").val();
        $(location).attr("href", "#/conferenceRegistry");
    });
});