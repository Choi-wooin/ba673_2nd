var intValue	 = '0123456789';
var upperValue	 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lowerValue	 = 'abcdefghijklmnopqrstuvwxyz';
var etcValue	 = '~`!@#$%%^&*()-_=+\|[{]};:\'\",<.>/?';
var dayOfMonth	 = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

var searchOff=0, cancelOff=0, saveOff=0, insertOff=0, deleteOff=0, excelOff=0, printOff=0, titleOff=0, logoutOff=0, mymenuOff=0, hoegyekiOff=0;
var searchOn =1, cancelOn =1, saveOn =1, insertOn =1, deleteOn =1, excelOn =1, printOn =1, titleOn=1,  logoutOn=1,  mymenuOn=1,  hoegyekiOn=1; 
var searchNo=-1, cancelNo=-1, saveNo=-1, insertNo=-1, deleteNo=-1, excelNo=-1, printNo=-1, titleNo=-1, logoutNo=-1, mymenuNo=-1, hoegyekiNo=-1;

var commonWpId, commonWpNm, commonHoegyeKi, commonSdd, commonEdd, commonMagamYn, commonWorkDate, commonToday;
var commonUserId, commonUserNm, commonBugaseyul, commonUBuseoCd, commonBuseoNm, commonUserCls, commonUseCls;

var commonDataView  =	"";
var tempWorkDate    =   "";                                         //ÀÏÀÚ Àß¸øÀÔ·Â ½Ã ÀÌÀü»óÅÂ·Î º¹±ÍÇÏ±â ÇÏ±â À§ÇÑ º¯¼ö
var newMagamCls     =   "F"; //»õ·Î¿î ¿ù¸¶°¨±¸ºÐ
var popupObj = new Object();

// °øÅë dataSet°ú Tr
g5Ready(function () {
	var dsCommon = document.createElement("g5-dataset");
	var dsMagam = document.createElement("g5-dataset");
	var dsWpSetting = document.createElement("g5-dataset");
	var dsControl = document.createElement("g5-dataset");
	
	var trCommon = document.createElement("g5-tr");
	var trWpSetting = document.createElement("g5-tr");
	var trControlOut = document.createElement("g5-tr");
	var trControlIn = document.createElement("g5-tr");
	
	dsCommon.id = "DataSetBaCommon";
	dsMagam.id = "DataSetBaMagamCo";
	dsWpSetting.id = "DataSetBaSetting";
	dsControl.id = "DataSetBaControl";
	
	trCommon.id = "tr_bacommon";
	trWpSetting.id = "tr_setting_r";
	trControlOut.id = "tr_bacontrol";
	trControlIn.id = "tr_bacontrol_in";
	
	trCommon.innerHTML     = "<param name='KeyName' value='toinb_dataid4'><param name='KeyValue' value='JSP(O:DataSetBaCommon=DataSetBaCommon, O:DataSetBaMagamCo=DataSetBaMagamCo)'><param name='Action' value='/servlet/GateServlet'>";
	trWpSetting.innerHTML  = "<param name='KeyName' value='toinb_dataid4'><param name='KeyValue' value='JSP(O:DataSetBaSetting=DataSetBaSetting)'><param name='Action' value='/servlet/GateServlet'>";
	trControlOut.innerHTML = "<param name=KeyName value=toinb_dataid4><param name=KeyValue value=JSP(O:DataSetBaControl=DataSetBaControl)><param name=Action value=/servlet/GateServlet>";
	trControlIn.innerHTML  = "<param name=KeyName value=toinb_dataid4><param name=KeyValue value=JSP(I:DataSetBaControl=DataSetBaControl)><param name=Action value=/servlet/GateServlet>";
	
	document.head.appendChild(dsCommon);
	document.head.appendChild(dsMagam);
	document.head.appendChild(dsWpSetting);
	document.head.appendChild(dsControl);
	document.head.appendChild(trCommon);
	document.head.appendChild(trWpSetting);
	document.head.appendChild(trControlOut);
	document.head.appendChild(trControlIn);
	
	tr_bacommon.Parameters = "jobId=JobBaCommon";
	tr_bacommon.post();
	
	var hwamyeonId = getHwamyeonIdCo().toLowerCase();
	var endIndex = hwamyeonId.lastIndexOf("_");
	tr_bacontrol.Parameters = "jobId=JobBaSelect,daoId=getControlList:hwamyeonId="+hwamyeonId.substring(0,endIndex);
	tr_bacontrol.post();
	
	commonWpId      = DataSetBaCommon.NameValue(1,"wp_id").val;
	commonWpNm      = DataSetBaCommon.NameValue(1,"wp_nm").val;			//»ç¾÷Àå¸í      
	commonHoegyeKi	= DataSetBaCommon.NameValue(1,"hoegye_ki").val;		//È¸°è±â        
	commonSdd		= DataSetBaCommon.NameValue(1,"sdd").val;			//½ÃÀÛÀÏ        
	commonEdd		= DataSetBaCommon.NameValue(1,"edd").val;			//Á¾·áÀÏ        
	commonMagamYn	= DataSetBaCommon.NameValue(1,"magam_yn").val;		//¸¶°¨¿©ºÎ      
	commonWorkDate	= DataSetBaCommon.NameValue(1,"work_date").val;		//ÀÛ¾÷ÀÏÀÚ      
	commonToday     = DataSetBaCommon.NameValue(1,"today").val;	    	//ÀÛ¾÷ÀÏÀÚ      
	commonUserId	= DataSetBaCommon.NameValue(1,"user_id").val;	    //»ç¿ëÀÚ Id
	commonUserNm	= DataSetBaCommon.NameValue(1,"user_nm").val;	    //»ç¿ëÀÚÀÌ¸§
	commonBugaseyul = DataSetBaCommon.NameValue(1,"bugaseyul").val;		//ºÎ°¡¼¼À²
	commonUBuseoCd	= DataSetBaCommon.NameValue(1,"u_buseo_cd").val;	//¼Ò¼ÓºÎ¼­ÄÚµå
	commonBuseoNm	= DataSetBaCommon.NameValue(1,"buseo_nm").val;		//¼Ò¼ÓºÎ¼­¸í
	commonUserCls	= DataSetBaCommon.NameValue(1,"user_cls").val;		//»ç¿ëÀÚ±¸ºÐ
	commonUseCls	= DataSetBaCommon.NameValue(1,"use_cls").val;		//»ç¿ë±¸ºÐ -- ºÎ¼­º°È¸°è(20) µî ±¸ºÐ
	
	if(DataSetBaCommon.CountRow==0){
		alert(" ½Ã°£ÃÊ°ú µî Á¢¼Ó¿À·ù·Î  ·Î±×ÀÎ Á¤º¸°¡ ¾ø½À´Ï´Ù. \n\n ·Î±×ÀÎ ÇÏ½Ã±â ¹Ù¶ø´Ï´Ù. ");
		//ÆË¾÷ÀÌ¸é ÆË¾÷Ã¢ Á¾·áÇÏ°í ÆË¾÷ÀÌ ¾Æ´Ï¸é ÃÊ±âÈ­¸éÀ¸·Î ÀÌµ¿
		if(window.dialogArguments==undefined) top.document.location.href = "/logout.jsp";
		else window.close();
	}

	if(isNotNullCo(commonHoegyeKi)){
		commonDataView = commonWpNm+" "+commonHoegyeKi+"±â ("+commonSdd.substring(0,4)+"."+commonSdd.substring(4,6)+"."+commonSdd.substring(6,8)+"-"+commonEdd.substring(0,4)+"."+commonEdd.substring(4,6)+"."+commonEdd.substring(6,8)+")    ";
	}
});

