var intValue	 = '0123456789';
var upperValue	 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var lowerValue	 = 'abcdefghijklmnopqrstuvwxyz';
var etcValue	 = '~`!@#$%%^&*()-_=+\|[{]};:\'\",<.>/?';
var dayOfMonth	 = new Array(31,28,31,30,31,30,31,31,30,31,30,31);

var searchOff=0, cancelOff=0, saveOff=0, insertOff=0, deleteOff=0, excelOff=0, printOff=0, titleOff=0, logoutOff=0, mymenuOff=0, hoegyekiOff=0;
var searchOn =1, cancelOn =1, saveOn =1, insertOn =1, deleteOn =1, excelOn =1, printOn =1, titleOn=1,  logoutOn=1,  mymenuOn=1,  hoegyekiOn=1; 
var searchNo=-1, cancelNo=-1, saveNo=-1, insertNo=-1, deleteNo=-1, excelNo=-1, printNo=-1, titleNo=-1, logoutNo=-1, mymenuNo=-1, hoegyekiNo=-1;

loadDataSetBaCommon();
setDefaultDataCo();
locationLoginYnCheck(); /*µ¥ÀÌÅÍ¼Â¿¡ °ªÀ» ³Ö±â Àü¿¡ ½ÇÇàµÉ¼ö ÀÖÀ¸¹Ç·Î È£ÃâÇÏ´Â À§Ä¡¸¦ ¶³¾î¶ß¸²*/
loadSettingDsAndTrCo(); //¼³Á¤ DataSet°ú TR ¸¸µé±â

var commonWpId		=	DataSetBaCommon.NameValue(1,"wp_id");		//»ç¾÷Àå¾ÆÀÌµğ  
var commonWpNm		=	DataSetBaCommon.NameValue(1,"wp_nm");		//»ç¾÷Àå¸í      
var commonHoegyeKi	=	DataSetBaCommon.NameValue(1,"hoegye_ki");	//È¸°è±â        
var commonSdd		=	DataSetBaCommon.NameValue(1,"sdd");			//½ÃÀÛÀÏ        
var commonEdd		=	DataSetBaCommon.NameValue(1,"edd");			//Á¾·áÀÏ        
var commonMagamYn	=	DataSetBaCommon.NameValue(1,"magam_yn");	//¸¶°¨¿©ºÎ      
var commonWorkDate	=	DataSetBaCommon.NameValue(1,"work_date");	//ÀÛ¾÷ÀÏÀÚ      
var commonToday     =	DataSetBaCommon.NameValue(1,"today");	    //ÀÛ¾÷ÀÏÀÚ      
var commonUserId	=   DataSetBaCommon.NameValue(1,"user_id");	    //»ç¿ëÀÚ Id
var commonUserNm	=   DataSetBaCommon.NameValue(1,"user_nm");	    //»ç¿ëÀÚÀÌ¸§
var commonBugaseyul =	DataSetBaCommon.NameValue(1,"bugaseyul");	//ºÎ°¡¼¼À²
var commonUBuseoCd	=   DataSetBaCommon.NameValue(1,"u_buseo_cd");	//¼Ò¼ÓºÎ¼­ÄÚµå
var commonBuseoNm	=   DataSetBaCommon.NameValue(1,"buseo_nm");	//¼Ò¼ÓºÎ¼­¸í
var commonUserCls	=   DataSetBaCommon.NameValue(1,"user_cls");	//»ç¿ëÀÚ±¸ºĞ
var commonUseCls	=   DataSetBaCommon.NameValue(1,"use_cls");		//»ç¿ë±¸ºĞ -- ºÎ¼­º°È¸°è(20) µî ±¸ºĞ

var commonDataView  =	"";
var tempWorkDate    =   "";                                         //ÀÏÀÚ Àß¸øÀÔ·Â ½Ã ÀÌÀü»óÅÂ·Î º¹±ÍÇÏ±â ÇÏ±â À§ÇÑ º¯¼ö
var newMagamCls     =   "F"; //»õ·Î¿î ¿ù¸¶°¨±¸ºĞ
var popupObj = new Object();

if(isNotNullCo(commonHoegyeKi)){
	commonDataView = commonWpNm+" "+commonHoegyeKi+"±â ("+commonSdd.substring(0,4)+"."+commonSdd.substring(4,6)+"."+commonSdd.substring(6,8)+"-"+commonEdd.substring(0,4)+"."+commonEdd.substring(4,6)+"."+commonEdd.substring(6,8)+")    ";
}

//ºê¶ó¿ìÀúº° ÄÁÆ®·Ñ ¼³Á¤ -- IE10 °ü·ÃÀÛ¾÷
function setCtrlForBrowser(){
	//È£È¯¼º º¸±â¸¦ °í·ÁÇÑ ie ¹öÀü Ã£±â(6.0ÀÌ IE10)
	var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);
	if(trident!=null && trident[1]=="6.0"){
   		//input box -- size¸¦ ÁÙ¿©Áà¾ß ÇÔ.
    	var inputs = document.getElementsByTagName("input");
        for(var i=0; i<inputs.length; i++){
       		inputs[i].size = inputs[i].size - 3;
        }
	}	
}

//Common DataSet ·Îµù
function loadDataSetBaCommon() {
	document.write("<comment id='__NOSCRIPT_ID__'><object id=DataSetBaCommon classid=clsid:3267EA0D-B5D8-11D2-A4F9-00608CEBEE49 ></object></comment><SCRIPT>__ShowEmbedObject(__NOSCRIPT_ID__);</SCRIPT>");
	document.write("<comment id='__NOSCRIPT_ID__'><object id=DataSetBaMagamCo classid=clsid:3267EA0D-B5D8-11D2-A4F9-00608CEBEE49 ></object></comment><SCRIPT>__ShowEmbedObject(__NOSCRIPT_ID__);</SCRIPT>");
	document.write("<comment id='__NOSCRIPT_ID__'><object id='tr_bacommon' classid='clsid:0A2233AD-E771-11D2-973D-00104B15E56F' >");
	document.write("	<param name='KeyName'	 value='toinb_dataid4'>");
	document.write("	<param name='KeyValue'	 value='JSP(O:DataSetBaCommon=DataSetBaCommon, O:DataSetBaMagamCo=DataSetBaMagamCo)'>");
	document.write("	<param name='Action'	 value='/servlet/GateServlet'>");
	document.write("</object></comment><SCRIPT>__ShowEmbedObject(__NOSCRIPT_ID__);</SCRIPT>");
}
//¼³Á¤ DataSet°ú TR
function loadSettingDsAndTrCo(){
	document.write("<comment id='__NOSCRIPT_ID__'><object id=DataSetBaSetting classid=clsid:3267EA0D-B5D8-11D2-A4F9-00608CEBEE49 ></object></comment><SCRIPT>__ShowEmbedObject(__NOSCRIPT_ID__);</SCRIPT>");
	document.write("<comment id='__NOSCRIPT_ID__'><object id='tr_setting_r' classid='clsid:0A2233AD-E771-11D2-973D-00104B15E56F' >");
	document.write("	<param name='KeyName'	 value='toinb_dataid4'>");
	document.write("	<param name='KeyValue'	 value='JSP(O:DataSetBaSetting=DataSetBaSetting)'>");
	document.write("	<param name='Action'	 value='/servlet/GateServlet'>");
	document.write("</object></comment><SCRIPT>__ShowEmbedObject(__NOSCRIPT_ID__);</SCRIPT>");
}
//Common Data Tr ½ÇÇà
function setDefaultDataCo(){
	tr_bacommon.Parameters = "jobId=JobBaCommon";
	tr_bacommon.post();
}

