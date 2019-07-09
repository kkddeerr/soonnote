
const querys = {
    // getUserMotorStatusList : "SELECT type, warn_upper_limit, warn_lower_limit, crit_upper_limit, crit_lower_limit FROM JA_STATUS WHERE farm_num = ? AND `type` IN ('motor_temp' , 'current' , 'vib' , 'sound');",
    // insertMailInfo : "INSERT INTO JA_MAIL (email, farm_num, reg_dt, update_dt) VALUES (?, ?, ?, ?);",

    /*******************************
     * 달력 관련 쿼리
    *******************************/

    insertCalendarInfo : "insert into sn_cal (CA_ID,CA_EVDATE,CA_STEXT,CA_ERDATE,CA_AEDATE,CA_USEYN) values (?,?,?,?,?,?);",
    getCalendarData : "select A.*,(select max(CA_NUM) from soonnote.sn_cal) as CA_MAXID from soonnote.sn_cal A where CA_USEYN ='Y' and CA_EVDATE like ?",
    deleteCalendarData : "update sn_cal set CA_USEYN = 'N' where CA_NUM = ?"
    //select @rownum:=@rownum+1 as CA_NUM,A.*,(select max(CA_NUM) from soonnote.sn_cal) as maxid from soonnote.sn_cal A, 
    //(SELECT @rownum:=0) B
    //where CA_ID ="kderr2791" and CA_USEYN ='Y' and CA_EVDATE like '20190%';

    /*******************************
     * 사용자 관련 쿼리
    *******************************/
    ,getAllLocations : "select * from sn_location;"
    ,getLocSchools : "select SC_NUM, SC_NAME from sn_schools where LOC_NUM = ?;"
    ,dupleCheck : "select count(*) as count from sn_users where USER_ID = ?;"
    ,joinUser : "insert into sn_users (USER_ID,USER_PW,USER_NAME,USER_HAK,SC_NUM,POS_NUM) values (?,password(?),?,?,?,?);"
    ,login : "select USER_ID, USER_NAME, SC_NUM, POS_NUM from sn_users where USER_ID=? and USER_PW=password(?);"

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
    ,updateCCMList: `UPDATE sn_ccm 
                        SET CM_TITLE = ?
                          , CM_LYRICS = ?
                          , CM_CONTENT = ?
                          , CM_SINGER = ?
                          , CM_SONG = ?
                          , CM_USER = ?
                          , PC_DT = NOW()     
                      WHERE CM_ID = ? 
                        AND DEL_YN != 'Y';
                    `
    ,deleteCCMList: `DELETE FROM sn_ccm
                     WHERE 1=1
                       AND CM_ID = ? ;
                    `

    ,getNewCcmKey : `SELECT MAX(CM_ID) AS CM_ID
                       FROM sn_ccm;`
    ,getCCMDetail : `SELECT CM_ID
                          , CM_TITLE
                          , CM_LYRICS
                          , CM_CONTENT
                          , CM_SINGER
                          , CM_IMAGE
                          , CM_SONG
                          , CM_THEME
                          , IFNULL(CM_LOOKUP_COUNT,0) AS CM_LOOKUP_COUNT
                          , CM_USER
                          , DATE_FORMAT(PC_DT, '%Y-%m-%d') AS PC_DT
                          , DATE_FORMAT(FST_PC_DT, '%Y-%m-%d') AS FST_PC_DT

                      FROM sn_ccm
                      WHERE 1=1
                        AND CM_ID = ?
                        AND DEL_YN != 'Y';   
                    `
    ,getDual : `SELECT 1 FROM DUAL;`
    
    /*******************************
     * 게시판 관련 쿼리
    *******************************/
   ,getBOARDList : `select * from sn_board;` 
   ,insertBOARDList : `INSERT INTO 
                            sn_board ( BOARD_TITLE
                            , BOARD_WRITER
                            , BOARD_CONTENT 
                            , BOARD_DATE    
                        )
                      VALUE(?,?,?,NOW());`
    ,getBoardDetail : ` SELECT BOARD_NO
                        , BOARD_TITLE
                        , BOARD_WRITER
                        , BOARD_CONTENT
                        FROM sn_board
                        WHERE BOARD_NO = ?;`
    ,updateBoard: `UPDATE sn_board 
                        SET BOARD_TITLE = ?
                          , BOARD_WRITER = ?
                          , BOARD_CONTENT = ?
                          , BOARD_DATE = NOW()     
                      WHERE BOARD_NO = ?;`
    ,deleteBoard: `DELETE FROM sn_board
                     WHERE BOARD_NO = ? ;`

    /*******************************
     * 수련회 관련 쿼리
    *******************************/
   ,checkRegistryID : "select count(*) as count from sn_conference_applicant where CONF_NO=? and APP_ID=?;"
   ,checkRegistryPhone : "select count(*) as count from sn_conference_applicant where CONF_NO=? and APP_PHONE=?;"
   ,confRegistry : "insert into sn_conference_applicant (CONF_NO, APP_ID, APP_NAME, APP_PHONE, SC_NUM) values (?, ?, ?, ?, ?);"
}; 

module.exports = querys;