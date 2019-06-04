/*CCM목록 테이블*/
CREATE TABLE SN_CCM   
(
    CM_ID VARCHAR(32),      /*ID*/
    CM_TITLE VARCHAR(100),  /*제목*/
    CM_LYRICS VARCHAR(100), /*가사*/
    CM_CONTENT VARCHAR(100),/*내용*/
    CM_SINGER VARCHAR(32),  /*가수*/
    CM_IMAGE VARCHAR(100),  /*이미지경로*/
    CM_SONG VARCHAR(100),   /*노래경로*/
    CM_THEME VARCHAR(64),   /*테마*/
    CM_LOOKUP_COUNT INT,    /*조회수*/
    CM_USER VARCHAR(32),    /*작성자*/
    PC_DT DATE,             /*수정일자*/  
    FST_PC_DT DATETIME,     /*최조개시일자*/
    DEL_YN VARCHAR(2),      /*삭제여부*/
    
    PRIMARY KEY(CM_ID)
)

/*CCM테마 테이블*/
CREATE TABLE SN_CCM_THEME
(
    CT_NO INT,            /*순번*/
    CT_THEME VARCHAR(32), /*테마*/
    PC_DT DATE,           /*수정일자*/
    FST_PC_DT DATETIME,   /*최초개시일자*/
    DEL_YN VARCHAR(2),    /*삭제여부*/

    PRIMARY KEY(CT_NO)
)


/*좋아요 테이블*/
CREATE TABLE SN_LIKEIT
(
    LI_NO INT,          /*PK*/
    CM_ID VARCHAR(32),  /*게시물ID(CCM테이블)*/
    USER_ID VARCHAR(20) /*사용자ID(고객테이블)*/

    PRIMARY KEY(LI_NO),
    FOREIGN KEY(CM_ID) REFERENCES SN_CCM(CM_ID), 
    FOREIGN KEY(USER_ID) REFERENCES SN_USER(USER_ID)
)



/*개발자 정보공유 및 이슈 테이블*/
CREATE TABLE SN_ISSUE
(
    IS_NO INT,              /*PK*/
    IS_TITLE VARCHAR(64),   /*제목*/
    IS_CONTENT VARCHAR(100),/*내용*/
    IS_PRIORTY INT,         /*공지우선순위*/
    IS_LOOKUP_COUNT INT,    /*조회수*/
    IS_USER VARCHAR(32),    /*작성자*/
    PC_DT DATE,             /*수정일자*/  
    FST_PC_DT DATETIME,     /*최조개시일자*/
    DEL_YN VARCHAR(2),      /*삭제여부*/
    
    PRIMARY KEY(IS_NO)
)