// ÀÛ¾÷ÀÏÀÚ(em_work_date¿Í ÀÛ¾÷ÀÏÀÚ ÀÓ½ÃÀúÀå setting)
function setCommonDataCo(){
	if(isNullCo(parent.window.saveWorkDate)) em_work_date.Text = DataSetBaCommon.NameValue(1,"work_date").val;
	else em_work_date.Text = parent.window.saveWorkDate;
	tempWorkDate = em_work_date.Text;
}	
//¼³Á¤ data °¡Á®¿À±â
function getSettingDataCo(userId,knd,settingId,wpId){
	var tempUserId = "1";
	if(isNotNullCo(userId)) tempUserId = userId;
	var urlStr = "/servlet/GateAjax";
	var param = "?taskCls=johoeOne&johoeCls=oneSettingData&settingId="+settingId+"&tempUserId="+tempUserId;
	urlStr = urlStr  + param;
	const xhr = new XMLHttpRequest();
	xhr.open("GET", urlStr, false); 							// µ¿±â(false) ,ºñµ¿±â(true)
	xhr.setRequestHeader("x-requested-with", "XMLHttpRequest"); //Çì´õ Á¤º¸°¡ ÇÊ¿äÇÑ °æ¿ì¿¡¸¸ Ãß°¡
	xhr.send();
	if(xhr.status == 200) { 									//GET ¿äÃ»¿¡ ´ëÇØ ¼º°øÀûÀÎ°æ¿ì
	    return JSON.parse(xhr.responseText).settingData; 		// ¼­¹ö·ÎºÎÅÍ ¹ÞÀº µ¥ÀÌÅÍ
	} else {
	    console.error("¿äÃ» ½ÇÆÐ"); 							// ¿À·ù ¹ß»ý ½Ã ¸Þ½ÃÁö¸¦ Ãâ·Â
	}
}
// È¸°è±â Ã¼Å©
function checkHoegyeKiRegCo(){
	if(DataSetBaCommon.NameValue(DataSetBaCommon.RowPosition,"hoegye_ki").val=="" || DataSetBaCommon.NameValue(DataSetBaCommon.RowPosition,"hoegye_ki").val=="0" ){
		alert("ÇöÀç ³¯Â¥¿¡ ¸Â´Â È¸°è±â°¡ µî·ÏµÇÁö ¾Ê¾Ò½À´Ï´Ù. \nÈ¸°è±â¸¦ ¸ÕÀú µî·ÏÇØÁÖ¼¼¿ä.\nµî·ÏÈÄ ·Î±×¾Æ¿ô ÇÑ ÈÄ ·Î±×ÀÎÀ» ÇØÁÖ¼¼¿ä.");
		return false;
	}
	return true;
}
//¿ù¸¶°¨±¸ºÐ Ã£±â
function searchWolMagamClsCo(yyyymmdd){
	if(isNullCo(yyyymmdd)) return;
	var yyyymm = yyyymmdd.substring(0,6);
	for(var i=1; i<=DataSetBaMagamCo.CountRow; i++){
		if(yyyymm==DataSetBaMagamCo.NameValue(i, "yyyymm").val)
			newMagamCls = DataSetBaMagamCo.NameValue(i,"hoegye_magam_cls").val;
	}
}
// ButtonÁ¶Á¤
function btnControlCo(searchCls, cancelCls, saveCls, insertCls, deleteCls, excelCls, printCls){
	var e;
	try	{
		var leftBtnList  = 1;
		var rightBtnList = 1;
		var settingCls = 1;
	  subbutton.control(searchCls, cancelCls, saveCls, insertCls, deleteCls, excelCls, printCls, settingCls, leftBtnList, rightBtnList);
	}catch (e){}
}
// ÆË¾÷¿¡¼­ ButtonÁ¶Á¤
function btnControlPopupCo(searchCls, cancelCls, saveCls, insertCls, deleteCls, excelCls, printCls){
	var e;
	try	{
		var leftBtnList  = 1;
		var rightBtnList = -1;
		var settingCls = 1;
	  subbutton.control(searchCls, cancelCls, saveCls, insertCls, deleteCls, excelCls, printCls, settingCls, leftBtnList, rightBtnList);
	}catch (e){}
}
// ÇöÀç È­¸é id°¡Á®¿À±â -- control DataSet °¡Á®¿Ã¶§ ÀÌ¿ë
function getHwamyeonIdCo(){
		var startIndex = location.pathname.lastIndexOf("/")+1;
		var endIndex = location.pathname.lastIndexOf(".");
		return location.pathname.substring(startIndex,endIndex);
}
// null °ªcheck
function isNullCo(itemValid) {
	if(itemValid!=null&&typeof(itemValid)!='undefined')  itemValid = lrtrimCo(itemValid+"");
 	if( itemValid == "" || itemValid == null || typeof(itemValid)=='undefined' || itemValid == "null") 
	return true;

 	return false;
}

function isNotNullCo(itemValid) {
	if(itemValid!=null&&typeof(itemValid)!='undefined')  itemValid = lrtrimCo(itemValid+"");
 	if( itemValid == "" || itemValid == null || typeof(itemValid)=='undefined' || itemValid == "null") 
	return false;

 	return true;
}

function isNulltoZetoCo(itemValid) {
 	if(itemValid == "" || itemValid == null || typeof(itemValid)=='undefined' || itemValid == " " || itemValid == "null") 
	return 0;
 	return eval(itemValid);
}

// ¼ýÀÚ¸¦ Àý»ç( 3.8 => 3, -7.8 => -7 )
function jeolsaCo(num){
	if(commonWpId=='1023'){
		if(num>=0) return Math.floor(num*100)/100;
		else       return Math.ceil(num*100)/100;
	}else{	
		if(num>=0) return Math.floor(num);
		else       return Math.ceil(num);
	}	
}
// ¼ýÀÚÀÎ°¡¸¦ Ã¼Å©ÇÏ´Â ÇÔ¼ö1
function isIntCo(value){
    var   j;
    for(j=0;j<intValue.length;j++)
        if(value == intValue.charAt(j)) {
            return true;
        }
    return false;
}
// ÁöÁ¤µÈ °´Ã¼ÀÇ ¹®ÀÚ¿­ÀÇ ±æÀÌ¸¦ °è»êÇÏ´Â ºÎºÐ
function CheckByteCo(str){
    var strLen = str.length;
    var i, strByte;
    for(i=0, strByte=0;i<strLen;i++){
        if(str.charAt(i) >= ' ' && str.charAt(i) <= '~') strByte++;
        else strByte += 2;
    }
    return strByte;
}
// ÇØ´ç ¿ùÀÇ ¸¶Áö¸· ³¯Â¥ ±¸ÇÏ´Â ÇÔ¼ö
function lastdayCo(calyear,calmonth){
	calyear = Number(calyear);
	calmonth = Number(calmonth);
    if ((((calyear%4)==0)&&((calyear%100)!=0))||((calyear%400)==0)) dayOfMonth[1]=29;
	else dayOfMonth[1]=28;
    var nDays = dayOfMonth[calmonth-1];
    return nDays;
}
// ¿Ã¹Ù¸¥ ³¯Â¥Çü½ÄÀÎÁö check
function isDate(yyyymmdd){
    if((isNaN(yyyymmdd))||(yyyymmdd.length!=8)) return false;	//8ÀÚ¸® check	
    var year = Number(yyyymmdd.substring(0,4));
    var month = Number(yyyymmdd.substring(4,6));
    var day = Number(yyyymmdd.substring(6,8));
    if((month<1)||(month>12)) return false;						//¿ù check
    if((day<1)||(day>lastdayCo(year,month))) return false;		//ÀÏÀÚ check
    return true;
}
// Æ¯Á¤ÀÏÀÚ¿¡ ¸îÀÏ ÀüÈÄ ÀÏÀÚ ±¸ÇÏ±â
function addDateCo( inYyyymmdd, gap){
	if(gap==0) return inYyyymmdd;
    var inYyyy = inYyyymmdd.substring(0,4);
    var inMm   = inYyyymmdd.substring(4,6)-1;
    var inDd   = inYyyymmdd.substring(6,8);
	var gijunDate = new Date(inYyyy,inMm,inDd);

	gijunDate.setTime(gijunDate.getTime()+(gap*24*60*60*1000));
	var outYyyy = gijunDate.getFullYear(); 
	var outMm   = makeTwoCharCo(gijunDate.getMonth()+1);
	var outDd   = makeTwoCharCo(gijunDate.getDate());
	var rtnDate = ""+outYyyy+outMm+outDd;

	return rtnDate;
}
// yyyymmdd·Î Date °´Ã¼ ¸¸µé±â
function dateObjByYyyymmdd(yyyymmdd){
	return new Date(Number(yyyymmdd.substring(0,4)),Number(yyyymmdd.substring(4,6)-1),Number(yyyymmdd.substring(6,8)));
}
// Date°´Ã¼·Î yyyymmdd ¸¸µé±â
function yyyymmddByDateObj(dateObj){
	return	""+dateObj.getFullYear()+makeTwoCharCo(dateObj.getMonth()+1)+makeTwoCharCo(dateObj.getDate());
}	
// Æ¯Á¤ÀÏÀÚ¿¡ ¸î´Þ ÀüÈÄ ÀÏÀÚ ±¸ÇÏ±â
function addMonthCo(inYyyymmdd, gap){
	if(gap==0) return inYyyymmdd;
	var gijunDate = dateObjByYyyymmdd(inYyyymmdd)
	gijunDate.setMonth(gijunDate.getMonth()+gap);
	return yyyymmddByDateObj(gijunDate);
}
// ¿ùÀÌ³ª, ÀÏÀÌ ÇÑÀÚ¸®ÀÌ¸é µÎÀÚ¸®·Î ¸¸µå´Â ÇÔ¼ö
function makeTwoCharCo(num){
	var twoCharNum = ""+num;
	if(CheckByteCo(twoCharNum)<2) twoCharNum = "0"+twoCharNum;
	return twoCharNum;
}
// µÎ ³¯Â¥ »çÀÌÀÇ °ü°è´Â ¿Ã¹Ù¸£°Ô Á¤¸³µÇ¾î ÀÖ´Â°¡ ?
// ³¯Â¥ÀÇ ¼¼ÆÃÀÌ Text·Î¸¸ ÀÌ·ç¾îÁ® ÀÖ´Â °æ¿ì
function isValidDateWithCo(startDate, endDate, errMsg){
    var startDateValue = parseFloat(startDate.text, 8);
    var endDateValue = parseFloat(endDate.text, 8);

    if (startDateValue > endDateValue)
    {	
        alert(errMsg);
		endDate.focus();
		endDate.Text="";
        return true;
    }
    return false;
}
// keyDownCo() : Enter Key¸¦ ´­·¶´ÂÁö Check.
function keyDownCo() {
	if (event.keyCode==13) 	return true;
	else return false;
}
// '+' Å°(107)¸¦ ´©¸£¸é 1000¹è¼ö·Î ¸¸µë
function keyDownCo2(elmt){
	if(event.keyCode==107){
		if(elmt.id.indexOf("em_")>=0) elmt.Text = Number(elmt.Text) * 1000;
	}	
}	
// calendar(³¯Â¥ Á¶È¸ÇÔ¼ö) 
function calendarCo(callFunction){
	var winObj = window.showModalDialog("/js/calendar.html", window, "dialogwidth:170px;dialogheight:193px;center:0;status:0;scroll:no;help:no;");

	if(typeof(winObj) == "object") {
		em_work_date.Text = winObj.yyyymmdd;
		if(callFunction!='')eval(callFunction);
	}
}
// calendar(³¯Â¥ Á¶È¸ÇÔ¼ö) 
function calendarCo2(){
	var winObj = window.showModalDialog("/js/calendar.html", window, "dialogwidth:170px;dialogheight:193px;center:0;status:0;scroll:no;help:no;");

	if(typeof(winObj) == "object") {
		em_work_date.Text = winObj.yyyymmdd;
	}
}
// ¼ýÀÚ¿Í -¸¸ ÀÔ·Â°¡´É (KeyPressÀÌº¥Æ®½Ã È£Ãâ)
function acceptNumDash(){
	if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;
}
// ¼ýÀÚ¸¸ ÀÔ·Â°¡´É (KeyPressÀÌº¥Æ®½Ã È£Ãâ)
function acceptNum(){
	if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
}
// ¹®ÀÚ°ª ÀÔ·Â¹Þ¾Æ 3ÀÚ¸®¸¶´Ù ²Ä¸¶
function commaStr(tempStr) {
	tempStr = ""+tempStr;
 	var tmp = tempStr.split('.');
    var str = new Array();
    var v = tmp[0].replace(/,/gi,'');
    for(var i=0; i<=v.length; i++) {
        str[str.length] = v.charAt(v.length-i);
        if(i%3==0 && i!=0 && i!=v.length) {
            str[str.length] = '.';
        }
    }
    str = str.reverse().join('').replace(/\./gi,',');
    return (tmp.length==2) ? str + '.' + tmp[1] : str;
}
// ÆÄ¶ó¹ÌÅÍ°¡ nullÀÌ¸é "³Î"À» ¹ÝÈ¯ÇÏ°í,
// ""(ºó¹®ÀÚ¿­)ÀÌ¸é ""À» ¹ÝÈ¯ÇÏ¿© Ãâ·Â½Ã È®ÀÎ°¡´ÉÄÉÇÏ´Â ÇÔ¼ö.
function noValueToStrCo(str){
	if     (str==null) str = "³Î"; 
    else if(str=="")   str = "ºó";
    return str;
}
// Æ÷Ä¿½º¸¦ ÁÖ°í ¼±ÅÃÇÏ°Ô ¸¸µç´Ù.  ¿¹) setFocuCo("u_clnt_cd")
function setFocusCo(field) {
	var objFocusName = eval(field);
	objFocusName.focus();
	return false;
}

