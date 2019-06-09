
const querys = {
    // getUserMotorStatusList : "SELECT type, warn_upper_limit, warn_lower_limit, crit_upper_limit, crit_lower_limit FROM JA_STATUS WHERE farm_num = ? AND `type` IN ('motor_temp' , 'current' , 'vib' , 'sound');",
    // insertMailInfo : "INSERT INTO JA_MAIL (email, farm_num, reg_dt, update_dt) VALUES (?, ?, ?, ?);",

    insertCalendarInfo : "insert into sn_cal (CA_ID,CA_EVDATE,CA_STEXT,CA_ERDATE,CA_AEDATE,CA_USEYN) values (?,?,?,?,?,?);",
    getCalendarData : "select A.*,(select max(CA_NUM) from soonnote.sn_cal) as CA_MAXID from soonnote.sn_cal A where CA_EVDATE like ?"

    /*******************************
     * 사용자 관련 쿼리
    *******************************/
    ,getAllLocations : "select * from sn_location;"
    ,getLocSchools : "select SC_NUM, SC_NAME from sn_schools where LOC_NUM = ?;"
    ,dupleCheck : "select count(*) as count from sn_users where USER_ID = ?;"
    ,joinUser : "insert into sn_users (USER_ID,USER_PW,USER_NAME,USER_HAK,SC_NUM,POS_NUM) values (?,password(?),?,?,?,?);"

    /*******************************
     * CCM 관련 쿼리
    *******************************/    
    ,getCCMList : `SELECT CM_ID
                       , CM_TITLE
                       , CM_SONG
                       , IFNULL(CM_LOOKUP_COUNT,0) AS CM_LOOKUP_COUNT
                       , CM_USER
                       , DATE_FORMAT(PC_DT, '%Y-%m-%d') AS PC_DT

                  FROM sn_ccm
                  WHERE 1=1
                    AND DEL_YN != 'Y';` 
    ,insertCCMList : `INSERT INTO 
                      sn_ccm( CM_ID
                            , CM_TITLE
                            , CM_LYRICS
                            , CM_CONTENT
                            , CM_SINGER
                            , CM_IMAGE
                            , CM_SONG
                            , CM_THEME
                            , CM_LOOKUP_COUNT
                            , CM_USER
                            , PC_DT
                            , FST_PC_DT
                            , DEL_YN     
                        )
                      VALUE(?,?,?,?,?,?,?,?,0,?,NOW(),NOW(),'N');`
    ,getNewCcmKey : `SELECT MAX(CM_ID) AS CM_ID
                       FROM sn_ccm;`

    /*******************************
     * 게시판 관련 쿼리
    *******************************/
   ,getBOARDList : `select * from sn_board;` 
   ,insertBOARDList : `INSERT INTO 
                            sn_board ( board_title
                            , board_writer
                            , board_memo 
                            , board_date    
                        )
                      VALUE(?,?,?,NOW());`
};

module.exports = querys;