// ÀÛ¾÷ÀÏÀÚ(em_work_date¿Í ÀÛ¾÷ÀÏÀÚ ÀÓ½ÃÀúÀå setting)
function setCommonDataCo(){
	if(isNullCo(parent.window.saveWorkDate)) em_work_date.Text = DataSetBaCommon.NameValue(1,"work_date");
	else em_work_date.Text = parent.window.saveWorkDate;
	tempWorkDate = em_work_date.Text;
}	
// ¼¼¼ÇÁ¤º¸ check - DataSetBaCommonÀÌ »ı¼ºµÆ´Â Áö check
function locationLoginYnCheck(){
	if(DataSetBaCommon.CountRow==0){
		alert(" ½Ã°£ÃÊ°ú µî Á¢¼Ó¿À·ù·Î  ·Î±×ÀÎ Á¤º¸°¡ ¾ø½À´Ï´Ù. \n\n ·Î±×ÀÎ ÇÏ½Ã±â ¹Ù¶ø´Ï´Ù. ");
		//ÆË¾÷ÀÌ¸é ÆË¾÷Ã¢ Á¾·áÇÏ°í ÆË¾÷ÀÌ ¾Æ´Ï¸é ÃÊ±âÈ­¸éÀ¸·Î ÀÌµ¿
		if(window.dialogArguments==undefined) top.document.location.href = "/logout.jsp";
		else window.close();
	}
}
//¼³Á¤ data °¡Á®¿À±â
function getSettingDataCo(userId,knd,settingId,wpId){
	var params = "jobId=JobBaSetting,userId="+userId+",knd="+knd+",settingId="+settingId+",strWpId="+wpId;
	//alert(params);
    tr_setting_r.Parameters = params;
    tr_setting_r.post();
    if(isNotNullCo(settingId)) return DataSetBaSetting.NameValue(1,"value_01");
}
// È¸°è±â Ã¼Å©
function checkHoegyeKiRegCo(){
	if(DataSetBaCommon.NameValue(DataSetBaCommon.RowPosition,"hoegye_ki")=="" || DataSetBaCommon.NameValue(DataSetBaCommon.RowPosition,"hoegye_ki")=="0" ){
		alert("ÇöÀç ³¯Â¥¿¡ ¸Â´Â È¸°è±â°¡ µî·ÏµÇÁö ¾Ê¾Ò½À´Ï´Ù. \nÈ¸°è±â¸¦ ¸ÕÀú µî·ÏÇØÁÖ¼¼¿ä.\nµî·ÏÈÄ ·Î±×¾Æ¿ô ÇÑ ÈÄ ·Î±×ÀÎÀ» ÇØÁÖ¼¼¿ä.");
		return false;
	}
	return true;
}
//¿ù¸¶°¨±¸ºĞ Ã£±â
function searchWolMagamClsCo(yyyymmdd){
	if(isNullCo(yyyymmdd)) return;
	var yyyymm = yyyymmdd.substring(0,6);
	for(var i=1; i<=DataSetBaMagamCo.CountRow; i++){
		if(yyyymm==DataSetBaMagamCo.NameValue(i, "yyyymm"))
			newMagamCls = DataSetBaMagamCo.NameValue(i,"hoegye_magam_cls");
	}
}
// ButtonÁ¶Á¤
function btnControlCo(searchCls, cancelCls, saveCls, insertCls, deleteCls, excelCls, printCls){
	var e;
	try	{
	  subbutton.control(searchCls, cancelCls, saveCls, insertCls, deleteCls, excelCls, printCls, titleOn, logoutOn, mymenuOn, hoegyekiOn);
	}catch (e){}
}
// ÆË¾÷¿¡¼­ ButtonÁ¶Á¤
function btnControlPopupCo(searchCls, cancelCls, saveCls, insertCls, deleteCls, excelCls, printCls){
	var e;
	try	{
	  subbutton.control(searchCls, cancelCls, saveCls, insertCls, deleteCls, excelCls, printCls, titleNo, logoutNo, mymenuNo, hoegyekiNo);
	}catch (e){}
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

// ¼ıÀÚ¸¦ Àı»ç( 3.8 => 3, -7.8 => -7 )
function jeolsaCo(num){
	if(commonWpId=='1023'){
		if(num>=0) return Math.floor(num*100)/100;
		else       return Math.ceil(num*100)/100;
	}else{	
		if(num>=0) return Math.floor(num);
		else       return Math.ceil(num);
	}	
}
// ¼ıÀÚÀÎ°¡¸¦ Ã¼Å©ÇÏ´Â ÇÔ¼ö1
function isIntCo(value){
    var   j;
    for(j=0;j<intValue.length;j++)
        if(value == intValue.charAt(j)) {
            return true;
        }
    return false;
}
// ÁöÁ¤µÈ °´Ã¼ÀÇ ¹®ÀÚ¿­ÀÇ ±æÀÌ¸¦ °è»êÇÏ´Â ºÎºĞ
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
// Æ¯Á¤ÀÏÀÚ¿¡ ¸î´Ş ÀüÈÄ ÀÏÀÚ ±¸ÇÏ±â
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
	var winObj = window.showModalDialog("/js/calendar.html", window, "dialogWidth:170px; dialogHeight:193px; center=0; status:0; scroll=no; help:no;");

	if(typeof(winObj) == "object") {
		em_work_date.Text = winObj.yyyymmdd;
		if(callFunction!='')eval(callFunction);
	}
}
// calendar(³¯Â¥ Á¶È¸ÇÔ¼ö) 
function calendarCo2(){
	var winObj = window.showModalDialog("/js/calendar.html", window, "dialogWidth:170px; dialogHeight:193px; center=0; status:0; scroll=no; help:no;");

	if(typeof(winObj) == "object") {
		em_work_date.Text = winObj.yyyymmdd;
	}
}
// ¼ıÀÚ¿Í -¸¸ ÀÔ·Â°¡´É (KeyPressÀÌº¥Æ®½Ã È£Ãâ)
function acceptNumDash(){
	if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;
}
// ¼ıÀÚ¸¸ ÀÔ·Â°¡´É (KeyPressÀÌº¥Æ®½Ã È£Ãâ)
function acceptNum(){
	if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;
}
// ¹®ÀÚ°ª ÀÔ·Â¹Ş¾Æ 3ÀÚ¸®¸¶´Ù ²Ä¸¶
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
// ÆÄ¶ó¹ÌÅÍ°¡ nullÀÌ¸é "³Î"À» ¹İÈ¯ÇÏ°í,
// ""(ºó¹®ÀÚ¿­)ÀÌ¸é ""À» ¹İÈ¯ÇÏ¿© Ãâ·Â½Ã È®ÀÎ°¡´ÉÄÉÇÏ´Â ÇÔ¼ö.
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