// ÄÁÆ®·Ñ ¾ÆÀÌµðÀÇ ÇØ´çÇÏ´Â ³»¿ëÀ» Áö¿ì°í Æ÷Ä¿½º ÀÌµ¿  
function initFocusCo(obj) {
	obj.focus();
	obj.value="";
}
// Æ÷Ä¿½º ÀÌµ¿ÈÄ SELECT
function initFocusSelectCo(obj) {
	obj.focus();
	obj.select();
}
//-------------------------------------------------------------------
// Àû¿ëµÈ ÆÐÅÏÀ¸·Î °ªÀÇ À¯Çô¼º Ã¼Å©ÇÏ±â
// field : this·Î ÇØ´ç°³Ã¼¸¦ ³Ñ±â¸éµÊ, patternGubun:'H,A', trimYn:°ø¹éÁ¦°Å½Ã'trim' °ø¹éÁ¦°Å ¾ÈÇÒ¶§´Â ''
// ¿¹) chkPatten(this,'H,A','trim','','etc')
// ±¸ºÐÀÚ ) ,  ex)H,A,N ÇÑ±Û,¾ËÆÄºª,¼ýÀÚ¸¸ »ç¿ë°¡´É 
// ÄÚµå )¼ýÀÚ=N,¾ËÆÄºª=A,ÇÑ±Û=H,°ø¹é=T 
// ¿Ï¼ºµÈ ÇÑ±ÛÀÌ ¾Æ´Ñ°ÍÀº Ã¼Å©°¡ ¾ÈµÊ ex) ¤±¤²¤»¤©
// trimYnÀÌ 'trim'ÀÌ¸é °ø¹éÁ¦°ÅÈÄ ÇØ´ç°³Ã¼¿¡ °ªÀ» ¸®ÅÏ
//-------------------------------------------------------------------
function chkPatten(field,patternGubun,trimYn,uplowerCase,removeEtc) {	
	var regNum			=/^[0-9]+$/;     
    var regAlpha		=/^[a-zA-Z]+$/; 
	var regHangul		=/[°¡-ÆR]/; 
	var regHangulEng	=/[°¡-ÆRa-zA-Z]/; 
    var regHangulOnly	=/^[°¡-ÆR]*$/; 
    var regHost			=/^[a-zA-Z-]+$/; 
    var regPhone		=/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/; 
    var regMail			=/^[._a-zA-Z0-9-]+@[._a-zA-Z0-9-]+\.[a-zA-Z]+$/;
	var regId			= /^[a-zA-Z]{1}[a-zA-Z0-9_-]{4,15}$/; 
    var regDate			=/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/; 
    var regDomain		=/^[.a-zA-Z0-9-]+.[a-zA-Z]+$/;

	var pattern = getMakePattern(field, patternGubun);
	var fieldValue = field.value;
	if(!fieldValue) return true; 	// °ªÀÌ ¾øÀ»¶§ ¸®ÅÏ
	// ¹®ÀÚ¿­ÀÇ ÀüÃ¼ °ø¹é¹®ÀÚ Áö¿öÁÖ°í, °ªÀ» ´Ù½Ã ¸®ÅÏ
	if(trimYn != "" || uplowerCase != ""){
		if(trimYn=="trim")			  fieldValue = trimCo(fieldValue);			//ÀüÃ¼°ø¹éÁ¦°Å
		else if(trimYn=="ltrim")      fieldValue = ltrimCo(fieldValue);			//¿ÞÂÊ°ø¹éÁ¦°Å
		else if(trimYn=="rtrim")	  fieldValue = rtrimCo(fieldValue);			//¿À¸¥ÂÊ°ø¹éÁ¦°Å
		else if(trimYn=="lrtrim")	  fieldValue = lrtrimCo(fieldValue);		//¿ÞÂÊ¿À¸¥ÂÊ°ø¹éÁ¦°Å
		if(uplowerCase=="upper")      fieldValue = upperCaseCo(fieldValue);		//´ë¹®ÀÚº¯È¯
		else if(uplowerCase=="lower") fieldValue = lowerCaseCo(fieldValue);		//¼Ò¹®ÀÚº¯È¯		
		if(removeEtc=="etc") fieldValue = etcTrimCo(fieldValue);			    //±âÅ¸Á¦°Å
		field.value = fieldValue;
	}

	pattern = eval(pattern); //°³Ã¼·Î º¯È¯ÇÏ¸ç °³Ã¼ÀÇ °ªÀ» º¯È¯
	var re = new RegExp(pattern); 
	if(!re.test(fieldValue)){ 
        var pattrenVal = "";
		var pattrenLength = "";
		var errorChar = ""
		/* ÀÌºÎºÐÀº ¼öÁ¤ - ÇÑ±º´ë·Î »ÌÀ»Áö °í·Á */
		var patternForm = patternGubun.split(",");
		for(var i=0; i<patternForm.length; i++){
		pattrenVal = patternForm[i];
		pattrenLength = pattrenVal.length;
			if(pattrenLength == 1){
				if(pattrenVal == "N") errorChar+=" ¼ýÀÚ"; 
				else if(pattrenVal == "A") errorChar+=" ¿µ¾î"; 
				else if(pattrenVal == "H") errorChar+=" ÇÑ±Û"; 
				else if(pattrenVal == "T") errorChar+=" °ø¹é"; 
			}
		}
		if(errorChar =="") errorChar = "Ç×¸ñÀÇ Çü½ÄÀÌ ¿Ã¹Ù¸£Áö ¾Ê½À´Ï´Ù.";
		else errorChar+="¸¸ ÀÔ·Â ÇÒ ¼ö ÀÖ½À´Ï´Ù.";
		alert(errorChar); 
        initFocusCo(field); 
        return false; 
    } 
	return true;
}

//-------------------------------------------------------------------
// ÆÐÅÏ¾ç½Ä¸¸µé±â ¿¹) getMakePattern(field, 'H,A')
// ±¸ºÐÀÚ ) ,  ex)H,A,N ÇÑ±Û,¾ËÆÄºª,¼ýÀÚ¸¸ »ç¿ë°¡´É 
// ÄÚµå )¼ýÀÚ=N,¾ËÆÄºª=A,ÇÑ±Û=H,°ø¹é=T 
// ¿Ï¼ºµÈ ÇÑ±ÛÀÌ ¾Æ´Ñ°ÍÀº Ã¼Å©°¡ ¾ÈµÊ ex) ¤±¤²¤»¤©
//-------------------------------------------------------------------
function getMakePattern(field, patternGubun) {	
	/* ¼ýÀÚ=N,¾ËÆÄºª=A,ÇÑ±Û=H,°ø¹é=T */
	var patternNum = "0-9"; 
    var patternAlpha ="a-zA-Z"; 
    var patternHangul ="°¡-ÆR"; 
	var patterngTrim = " ";

	var patternForm = patternGubun.split(",");
	var pattern = "/^[";
	var pattrenVal = "";
	var pattrenLength = "";
	for(var i=0; i<patternForm.length; i++){
		pattrenVal = patternForm[i];
		pattrenLength = pattrenVal.length;
		if(pattrenLength == 1){
			if(pattrenVal == "N") pattern+=patternNum; 
			else if(pattrenVal == "A") pattern+=patternAlpha; 
			else if(pattrenVal == "H") pattern+=patternHangul; 
			else if(pattrenVal == "T") pattern+=patterngTrim; 
		}else{ 
			return patternGubun;
		}
	}
	pattern += "]+$/";
	return pattern;
}

