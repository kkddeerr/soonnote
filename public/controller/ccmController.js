$(document).ready(function() {
    
    /* $.ajax({
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

    $("#loc_num").change(() => {
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
    }); */
    
    
    $.ajax({
       // url: "http://222.117.225.28:8071/api/user/getAllLocation",
        //url: "http://222.117.225.28:8071/api/ccm/getCCMList",
        url: "http://localhost:8071/api/ccm/getCCMList",
        type: "get", 
        dataType: "json",
        success: (responseData) => {
            
            console.log('조회 성공');
            let data = responseData.data;
            for (let i = 0; i < data.length; i++) {
                //let option = $("<option value='"+data[i].CM_ID+"'>"+data[i].CM_TITLE+"</option>");
                let option = $(`<tr>
                <td>`+ Number(i+1) +`</td> 
                <td>`+data[i].CM_TITLE+`</td>
                <td>`+data[i].CM_USER+`</td>
                <td>`+data[i].PC_DT+`</td>
                <td>`+data[i].CM_LOOKUP_COUNT+`</td>
            </tr>`) /* 순번,제목,작성자,날짜,조회수 */
                
                $("#ccmlist").append(option); 
            } 
        },
        error: (xhr, status, error) => {
            console.log(error);
            console.log('gogo error');
            alert(error);
        }  
    });

    $("#regCcm").click(() => { 
        $(location).attr('href', '#/ccmAdd');
    } );
});  

