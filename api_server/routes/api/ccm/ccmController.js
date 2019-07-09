var Youtube = require("youtube-node")
const eventListener = require('./../../../events/eventIndex');
const querys = require('./../../../apiServerQuerys');
const commonModule = require('./../../../modules/commonModule');
const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
 
const getHtml = async (sUrl) => {
    try {
      return await axios.get(sUrl);
    } catch (error) {
      console.error(error);
    }
  };

//var Youtube = require('./../../../events/youtube-node'); 
/**
 * Join API
 * 사용자 (가입) 관련 API
 * @param req 
 * @param res
 */

/**
 * 모든 CCMLIST 조회
 * @returns json
 */
//exports.getAllLocation = (req, res) => {
exports.getCCMList = (req, res) => {
  
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getCCMList API Request"); 

    pool.query(querys.getCCMList, (err, rows) => {  
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}

/** 
 * ccm게시판 등록
 * @param POST
 */
exports.ccmReg = (req, res) => {
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("ccmReg API Request"); 
    console.log(req.body); 
    // 쿼리 prepared statement
    let value = [];
    value.push(req.body.CM_ID);
    value.push(req.body.CM_TITLE);
    value.push(req.body.CM_LYRICS);
    value.push(req.body.CM_CONTENT);
    value.push(req.body.CM_SINGER);
    value.push(req.body.CM_IMAGE);
    value.push(req.body.CM_SONG);
    value.push(req.body.CM_THEME);
    value.push(req.body.CM_USER);

    pool.query(querys.insertCCMList, value, (err, rows) => {
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}
/** 
 * ccm게시판 수정
 * @param POST
 */
exports.ccmUdate = (req, res) => {
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("ccmUdate API Request"); 
    console.log(req.body);
    // 쿼리 prepared statement
    let value = [];
   
    value.push(req.body.CM_TITLE);
    value.push(req.body.CM_LYRICS);
    value.push(req.body.CM_CONTENT);
    value.push(req.body.CM_SINGER);
    value.push(req.body.CM_SONG);
    //value.push(req.body.CM_THEME);
    value.push(req.body.CM_USER);
    value.push(req.body.CM_ID);

    pool.query(querys.updateCCMList, value, (err, rows) => {
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}
//ccmDelete
/** 
 * ccm게시판 삭제
 * @param POST
 */
exports.ccmDelete = (req, res) => {
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("ccmDelete API Request"); 
    console.log(req.body);
    // 쿼리 prepared statement
    let value = [];
    value.push(req.body.CM_ID);
    pool.query(querys.deleteCCMList, value, (err, rows) => {
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}



//getNewCcmKey

/**
 * CCMLIST 입력전 기존 마지막 키값 조회.
 * @returns json
 */
exports.getNewCcmKey = (req, res) => {

    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getNewCcmKey API Request"); 

    pool.query(querys.getNewCcmKey, (err, rows) => {  
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}

//getCCMDetail
/**
 * CCM 상세조회.
 * @returns json
 */
exports.getCCMDetail = (req, res) => {
  
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getCCMDetail API Request"); 
    //쿼리 조건 절 셋팅
    let value = [];
    value.push(req.query.cmId); 
    pool.query(querys.getCCMDetail, value, (err, rows) => {  
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}


exports.getYoutubeLink = (req, res) => {
    
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("getCCMDetail API Request"); 
    let value = [];
    let sSrchWord = req.query.word;
    console.log(sSrchWord);
    
    //youtube 조회
    var youtube = new Youtube();

    var word = sSrchWord; // 검색어 지정
    var limit = 3;  // 출력 갯수
    var items = [];
    youtube.setKey('AIzaSyAJmuUMnC_cNACs64slkWn8ZFgSjWMLZYU'); // API 키 입력

    //// 검색 옵션 시작
    youtube.addParam('order', 'relevance'); // 관련도 순으로 정렬
    youtube.addParam('type', 'video');   // 타입 지정
    //youtube.addParam('videoLicense', 'creativeCommon'); // 크리에이티브 커먼즈 아이템만 불러옴
    //// 검색 옵션 끝

    youtube.search(word, limit, function (err, result) { // 검색 실행
        if (err) { console.log(err); return; } // 에러일 경우 에러공지하고 빠져나감

        console.log(JSON.stringify(result, null, 2)); // 받아온 전체 리스트 출력

        items = result["items"]; // 결과 중 items 항목만 가져옴
        for (var i in items) { 
            var it = items[i];
            var title = it["snippet"]["title"];
            var video_id = it["id"]["videoId"];
            var url = "https://www.youtube.com/watch?v=" + video_id;
            console.log("제목 : " + title);
            console.log("URL : " + url);
            console.log("-----------");
           
        }
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(items);

        //결과값 출력;
        pool.query(querys.getDual, value, (err, rows) => {  
            if(err) {
                commonModule.errResultJSON(err, res);
            } else {
                res.json({
                    "Error" : false,
                    "Message" : "Success",
                    "data" : items
                });
            }
        });
    });  
}

exports.getLyric = (req, res) => {
    
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    let value = [];     
    let sUrl = "https://www.yna.co.kr/sports/all";
    getHtml(sUrl)
    .then(html => {
      let ulList = [];
      const $ = cheerio.load(html.data);
      const $bodyList = $("div.headline-list ul").children("li.section02");
  
      $bodyList.each(function(i, elem) {
        ulList[i] = {
            title: $(this).find('strong.news-tl a').text(),
            url: $(this).find('strong.news-tl a').attr('href'),
            image_url: $(this).find('p.poto a img').attr('src'),
            image_alt: $(this).find('p.poto a img').attr('alt'),
            summary: $(this).find('p.lead').text().slice(0, -11),
            date: $(this).find('span.p-time').text()
        };
      });
  
      const data = ulList.filter(n => n.title);
      return data;
    })
    .then(res => log(res));


        //결과값 출력;
        pool.query(querys.getDual, value, (err, rows) => {  
            if(err) {
                commonModule.errResultJSON(err, res);
            } else {
                res.json({
                    "Error" : false,
                    "Message" : "Success",
                    "data" : ''
                });
            }
        });

}


/** 
 * ccm게시판 수정
 * @param POST
 */
exports.updLookupCnt = (req, res) => {
    let pool = require('./../../../DBConnect/mariaDBPool').pool;
    console.log("updLookupCnt API Request"); 
    console.log(req.body);
    // 쿼리 prepared statement
    let value = [];
    value.push(req.body.CM_ID);

    pool.query(querys.updLookupCnt, value, (err, rows) => {
        if(err) {
            commonModule.errResultJSON(err, res);
        } else {
            res.json({
                "Error" : false,
                "Message" : "Success",
                "data" : rows
            });
        }
    });
}