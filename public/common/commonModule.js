var commonModule = {};
(function() {

    let ctime;

    dateInit = () => {
        ctime = new Date();
    }

    commonModule.time = {

        getMonthDate : () => {
            dateInit();
            let cmonth = ((''+(ctime.getMonth()+1)).length === 1) ? '0'+(ctime.getMonth()+1) : (ctime.getMonth()+1);
            let cdate = ((''+ctime.getDate()).length ===1) ? '0'+ctime.getDate() : ctime.getDate();
            return cmonth + cdate;
        },

        getYear : () => {
            dateInit();
            let cyear = ctime.getFullYear();
            return cyear;
        },

        getYearMonth : () => {
            dateInit();
            let cyear = ctime.getFullYear();
            let cmonth = ((''+(ctime.getMonth()+1)).length === 1) ? '0'+(ctime.getMonth()+1) : (ctime.getMonth()+1);
            return cyear + cmonth;
        },
        
        getYearMonthDate : () => {
            dateInit();
            let cyear = ctime.getFullYear();
            let cmonth = ((''+(ctime.getMonth()+1)).length === 1) ? '0'+(ctime.getMonth()+1) : (ctime.getMonth()+1);
            let cdate = ((''+ctime.getDate()).length ===1) ? '0'+ctime.getDate() : ctime.getDate();
            return cyear + cmonth + cdate;
        },

        getFullTime : () => {
            dateInit();
            let cyear = ctime.getFullYear();
            let cmonth = ((''+(ctime.getMonth()+1)).length === 1) ? '0'+(ctime.getMonth()+1) : (ctime.getMonth()+1);
            let cdate = ((''+ctime.getDate()).length ===1) ? '0'+ctime.getDate() : ctime.getDate();
            let chour = ctime.getHours();
            let cmin = ctime.getMinutes();
            let csec = ctime.getSeconds();
            return cyear + cmonth + cdate + chour + cmin + csec;

        }

        




        
}

})();