// Á¤±ÔÇ¥Çö½ÄÀ¸·Î °ø¹éÁ¦°Å
function trimCo(str) { 
	str = str.replace(/\s/g,''); 
	return str;
} 
// Á¤±ÔÇ¥Çö½ÄÀ¸·Î ¿ÞÂÊ°ø¹éÁ¦°Å
function ltrimCo(str) { 
	str = str.replace(/^\s*/,''); 
	return str;
} 
// Á¤±ÔÇ¥Çö½ÄÀ¸·Î ¿À¸¥ÂÊ°ø¹éÁ¦°Å
function rtrimCo(str) { 
	str = str.replace(/\s*$/,''); 
	return str;
} 
// Á¤±ÔÇ¥Çö½ÄÀ¸·Î ¿ÞÂÊ¿À¸¥ÂÊ°ø¹éÁ¦°Å
function lrtrimCo(str) { 
	str = str.replace(/^\s*/,'').replace(/\s*$/,'');
	return str;
} 
// ¼Ò¹®ÀÚ·Î º¯È¯
function lowerCaseCo(str) { 
	str = str.toLowerCase(); 
	return str;
} 
// ´ë¹®ÀÚ·Î º¯È¯
function upperCaseCo(str) { 
	str = str.toUpperCase(); 
	return str;
} 
// etc¸¸ Á¦°Å
function etcTrimCo(str) { 
	str = str.replace(/[\{\}\[\]\/?.,;:|\)*~`!^+<>@\#$%&\\\=\(\'\"]/g,''); 
	return str;
} 
// EnterÀ» ´©¸£¸é ´ÙÀ½Æ÷Ä¿½º·Î ÀÌµ¿(´ë¼Ò¹®ÀÚ º¯È¯ÈÄ)
function nextFocusCo(obj) {
	var keycode = event.keyCode;
	if (keycode==13) obj.focus();	
}
// changeBgColor °ªÀÇ º¯°æ¿¡ µû¸¥ Ä®¶ó º¯°æ
function changeBgColor(count){
	var bgColor = "";
	if(count%2==0) bgColor="#ffffff";
	else  bgColor="#e8e8e8";

	return bgColor;
}

// exitCo() ¾î¶² ÇüÅÂ·Î Ã¢ÀÌ ´ÝÀÌ´ÂÁö È®ÀÎ
function exitCo() {
    //°­Á¦ Ã¢´Ý±â
	if (self.screenTop > 9000) {
		location.href="/logout.jsp";	
	} 	
}
// logOut() ·Î±×¾Æ¿ôÆäÀÌÁö·Î ÀÌµ¿
function logOutCo(){
	top.location.href="/logout.jsp";		
}

//----------------------------------------------------------------------------------
// ###########################  Pop Up °ü·Ã ######################################
//----------------------------------------------------------------------------------
// ¸Þ¼¼Áö ÆË¾÷ - ÆË¾÷ÀÇ return°ªÀ» È°¿ëÇÏ·Á¸é html¿¡¼­ callbackForMsgBoxCoÀ» Á¤ÀÇÇÏ°í ±× ¾È¿¡¼­ Ã³¸®ÇØ¾ß ÇÔ.
function msgBoxPopupCo(pType,pValue){
	popupObj.type = pType;
	popupObj.value = pValue;
	if(pType==1) window.showModalDialog("/html/msgBox_5.html", popupObj, "dialogwidth:320px;dialogheight:100px;center:1;status:0;scroll:no;help:no;");
	else if(pType==2) window.showModalDialog("/html/msgBox_5.html", popupObj, "dialogwidth:320px;dialogheight:200px;center:1;status:0;scroll:no;help:no;","callbackForMsgBoxCo");
	else if(pType==3) window.showModalDialog("/html/msgBox_5.html", popupObj, "dialogwidth:270px;dialogheight:120px;center:1;status:0;scroll:no;help:no;");
	else if(pType==4) window.showModalDialog("/html/msgBox_5.html", popupObj, "dialogwidth:270px;dialogheight:120px;center:1;status:0;scroll:no;help:no;");
	else if(pType==5) window.showModalDialog("/html/msgBox_5.html", popupObj, "dialogwidth:300px;dialogheight:150px;center:1;status:0;scroll:no;help:no;");
	else if((pType==6)||(pType==7)||(pType==8)) window.showModalDialog("/html/msgBox_5.html", popupObj, "dialogwidth:360px;dialogheight:180px;center:1;status:0;scroll:no;help:no;");
	else if(pType==9) window.showModalDialog("/html/msgBox_5.html", popupObj, "dialogwidth:300px;dialogheight:150px;center:1;status:0;scroll:no;help:no;");
}
//»ç¿øÆË¾÷
function sawonPopupCo(sawonPopupParam){
	try{
		return window.showModalDialog("/html/ba760_5.html", sawonPopupParam, "dialogwidth:305px;dialogheight:470px;center:1;status:0;scroll:no;help:no;");
		//return window.showModalDialog("/html/ba902.html", sawonPopupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
    }catch(e){
      	//alert(e.message);
    	alert(" ÆË¾÷ÀÌ Â÷´ÜµÇ¾î ÀÖ´Â °Í °°½À´Ï´Ù. \n\n ÆË¾÷ Â÷´ÜÀ» ÇØÁ¦ÇØ ÁÖ¼¼¿ä! ");
    }
}
//±ÝÀ¶È¸»çÁ¤º¸ÆË¾÷(Ä«µå,ÀºÇà±¸ºÐ)
function geumyungPopupCo(popupParam){
	return winObj  = window.showModalDialog("/html/ba903_5.html", popupParam, "dialogwidth:370px;dialogheight:470Px;center:1;status:0;scroll:no;help:no;");
}
//Á÷±ÞÆË¾÷
function jikgeupPopupCo(jikgeupPopupParam){
	return window.showModalDialog("/html/ba904_5.html", jikgeupPopupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//ºÎ¼­ÆË¾÷
function buseoPopupCo(buseoPopupParam){
	return window.showModalDialog("/html/ba905_5.html", buseoPopupParam, "dialogwidth:305px;dialogheight:430px;center:1;status:0;scroll:no;help:no;");
}
//¼±ÅÃ¿ë ÆË¾÷(ºÎ¼­ µî)
function selectPopupCo(buseoPopupParam){
	return window.showModalDialog("/html/ba902_5.html", buseoPopupParam, "dialogwidth:335px;dialogheight:455px;center:1;status:0;scroll:no;help:no;");
}
//°Å·¡Ã³ÆË¾÷
function clntPopupCo(clntPopupParam){
	return window.showModalDialog("/html/ba906_5.html", clntPopupParam, "dialogwidth:325px;dialogheight:550px;center:1;status:0;scroll:no;help:no;");
}
//ÇÁ·ÎÁ§Æ®ÆË¾÷
function projPopupCo(projPopupParam){
	try{
		return window.showModalDialog("/html/ba907_5.html", projPopupParam, "dialogwidth:610px;dialogheight:700px;center:1;status:0;scroll:no;help:no;");
    }catch(e){
      	//alert(e.message);
    	alert(" ÆË¾÷ÀÌ Â÷´ÜµÇ¾î ÀÖ´Â °Í °°½À´Ï´Ù. \n\n ÆË¾÷ Â÷´ÜÀ» ÇØÁ¦ÇØ ÁÖ¼¼¿ä! ");
    }
}
//¼öÁÖÁ¤º¸ Ãß°¡µî·Ï
function sujuChugaRegPopupCo(sujuPopupParam){
	return window.showModalDialog("/html/ba909_5.html", sujuPopupParam, "dialogwidth:450px;dialogheight:350px;center:1;status:0;scroll:no;help:no;");
}
//°Å·¡Ã³º° Á¤»êÇÒ ³»¿ª
function clntNaeyeokPopupCo(naeyeokPopupParam){
	return window.showModalDialog("/html/ba920_5.html", naeyeokPopupParam, "dialogwidth:600px;dialogheight:550px;center:1;status:0;scroll:no;help:no;");
}
//Á¤»êÇÒ ³»¿ª : Æ¯Á¤°Å·¡Ã³ÀÇ Á¤»êÇÒ ÀÜ¾× µî Á¶È¸ÇÏ´Â ÆË¾÷
function naeyeokPopupCo(naeyeokPopupParam){
	return window.showModalDialog("/html/ba921_5.html", naeyeokPopupParam, "dialogwidth:400px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//Á¤»êÇÒ ¿ÜÈ­³»¿ª : ¿ÜÈ­ Á¤»êÇÒ ÀÜ¾× µî Á¶È¸ÇÏ´Â ÆË¾÷
function oehwaNaeyeokPopupCo(oehwaNaeyeokPopupParam){
	return window.showModalDialog("/html/ba922_5.html", oehwaNaeyeokPopupParam, "dialogwidth:400px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//ÀÏÀÚº° ¿©½Å³»¿ª
function yeosinNaeyeokPopupCo(naeyeokPopupParam){
	return window.showModalDialog("/html/ba927_5.html", naeyeokPopupParam, "dialogwidth:380px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//Ç×¸ñ¼öÁ¤ÆË¾÷
function itemUpdatePopupCo(popupParam){
	if(newMagamCls=="T") return; //¸¶°¨µÇ¾úÀ¸¸é ¼öÁ¤ ºÒ°¡.
	return winObj = window.showModalDialog("/html/ba941_5.html", popupParam, "dialogwidth:500px;dialogheight:220px;center:1;status:0;scroll:no;help:no;");
}
//ÀÏ¹Ý°Å·¡ºÐ°³ ¼öÁ¤
function ilbanGeoraeUpdatePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba943_5.html", popupParam, "dialogwidth:1000px;dialogheight:650px;center:1;status:0;scroll:no;help:no;");
}
//ÀÏ¹Ý°Å·¡ºÐ°³ ¼öÁ¤(ÄÁ¼³ÅÏÆ®¿ë)
function ilbanUpdateForConstPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba947_5.html", popupParam, "dialogwidth:1000px;dialogheight:650px;center:1;status:0;scroll:no;help:no;");
}
//±¸ºÐ³»¿ª °ª°ú ¼³¸í ÆË¾÷
function gubunNaeyeokPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba942_5.html", popupParam, "dialogwidth:580px;dialogheight:400px;center:1;status:0;scroll:no;help:no;");
}
//°èÁ¤ÆË¾÷
function acctPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba951_5.html", popupParam, "dialogwidth:325px;dialogheight:500px;center:1;status:0;scroll:no;help:no;");
}
//º¹¼ö°èÁ¤(º¹¼ö°èÁ¤ ¼±ÅÃ)
function multiAcctPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba950_5.html", popupParam, "dialogwidth:600px;dialogheight:520px;center:1;status:0;scroll:no;help:no;");
}
//¿ÜÈ­¸ÅÃâ¸ÅÀÔ °Å·¡
function oehwaPopupCo(oehwaPopupParam){
	return window.showModalDialog("/html/ba953_5.html", oehwaPopupParam, "dialogwidth:800px;dialogheight:470px;center:1;status:0;scroll:no;");
}
//°èÁ¤À¯Çü
function acctKndPopupCo(){
	return winObj =window.showModalDialog("ba954_5.html", window, "dialogwidth:325px;dialogheight:348px;center:1;status:0;scroll:no;help:no;");
}
//Àû¿äÁ¤º¸ÆË¾÷
function jeokyoPopupCo(jeokyoPopupParam){
	return window.showModalDialog("/html/ba955_5.html", jeokyoPopupParam, "dialogwidth:525px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//Ã¢°íÄÚµå
function changgoPopupCo(){
	return window.showModalDialog("/html/ba956_5.html", window, "dialogwidth:325px;dialogheight:350px;center:1;status:0;scroll:no;help:no;");
}
//Àç°í(Ç°¸ñ)Á¤º¸ÆË¾÷
function jaegoPopupCo(popupParam){
	return window.showModalDialog("/html/ba957_5.html", popupParam, "dialogwidth:325px;dialogheight:500px;center:1;status:0;scroll:no;help:no;");
}
//Àç°í(Ç°¸ñ)Á¤º¸ÆË¾÷2  -- ÁÖ·ÎÁ¦Á¶
function jaegoPopupCo2(popupParam){
	return window.showModalDialog("/html/ba925_5.html", popupParam, "dialogwidth:500px;dialogheight:500px;center:1;status:0;scroll:no;help:no;");
}
//Àç°íÁ¤º¸ÆË¾÷(¼öÁ¤¿ë - Àç¹ßÁÖ¼Ò¿ä·® °ü·Ã)
function jaegoUpdatePopupCo(popupParam){
	return window.showModalDialog("/html/ba928_5.html", popupParam, "dialogwidth:580px;dialogheight:600px;center:1;status:0;scroll:no;help:no;");
}
//ÀÚµ¿ÄÚµå»ý¼º
function autoCodePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba923_5.html", popupParam, "dialogwidth:500px;dialogheight:220px;center:1;status:0;scroll:no;help:no;");
}
//BOM º¹»ç
function copyBomPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba924_5.html", popupParam, "dialogwidth:500px;dialogheight:220px;center:1;status:0;scroll:no;help:no;");
}
//¼öÁÖÁ¤º¸°Ë»ö
function getSujuPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba929_5.html", popupParam, "dialogwidth:900px;dialogheight:435px;center:1;status:0;scroll:no;help:no;");
}
//¼öÁÖ³»¿ª¼±ÅÃ
function getSujuDetlCo(popupParam){
	return winObj = window.showModalDialog("/html/ba926_5.html", popupParam, "dialogwidth:900px;dialogheight:520px;center:1;status:0;scroll:no;help:no;");
}
//°ü¸®Ç×¸ñ
function mgtItemPopupCo(popupParam){
	return winObj =window.showModalDialog("ba958_5.html", popupParam, "dialogwidth:525px;dialogheight:500px;center:1;status:0;scroll:no;help:no;");
}
//Á¦Á¶Á¤º¸ÆË¾÷
function jejoPopupCo(popupParam){
	return window.showModalDialog("/html/ba959_5.html", popupParam, "dialogwidth:430px;dialogheight:400px;center:1;status:0;scroll:no;help:no;");
}
//°èÁ¤ÆË¾÷(Á¦Á¶¿ø°¡¸í¼¼)
function acctPopup2Co(popupParam){
	return winObj = window.showModalDialog("/html/ba960_5.html", popupParam, "dialogwidth:325px;dialogheight:500px;center:1;status:0;scroll:no;help:no;");
}
//°èÁ¤±âÃÊ¸í¼¼
function acctGichoMyeongsePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba961_5.html", popupParam, "dialogwidth:330px;dialogheight:320px;center:1;status:0;scroll:no;help:no;");
}
//°øÀåÄÚµå
function gongjangPopupCo(popupParam){
	return window.showModalDialog("/html/ba962_5.html", popupParam, "dialogwidth:370px;dialogheight:350px;center:1;status:0;scroll:no;help:no;");
}
//°øÁ¤ÄÚµå
function gongjeongPopupCo(popupParam){
	return window.showModalDialog("/html/ba978_5.html", popupParam, "dialogwidth:370px;dialogheight:350px;center:1;status:0;scroll:no;help:no;");
}
//ÀÛ¾÷´ÜÀ§ÆË¾÷
function taskUnitPopupCo(popupParam){
	return window.showModalDialog("/html/ba979_5.html", popupParam, "dialogwidth:370px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}

//°è»ê¼­ÆË¾÷
function gyesanseoPopupCo(popupParam){
	return window.showModalDialog("/html/ba963_5.html", popupParam, "dialogwidth:550px;dialogheight:230px;center:1;status:0;scroll:no;help:no;");
}

//¼±ÅÃÆË¾÷(¿¹, ¾Æ´Ï¿À ¼±ÅÃ)
function choosePopupCo(popupParam){
	return window.showModalDialog("/html/ba964_5.html", popupParam, "dialogwidth:420px;dialogheight:200px;center:1;status:0;scroll:no;help:no;");
}

//ÇÑ°ÇÀÇ ±Ý¾× ÀÔ·ÂÀ» À§ÇÑ popup -- ¿¹)¼öÀÔºÎ°¡¼¼ °ø±Þ°¡¾× ÀÔ·Â
function inputPopupCo(popupParam){
	return window.showModalDialog("/html/ba965_5.html", popupParam, "dialogwidth:380px;dialogheight:200px;center:1;status:0;scroll:no;help:no;");
}
//ÇÁ¸°Æ® ¼ÂÆÃ
function printPopupParamCo(printPopupParam){
	return window.showModalDialog("/html/ba967_5.html", printPopupParam, "dialogwidth:320px;dialogheight:300px;status:0;scroll:no");
}
//°Å·¡¹øÈ£¿¡ ´ëÇÑ °Å·¡³»¿ª
function perGeoraeNaeyeokParamCo(popupParam){
	return window.showModalDialog("/html/ba968_5.html", popupParam, "dialogwidth:880px;dialogheight:400px;center:1;status:0;scroll:no;help:no;");
}
//ÇÁ¸°Æ® ¼ÂÆÃ
function printPopupParamCo2(printPopupParam3){
	return window.showModalDialog("/html/ba969_5.html", printPopupParam3, "dialogwidth:320px;dialogheight:330px;status:0;scroll:no");
}
//°è»ê¼­ ¼¼ºÎµî·Ï ¼ÂÆÃ
function gyesanseoItemPopupParamCo(gyesanseoItemPopupParam){
	return window.showModalDialog("/html/ba970_5.html", gyesanseoItemPopupParam, "dialogwidth:880px;dialogheight:310px;status:0;scroll:no");
}
//°è»ê¼­ È¯ÀÔ¼¼ºÎµî·Ï ¼ÂÆÃ
function gyesanseoItemPopupParam2Co(gyesanseoItemPopupParam){
	return window.showModalDialog("/html/ba974_5.html", gyesanseoItemPopupParam, "dialogwidth:880px;dialogheight:310px;status:0;scroll:no");
}
//Àç°í ÀÔ·Â³»¿ª ºÒ·¯¿À±â
function jaegoMgtPopupParamCo(jaegoMgtPopupParam){
	return window.showModalDialog("/html/ba971_5.html", jaegoMgtPopupParam, "dialogwidth:485px;dialogheight:450px;status:0;scroll:no");
}
//ÀÔÃâ°í°ü¸®
function ipchulgoMgtPopupCo(popup3ParamCo){
	return window.showModalDialog("/html/ba972_5.html", popup3ParamCo, "dialogwidth:920px;dialogheight:520px;status:0;scroll:no");
}
//ÀüÀç°í°ü¸®
function allJaegoMgtPopupCo(popup3ParamCo){
	return window.showModalDialog("/html/ba973_5.html", popup3ParamCo, "dialogwidth:940px;dialogheight:520px;status:0;scroll:no");
}
//ÀüÀç°í¼ö·®±Ý¾×
function allJaegoQtyAmtPopupCo(popup3ParamCo){
	return window.showModalDialog("/html/ba757_5.html", popup3ParamCo, "dialogwidth:980px;dialogheight:520px;status:0;scroll:no");
}
//ÇØ´çºÐ°³³»¿ªÀÌ ÀÖ´Â °Å·¡Ã³
function bungaeClntPopupCo(popup3ParamCo){
	return window.showModalDialog("/html/ba975_5.html", popup3ParamCo, "dialogwidth:360px;dialogheight:420px;center:1;status:0;scroll:no;help:no;");
}
//°Å·¡Ã³¸í¼¼
function clnt1MyeongsePopupCo(){
	return winObj =window.showModalDialog("ba976_5.html", null, "dialogwidth:920px;dialogheight:520px;status:0;scroll:no");
}
//¹ßÁÖ¹øÈ£ popup
function baljuNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba977_5.html", popupParam, "dialogwidth:550px;dialogheight:460px;status:0;scroll:no");
}
//¼öÁÖÁ¤º¸ popup
function sujuNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba980_5.html", popupParam, "dialogwidth:485px;dialogheight:470px;status:0;scroll:no");
}
//»ý»ê°èÈ¹¹øÈ£ popup
function prodPlanNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba981_5.html", popupParam, "dialogwidth:485px;dialogheight:420px;status:0;scroll:no");
}
//»ý»êÁö½Ã¹øÈ£ popup
function prodJisiNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba982_5.html", popupParam, "dialogwidth:510px;dialogheight:420px;status:0;scroll:no");
}
//ºÒÃâ¸®½ºÆ®¹øÈ£ popup
function bulchulListNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba983_5.html", popupParam, "dialogwidth:485px;dialogheight:420px;status:0;scroll:no");
}
//ÀÔÃâ°í°ü¸®¹øÈ£ popup
function inoutMgtNoByProdJisiPopupCo(popupParam){
	return window.showModalDialog("/html/ba984_5.html", popupParam, "dialogwidth:485px;dialogheight:420px;status:0;scroll:no");
}
//Ãß°¡Ãâ°í¿äÃ»¹øÈ£  popup
function chugaAskPopupCo(popupParam){
	return window.showModalDialog("/html/ba985_5.html", popupParam, "dialogwidth:485px;dialogheight:420px;status:0;scroll:no");
}
//»ý»êÁö½Ã¹øÈ£ popup(Á¦Á¶ºÒÃâÈ­¸é¿ë)
function prodJisiForJejoBulchulPopupCo(popupParam){
	return window.showModalDialog("/html/ba986_5.html", popupParam, "dialogwidth:650px;dialogheight:450px;status:0;scroll:no");
}
//ÃâÇÏ¿äÃ»¹øÈ£ popup
function chulhaAskNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba987_5.html", popupParam, "dialogwidth:485px;dialogheight:420px;status:0;scroll:no");
}
//Áö¿ªÆË¾÷
function areaPopupCo(popupParam){
	return window.showModalDialog("/html/ba911_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//±¹°¡ÆË¾÷
function nationPopupCo(popupParam){
	return window.showModalDialog("/html/ba912_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//µµ½ÃÆË¾÷
function cityPopupCo(popupParam){
	return window.showModalDialog("/html/ba913_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//Ç×¸¸ÆË¾÷
function stationPopupCo(popupParam){
	return window.showModalDialog("/html/ba914_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//ÀÛ¾÷±×·ì
function workGroupPopupCo(popupParam){
	return window.showModalDialog("/html/ba915_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//±Ù¹«Á¶
function geunmujoPopupCo(popupParam){
	return window.showModalDialog("/html/ba916_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//±ÞÈ£
function geuphoPopupCo(popupParam){
	return window.showModalDialog("/html/ba917_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//±Þ¿©Ç×¸ñÀ¯Çü
function geupyeoItemKndPopupCo(popupParam){
	return window.showModalDialog("/html/ba918_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//±Þ¿©Ç×¸ñ
function geupyeoItemPopupCo(popupParam){
	return window.showModalDialog("/html/ba919_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//±ÙÅÂÁ¾·ù
function geuntaeKndPopupCo(popupParam){
	return window.showModalDialog("/html/ba933_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//»ó¹ú±âº»Á¤º¸
function sangbeolPopupCo(popupParam){
	return window.showModalDialog("/html/ba939_5.html", popupParam, "dialogwidth:325px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//±âÁØÀÏ
function gijunilPopupCo(popupParam){
	return window.showModalDialog("/html/ba934_5.html", popupParam, "dialogwidth:275px;dialogheight:400px;center:1;status:0;scroll:no;help:no;");
}
//¼±ÅÃ¿ù ±Þ¿© °¡Á®¿À±â
function selectMonthGeupyeoPopupCo(popupParam){
	return window.showModalDialog("/html/ba935_5.html", popupParam, "dialogwidth:540px;dialogheight:100px;center:1;status:0;scroll:no;help:no;");
}
//±³À°¹øÈ£ popup
function eduNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba937_5.html", popupParam, "dialogwidth:485px;dialogheight:420px;status:0;scroll:no");
}
//¹ß·É¹øÈ£ popup
function balryeongNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba938_5.html", popupParam, "dialogwidth:485px;dialogheight:420px;status:0;scroll:no");
}
//Áõ¸í¼­ ¹ßÇà¹øÈ£ popup
function balhaengNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba940_5.html", popupParam, "dialogwidth:485px;dialogheight:420px;status:0;scroll:no");
}
//±Þ¿©ÀÌÃ¼
function geupyeoIchePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba397_5.html", popupParam, "dialogwidth:1000px;dialogheight:600px;center:1;status:0;scroll:no;help:no;");
}
//(¼¼±Ý) °è»ê¼­ ÁöÁ¡¹ßÇà
function billJijeomPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba944_5.html", popupParam, "dialogwidth:370px;dialogheight:170px;center:1;status:0;scroll:no;help:no;");
}
//¼±ÅÃÇ°¸ñ Àç°í·®
function getSelJaegoQtyPopupCo(popupParam){
	return window.showModalDialog("/html/ba945_5.html", popupParam, "dialogwidth:660px;dialogheight:360px;status:0;scroll:no");
}
//»ç¿øÁ¶È¸(Á¾ÇÕ)
function getSawonJonghapPopupCo(popupParam){
	return window.showModalDialog("/html/ba946_5.html", popupParam, "dialogwidth:425px;dialogheight:560px;center:1;status:0;scroll:no;help:no;resizable:yes;");
}
//Á¾Àü°Å·¡Á¶È¸
function jongjeonGeoraePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba948_5.html", popupParam, "dialogwidth:950px;dialogheight:600px;center:1;status:0;scroll:no;help:no;");
}
//¼¼±Ý°è»ê¼­ Á¤º¸ÀÔ·Â 
function billInfoPopupCo(popupParam){
	return window.showModalDialog("/html/ba930_5.html", popupParam, "dialogwidth:480px;dialogheight:200px;center:1;status:0;scroll:no;help:no;");
}
//¹Ìµî·Ï °Å·¡Ã³ ÀÏ°ýµî·Ï
function ilgwalRegClntPopupCo(popupParam){
	return window.showModalDialog("/html/ba988_5.html", popupParam, "dialogwidth:570px;dialogheight:440px;center:1;status:0;scroll:no;help:no;");
}
//°³ÀÎº° ³»¿ªµî·Ï ÆË¾÷
function regNaeyeokPopupCo(popupParam){
	return window.showModalDialog("/html/ba910_5.html", popupParam, "dialogwidth:585px;dialogheight:470px;center:1;status:0;scroll:no;help:no");
}
//°Å·¡³»¿ª °èÁ¤µî·Ï
function naeyeokAcctPopupCo(projPopupParam){
	return window.showModalDialog("/html/ba990_5.html", projPopupParam, "dialogwidth:800px;dialogheight:470px;center:1;status:0;scroll:no;help:no");
}
//°áÀÇ¼­Á¤º¸
function getKyeoluiseoPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba949_5.html", popupParam, "dialogwidth:500px;dialogheight:475px;center:1;status:0;scroll:no;help:no;");
}
//°è»ê¼­ Ãß°¡Á¤º¸
function gyesanseoChugaPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba989_5.html", popupParam, "dialogwidth:500px;dialogheight:220px;center:1;status:0;scroll:no;help:no;");
}
//¼¼¸ñÆË¾÷
function semokPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba991_5.html", popupParam, "dialogwidth:325px;dialogheight:400px;center:1;status:0;scroll:no;help:no;");
}
//Á¤»êÁ¶È¸
function jeongsanJohoePopupCo(naeyeokPopupParam){
	return window.showModalDialog("/html/ba992_5.html", naeyeokPopupParam, "dialogwidth:400px;dialogheight:450px;center:1;status:0;scroll:no;help:no;");
}
//¿øÀåÁ¶È¸
function wonjangJohoePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba993_5.html", popupParam, "dialogwidth:500px;dialogheight:500px;center:1;status:0;scroll:no;help:no;");
}
//ÇÁ·ÎÁ§Æ®³»¿ª
function projNaeyeokPopupCo(popupParam){
	return window.showModalDialog("/html/ba994_5.html", popupParam, "dialogwidth:850px;dialogheight:470px;center:1;status:0;scroll:no;help:no");
}
//ÇÁ·ÎÁ§Æ® °èÁ¤³»¿ª
function projAcctNaeyeokPopupCo(popupParam){
	return window.showModalDialog("/html/ba995_5.html", popupParam, "dialogwidth:850px;dialogheight:470px;center:1;status:0;scroll:no;help:no");
}
//¹ßÁÖ¿¹Á¤¼ö·® ÀúÀå
function baljuYejeongSavePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba751_5.html", popupParam, "dialogwidth:500px;dialogheight:220px;center:1;status:0;scroll:no;help:no;");
}
//¹ßÁÖ¿¹Á¤ data
function baljuYejeongDataPopupCo(projPopupParam){
	return window.showModalDialog("/html/ba752_5.html", projPopupParam, "dialogwidth:585px;dialogheight:470px;center:1;status:0;scroll:no;help:no");
}
//¸ÅÀÔ³»¿ª
function maeipNaeyeokPopupCo(popupParam){
	return window.showModalDialog("/html/ba753_5.html", popupParam, "dialogwidth:370px;dialogheight:470px;center:1;status:0;scroll:no;help:no");
}
//¿ÜÈ­ ¸ÅÃâÈ¯ÀÔ/¸ÅÀÔÈ¯Ãâ °Å·¡
function oehwaHwanchulipPopupCo(oehwaPopupParam){
	return window.showModalDialog("/html/ba754_5.html", oehwaPopupParam, "dialogwidth:800px;dialogheight:470px;center:1;status:0;scroll:no;help:no;");
}
//¸ÅÀÔµî·ÏÆË¾÷
function maeipRegPopupCo(popupParam){
	return window.showModalDialog("/html/ba755_5.html", popupParam, "dialogwidth:500px;dialogheight:400px;center:1;status:0;scroll:no;help:no;");
}
//±¸ºÐ°ª ÆË¾÷
function gubunPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba756_5.html", popupParam, "dialogwidth:250px;dialogheight:120px;center:1;status:0;scroll:no;help:no;");
}
//¸ÅÃâÃßÁ¤
function maechulChujeongPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba758_5.html", popupParam, "dialogwidth:950px;dialogheight:280px;center:1;status:0;scroll:no;help:no;");
}
//¹ýÀÎ¼¼Á¤º¸ ÀÔ·Â
function beopinseInfoPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba759_5.html", popupParam, "dialogwidth:250px;dialogheight:140px;center:1;status:0;scroll:no;help:no;");
}
//Á¾Àü°áÀÇ¼­Á¶È¸
function jongjeonKyeoluiseoPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba761_5.html", popupParam, "dialogwidth:950px;dialogheight:600px;center:1;status:0;scroll:no;help:no;");
}

// ÄÚµå¿Í ÀÌ¸§À» ¸â¹ö·Î °®´Â °´Ã¼¸¦ »ý¼ºÇÏ´Â ÇÔ¼ö-- return°´Ã¼ »ý¼ºÀÚÇÔ¼ö
// uCode:»ç¿ëÀÚÄÚµå , name:ÀÌ¸§,  pCode:°íÀ¯ÄÚµå
function CodeNameRtnObjCo(code,name,pcode){
	this.code	= code;
	this.name	= name;
	this.pcode  = pcode;
}
// Àû¿äÁ¤º¸ return°ª °´Ã¼
function JeokyoRtnObjCo(code, name, pcode, uDrAcctCd, uCrAcctCd, drAcctNm, crAcctNm, drBalJeongCls, crBalJeongCls, juGeoraeCls){
	this.code	       = code;
	this.name	       = name;
	this.pcode	       = pcode;
	this.uDrAcctCd     = uDrAcctCd;
	this.uCrAcctCd     = uCrAcctCd;
	this.drAcctNm      = drAcctNm;
	this.crAcctNm      = crAcctNm;
	this.drBalJeongCls = drBalJeongCls;
	this.crBalJeongCls = crBalJeongCls;
	this.juGeoraeCls   = juGeoraeCls;
}
// °ü¸®Ç×¸ñ return°ª °´Ã¼
function MgtItemRtnObjCo(code,name,pcode,mgtItemKndCls,uAcctCd,acctCls) {
	this.code	       = code;   		 //»ç¿ëÀÚÄÚµå
	this.name	       = name;    		 //ÀÌ¸§
	this.pcode	       = pcode;    		 //ÄÚµå
	this.mgtItemKndCls = mgtItemKndCls;  //°ü¸®Ç×¸ñÀ¯Çü±¸ºÐ
	this.uAcctCd       = uAcctCd;      	 //°èÁ¤
	this.acctCls       = acctCls;      	 //°èÁ¤±¸ºÐ
}
// Àû¿äÁ¤º¸ popupÃ¢¿¡ Àü´ÞÇÏ´Â ÆÄ¶ó¹ÌÅÍ¸¦ ¸â¹ö·Î °®´Â °´Ã¼¸¦ »ý¼ºÇÏ´Â ÇÔ¼ö.--param°´Ã¼ »ý¼ºÀÚÇÔ¼ö
function JeokyoPopupParamCo(georaeCls,upjongCls,ipchulCls,oehwaCls, drcrCls, uAcctCd) {
	this.georaeCls	= georaeCls;   //°Å·¡±¸ºÐ
	this.upjongCls	= upjongCls;   //¾÷Á¾±¸ºÐ
	this.ipchulCls	= ipchulCls;   //ÀÔÃâ±¸ºÐ
	this.oehwaCls	= oehwaCls;    //¿ÜÈ­±¸ºÐ
	this.drcrCls    = drcrCls;     //Â÷´ë±¸ºÐ
	this.uAcctCd    = uAcctCd;     //°èÁ¤ÄÚµå(»ç¿ëÀÚ)
}
// Á¤»êÇÒ³»¿ª parameter : Á¤»êÇÒ ÀÜ¾×Á¶È¸ popupÃ¢¿¡ Àü´ÞÇÏ´Â ÆÄ¶ó¹ÌÅÍ¸¦ ¸â¹ö·Î °®´Â °´Ã¼¸¦ »ý¼ºÇÏ´Â ÇÔ¼ö.
function NaeyeokPopupParamCo(uClntCd, clntNm, uAcctCd, acctNm, workDate) {
	this.uClntCd  = uClntCd;   //°Å·¡Ã³ÄÚµå
	this.clntNm	  = clntNm;    //°Å·¡Ã³¸í
	this.uAcctCd  = uAcctCd;   //°èÁ¤ÄÚµå
	this.acctNm   = acctNm;    //°èÁ¤¸í
	this.workDate = workDate;  //ÀÛ¾÷ÀÏ
}
// Á¤»êÇÒ ¿ÜÈ­³»¿ª parameter 
function OehwaNaeyeokPopupParamCo(uClntCd, clntNm, uAcctCd, acctNm, uTonghwaCd, workDate) {
	this.uClntCd    = uClntCd;     //°Å·¡Ã³ÄÚµå
	this.clntNm	    = clntNm;      //°Å·¡Ã³¸í
	this.uAcctCd    = uAcctCd;     //°èÁ¤ÄÚµå
	this.acctNm     = acctNm;      //°èÁ¤¸í
	this.uTonghwaCd = uTonghwaCd;  //ÅëÈ­ÄÚµå
	this.workDate   = workDate;    //ÀÛ¾÷ÀÏ
}
//¿ÜÈ­(¸ÅÃâ¸ÅÀÔ)°Å·¡ popupÃ¢¿¡ Àü´ÞÇÏ´Â ÆÄ¶ó¹ÌÅÍ°´Ã¼ »ý¼ºÇÔ¼ö.--param°´Ã¼ »ý¼ºÀÚÇÔ¼ö
function OehwaPopupParamCo(georaeCls, clntCd, workDate) {
	this.georaeCls	 = georaeCls;
	this.clntCd		 = clntCd;
	this.workDate    = workDate;
}
/// °øÅë popupÃ¢¿¡ Àü´ÞÇÏ´Â ÆÄ¶ó¹ÌÅÍ°´Ã¼ »ý¼ºÇÔ¼ö.-- 1,2°³ÀÇ ±¸ºÐ°ªÀ»  popupÃ¢¿¡ Àü´Þ
function PopupParamCo(cls) {
	this.cls = cls;
}
function Popup2ParamCo(cls,cls2,cls3,cls4,cls5) {
	this.cls  = cls;
	this.cls2 = cls2;
	this.cls3 = cls3;
	this.cls4 = cls4;
	this.cls5 = cls5;
}
function Popup3ParamCo(cls,cls2,cls3) {
	this.cls  = cls;
	this.cls2 = cls2;
	this.cls3 = cls3;
}
//ÆË¾÷ Ç¥ÁØÆÄ¶ó¹ÌÅÍ °´Ã¼(¸®ÅÏ°ª »ý¼º½Ã »ç¿ë) 
//ÁÖÀÇ !! : »ç¿ëÀÚÄÚµå°¡ ÄÚµå·Î º¯°æµÇ°í °íÀ¯ÄÚµå´Â pcode·Î º¯°æ
function ObjPopupStdCo(code,ucode,name,str,num){
	this.pcode	= code;
	this.code   = ucode;
	this.name	= name;
	this.str    = str;
	this.num    = num;
}
//ÆË¾÷ °øÅë ÆÄ¶ó¹ÌÅÍ
function popupParamsCo(p1, p2, p3, p4, p5,p6,p7,p8,p9){
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;
	this.p4 = p4;
	this.p5 = p5;
	this.p6 = p6;
	this.p7 = p7;
	this.p8 = p8;
	this.p9 = p9;
}
//ÆË¾÷ÇÔ¼ö
function winPopupCo(p1, p2, p3, p4, p5,p6,p7,p8,p9){
	if(typeof(p1)=='undefined') p1 ="";
	if(typeof(p2)=='undefined') p2 ="";
	if(typeof(p3)=='undefined') p3 ="";
	if(typeof(p4)=='undefined') p4 ="";
	if(typeof(p5)=='undefined') p5 ="";

	var urlParams = "", screenParams = "";
	var popupParams  = new popupParamsCo(p1, p2, p3, p4, p5,p6,p7,p8,p9);

	//°Å·¡Ã³1(p1:ÆË¾÷±¸ºÐ, p2:°Å·¡Ã³±¸ºÐ(1), p3:¸ÅÀÔ¸ÅÃâÃ³±¸ºÐ)   
	//°èÁÂ   (p1:ÆË¾÷±¸ºÐ, p2:°Å·¡Ã³±¸ºÐ(2), p3:Çö±Ý¿¹±Ýµî ±¸ºÐ , p4:¿ÜÈ­±¸ºÐ )   
	//Ä«µå   (p1:ÆË¾÷±¸ºÐ, p2:°Å·¡Ã³±¸ºÐ(3), p3:ÁöÃâ,¸ÅÃâ¿ë±¸ºÐ)   
	//°í°´   (p1:ÆË¾÷±¸ºÐ, p2:°Å·¡Ã³±¸ºÐ(4))   
	//»ç¿ø   (p1:ÆË¾÷±¸ºÐ, p2:°Å·¡Ã³±¸ºÐ(5), p3:ÀçÁ÷,Åð»ç±¸ºÐ)   
	//ºÎ¼­   (p1:ÆË¾÷±¸ºÐ, p2:°Å·¡Ã³±¸ºÐ(6))   
	if(p1=="10"){		
		urlParams = "/html/ba932_5.html";
		screenParams = "dialogwidth:415px;dialogheight:500px;center:1;status:0;scroll:no;help:no;resizable:yes;";
	}
	return window.showModalDialog(urlParams, popupParams, screenParams);
}

//º¸°í¼­ ¼ÂÆÃ
function PrintPopupParam(detailDataSet,masterDataSet,detailCls,masterCls,landScape,marginX,marginY,bandColumn,bandSelection) {
	this.detailDataSet = detailDataSet;
	this.masterDataSet = masterDataSet;
	this.detailCls	   = detailCls;
	this.masterCls     = masterCls;
	this.landScape     = landScape;
	this.marginX       = marginX;
	this.marginY       = marginY;
	this.bandColumn    = bandColumn;
	this.bandSelection = bandSelection;
}
//º¸°í¼­ ¼ÂÆÃ ÆÄ¶ó¹ÌÅÍ
function PrintPopupParam3(datasetCls,landScape,margineX,margineY) {
	this.datasetCls = datasetCls;
	this.landScape = landScape;
	this.margineX	   = margineX;
	this.margineY     = margineY;
}
//°è»ê¼­¸í¼¼»ó¼¼
function GyesanseoItemPopupParam(gyesanseoSeq,gonggeupAmt,tax,cls) {
	this.gyesanseoSeq = gyesanseoSeq;
	this.gonggeupAmt  = gonggeupAmt;
	this.tax	      = tax;
	this.cls          = cls;
}
//Àç°í ÀÔ·Â³»¿ªºÒ·¯¿À±â
function JaegoMgtPopupParamCo(yyyymmdd,ipchulKnd) {
	this.yyyymmdd = yyyymmdd;
	this.ipchulKnd = ipchulKnd;
}
// ###########################  Pop Up °ü·Ã ³¡ ####################################

// ÆË¾÷Ã¢¿¡¼­ ³Ñ°Ü¹ÞÀº ÇÁ¸°ÅÍ¼³Á¤°ªÀ» º¸°í¼­¿¡ ¹Ý¿µ 
function printFormatCo(winObj,printName){
	if(typeof(winObj) == "object") {
			eval(printName).landScape= winObj.landScape;					//ÀÎ¼â¹æÇâ
			eval(printName).margineX=  winObj.margineX;						//ÀÎ¼â¿ÞÂÊ¿©¹é
			eval(printName).margineY=  winObj.margineY;						//ÀÎ¼â»óÀ§¿©¹é
			eval(printName).previewzoom = winObj.previewzoom;				//¹Ì¸®º¸±â¹èÀ²
			eval(printName).NumberOfCopy =winObj.numberofcopy;				//Àå¼ö
			eval(printName).paperwidth =winObj.paperWidth;					//Á¾ÀÌ°¡·Î
			eval(printName).paperlength =winObj.paperLength;				//Á¾ÀÌ±æÀÌ
			eval(printName).PrintSetupDlgFlag =winObj.printSetupDlgFlag;	//ÇÁ¸°Æ®¼³Á¤Ã¢
			printCls = winObj.printCls;										//¹Ì¸®º¸±â,ÀÎ¼â ¼±ÅÃ

			if(printCls=="preview")eval(printName).Preview();
			else if(printCls=="print")eval(printName).print();
	}
}
// Æ÷Ä¿½º ÀÌµ¿
function focusCo(obj) {
	obj.focus();
}
//enterÅ° ÀÔ·ÂÈÄ focus ÀÌµ¿
function focusAfterEnterCo(obj){
	if(event.keyCode==13) eval(obj).focus();
}

//µ¥ÀÌÅÍ¼Â¿¡ ÆÄÀÏ Ãß°¡,º¯°æ,»èÁ¦ ÇÏ±â - Ã·ºÎÆÄÀÏ µî
function setFileOnDataSetCo(code, fileControl, dataSet){
	//ÆÄÀÏ¼±ÅÃ(Ãß°¡,º¯°æ)
    if(code==2){
		fileControl.Value = "";
		fileControl.Open();
		if(isNullCo(fileControl.Value)) return;

		var strExt = fileControl.value.substring(fileControl.value.lastIndexOf(".")+1);
		if((strExt=="tif")||(strExt=="TIF")){
			alert(" tif ÆÄÀÏÀº Áö¿øÇÏÁö ¾Ê½À´Ï´Ù. \n\n ´Ù¸¥ ÀÌ¹ÌÁöÆÄÀÏÀ» ¼±ÅÃÇØÁÖ¼¼¿ä. ");
			return;
		}	
		var strFile = fileControl.value.substring(fileControl.value.lastIndexOf("\\")+1);
		dataSet.NameString(dataSet.RowPosition,"url_str").val = strFile;
		dataSet.NameValue(dataSet.RowPosition,"file_value").val = fileControl.value;
	//»èÁ¦
    }else if(code==4){
		dataSet.NameString(dataSet.RowPosition,"url_str").val = "";
		dataSet.NameValue(dataSet.RowPosition,"file_value").val = "";
	}	
}

//Ã·ºÎÆÄÀÏ ³»¿ë º¸±â(´Ù¿î·Îµå)
function showFileCo(inDateLog,dataSet){
	var mainSeq = dataSet.NameValue(dataSet.RowPosition,"kyeoluiseo_seq").val;
	var detlSeq = dataSet.NameValue(dataSet.RowPosition,"kyeoluiseo_detl_seq").val;
	var fName = dataSet.NameValue(dataSet.RowPosition,"url_str").val;
	var theUrl = "/files/kyeol/"+commonWpId+"/"+inDateLog.substring(0,4)+"/"+mainSeq+"/"+detlSeq+"/"+fName;
	var x = (screen.availWidth - 800)/2; 
	var y = (screen.availHeight - 600)/2;
	var viewStr = "width=800,height=600,toolbar=no,scroll=yes,resizable=yes,left="+x+",top="+y;
	window.open(theUrl,"",viewStr);
}
// ºÎ¼­º° È¸°è default ºÎ¼­ setting
function setDefaultBuseoCo(){
	if(commonUseCls=="20"){
		radio_sawon_buseo_cls.CodeValue = "2";
       	radio_sawon_buseo_cls.enable = false;
		txt_u_sawon_buseo_cd.value = commonUBuseoCd;
		txt_sawon_buseo_nm.value   = commonBuseoNm;
        txt_u_sawon_buseo_cd.readOnly = true;
    	txt_sawon_buseo_nm.readOnly = true;
		if(commonUserCls=="10")	btn_sawon_buseo.disabled = true;
	}
}

function setDefaultBuseo2Co(){
	if(commonUseCls=="20"){
		var dfBuseo = getSettingDataCo(commonUserId,"2000","DEFAULT_SEARCH_BUSEO",commonWpId);	//°³ÀÎº° defaultºÎ¼­(1:¼Ò¼ÓºÎ¼­,2:°ø¹é)
		if(dfBuseo=="2"){
	        txt_u_buseo_cd.value = "";
	        txt_buseo_nm.value = "";
	    }else{
	        txt_u_buseo_cd.value = commonUBuseoCd;
	        txt_buseo_nm.value = commonBuseoNm;
	    }
		if(commonUserCls=="10"){
	        txt_u_buseo_cd.readOnly = true;
        	txt_buseo_nm.readOnly = true;
		}
    }
}

//ÀÎ»ç°ü¸® °Ë»ö ¹üÀ§(1:ÀüÃ¼ 2:ºÎ¼­ 3:adminÀº ÀüÃ¼ ³ª¸ÓÁö´Â ºÎ¼­)
function setInsaSearchBeomwi(){
    var sBeomwi = getSettingDataCo("1","1000","INSA_SEARCH_BEOMWI");
    if(sBeomwi=="2"){
		luxe_u_buseo_cd.index = luxe_u_buseo_cd.IndexOfColumn("u_buseo_cd",commonUBuseoCd);
		luxe_u_buseo_cd.enable = "false";
    }else if(sBeomwi=="3"){
		luxe_u_buseo_cd.index = luxe_u_buseo_cd.IndexOfColumn("u_buseo_cd",commonUBuseoCd);
		if(commonUserCls=="10") luxe_u_buseo_cd.enable = "false";
	}
}

// F2Å° -- ÀüÃ¼ °Å·¡Ã³ ÆË¾÷
function allClntPopupCo(dataSet,sCls,uCdId,nameId){
	if((commonUseCls!="20")||(commonUserCls!="10")){
		var winObj = clntPopupCo("");
		if(typeof(winObj)=="object"){
			if(isNotNullCo(dataSet)){
				if     (sCls=='1') dataSet.NameValue(dataSet.RowPosition,"selected_bungae_seqs").val = "";
				else if(sCls=='2'){
					dataSet.NameValue(dataSet.RowPosition,"dr_selected_bungae_seqs").val = "";
					dataSet.NameValue(dataSet.RowPosition,"cr_selected_bungae_seqs").val = "";
				}
				else if(sCls=='d') dataSet.NameValue(dataSet.RowPosition,"dr_selected_bungae_seqs").val = "";
				else if(sCls=='c') dataSet.NameValue(dataSet.RowPosition,"cr_selected_bungae_seqs").val = "";
			}
			if(isNotNullCo(uCdId)){
				uCdId.value  = winObj.code;
				nameId.value = winObj.name;
				uCdId.focus();
				uCdId.blur();
			}else{
				txt_u_clnt_cd.value = winObj.code;
				txt_clnt_nm.value   = winObj.name;
				txt_u_clnt_cd.focus();
				txt_u_clnt_cd.blur();
			}
		}
	}
}

// ±Ý¾× check :  (a X b) = c ÀÎÁö check => ¿ÜÈ­ µî¿¡¼­ È°¿ë
function checkAmtCo(a, b, c){
	var d = (Number(c) - jeolsaCo(Number(a) * Number(b)));
	if((d>1)||(d<-1)){
		var rObj = msgBoxPopupCo(5,d);
		return rObj.cls;
	}else return true;
}

//¸Þ´º»ç¿ë±¸ºÐ - Æ¯Á¤ È­¸éÀ» »ç¿ëÇÒ ±ÇÇÑÀÌ ÀÖ´Â Áö check
function getMenuUseClsCo(menuId){
    DataSetBaStr.ClearData();
    tr_menu_r.Parameters = "jobId=JobBaSelect2,daoId=getMenuUseCls:userId="+DataSetBaCommon.NameValue(1,"user_id").val+":menuId="+menuId;
    tr_menu_r.post();
    var rtnStr = DataSetBaStr.NameValue(1,"name").val;
    DataSetBaStr.ClearData();
    return rtnStr;
}