// ÄÁÆ®·Ñ ¾ÆÀÌµğÀÇ ÇØ´çÇÏ´Â ³»¿ëÀ» Áö¿ì°í Æ÷Ä¿½º ÀÌµ¿  
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
// Àû¿ëµÈ ÆĞÅÏÀ¸·Î °ªÀÇ À¯Çô¼º Ã¼Å©ÇÏ±â
// field : this·Î ÇØ´ç°³Ã¼¸¦ ³Ñ±â¸éµÊ, patternGubun:'H,A', trimYn:°ø¹éÁ¦°Å½Ã'trim' °ø¹éÁ¦°Å ¾ÈÇÒ¶§´Â ''
// ¿¹) chkPatten(this,'H,A','trim','','etc')
// ±¸ºĞÀÚ ) ,  ex)H,A,N ÇÑ±Û,¾ËÆÄºª,¼ıÀÚ¸¸ »ç¿ë°¡´É 
// ÄÚµå )¼ıÀÚ=N,¾ËÆÄºª=A,ÇÑ±Û=H,°ø¹é=T 
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
		else if(trimYn=="ltrim")      fieldValue = ltrimCo(fieldValue);			//¿ŞÂÊ°ø¹éÁ¦°Å
		else if(trimYn=="rtrim")	  fieldValue = rtrimCo(fieldValue);			//¿À¸¥ÂÊ°ø¹éÁ¦°Å
		else if(trimYn=="lrtrim")	  fieldValue = lrtrimCo(fieldValue);		//¿ŞÂÊ¿À¸¥ÂÊ°ø¹éÁ¦°Å
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
		/* ÀÌºÎºĞÀº ¼öÁ¤ - ÇÑ±º´ë·Î »ÌÀ»Áö °í·Á */
		var patternForm = patternGubun.split(",");
		for(var i=0; i<patternForm.length; i++){
		pattrenVal = patternForm[i];
		pattrenLength = pattrenVal.length;
			if(pattrenLength == 1){
				if(pattrenVal == "N") errorChar+=" ¼ıÀÚ"; 
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
// ÆĞÅÏ¾ç½Ä¸¸µé±â ¿¹) getMakePattern(field, 'H,A')
// ±¸ºĞÀÚ ) ,  ex)H,A,N ÇÑ±Û,¾ËÆÄºª,¼ıÀÚ¸¸ »ç¿ë°¡´É 
// ÄÚµå )¼ıÀÚ=N,¾ËÆÄºª=A,ÇÑ±Û=H,°ø¹é=T 
// ¿Ï¼ºµÈ ÇÑ±ÛÀÌ ¾Æ´Ñ°ÍÀº Ã¼Å©°¡ ¾ÈµÊ ex) ¤±¤²¤»¤©
//-------------------------------------------------------------------
function getMakePattern(field, patternGubun) {	
	/* ¼ıÀÚ=N,¾ËÆÄºª=A,ÇÑ±Û=H,°ø¹é=T */
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
// Á¤±ÔÇ¥Çö½ÄÀ¸·Î ¿ŞÂÊ°ø¹éÁ¦°Å
function ltrimCo(str) { 
	str = str.replace(/^\s*/,''); 
	return str;
} 
// Á¤±ÔÇ¥Çö½ÄÀ¸·Î ¿À¸¥ÂÊ°ø¹éÁ¦°Å
function rtrimCo(str) { 
	str = str.replace(/\s*$/,''); 
	return str;
} 
// Á¤±ÔÇ¥Çö½ÄÀ¸·Î ¿ŞÂÊ¿À¸¥ÂÊ°ø¹éÁ¦°Å
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

// exitCo() ¾î¶² ÇüÅÂ·Î Ã¢ÀÌ ´İÀÌ´ÂÁö È®ÀÎ
function exitCo() {
    //°­Á¦ Ã¢´İ±â
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
// ¸Ş¼¼Áö ÆË¾÷
function msgBoxPopupCo(pType,pValue){
	popupObj.type = pType;
	popupObj.value = pValue;
	if(pType==1) return winObj = window.showModalDialog("/html/msgBox.html", popupObj, "dialogWidth:320px; dialogHeight:100px; center=1; status:0; scroll=no; help:no;");
	else if(pType==2) return winObj = window.showModalDialog("/html/msgBox.html", popupObj, "dialogWidth:320px; dialogHeight:200px; center=1; status:0; scroll=no; help:no;");
	else if(pType==3) return winObj = window.showModalDialog("/html/msgBox.html", popupObj, "dialogWidth:270px; dialogHeight:120px; center=1; status:0; scroll=no; help:no;");
	else if(pType==4) return winObj = window.showModalDialog("/html/msgBox.html", popupObj, "dialogWidth:270px; dialogHeight:120px; center=1; status:0; scroll=no; help:no;");
	else if(pType==5) return winObj = window.showModalDialog("/html/msgBox.html", popupObj, "dialogWidth:300px; dialogHeight:150px; center=1; status:0; scroll=no; help:no;");
	else if((pType==6)||(pType==7)||(pType==8)) return winObj = window.showModalDialog("/html/msgBox.html", popupObj, "dialogWidth:360px; dialogHeight:180px; center=1; status:0; scroll=no; help:no;");
	else if(pType==9) return winObj = window.showModalDialog("/html/msgBox.html", popupObj, "dialogWidth:300px; dialogHeight:150px; center=1; status:0; scroll=no; help:no;");
}
//»ç¿øÆË¾÷
function sawonPopupCo(sawonPopupParam){
	try{
		return window.showModalDialog("/html/ba760.html", sawonPopupParam, "dialogWidth:325px; dialogHeight:470px; center=1; status:0; scroll=no; help:no;");
		//return window.showModalDialog("/html/ba902.html", sawonPopupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
    }catch(e){
      	//alert(e.message);
    	alert(" ÆË¾÷ÀÌ Â÷´ÜµÇ¾î ÀÖ´Â °Í °°½À´Ï´Ù. \n\n ÆË¾÷ Â÷´ÜÀ» ÇØÁ¦ÇØ ÁÖ¼¼¿ä! ");
    }
}
//±İÀ¶È¸»çÁ¤º¸ÆË¾÷(Ä«µå,ÀºÇà±¸ºĞ)
function geumyungPopupCo(popupParam){
	return winObj  = window.showModalDialog("/html/ba903.html", popupParam, "dialogWidth:325px; dialogHeight:470Px; center=1; status:0; scroll=no; help:no;");
}
//Á÷±ŞÆË¾÷
function jikgeupPopupCo(jikgeupPopupParam){
	return window.showModalDialog("/html/ba904.html", jikgeupPopupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//ºÎ¼­ÆË¾÷
function buseoPopupCo(buseoPopupParam){
	return window.showModalDialog("/html/ba905.html", buseoPopupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//¼±ÅÃ¿ë ÆË¾÷(ºÎ¼­ µî)
function selectPopupCo(buseoPopupParam){
	return window.showModalDialog("/html/ba902.html", buseoPopupParam, "dialogWidth:335px; dialogHeight:455px; center=1; status:0; scroll=no; help:no;");
}
//°Å·¡Ã³ÆË¾÷
function clntPopupCo(clntPopupParam){
	return window.showModalDialog("/html/ba906.html", clntPopupParam, "dialogWidth:325px; dialogHeight:550px; center=1; status:0; scroll=no; help:no;");
}
//ÇÁ·ÎÁ§Æ®ÆË¾÷
function projPopupCo(projPopupParam){
	try{
		return window.showModalDialog("/html/ba907.html", projPopupParam, "dialogWidth:610px; dialogHeight:600px; center=1; status:0; scroll=no; help:no");
    }catch(e){
      	//alert(e.message);
    	alert(" ÆË¾÷ÀÌ Â÷´ÜµÇ¾î ÀÖ´Â °Í °°½À´Ï´Ù. \n\n ÆË¾÷ Â÷´ÜÀ» ÇØÁ¦ÇØ ÁÖ¼¼¿ä! ");
    }
}
//¼öÁÖÁ¤º¸ Ãß°¡µî·Ï
function sujuChugaRegPopupCo(sujuPopupParam){
	return window.showModalDialog("/html/ba909.html", sujuPopupParam, "dialogWidth:450px; dialogHeight:350px; center=1; status:0; scroll=no; help:no;");
}
//°Å·¡Ã³º° Á¤»êÇÒ ³»¿ª
function clntNaeyeokPopupCo(naeyeokPopupParam){
	return window.showModalDialog("/html/ba920.html", naeyeokPopupParam, "dialogWidth:600px; dialogHeight:550px; center=1; status:0; scroll=no; help:no;");
}
//Á¤»êÇÒ ³»¿ª : Æ¯Á¤°Å·¡Ã³ÀÇ Á¤»êÇÒ ÀÜ¾× µî Á¶È¸ÇÏ´Â ÆË¾÷
function naeyeokPopupCo(naeyeokPopupParam){
	return window.showModalDialog("/html/ba921.html", naeyeokPopupParam, "dialogWidth:400px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//Á¤»êÇÒ ¿ÜÈ­³»¿ª : ¿ÜÈ­ Á¤»êÇÒ ÀÜ¾× µî Á¶È¸ÇÏ´Â ÆË¾÷
function oehwaNaeyeokPopupCo(oehwaNaeyeokPopupParam){
	return window.showModalDialog("/html/ba922.html", oehwaNaeyeokPopupParam, "dialogWidth:400px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//ÀÏÀÚº° ¿©½Å³»¿ª
function yeosinNaeyeokPopupCo(naeyeokPopupParam){
	return window.showModalDialog("/html/ba927.html", naeyeokPopupParam, "dialogWidth:380px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//Ç×¸ñ¼öÁ¤ÆË¾÷
function itemUpdatePopupCo(popupParam){
	if(newMagamCls=="T") return; //¸¶°¨µÇ¾úÀ¸¸é ¼öÁ¤ ºÒ°¡.
	return winObj = window.showModalDialog("/html/ba941.html", popupParam, "dialogWidth:500px; dialogHeight:220px; center=1; status:0; scroll=no; help:no;");
}
//ÀÏ¹İ°Å·¡ºĞ°³ ¼öÁ¤
function ilbanGeoraeUpdatePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba943.html", popupParam, "dialogWidth:1000px; dialogHeight:650px; center=1; status:0; scroll=no; help:no;");
}
//ÀÏ¹İ°Å·¡ºĞ°³ ¼öÁ¤(ÄÁ¼³ÅÏÆ®¿ë)
function ilbanUpdateForConstPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba947.html", popupParam, "dialogWidth:1000px; dialogHeight:650px; center=1; status:0; scroll=no; help:no;");
}
//±¸ºĞ³»¿ª °ª°ú ¼³¸í ÆË¾÷
function gubunNaeyeokPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba942.html", popupParam, "dialogWidth:580px; dialogHeight:400px; center=1; status:0; scroll=no; help:no;");
}
//°èÁ¤ÆË¾÷
function acctPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba951.html", popupParam, "dialogWidth:325px; dialogHeight:500px; center=1; status:0; scroll=no; help:no;");
}
//º¹¼ö°èÁ¤(º¹¼ö°èÁ¤ ¼±ÅÃ)
function multiAcctPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba950.html", popupParam, "dialogWidth:600px; dialogHeight:520px; center=1; status:0; scroll=no; help:no;");
}
//¿ÜÈ­¸ÅÃâ¸ÅÀÔ °Å·¡
function oehwaPopupCo(oehwaPopupParam){
	return window.showModalDialog("/html/ba953.html", oehwaPopupParam, "dialogWidth:800px; dialogHeight:470px; center=1; status:0; scroll=no; help:no;");
}
//°èÁ¤À¯Çü
function acctKndPopupCo(){
	return winObj =window.showModalDialog("ba954.html", window, "dialogWidth:325px; dialogHeight:348px; center=1; status:0; scroll=no; help:no;");
}
//Àû¿äÁ¤º¸ÆË¾÷
function jeokyoPopupCo(jeokyoPopupParam){
	return window.showModalDialog("/html/ba955.html", jeokyoPopupParam, "dialogWidth:525px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//Ã¢°íÄÚµå
function changgoPopupCo(){
	return window.showModalDialog("/html/ba956.html", window, "dialogWidth:325px; dialogHeight:348px; center=1; status:0; scroll=no; help:no;");
}
//Àç°í(Ç°¸ñ)Á¤º¸ÆË¾÷
function jaegoPopupCo(popupParam){
	return window.showModalDialog("/html/ba957.html", popupParam, "dialogWidth:325px; dialogHeight:500px; center=1; status:0; scroll=no; help:no;");
}
//Àç°í(Ç°¸ñ)Á¤º¸ÆË¾÷2  -- ÁÖ·ÎÁ¦Á¶
function jaegoPopupCo2(popupParam){
	return window.showModalDialog("/html/ba925.html", popupParam, "dialogWidth:500px; dialogHeight:500px; center=1; status:0; scroll=no; help:no;");
}
//Àç°íÁ¤º¸ÆË¾÷(¼öÁ¤¿ë - Àç¹ßÁÖ¼Ò¿ä·® °ü·Ã)
function jaegoUpdatePopupCo(popupParam){
	return window.showModalDialog("/html/ba928.html", popupParam, "dialogWidth:580px; dialogHeight:600px; center=1; status:0; scroll=no; help:no;");
}
//ÀÚµ¿ÄÚµå»ı¼º
function autoCodePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba923.html", popupParam, "dialogWidth:500px; dialogHeight:220px; center=1; status:0; scroll=no; help:no;");
}
//BOM º¹»ç
function copyBomPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba924.html", popupParam, "dialogWidth:500px; dialogHeight:220px; center=1; status:0; scroll=no; help:no;");
}
//¼öÁÖÁ¤º¸°Ë»ö
function getSujuPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba929.html", popupParam, "dialogWidth:900px; dialogHeight:435px; center=1; status:0; scroll=no; help:no;");
}
//¼öÁÖ³»¿ª¼±ÅÃ
function getSujuDetlCo(popupParam){
	return winObj = window.showModalDialog("/html/ba926.html", popupParam, "dialogWidth:900px; dialogHeight:520px; center=1; status:0; scroll=no; help:no;");
}
//°ü¸®Ç×¸ñ
function mgtItemPopupCo(popupParam){
	return winObj =window.showModalDialog("ba958.html", popupParam, "dialogWidth:525px; dialogHeight:500px; center=1; status:0; scroll=no; help:no;");
}
//Á¦Á¶Á¤º¸ÆË¾÷
function jejoPopupCo(popupParam){
	return window.showModalDialog("/html/ba959.html", popupParam, "dialogWidth:430px; dialogHeight:400px; center=1; status:0; scroll=no; help:no;");
}
//°èÁ¤ÆË¾÷(Á¦Á¶¿ø°¡¸í¼¼)
function acctPopup2Co(popupParam){
	return winObj = window.showModalDialog("/html/ba960.html", popupParam, "dialogWidth:325px; dialogHeight:500px; center=1; status:0; scroll=no; help:no;");
}
//°èÁ¤±âÃÊ¸í¼¼
function acctGichoMyeongsePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba961.html", popupParam, "dialogWidth:330px; dialogHeight:320px; center=1; status:0; scroll=no; help:no;");
}
//°øÀåÄÚµå
function gongjangPopupCo(popupParam){
	return window.showModalDialog("/html/ba962.html", popupParam, "dialogWidth:370px; dialogHeight:350px; center=1; status:0; scroll=no; help:no;");
}
//°øÁ¤ÄÚµå
function gongjeongPopupCo(popupParam){
	return window.showModalDialog("/html/ba978.html", popupParam, "dialogWidth:370px; dialogHeight:350px; center=1; status:0; scroll=no; help:no;");
}
//ÀÛ¾÷´ÜÀ§ÆË¾÷
function taskUnitPopupCo(popupParam){
	return window.showModalDialog("/html/ba979.html", popupParam, "dialogWidth:370px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}

//°è»ê¼­ÆË¾÷
function gyesanseoPopupCo(popupParam){
	return window.showModalDialog("/html/ba963.html", popupParam, "dialogWidth:550px; dialogHeight:230px; center=1; status:0; scroll=no; help:no;");
}

//¼±ÅÃÆË¾÷(¿¹, ¾Æ´Ï¿À ¼±ÅÃ)
function choosePopupCo(popupParam){
	return window.showModalDialog("/html/ba964.html", popupParam, "dialogWidth:420px; dialogHeight:200px; center=1; status:0; scroll=no; help:no;");
}

//ÇÑ°ÇÀÇ ±İ¾× ÀÔ·ÂÀ» À§ÇÑ popup -- ¿¹)¼öÀÔºÎ°¡¼¼ °ø±Ş°¡¾× ÀÔ·Â
function inputPopupCo(popupParam){
	return window.showModalDialog("/html/ba965.html", popupParam, "dialogWidth:380px; dialogHeight:200px; center=1; status:0; scroll=no; help:no;");
}
//ÇÁ¸°Æ® ¼ÂÆÃ
function printPopupParamCo(printPopupParam){
	return window.showModalDialog("/html/ba967.html", printPopupParam, "dialogWidth:320px; dialogHeight:300px; status:0; scroll=no");
}
//°Å·¡¹øÈ£¿¡ ´ëÇÑ °Å·¡³»¿ª
function perGeoraeNaeyeokParamCo(popupParam){
	return window.showModalDialog("/html/ba968.html", popupParam, "dialogWidth:880px; dialogHeight:400px; center=1; status:0; scroll=no; help:no;");
}
//ÇÁ¸°Æ® ¼ÂÆÃ
function printPopupParamCo2(printPopupParam3){
	return window.showModalDialog("/html/ba969.html", printPopupParam3, "dialogWidth:320px; dialogHeight:330px; status:0; scroll=no");
}
//°è»ê¼­ ¼¼ºÎµî·Ï ¼ÂÆÃ
function gyesanseoItemPopupParamCo(gyesanseoItemPopupParam){
	return window.showModalDialog("/html/ba970.html", gyesanseoItemPopupParam, "dialogWidth:880px; dialogHeight:310px; status:0; scroll=no");
}
//°è»ê¼­ È¯ÀÔ¼¼ºÎµî·Ï ¼ÂÆÃ
function gyesanseoItemPopupParam2Co(gyesanseoItemPopupParam){
	return window.showModalDialog("/html/ba974.html", gyesanseoItemPopupParam, "dialogWidth:880px; dialogHeight:310px; status:0; scroll=no");
}
//Àç°í ÀÔ·Â³»¿ª ºÒ·¯¿À±â
function jaegoMgtPopupParamCo(jaegoMgtPopupParam){
	return window.showModalDialog("/html/ba971.html", jaegoMgtPopupParam, "dialogWidth:485px; dialogHeight:450px; status:0; scroll=no");
}
//ÀÔÃâ°í°ü¸®
function ipchulgoMgtPopupCo(popup3ParamCo){
	return window.showModalDialog("/html/ba972.html", popup3ParamCo, "dialogWidth:920px; dialogHeight:520px; status:0; scroll=no");
}
//ÀüÀç°í°ü¸®
function allJaegoMgtPopupCo(popup3ParamCo){
	return window.showModalDialog("/html/ba973.html", popup3ParamCo, "dialogWidth:940px; dialogHeight:520px; status:0; scroll=no");
}
//ÀüÀç°í¼ö·®±İ¾×
function allJaegoQtyAmtPopupCo(popup3ParamCo){
	return window.showModalDialog("/html/ba757.html", popup3ParamCo, "dialogWidth:980px; dialogHeight:520px; status:0; scroll=no");
}
//ÇØ´çºĞ°³³»¿ªÀÌ ÀÖ´Â °Å·¡Ã³
function bungaeClntPopupCo(popup3ParamCo){
	return window.showModalDialog("/html/ba975.html", popup3ParamCo, "dialogWidth:360px; dialogHeight:420px; center=1; status:0; scroll=no; help:no;");
}
//°Å·¡Ã³¸í¼¼
function clnt1MyeongsePopupCo(){
	return winObj =window.showModalDialog("ba976.html", null, "dialogWidth:920px; dialogHeight:520px; status:0; scroll=no");
}
//¹ßÁÖ¹øÈ£ popup
function baljuNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba977.html", popupParam, "dialogWidth:550px; dialogHeight:460px; status:0; scroll=no");
}
//¼öÁÖÁ¤º¸ popup
function sujuNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba980.html", popupParam, "dialogWidth:485px; dialogHeight:470px; status:0; scroll=no");
}
//»ı»ê°èÈ¹¹øÈ£ popup
function prodPlanNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba981.html", popupParam, "dialogWidth:485px; dialogHeight:420px; status:0; scroll=no");
}
//»ı»êÁö½Ã¹øÈ£ popup
function prodJisiNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba982.html", popupParam, "dialogWidth:510px; dialogHeight:420px; status:0; scroll=no");
}
//ºÒÃâ¸®½ºÆ®¹øÈ£ popup
function bulchulListNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba983.html", popupParam, "dialogWidth:485px; dialogHeight:420px; status:0; scroll=no");
}
//ÀÔÃâ°í°ü¸®¹øÈ£ popup
function inoutMgtNoByProdJisiPopupCo(popupParam){
	return window.showModalDialog("/html/ba984.html", popupParam, "dialogWidth:485px; dialogHeight:420px; status:0; scroll=no");
}
//Ãß°¡Ãâ°í¿äÃ»¹øÈ£  popup
function chugaAskPopupCo(popupParam){
	return window.showModalDialog("/html/ba985.html", popupParam, "dialogWidth:485px; dialogHeight:420px; status:0; scroll=no");
}
//»ı»êÁö½Ã¹øÈ£ popup(Á¦Á¶ºÒÃâÈ­¸é¿ë)
function prodJisiForJejoBulchulPopupCo(popupParam){
	return window.showModalDialog("/html/ba986.html", popupParam, "dialogWidth:650px; dialogHeight:450px; status:0; scroll=no");
}
//ÃâÇÏ¿äÃ»¹øÈ£ popup
function chulhaAskNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba987.html", popupParam, "dialogWidth:485px; dialogHeight:420px; status:0; scroll=no");
}
//Áö¿ªÆË¾÷
function areaPopupCo(popupParam){
	return window.showModalDialog("/html/ba911.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//±¹°¡ÆË¾÷
function nationPopupCo(popupParam){
	return window.showModalDialog("/html/ba912.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//µµ½ÃÆË¾÷
function cityPopupCo(popupParam){
	return window.showModalDialog("/html/ba913.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//Ç×¸¸ÆË¾÷
function stationPopupCo(popupParam){
	return window.showModalDialog("/html/ba914.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//ÀÛ¾÷±×·ì
function workGroupPopupCo(popupParam){
	return window.showModalDialog("/html/ba915.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//±Ù¹«Á¶
function geunmujoPopupCo(popupParam){
	return window.showModalDialog("/html/ba916.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//±ŞÈ£
function geuphoPopupCo(popupParam){
	return window.showModalDialog("/html/ba917.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//±Ş¿©Ç×¸ñÀ¯Çü
function geupyeoItemKndPopupCo(popupParam){
	return window.showModalDialog("/html/ba918.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//±Ş¿©Ç×¸ñ
function geupyeoItemPopupCo(popupParam){
	return window.showModalDialog("/html/ba919.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//±ÙÅÂÁ¾·ù
function geuntaeKndPopupCo(popupParam){
	return window.showModalDialog("/html/ba933.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//»ó¹ú±âº»Á¤º¸
function sangbeolPopupCo(popupParam){
	return window.showModalDialog("/html/ba939.html", popupParam, "dialogWidth:325px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//±âÁØÀÏ
function gijunilPopupCo(popupParam){
	return window.showModalDialog("/html/ba934.html", popupParam, "dialogWidth:275px; dialogHeight:400px; center=1; status:0; scroll=no; help:no;");
}
//¼±ÅÃ¿ù ±Ş¿© °¡Á®¿À±â
function selectMonthGeupyeoPopupCo(popupParam){
	return window.showModalDialog("/html/ba935.html", popupParam, "dialogWidth:540px; dialogHeight:100px; center=1; status:0; scroll=no; help:no;");
}
//±³À°¹øÈ£ popup
function eduNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba937.html", popupParam, "dialogWidth:485px; dialogHeight:420px; status:0; scroll=no");
}
//¹ß·É¹øÈ£ popup
function balryeongNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba938.html", popupParam, "dialogWidth:485px; dialogHeight:420px; status:0; scroll=no");
}
//Áõ¸í¼­ ¹ßÇà¹øÈ£ popup
function balhaengNoPopupCo(popupParam){
	return window.showModalDialog("/html/ba940.html", popupParam, "dialogWidth:485px; dialogHeight:420px; status:0; scroll=no");
}
//±Ş¿©ÀÌÃ¼
function geupyeoIchePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba397.html", popupParam, "dialogWidth:1000px; dialogHeight:600px; center=1; status:0; scroll=no; help:no;");
}
//(¼¼±İ) °è»ê¼­ ÁöÁ¡¹ßÇà
function billJijeomPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba944.html", popupParam, "dialogWidth:370px; dialogHeight:170px; center=1; status:0; scroll=no; help:no;");
}
//¼±ÅÃÇ°¸ñ Àç°í·®
function getSelJaegoQtyPopupCo(popupParam){
	return window.showModalDialog("/html/ba945.html", popupParam, "dialogWidth:660px; dialogHeight:360px; status:0; scroll=no");
}
//»ç¿øÁ¶È¸(Á¾ÇÕ)
function getSawonJonghapPopupCo(popupParam){
	return window.showModalDialog("/html/ba946.html", popupParam, "dialogWidth:425px; dialogHeight:560px;center=1; status:0; scroll=no; help:no;  resizable=yes;");
}
//Á¾Àü°Å·¡Á¶È¸
function jongjeonGeoraePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba948.html", popupParam, "dialogWidth:950px; dialogHeight:600px; center=1; status:0; scroll=no; help:no;");
}
//¼¼±İ°è»ê¼­ Á¤º¸ÀÔ·Â 
function billInfoPopupCo(popupParam){
	return window.showModalDialog("/html/ba930.html", popupParam, "dialogWidth:480px; dialogHeight:200px; center=1; status:0; scroll=no; help:no;");
}
//¹Ìµî·Ï °Å·¡Ã³ ÀÏ°ıµî·Ï
function ilgwalRegClntPopupCo(popupParam){
	return window.showModalDialog("/html/ba988.html", popupParam, "dialogWidth:570px; dialogHeight:440px; center=1; status:0; scroll=no; help:no;");
}
//°³ÀÎº° ³»¿ªµî·Ï ÆË¾÷
function regNaeyeokPopupCo(popupParam){
	return window.showModalDialog("/html/ba910.html", popupParam, "dialogWidth:585px; dialogHeight:470px; center=1; status:0; scroll=no; help:no");
}
//°Å·¡³»¿ª °èÁ¤µî·Ï
function naeyeokAcctPopupCo(projPopupParam){
	return window.showModalDialog("/html/ba990.html", projPopupParam, "dialogWidth:800px; dialogHeight:470px; center=1; status:0; scroll=no; help:no");
}
//°áÀÇ¼­Á¤º¸
function getKyeoluiseoPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba949.html", popupParam, "dialogWidth:500px; dialogHeight:475px; center=1; status:0; scroll=no; help:no;");
}
//°è»ê¼­ Ãß°¡Á¤º¸
function gyesanseoChugaPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba989.html", popupParam, "dialogWidth:500px; dialogHeight:220px; center=1; status:0; scroll=no; help:no;");
}
//¼¼¸ñÆË¾÷
function semokPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba991.html", popupParam, "dialogWidth:325px; dialogHeight:400px; center=1; status:0; scroll=no; help:no;");
}
//Á¤»êÁ¶È¸
function jeongsanJohoePopupCo(naeyeokPopupParam){
	return window.showModalDialog("/html/ba992.html", naeyeokPopupParam, "dialogWidth:400px; dialogHeight:450px; center=1; status:0; scroll=no; help:no;");
}
//¿øÀåÁ¶È¸
function wonjangJohoePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba993.html", popupParam, "dialogWidth:500px; dialogHeight:500px; center=1; status:0; scroll=no; help:no;");
}
//ÇÁ·ÎÁ§Æ®³»¿ª
function projNaeyeokPopupCo(popupParam){
	return window.showModalDialog("/html/ba994.html", popupParam, "dialogWidth:850px; dialogHeight:470px; center=1; status:0; scroll=no; help:no");
}
//ÇÁ·ÎÁ§Æ® °èÁ¤³»¿ª
function projAcctNaeyeokPopupCo(popupParam){
	return window.showModalDialog("/html/ba995.html", popupParam, "dialogWidth:850px; dialogHeight:470px; center=1; status:0; scroll=no; help:no");
}
//¹ßÁÖ¿¹Á¤¼ö·® ÀúÀå
function baljuYejeongSavePopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba751.html", popupParam, "dialogWidth:500px; dialogHeight:220px; center=1; status:0; scroll=no; help:no;");
}
//¹ßÁÖ¿¹Á¤ data
function baljuYejeongDataPopupCo(projPopupParam){
	return window.showModalDialog("/html/ba752.html", projPopupParam, "dialogWidth:585px; dialogHeight:470px; center=1; status:0; scroll=no; help:no");
}
//¸ÅÀÔ³»¿ª
function maeipNaeyeokPopupCo(popupParam){
	return window.showModalDialog("/html/ba753.html", popupParam, "dialogWidth:370px; dialogHeight:470px; center=1; status:0; scroll=no; help:no");
}
//¿ÜÈ­ ¸ÅÃâÈ¯ÀÔ/¸ÅÀÔÈ¯Ãâ °Å·¡
function oehwaHwanchulipPopupCo(oehwaPopupParam){
	return window.showModalDialog("/html/ba754.html", oehwaPopupParam, "dialogWidth:800px; dialogHeight:470px; center=1; status:0; scroll=no; help:no;");
}
//¸ÅÀÔµî·ÏÆË¾÷
function maeipRegPopupCo(popupParam){
	return window.showModalDialog("/html/ba755.html", popupParam, "dialogWidth:500px; dialogHeight:400px; center=1; status:0; scroll=no; help:no;");
}
//±¸ºĞ°ª ÆË¾÷
function gubunPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba756.html", popupParam, "dialogWidth:250px; dialogHeight:120px; center=1; status:0; scroll=no; help:no;");
}
//¸ÅÃâÃßÁ¤
function maechulChujeongPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba758.html", popupParam, "dialogWidth:950px; dialogHeight:280px; center=1; status:0; scroll=no; help:no;");
}
//¹ıÀÎ¼¼Á¤º¸ ÀÔ·Â
function beopinseInfoPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba759.html", popupParam, "dialogWidth:250px; dialogHeight:140px; center=1; status:0; scroll=no; help:no;");
}
//Á¾Àü°áÀÇ¼­Á¶È¸
function jongjeonKyeoluiseoPopupCo(popupParam){
	return winObj = window.showModalDialog("/html/ba761.html", popupParam, "dialogWidth:950px; dialogHeight:600px; center=1; status:0; scroll=no; help:no;");
}

// ÄÚµå¿Í ÀÌ¸§À» ¸â¹ö·Î °®´Â °´Ã¼¸¦ »ı¼ºÇÏ´Â ÇÔ¼ö-- return°´Ã¼ »ı¼ºÀÚÇÔ¼ö
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
	this.mgtItemKndCls = mgtItemKndCls;  //°ü¸®Ç×¸ñÀ¯Çü±¸ºĞ
	this.uAcctCd       = uAcctCd;      	 //°èÁ¤
	this.acctCls       = acctCls;      	 //°èÁ¤±¸ºĞ
}
// Àû¿äÁ¤º¸ popupÃ¢¿¡ Àü´ŞÇÏ´Â ÆÄ¶ó¹ÌÅÍ¸¦ ¸â¹ö·Î °®´Â °´Ã¼¸¦ »ı¼ºÇÏ´Â ÇÔ¼ö.--param°´Ã¼ »ı¼ºÀÚÇÔ¼ö
function JeokyoPopupParamCo(georaeCls,upjongCls,ipchulCls,oehwaCls, drcrCls, uAcctCd) {
	this.georaeCls	= georaeCls;   //°Å·¡±¸ºĞ
	this.upjongCls	= upjongCls;   //¾÷Á¾±¸ºĞ
	this.ipchulCls	= ipchulCls;   //ÀÔÃâ±¸ºĞ
	this.oehwaCls	= oehwaCls;    //¿ÜÈ­±¸ºĞ
	this.drcrCls    = drcrCls;     //Â÷´ë±¸ºĞ
	this.uAcctCd    = uAcctCd;     //°èÁ¤ÄÚµå(»ç¿ëÀÚ)
}
// Á¤»êÇÒ³»¿ª parameter : Á¤»êÇÒ ÀÜ¾×Á¶È¸ popupÃ¢¿¡ Àü´ŞÇÏ´Â ÆÄ¶ó¹ÌÅÍ¸¦ ¸â¹ö·Î °®´Â °´Ã¼¸¦ »ı¼ºÇÏ´Â ÇÔ¼ö.
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
//¿ÜÈ­(¸ÅÃâ¸ÅÀÔ)°Å·¡ popupÃ¢¿¡ Àü´ŞÇÏ´Â ÆÄ¶ó¹ÌÅÍ°´Ã¼ »ı¼ºÇÔ¼ö.--param°´Ã¼ »ı¼ºÀÚÇÔ¼ö
function OehwaPopupParamCo(georaeCls, clntCd, workDate) {
	this.georaeCls	 = georaeCls;
	this.clntCd		 = clntCd;
	this.workDate    = workDate;
}
/// °øÅë popupÃ¢¿¡ Àü´ŞÇÏ´Â ÆÄ¶ó¹ÌÅÍ°´Ã¼ »ı¼ºÇÔ¼ö.-- 1,2°³ÀÇ ±¸ºĞ°ªÀ»  popupÃ¢¿¡ Àü´Ş
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
//ÆË¾÷ Ç¥ÁØÆÄ¶ó¹ÌÅÍ °´Ã¼(¸®ÅÏ°ª »ı¼º½Ã »ç¿ë) 
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
	
	//°Å·¡Ã³1(p1:ÆË¾÷±¸ºĞ, p2:°Å·¡Ã³±¸ºĞ(1), p3:¸ÅÀÔ¸ÅÃâÃ³±¸ºĞ)   
	//°èÁÂ   (p1:ÆË¾÷±¸ºĞ, p2:°Å·¡Ã³±¸ºĞ(2), p3:Çö±İ¿¹±İµî ±¸ºĞ , p4:¿ÜÈ­±¸ºĞ )   
	//Ä«µå   (p1:ÆË¾÷±¸ºĞ, p2:°Å·¡Ã³±¸ºĞ(3), p3:ÁöÃâ,¸ÅÃâ¿ë±¸ºĞ)   
	//°í°´   (p1:ÆË¾÷±¸ºĞ, p2:°Å·¡Ã³±¸ºĞ(4))   
	//»ç¿ø   (p1:ÆË¾÷±¸ºĞ, p2:°Å·¡Ã³±¸ºĞ(5), p3:ÀçÁ÷,Åğ»ç±¸ºĞ)   
	//ºÎ¼­   (p1:ÆË¾÷±¸ºĞ, p2:°Å·¡Ã³±¸ºĞ(6))   
	if(p1=="10"){		
		urlParams = "/html/ba932.html";
		screenParams = "dialogWidth:400px; dialogHeight:550px;center=1; status:0; scroll=no; help:no;  resizable=yes; ";
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

// ÆË¾÷Ã¢¿¡¼­ ³Ñ°Ü¹ŞÀº ÇÁ¸°ÅÍ¼³Á¤°ªÀ» º¸°í¼­¿¡ ¹İ¿µ 
function printFormatCo(winObj,printName){
	if(typeof(winObj) == "object") {
			eval(printName).landScape= winObj.landScape;					//ÀÎ¼â¹æÇâ
			eval(printName).margineX=  winObj.margineX;						//ÀÎ¼â¿ŞÂÊ¿©¹é
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
		dataSet.NameString(dataSet.RowPosition,"url_str") = strFile;
		dataSet.NameValue(dataSet.RowPosition,"file_value") = fileControl.value;
	//»èÁ¦
    }else if(code==4){
		dataSet.NameString(dataSet.RowPosition,"url_str") = "";
		dataSet.NameValue(dataSet.RowPosition,"file_value") = "";
	}	
}

//Ã·ºÎÆÄÀÏ ³»¿ë º¸±â(´Ù¿î·Îµå)
function showFileCo(inDateLog,dataSet){
	var mainSeq = dataSet.NameValue(dataSet.RowPosition,"kyeoluiseo_seq");
	var detlSeq = dataSet.NameValue(dataSet.RowPosition,"kyeoluiseo_detl_seq");
	var fName = dataSet.NameValue(dataSet.RowPosition,"url_str");
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
				if     (sCls=='1') dataSet.NameValue(dataSet.RowPosition,"selected_bungae_seqs") = "";
				else if(sCls=='2'){
					dataSet.NameValue(dataSet.RowPosition,"dr_selected_bungae_seqs") = "";
					dataSet.NameValue(dataSet.RowPosition,"cr_selected_bungae_seqs") = "";
				}
				else if(sCls=='d') dataSet.NameValue(dataSet.RowPosition,"dr_selected_bungae_seqs") = "";
				else if(sCls=='c') dataSet.NameValue(dataSet.RowPosition,"cr_selected_bungae_seqs") = "";
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

// ±İ¾× check :  (a X b) = c ÀÎÁö check => ¿ÜÈ­ µî¿¡¼­ È°¿ë
function checkAmtCo(a, b, c){
	var d = (Number(c) - jeolsaCo(Number(a) * Number(b)));
	if((d>1)||(d<-1)){
		var rObj = msgBoxPopupCo(5,d);
		return rObj.cls;
	}else return true;
}

//¸Ş´º»ç¿ë±¸ºĞ - Æ¯Á¤ È­¸éÀ» »ç¿ëÇÒ ±ÇÇÑÀÌ ÀÖ´Â Áö check
function getMenuUseClsCo(menuId){
    DataSetBaStr.ClearData();
    tr_menu_r.Parameters = "jobId=JobBaSelect2,daoId=getMenuUseCls:userId="+DataSetBaCommon.NameValue(1,"user_id")+":menuId="+menuId;
    tr_menu_r.post();
    var rtnStr = DataSetBaStr.NameValue(1,"name");
    DataSetBaStr.ClearData();
    return rtnStr;
}