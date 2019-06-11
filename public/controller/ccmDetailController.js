$(document).ready(function() {

    let cmId = $('#cmId').text();
    console.log("받아온 키값 :" +cmId);
    $.ajax({
  
         //url: "http://222.117.225.28:8071/api/ccm/getCCMDetail",
         url: "http://localhost:8071/api/ccm/getCCMDetail",
         type: "get", 
         dataType: "json",
         data: {"cmId":cmId},
         success: (responseData) => {
             
             console.log('getCCMDetail 조회 성공');
             let data = responseData.data;
             $('#title').val(data[0].CM_TITLE);
             $('#user').val(data[0].CM_USER);
             $('#singer').val(data[0].CM_SINGER);
             $('#lyrics').val(data[0].CM_LYRICS);
             $('#content').val(data[0].CM_CONTENT);


             console.log(data[0]);  
         },
         error: (xhr, status, error) => {
             console.log(error);
             console.log('getCCMDetail error');
             alert(error); 
         }   
     });
    //ajax 조회
});  

