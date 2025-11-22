// 전역변수선언
var pilsuColor	 = "#FFFF99"; //필수입력색변경
var disableColor = "#D8D8D8"; //readonly칼라
var filterDefaultYn = false;
var noData = "조회된 데이터가 없습니다.";
var noCode = "등록되지 않은 코드입니다.";
var errDateType = "2019-01-05 형식으로 입력하세요.";
var duplicationCode = "이미 등록 되어 있습니다.";
var gridDataSetNm =""; 		//grid 초기값셋팅을 위한 데이터셋받기
//window.onunload = exitCo; //강제창닫기(x, alt+f4) 이벤트 발생시 로그아웃 함수 호출, 중복로그인제거

//############################## DataSetBaControl 관련 #############################
	loadDataSetBaControl();
	getControlDataSetCo();

// 컨트롤 DataSet(DataSetBaControl) 로드
function loadDataSetBaControl() {
	document.write("<object id=DataSetBaControl classid=clsid:3267EA0D-B5D8-11D2-A4F9-00608CEBEE49 ></object>");	
	document.write("<Object id=tr_bacontrol classid=clsid:0A2233AD-E771-11D2-973D-00104B15E56F >");   
	document.write("	<param name=KeyName	 value=toinb_dataid4>");
	document.write("	<param name=KeyValue value=JSP(O:DataSetBaControl=DataSetBaControl)>");     
	document.write("	<param name=Action	 value=/servlet/GateServlet>");                     
	document.write("    <param name=Protocol value=1>");                                              
	document.write("</object>");                                                                          
	document.write("<object id=tr_bacontrol_in classid=clsid:0A2233AD-E771-11D2-973D-00104B15E56F >");   
	document.write("	<param name=KeyName	   value=toinb_dataid4>");
	document.write("	<param name=KeyValue   value=JSP(I:DataSetBaControl=DataSetBaControl)>");     
	document.write("	<param name=Action	   value=/servlet/GateServlet>");                     
	document.write("    <param name=Protocol   value=1>");                                              
	document.write("</object>");                                                                          
}

// 화면별 컨트롤별 DataSet(DataSetBaControl) 조회
function getControlDataSetCo(){
	tr_bacontrol.Parameters = "jobId=JobBaSelect,daoId=getControlList:hwamyeonId="+getHwamyeonIdCo().toLowerCase();
	tr_bacontrol.post();
}
// 컨트롤 초기값 설정
// 01:텍스트 02:라디오 03:check_box 04:select_box 51:EmEdit  52:gauce라디오  53:guace체크  54:luxeCombo 59:grid
// 사용예) setInitControlCo(0) 포커스없음 -- 주로 화면 onload시 컨트롤 초기값 설정에 사용
//		   setInitControlCo(2) 2번째 컨트롤에 포커스 -- 주로 AddRow시 컨트롤 초기값 설정에 사용
function setInitControlCo(focusField){
	for(var i=1; i<=DataSetBaControl.CountRow; i++){
		var controlCls = DataSetBaControl.NameValue(i,"ctrl_cls");
		var inputOrd   = DataSetBaControl.NameValue(i,"input_ord");
		//focusField값이 1이상이면 입력순서도 1이상 이어야만 처리
		//focusField값이 0이하이면 입력순서도 0이하 인것만 처리
		if(((focusField<=0)&&(inputOrd>0)&&(inputOrd<100))||((focusField>0)&&(inputOrd<=0))) continue;
						
		if(controlCls != "59"){	   // grid가 아닌 것
			var controlId = DataSetBaControl.NameValue(i,"ctrl_id");	
			var chokiGap  = DataSetBaControl.NameValue(i,"choki_gap");
			var objColumn = eval(controlId);

			if(i==focusField){ 
				if(objColumn.Enable != false) objColumn.focus();  	//ctrl상태가 disable이 아닌경우 focus
				if(controlCls       !="52")   objColumn.Select;
			}
			switch(controlCls){    									//컨트롤별 초기값 설정
				case "01":  //Text(Html)
					objColumn.value = chokiGap;
					break;
				case "03":  //checkbox
					objColumn.checked = eval(chokiGap);
					break;
				case "51":  //EmEdit
					objColumn.Text = chokiGap;
					break;
				case "54":	//luxecombo
					if(chokiGap!="") objColumn.Index = chokiGap;
					break;
				case "52":  //가우스 radio
					objColumn.CodeValue = chokiGap;
					break;
			}
	    }
	}//for-end
}

//다른 초기값은 세팅없이 버튼만 초기화(실행가능 or 불가능)
//다른 것까지 초기화 시키면 문제가 되기때문 버튼 부분만 추출해서 만듬.
function setInitButtonCo(){
}			

//  사용자 control 값 DB에 저장
function saveUserControlValue(taskCls){
	var msg = " 현재 화면에 있는 값들이 기본값으로 설정됩니다. \n\n 설정하시겠습니까? ";
	if(taskCls=="setHwamyeonSettingDefault") msg = " 설정된 화면 기본값을 초기화하시겠습니까? ";
	
	if(confirm(msg)){
		//1.사용자 컨트롤을 DataSetBaControl에 저장
		saveTempUserControlValue();
		//2.DB에 저장
		tr_bacontrol_in.Parameters = "jobId=JobBaControl,taskCls="+taskCls+",hwamyeonId="+getHwamyeonIdCo();
		tr_bacontrol_in.post();
	}	
}

//user 컨트롤 value(초기값 등)을 DataSetBaControl에 임시저장 한다.
//이후부터는 입력 mode에서 user별 초기값이 반영된다.
function saveTempUserControlValue(){
	for(var i=1; i<=DataSetBaControl.CountRow; i++){
		var controlCls	= DataSetBaControl.NameValue(i,"ctrl_cls");
		
		//컨트롤중 grid가 아닌 것
		var controlId="";
		var objColumn="";

		if(controlCls=="59"){
			controlId	= DataSetBaControl.NameValue(i,"ds_field_id");	
		}else{
			controlId	= DataSetBaControl.NameValue(i,"ctrl_id");	
			objColumn   = eval(controlId);
		}
		switch(controlCls){
			case "01":  //Text(Html)
				DataSetBaControl.NameValue(i,"choki_gap") = objColumn.value;
				break;
			case "03":  //checkbox
				DataSetBaControl.NameValue(i,"choki_gap") = String(objColumn.checked);
				break;
			case "51":   //EmEdit
				DataSetBaControl.NameValue(i,"choki_gap") = objColumn.Text;
				break;
			case "54":	 //luxecombo
				DataSetBaControl.NameValue(i,"choki_gap") = objColumn.Index;
				break;
			case "52":   //가우스 radio
				DataSetBaControl.NameValue(i,"choki_gap") = objColumn.CodeValue;
				break;
			case "59":  //grid
				if(gridDataSetNm.CountRow>0)
					DataSetBaControl.NameValue(i,"choki_gap") = gridDataSetNm.NameValue(gridDataSetNm.RowPosition,controlId)+"";
				break;
		}
	}//for-end
}

//saveTempUserControlValue로 설정을 임시 저장할 시 
//grid에 있는 값은 셋팅이 안되므로 해당 grid의 dataset을 전역변수에 담는다.
function gridChogiDataSetCo(dataSetNm){
	gridDataSetNm=dataSetNm;
}

// grid컬럼 초기값 Setting
// AddRow 직후 초기값 설정   사용예) setInitControlGridCo(dataSetNm)
function setInitControlGridCo(dataSetNm){
	for(var i=1; i<=DataSetBaControl.CountRow; i++){
		var controlCls	= DataSetBaControl.NameValue(i,"ctrl_cls");
		//컨트롤 구분이 그리드(59)면서 초기값이 있는 것						
		if(controlCls=="59" && DataSetBaControl.NameValue(i,"choki_gap")!=""){
			dataSetNm.NameValue(dataSetNm.RowPosition,DataSetBaControl.NameValue(i,"ds_field_id")) = DataSetBaControl.NameValue(i,"choki_gap");
		}
	}
}

// 필수입력 컨트롤 Color 설정 및 enable, disable 설정
// 호출예)pilsuColorChange()
function pilsuColorChangeCo(){
	var ctrlCls, insertStatus, ctrlId, objColumn;
	
	for(var i=1; i<=DataSetBaControl.CountRow; i++){
		ctrlCls = DataSetBaControl.NameValue(i,"ctrl_cls");	
		// grid가 아닌 컨트롤이 작업대상		
		if(ctrlCls != "59"){
			insertStatus = DataSetBaControl.NameValue(i,"insert_status");
			pilsuCls     = DataSetBaControl.NameValue(i,"pilsu_cls");
			ctrlId       = DataSetBaControl.NameValue(i,"ctrl_id");
			objColumn    = eval(ctrlId);
			
			//필수입력 색상설정(라디오제외)
			if(pilsuCls=="1" && ctrlCls!="52") objColumn.style.backgroundColor = pilsuColor;
			
			//입력모드 시 disable 시켜야 할 것들에 대한 disable 작업
			if(insertStatus=="0"){
				if(ctrlCls=="51") objColumn.ReadOnlyBackColor = disableColor;
				else if(ctrlCls=="54") objColumn.ReadOnlyBackColor = disableColor;
				else if(ctrlCls != "52") objColumn.style.backgroundColor = disableColor;
				
				if(ctrlCls=="52"||ctrlCls=="54") objColumn.Enable   = false;  //가우스radio와 가우스luxecombo
				else                             objColumn.readOnly = true;   //기타 컨트롤                               
			}
		}
	}
}

/*--------------------------------------------------------------------------------
  ## 컨트롤 상태를 일괄적으로 설정(DataSet OnRowPosChange 이벤트에서 주로 호출)
	 objColumn.disabled = true;//일반 html컨트롤에만 적용됨
	 objColumn.enable   = false; //가우스 컨트롤에만 적용됨	
	 objColumn.readOnly = true; //readOnly에서 O는 대문자여야함
	 objColumn.style.color='#00ff00'; 글자색변경
	 objColumn.style.background='#00ff00'; 백그라운드변경
----------------------------------------------------------------------------------*/
function setControlStatusCo(status){
	var ctrlCls, insertStatus, ctrlId, objColumn, inputOrd;
	
	for(var i=1; i<=DataSetBaControl.CountRow; i++){
		ctrlCls = DataSetBaControl.NameValue(i,"ctrl_cls");	
		inputOrd = DataSetBaControl.NameValue(i,"input_ord");
		// grid가 아닌 컨트롤이 작업대상		
		if(ctrlCls != "59"){
			insertStatus = DataSetBaControl.NameValue(i,"insert_status");
			pilsuCls     = DataSetBaControl.NameValue(i,"pilsu_cls")
			ctrlId       = DataSetBaControl.NameValue(i,"ctrl_id");
			objColumn    = eval(ctrlId);
			
			//입력모드에서 disable 아닌것들만 작업대상
			//입력모드에서 disable인 것들은 처음부터 끝까지 disable 
			if((insertStatus != "0")&&(inputOrd>0)){
				//파라미터가 disabled --주로 조회모드에서 호출
				if(status=="disabled"){
					if(ctrlCls=="52"||ctrlCls=="54") objColumn.Enable   = false;
					else                             objColumn.readOnly = true;
				//파라미터가 enable  -- 주로 insert 모드에서 호출
				}else if(status=="enable"){
					if(ctrlCls=="52"||ctrlCls=="54") objColumn.Enable   = true;
					else                             objColumn.readOnly = false;
				}
			}
		}
	}
}

//	DataSet의 row상태에 따라 거래처 popup 조회 버튼을 enable, disabed 시키는 함수
function setClntButtonStatusCo(rowStatus){
	if(rowStatus==1) button_clnt.disabled = false;
	else             button_clnt.disabled = true;
}		

// 현재 ROW의 상태값이 1(insert mode)인 건 Control을 true, 아니면 false
// 호출예 : setControlByRowStatusCo(dataSetNm)  이벤트 : OnRowPosChange
function setControlByRowStatusCo(dataSetNm) {
	if(dataSetNm.SysStatus(dataSetNm.RowPosition)==0){ 
		setControlStatusCo('disabled');
	}else if(dataSetNm.SysStatus(dataSetNm.RowPosition)==1){
		setControlStatusCo('enable');
	}
}

// 필수입력(not null) 컨트롤을 모두 입력했는지 check
// 호출예=>checkNotNullCo(데이터셋아이디)
function checkNotNullCo(dataSetId){
	var errorCnt    = new Array();                 //에러코드 전체를 뿌려주기
	var controlName = "";
	var columnValue ;
	var notNullYn   = "";
	var k=1;                                        //첫컬럼명만 저장후 포커스 반영하기 위한 인수

	//입력mode인 행이 필수값이 비어있을 경우가 많기 때문에 밑에서 부터 검사
	for(var i=dataSetId.CountRow; i>=1; i--){
		//입력 또는 수정 mode인 행만 검사
		if(dataSetId.SysStatus(i)==1 || dataSetId.SysStatus(i)==3){
			for(var j=1; j<=DataSetBaControl.CountRow; j++){
				 if(DataSetBaControl.NameValue(j,"ctrl_cls") != "59"){
					columnValue = dataSetId.NameValue(i,DataSetBaControl.NameValue(j,"ds_field_id"));
					notNullYn   = DataSetBaControl.NameValue(j,"pilsu_cls");
					
					if(notNullYn=="1" && (columnValue=="" || columnValue==0)){
						if(columnValue==""){
							if(k=="1")controlName = DataSetBaControl.NameValue(j,"ctrl_id");//첫컨트롤명만 저장후 포커스 반영
							errorCnt.unshift(DataSetBaControl.NameValue(j,"ctrl_nm"));
							k++;
						}else if(columnValue==0 && DataSetBaControl.NameValue(j,"ctrl_cls") != "52"){
							if(k=="1")controlName = DataSetBaControl.NameValue(j,"ctrl_id");//첫컨트롤명만 저장후 포커스 반영
							errorCnt.unshift(DataSetBaControl.NameValue(j,"ctrl_nm"));
							k++;
						}
					}
				}
			}
			if(errorCnt.length>0){
				dataSetId.RowPosition = i;
				errorCnt.reverse();
				alert(errorCnt.join(", ")+" \n\n값은 반드시 있어야 합니다. ");
				return controlName;
			}
		}
	}
	return "";
}

// 그리드에서 필수입력컬럼을 모두 입력했는지 check
// =>호출예) checkNotNullGridCo(DataSetBa113RU)
function checkNotNullGridCo(dataSetId){
	var errorCnt    = new Array(); //에러코드 전체를 뿌려주기
	var controlName = "";
	var columnValue ;
	var notNullYn   = "";
	var k=1;//첫컬럼명만 저장후 포커스 반영하기 위한 인수

	//입력mode인 행이 필수값이 비어있을 경우가 많기 때문에 밑에서 부터 검사
	for(var i=dataSetId.CountRow; i>=1; i--){
		//입력 또는 수정 mode인 행만 검사
		if(dataSetId.RowStatus(i)==1 || dataSetId.RowStatus(i)==3){
			for(var j=1; j<=DataSetBaControl.CountRow; j++){	
				if(DataSetBaControl.NameValue(j,"ctrl_cls") == "59"){
					columnValue = dataSetId.NameValue(i,DataSetBaControl.NameValue(j,"ds_field_id"));
					notNullYn   = DataSetBaControl.NameValue(j,"pilsu_cls");
					
					if(notNullYn=="1" && (columnValue=="" || columnValue==0)){
						if(k=="1")controlName = DataSetBaControl.NameValue(j,"ds_field_id");//첫컨트롤명만 저장후 포커스 반영
						errorCnt.unshift(DataSetBaControl.NameValue(j,"ctrl_nm"));
						k++;
					}
				}
			}
			if(errorCnt.length>0){
				dataSetId.RowPosition = i;
				errorCnt.reverse();
				alert(errorCnt.join(", ")+" \n\n값은 반드시 있어야 합니다. ");
				return controlName;
			}
		}
	}
	return "";
}

// 필수입력컨트롤을 모두 입력했는 지 check 후 다음 focus 위치
// 호출예=>checkNotNullAndFocusCo(DataSetBa502RU)
function checkNotNullAndFocusCo(dataSetId){
	var checkColumName = checkNotNullCo(dataSetId);
	if(checkColumName !="")setFocusCo(checkColumName);
	else return true;				
}

//GRID data의 유효성 체크 
// 호출예) checkNotNullGridAndFocusCo(DataSetBa502RU,grd_ba111)
function checkNotNullGridAndFocusCo(dataSetId,gridName){
	var checkColumName = checkNotNullGridCo(dataSetId);
	if(checkColumName !="") gridName.SetColumn(checkColumName);
	else return true;				
}

// 현재컨트롤의 다음 컨트롤값 리턴   예) nextFieldNm(this,'1') 
//nextFieldNm(obj,row) row는 기본값1이다. 중간에 readonly등으로 컨트롤 이동이 두개이상일때 값을 변경해줌
function nextFieldNm(obj,row) {
	var objName = obj.id;
	var posRow = DataSetBaControl.NameValueRow("ctrl_id",objName);
	posRow = eval(posRow)+eval(row);
	var controlId = DataSetBaControl.NameValue(posRow,"ctrl_id");
	return eval(controlId);
}

// ###########################  DataSetBaControl관련 끝 ############################

// 빈행 추가(AddRow) 여부 체크(하나라도 삽입모드인 행이 있으면 추가 불가)
// 한행만 추가입력 가능 -- 컨트롤에 입력하는 경우
function canAddRowCo(DataSet){
	for(var i=1; i<=DataSet.CountRow; i++) if(DataSet.SysStatus(i)== 1) return false;
	return true;
}
// 현재 화면 id가져오기 -- control DataSet 가져올때 이용
function getHwamyeonIdCo(){
		var startIndex = location.pathname.lastIndexOf("/")+1;
		var endIndex = location.pathname.lastIndexOf(".");
		return location.pathname.substring(startIndex,endIndex);
}
// 증빙종류 조회
function getJeungbingKndCo(){
	tr_jeungbing.Parameters = "jobId=JobBaSelect2,daoId=getJeungbingKnd";
	tr_jeungbing.post();
}

// ###################  code성 Data 유효성검사 관련 시작 ############################
// 코드 체크용 데이터셋 호출
// 예) dataSetCallCo(dataSetNm,trNameObj,'b01BuseoNm',userCodeVal,cls)
function dataSetCallCo(dataSetNm, trNameObj, gubunName, userCodeVal,cls) {
	trNameObj.Parameters = "jobId=JobBaCodeChk,"+dataSetNm+"="+gubunName+",uCode="+userCodeVal+",cls="+cls;  
	trNameObj.post();
}
// 코드의 유효성 체크 : html 입력화면에서 코드값을 입력하고, onblur 이벤트시 발생, 해당코드의 이름을 뿌려준다. 
// 호출예)userCodeCheckCo('DataSetBa502RU','tr_sawon_cd_check','biz_damdang_nm','DataSetBaSawonCode', 'b02SawonNm', this,'popup')
function userCodeCheckCo(dataSetNm,trName,nameField,dataSetNmChk,gubunName,userCodeObj,cls,errMsg){
	dataSetNameObj    = eval(dataSetNm);
	dataSetNameChkObj = eval(dataSetNmChk);
	trNameObj         = eval(trName);
	userCodeVal       = userCodeObj.value;
	
	//값이 없을때에 에러 나오지 않게
	if(userCodeObj.value == ""){
		dataSetNameObj.NameValue(dataSetNameObj.RowPosition, nameField) = "";
		return true;
	}else if(userCodeObj.value != ""){		
		dataSetCallCo(dataSetNmChk,trNameObj,gubunName,userCodeVal,cls);
		if(dataSetNameChkObj.CountRow==1){
			/* 유효성 체크후 true일때 현재 dataset에 받아온 값을 셋팅 */
			dataSetNameObj.NameValue(dataSetNameObj.RowPosition, nameField) = dataSetNameChkObj.NameValue(1,"name");
			return true;
		}else{
			errorMsgToTitleBarCo(errMsg);
			dataSetNameObj.NameValue(dataSetNameObj.RowPosition, nameField) = "";
			initFocusCo(userCodeObj);
			return false;
		}
		return true;
	}
}

// 그리드 코드의 유효성 체크 
// 호출예)userCodeGridCheckCo('DataSetBa502RU','tr_sawon_cd_check','biz_damdang_nm','DataSetBaSawonCode', 'b02SawonNm', this,'popup','에러')
function checkDataSetGridCode(dataSetNm,row,columnNm,chkDataSetNm,chkColumnNm,changeColumnNm,chkColumnValue,popup,cls,trNameObj,gubunName) {
	dataSetNameChkObj = eval(chkDataSetNm);
	if(chkColumnValue==""){
		dataSetNm.NameValue(row, columnNm) = "";
		return true;		
	}else if(chkColumnValue != ""){	
		dataSetCallCo(chkDataSetNm, trNameObj, gubunName, chkColumnValue,cls);
	   
	   if(dataSetNameChkObj.CountRow==1){
			dataSetNm.NameValue(row, columnNm) = dataSetNameChkObj.NameValue(1,"name");
			return true;
		}else{
			if(popup==""){
				alert("등록되지 않은 코드입니다.");
				return false;	
			}else{
				if (confirm('등록되지 않은 코드입니다.\n 검색하시겠습니까?') == false){
					return false;
				}else{ 
					eval(popup);
					return false;
				}
			}
		}
	}
}

// 화면별 거래적요코드의 유효성 체크 및 적요정보 가져오기
// html 입력화면에서 코드값을 입력하고, onblur 이벤트시 발생, 해당코드의 이름을 뿌려준다. 
// 호출예)checkJeokyoCodeCo('DataSetBa502RU','biz_damdang_nm',this,'popup')
function checkJeokyoCodeCo(dataSetNm,nameField,popup,userCodeObj,georaeCls,upjongCls,ipchulCls,oehwaCls,drcrCls,uAcctCd){
	dataSetNameObj = eval(dataSetNm);
	userCodeVal    = userCodeObj.value;
	
	if(dataSetNameObj.sysStatus(dataSetNameObj.RowPosition)!=1) return;
	if(userCodeObj.value == ""){
		dataSetNameObj.NameValue(dataSetNameObj.RowPosition, nameField)            = "";
		dataSetNameObj.NameValue(dataSetNameObj.RowPosition, "georae_jeokyo_cd")   = "";
		return;
	}else if(userCodeObj.value != ""){		//값이 없을때에 에러메세지 나오지 않게
		dataSetCallJeokyoCo(userCodeVal,georaeCls,upjongCls,ipchulCls,oehwaCls,drcrCls,uAcctCd);
		if(DataSetBa540R.CountRow==1){
			/* 유효성 체크후 true일때 현재 dataset에 받아온 값을 셋팅 */
			var code          = DataSetBa540R.NameValue(DataSetBa540R.RowPosition, "u_georae_jeokyo_cd");
			var name          = DataSetBa540R.NameValue(DataSetBa540R.RowPosition, "georae_naeyeok");
			var pcode         = DataSetBa540R.NameValue(DataSetBa540R.RowPosition, "georae_jeokyo_cd");
			var uDrAcctCd     = DataSetBa540R.NameValue(DataSetBa540R.RowPosition, "u_dr_acct_cd");
			var uCrAcctCd     = DataSetBa540R.NameValue(DataSetBa540R.RowPosition, "u_cr_acct_cd");
			var drAcctNm      = DataSetBa540R.NameValue(DataSetBa540R.RowPosition, "dr_acct_nm");
			var crAcctNm      = DataSetBa540R.NameValue(DataSetBa540R.RowPosition, "cr_acct_nm");
			var drBalJeongCls = DataSetBa540R.NameValue(DataSetBa540R.RowPosition, "dr_bal_jeong_cls");
			var crBalJeongCls = DataSetBa540R.NameValue(DataSetBa540R.RowPosition, "cr_bal_jeong_cls");
			var juGeoraeCls   = DataSetBa540R.NameValue(DataSetBa540R.RowPosition, "ju_georae_cls");
			/* 거래내역을 현재 데이터셋에 뿌려주기 */
			dataSetNameObj.NameValue(dataSetNameObj.RowPosition, "u_georae_jeokyo_cd") = code;
			dataSetNameObj.NameValue(dataSetNameObj.RowPosition, "georae_jeokyo_cd")   = pcode;
			dataSetNameObj.NameValue(dataSetNameObj.RowPosition, nameField) = name;
			
			var rtnObj  = new JeokyoRtnObjCo(code, name, pcode, uDrAcctCd, uCrAcctCd, drAcctNm, crAcctNm, drBalJeongCls, crBalJeongCls, juGeoraeCls);
			return rtnObj;
		}else{
			errorTextCo("등록되지 않았거나, 현 화면에서 사용할 수 없는 코드입니다");
			dataSetNameObj.NameValue(dataSetNameObj.RowPosition, nameField) = "";
			initFocusCo(userCodeObj);
			return false;
		}
	}
}
// 화면별 거래적요코드 체크용 데이터셋 호출
// 예) dataSetCallJeokyoCo(userCodeVal,georaeCls,upjongCls,ipchulCls,oehwaCls,drcrCls,uAcctCd);
function dataSetCallJeokyoCo(searchWord,georaeCls,upjongCls,ipchulCls,oehwaCls,drcrCls,uAcctCd) {
	var Parameters =  "jobId=JobBa543";
		Parameters +=",searchGubun=code";
		Parameters += ",searchWord=" +searchWord;
		Parameters += ",georaeCls="+georaeCls;
		Parameters += ",upjongCls="+upjongCls;
		Parameters += ",ipchulCls="+ipchulCls;
		Parameters += ",oehwaCls="+oehwaCls;
		Parameters += ",drcrCls="+drcrCls;
		Parameters += ",uAcctCd="+uAcctCd;
		tr_ba540r.Parameters = Parameters;
		tr_ba540r.post();
}
// 화면별 계좌코드의 유효성체크 및 계좌정보 가져오기
// 계좌정보--통화코드, 외화계좌여부
function checkGyejwaCodeCo (georaeDataSet, uClntCd, clntNm, txtUClntCd){
	var userCode    = txtUClntCd.value;   //사용자코드값
	
	if(userCode == ""){
		georaeDataSet.NameValue(georaeDataSet.RowPosition, uClntCd) = "";
		georaeDataSet.NameValue(georaeDataSet.RowPosition, clntNm)  = "";
		return;
	}else if(userCode != ""){		       
		var parameters ="jobId=JobBaSelect2, daoId=getClntPopup:clntCls=2:oehwaGyejwaCls=%";
		parameters +=":searchGubun=code:searchWord="+userCode;
		tr_gyejwa.Parameters = parameters;
		tr_gyejwa.post();
		
		if(DataSetBaPopupClnt.CountRow==1){
			var code           = DataSetBaPopupClnt.NameValue(DataSetBaPopupClnt.RowPosition, "code");
			var uCode          = DataSetBaPopupClnt.NameValue(DataSetBaPopupClnt.RowPosition, "u_code");
			var name           = DataSetBaPopupClnt.NameValue(DataSetBaPopupClnt.RowPosition, "name");
			var uTonghwaCd     = DataSetBaPopupClnt.NameValue(DataSetBaPopupClnt.RowPosition, "u_Tonghwa_cd");
			var oehwaGyejwaCls = DataSetBaPopupClnt.NameValue(DataSetBaPopupClnt.RowPosition, "oehwa_gyejwa_cls");
			georaeDataSet.NameValue(georaeDataSet.RowPosition, uClntCd) = uCode;
			georaeDataSet.NameValue(georaeDataSet.RowPosition, clntNm)  = name;
			
			var rtnObj  = new RtnClntObj(code, uCode, name, uTonghwaCd, oehwaGyejwaCls);
			return rtnObj;
		}else{
			errorTextCo(noCode);
			georaeDataSet.NameValue(georaeDataSet.RowPosition, clntNm) = "";
			initFocusCo(txtUClntCd);
		}
	}
}

//계좌체크 함수 리턴객체(obj) 생성자
function RtnClntObj(code,uCode,name,uTonghwaCd,oehwaGyejwaCls){
	this.pcode	        = code;
	this.code	        = uCode;
	this.name	        = name;
	this.uTonghwaCd     = uTonghwaCd;
	this.oehwaGyejwaCls = oehwaGyejwaCls;
}	
// 관리항목정보 가져오기
function getMgtItemInfoCo(uMgtItemCd) {
	if(isNotNullCo(uMgtItemCd)){
		tr_mgt_item_r.Parameters="jobId=JobBaSelect2,daoId=getMgtItemList:uMgtItemCd="+uMgtItemCd;
		tr_mgt_item_r.post();
		
		if(DataSetBa108RU.CountRow ==0) return;
		var code   		  = DataSetBa108RU.NameValue(DataSetBa108RU.RowPosition, "u_mgt_item_cd");
		var name   		  = DataSetBa108RU.NameValue(DataSetBa108RU.RowPosition, "mgt_item_nm");
		var pcode  		  = DataSetBa108RU.NameValue(DataSetBa108RU.RowPosition, "mgt_item_cd");
		var mgtItemKndCls = DataSetBa108RU.NameValue(DataSetBa108RU.RowPosition, "mgt_item_knd_cls");
		var uAcctCd  	  = DataSetBa108RU.NameValue(DataSetBa108RU.RowPosition, "u_acct_cd");
		var acctCls       = DataSetBa108RU.NameValue(DataSetBa108RU.RowPosition, "acct_cls");
		
		var rtnObj = new MgtItemRtnObjCo(code,name,pcode,mgtItemKndCls,uAcctCd,acctCls);
		return rtnObj;
	}
}	

//사용자코드를 변경시킬 것인지 경고성 질문
function wantCodeChangeCo(userCodeObj, dataSet, colId){
	var orgValue = dataSet.OrgNameValue(dataSet.RowPosition, colId);
	var nowValue = dataSet.NameValue(dataSet.RowPosition, colId);
	if((dataSet.SysStatus(dataSet.RowPosition)==1)||(orgValue==nowValue)) return true;
	if(confirm(" 변경전 코드로 등록된 데이터가 있을 경우 \n\n 새로운 코드로 표시됩니다. 변경하시겠습니까? ")){
		return true;
	}else{	
		dataSet.NameValue(dataSet.RowPosition, colId) =  orgValue;
		if     (userCodeObj.tagName=="OBJECT") userCodeObj.Text  = orgValue;
		else if(userCodeObj.tagName=="INPUT")  userCodeObj.value = orgValue;
		return false;
	}
}
// ###################  code Data 유효성검사 관련 끝 ###########################

// Header Click시 Sort하기
function sortCo(Row,colId,globalColId,dsName,colIds) {
	//var args = "";
	//상위에 globalColId  선언되어 있음*/
	if (Row != 0) return;

	var colName = new Array();
	var colLen;
	colName = colIds.split(";");
	colLen = colName.length-1;
	
	if (globalColId == colId) {
		globalColId = '';		
		dsName.SortExpr = "+"+colId;
		for (i=0; i<=colLen; i++) {
			if (colName[i] == colId) continue;
			dsName.SortExpr = dsName.SortExpr + "+"+colName[i];
		}
		dsName.Sort();	
		dsName.Rowposition = 1
		return(globalColId);
	}else {
		globalColId = colId;
		dsName.SortExpr = "-"+colId;
		for (i=0; i<=colLen; i++) {
			if (colName[i] == colId) continue;
			dsName.SortExpr = dsName.SortExpr + "+"+colName[i];
		}
		dsName.Sort();
		dsName.Rowposition = 1
		return(globalColId);
	}
}
// 엑셀 다운로드
function runExcelCo(gridName){
	gridName.GridToExcel(document.title,document.title,2);
}
// 데이터넷의 조회 데이터수
function rowCount(countRow)	{
	window.status ="조회된 데이터는 총 "+ countRow +" 건입니다.";
	setTimeout('initWindowStatusCo()',3000); //3000은 3초, 3초후엔 window status 초기화
}

//######################### grid의 check_box 관련 시작 ############################

// Check Header 클릭시 전체 선택, 해제 
// chk header 해더클릭시 이벤트 발생
function selectAllHeader(dataset){	
	if(globalChk == ""){
		globalChk = "T";
		for(i=1; i<= dataset.CountRow; i++){
			dataset.NameValue(i, "check_box") = 'T';
		}
	}else{
		globalChk = "";
		for(i=1; i<= dataset.CountRow; i++){
			dataset.NameValue(i, "check_box") = 'F';
		}
	}
}

function selectAllHeader2(dataset,colId){	
	if(globalChk == ""){
		globalChk = "T";
		for(i=1; i<= dataset.CountRow; i++){
			dataset.NameValue(i, colId) = 'T';
		}
	}else{
		globalChk = "";
		for(i=1; i<= dataset.CountRow; i++){
			dataset.NameValue(i, colId) = 'F';
		}
	}
}
//전체선택
function checkedAllCo(DataSet){
	for(i=1; i<= DataSet.CountRow; i++) DataSet.NameValue(i, "check_box") = 'T';
}
//전체해제
function uncheckedAllCo(DataSet){
	for(i=1; i<= DataSet.CountRow; i++) DataSet.NameValue(i, "check_box") = 'F';
}
//-------------------------------------------------------------------
// Grid에서 checkBox가 check된 갯수(row수)
//-------------------------------------------------------------------
function getCheckedRowsCo(dataSetId){
	var checkedRows = 0;
	//dataSet은 1부터 시작함.
	for(var i=1; i<=dataSetId.CountRow; i++){
		if(dataSetId.NameValue(i, "check_box")=="T"){
			checkedRows = checkedRows + 1;
		}
	}
	return checkedRows;
}

//-------------------------------------------------------------------
// Grid에서 CheckBox가 check 된것의 합계를 산출해 리턴하는 함수
//   호출예) getCheckedRowsSumCo(DataSetBa113RU, "amt")
//-------------------------------------------------------------------
function getCheckedRowsSumCo(dataSetId, columnNm){
	var checkedRowsSum = 0;
	//dataSet은 1부터 시작함.
	for(var i=1; i<=dataSetId.CountRow; i++){
		if(dataSetId.NameValue(i,"check_box")=="T"){
			checkedRowsSum = checkedRowsSum + dataSetId.NameValue(i,columnNm);
		}
	}
	return checkedRowsSum;
}
//-------------------------------------------------------------------
// Grid에서 CheckBox가 check 된것의 평균을 산출해 리턴하는 함수
//-------------------------------------------------------------------
function getCheckedRowsAvgCo(dataSetId, columnNm){
	var checkedRowsSum = 0;
	var j=0;
	//dataSet은 1부터 시작함.
	for(var i=1; i<=dataSetId.CountRow; i++){
		if(dataSetId.NameValue(i,"check_box")=="T"){
			checkedRowsSum = checkedRowsSum + dataSetId.NameValue(i,columnNm);
			j++;
		}
	}
	if(checkedRowsSum == 0) return 0;
	else return (checkedRowsSum/j);
}
//-------------------------------------------------------------------------------------------
// check 된 분개순번을 문자열로 연결해 return하는 함수 -- grid에서
// 이벤트가 일어날때마다 row순서대로 재처리하므로 조회된 dataSet의 row순서로 자동 sorting됨.
//-------------------------------------------------------------------------------------------
function getCheckedBungaeSeqs(dataSetId){
	//dataSet은 1부터 시작함.
	var bungaeSeqs="";
	var j = 0;
	for(var i=1; i<=dataSetId.CountRow; i++){
		if(dataSetId.NameValue(i,"check_box")=="T"){
			if(j==0) bungaeSeqs = bungaeSeqs + dataSetId.NameValue(i,"bungae_seq");
			else     bungaeSeqs = bungaeSeqs + ";" + dataSetId.NameValue(i,"bungae_seq");
			j++;
		}
	}
	return bungaeSeqs;
}

//----------------------------------------------------------------------------------
//######################### grid의 check_box 관련 끝 ##############################
//----------------------------------------------------------------------------------

//-------------------------------------------------------------------
// DataSet의 내용 출력하기
// 파라미터 dataSetId는 Object, dataSetName은 String()
//   호출예) showDataSet(DataSet101RU, "DataSet101RU")
//-------------------------------------------------------------------
function showDataSetCo(dataSetId,dataSetName){
	var dataSetStatus = "dataSet이름 : ["+dataSetName+"]\n";
	for(var i=1;i<=dataSetId.CountRow; i++){
		dataSetStatus = dataSetStatus +i+"번째행 => jobType:["+dataSetId.RowStatus(i)+"] ";
		for(var j=1; j<=dataSetId.CountColumn; j++){
			dataSetStatus = dataSetStatus + dataSetId.ColumnId(j) + ":,["+noValueToStrCo(dataSetId.ColumnValue(i,j))+"]   ";
		}
		dataSetStatus =  dataSetStatus + "\n\n";
	}
	alert(dataSetStatus);
}
//-------------------------------------------------------------------
// Luxecombo에서 값 입력후 포커스 이동시 코드값의 유효성체크
// 예) chkLuxecomboData(obj)  - obj 는 luxccombo명
//-------------------------------------------------------------------
function chkLuxecomboData(obj) {
	if(!searchChkCo(obj)){
		errorTextCo(noCode);
		obj.Select;
		obj.Focus();
	}
}
//-------------------------------------------------------------------
// Luxecombo에서 값 입력후 search한 후 함수 호출
// 예) searchChk(obj)  - obj 는 luxccombo명
//-------------------------------------------------------------------
function searchChkCo(obj) { 		
	if(obj.Text=="") return 1;
	var rtnVal = obj.ShowSearchCol();		
	if( rtnVal == 0){	// 해당 데이터가 없을 경우 다시 LuxeCombo에 포커스 이동
		return 0;
	}
	if( rtnVal > 1){		// 해당 데이터가 2개 이상일 경우 다시 LuxeCombo에 포커스 이동
		return 0;
	}
	return 1;
}
//-------------------------------------------------------------------
// Luxecombo에서 search후 호출할 함수, 데이터 초기화
// 예) luxecomboInit(obj)  - obj 는 luxccombo명
//-------------------------------------------------------------------
function luxecomboInitCo(obj) {
	obj.Select;
	obj.index = -1;
	obj.Focus();
}

//방향키 다운으로 Add Row 될때 1개 이상로우 되는걸 막음 
//datasetNm : 데이터셋명, keyColumn : 컬럼명 클라이언트에서"u_porj_cd"넘져줌
function addOneRow(datasetNm, keyColumn) {
	if(datasetNm.NameValue(datasetNm.RowPosition,keyColumn) != ""){
		datasetNm.AddRow();
	}
}
//-------------------------------------------------------------------
// 부동소수점 문제
// -- double과 double이 연산 시 부정확한 값이 연산되는 문제를 해결하기 위해
// -- 소수점 7째 자리에서 반올림한 후 절사해서 소수점 6째 짜리까지는 정확히 계산되도록 하는 것.
// -- 절사를 하지않고 반올림을 한 이유는 (-)금액도 있을 수 있기 때문
//-------------------------------------------------------------------
function fixDoubleCo(doubleNum){
	var tempNum = Math.round(doubleNum*1000000)/1000000;
	return tempNum;
}

//-------------------------------------------------------------------
// 종전원화금액 계산  -- 결제외화금액을 먼저처리한 후 처리하는 것으로 정의
// 파라미터: (1.결제외화금액, 2.잔액이있는DataSet)
// 리턴값 : 외화할인의 종전원화금액
//-------------------------------------------------------------------
function getJongjeonAmtCo(oehwaAmt, dataSet){
	if(isNullCo(oehwaAmt)) oehwaAmt=0;
	
	//임시 local 변수 
	var tempOehwaAmt   = oehwaAmt;  //외화
	var jongjeonAmtSum = 0;         //원화
	//외화금액이 0보다 커야함.
	if(oehwaAmt<=0)  return 0;
	//선택분개번호
	var bungaeSeqArr = new Array();
	var selectedBungaeSeqs = getCheckedBungaeSeqs(dataSet);
	//선택분개번호가 있으면 구분자(;)로 분리해서 배열에 저장	
	if(isNotNullCo(selectedBungaeSeqs)) bungaeSeqArr = selectedBungaeSeqs.split(";");
	
	var rowPos; 
	var oehwaBal;  //외화잔액
	var bal;       //원화잔액
	//선택분개순번 우선처리
	for(var i = 0; i<bungaeSeqArr.length;i++){
		//분개번호의 row위치를 찾아 해당 잔액가져오기
		rowPos    = dataSet.NameValueRow("bungae_seq", bungaeSeqArr[i]);
		oehwaBal  = dataSet.NameValue   (rowPos,       "ju_oehwa_bal");
		bal       = dataSet.NameValue   (rowPos,       "bal");
		//정산대상 분개의 외화잔액이 정산할 외화금액 보다 크거나 같으면 ==> 종전원화금액 = 원화잔액 * 정산할외화금액 / 외화잔액
		if(tempOehwaAmt<=oehwaBal){
			jongjeonAmtSum = jongjeonAmtSum + jeolsaCo(bal * tempOehwaAmt/oehwaBal);
			return jeolsaCo(jongjeonAmtSum);
			
		//정산대상 분개의 외화잔액이 정산할 외화금액 보다 작으면  종전원화금액 = 원화잔액
		}else{
			jongjeonAmtSum = jongjeonAmtSum + bal;
			tempOehwaAmt   = fixDoubleCo(tempOehwaAmt - oehwaBal);
		}
	}//close-for

	//우선정산 하려고 선택한 분개들로 정산이 안될 경우 나머지 분개들을 이용 선입선출로 정산
	if(tempOehwaAmt >0){
		for(var j=1; j<=dataSet.CountRow; j++){
			//잔액내역에서 분개번호를 하나씩 꺼내 확인 : 이미 정산된 선택분개번호면 skip
			//외부 for로 continue하기 위해 isSelected변수 도입
			var isSelected = false;
			var bungaeSeq = dataSet.NameValue(j, "bungae_seq");
			for(var k=0; k<bungaeSeqArr.length;k++){
				if(bungaeSeq == bungaeSeqArr[k]) isSelected = true;
			}
			if(isSelected) continue;
			
			oehwaBal  = dataSet.NameValue   (j, "ju_oehwa_bal");
			bal       = dataSet.NameValue   (j, "bal");
			//정산대상 분개의 외화잔액이 정산할 외화금액 보다 크거나 같으면 ==> 종전원화금액 = 원화잔액 * 정산할외화금액 / 외화잔액
			if(tempOehwaAmt<=oehwaBal){
				jongjeonAmtSum = jongjeonAmtSum + jeolsaCo(bal * tempOehwaAmt/oehwaBal);
				return jeolsaCo(jongjeonAmtSum);
			//정산대상 분개의 외화잔액이 정산할 외화금액 보다 작으면  종전원화금액 = 원화잔액
			}else{
				jongjeonAmtSum = jongjeonAmtSum + bal;
				tempOehwaAmt   = fixDoubleCo(tempOehwaAmt - oehwaBal);
			}
		}//close-for
	}
}

//-------------------------------------------------------------------
// luxecombo에서 젤 상위에 로우를 추가해줌
// insertRowLuxecomboCo(데이터셋명,코드컬럼명,네임컬럼명,보여질텍스트)
// 호출예) insertRowLuxecomboCo(DataSetBa502RU,"clnt_cd","clnt_nm","최상위")
//-------------------------------------------------------------------
function insertRowLuxecomboCo(dataSetId, codeColumn, nameColumn, nameColumnText){
	dataSetId.InsertRow(1);
	dataSetId.NameValue(1,codeColumn)="";
	dataSetId.NameValue(1,nameColumn)=nameColumnText;
}

//추가,수정된 행이 있으면 true를 return하는 함수
//하나만 발견되면 true return--performance를 위해
function haveChangedRow(dataSetNm){
	for(var i=dataSetNm.CountRow;i>=1;i--) {
		if     (dataSetNm.SysStatus(i)==1) return true;
		else if(dataSetNm.SysStatus(i)==3) return true;
	}
	return false;
}

//-------------------------------------------------------------------
// 중복데이터 체크 (현재 체크할 DataSet이 호출되어 있는 상태에서)
// 호출예) checkDuplicationCo(dastSetNm,columnNm, columnValue)
//-------------------------------------------------------------------
function checkDuplicationCo(dataSetNm, columnNm, controlObj)  {
   var columnValue = controlObj.value;
   if(dataSetNm.NameValueRow(columnNm, columnValue)==0) return
   if(dataSetNm.NameValueRow(columnNm, columnValue) != dataSetNm.RowPosition) {
    alert("이미 등록 되어 있습니다");
    initFocusCo(controlObj);
   }
}
//-------------------------------------------------------------------
// 중복데이터 체크 (현재 체크할 DataSet이 호출되어 있는 상태에서)
// 호출예) checkDupEmCo(dastSetNm,columnNm, columnValue)
//-------------------------------------------------------------------
function checkDupEmCo(dataSetNm, columnNm, controlObj)  {
   var columnValue = controlObj.Text;
   if(dataSetNm.NameValueRow(columnNm, columnValue)==0) return
   if(dataSetNm.NameValueRow(columnNm, columnValue) != dataSetNm.RowPosition) {
    alert("이미 등록 되어 있습니다");
    controlObj.focus();
   }
}
//-------------------------------------------------------------------
// 중복데이터 체크
// DB에서 동일데이터 있는지 check 후 있으면 어떻게할지 물어봄(confirm)
//-------------------------------------------------------------------
function checkDupDataCo(dataSetNm,colid,trName,dataSetNmChk,gubunName,ctrl,cls){
	var mainDataSet	 = eval(dataSetNm);
	var checkDataSet = eval(dataSetNmChk);
	var checkTr	     = eval(trName);
	var tagNm		 = ctrl.tagName;
	var chkData      = "";     
	var orgNameValue = mainDataSet.OrgNameValue(mainDataSet.RowPosition,colid);
	
	if     (tagNm=="OBJECT") chkData = ctrl.Text;
	else if(tagNm=="INPUT")  chkData = ctrl.value;
	
	if((orgNameValue==chkData)&&mainDataSet.SysStatus(mainDataSet.RowPosition)!=1) return;
	if(chkData=="") return;
	
	dataSetCallCo(dataSetNmChk,checkTr,gubunName,chkData,cls);
	
	if(checkDataSet.NameValue(1,"name")!=""){
		if(confirm(checkDataSet.NameValue(1,"name")+" \n위와 같은 동일한 데이터가 존재합니다. \n상관없이 입력하시겠습니까? ")) return;
	    else{	
			if(mainDataSet.SysStatus(mainDataSet.RowPosition)== 1){
				if     (tagNm=="OBJECT") ctrl.Text  = '';
				else if(tagNm=="INPUT")  ctrl.value = '';
			}else{ 
				if     (tagNm=="OBJECT") ctrl.Text  = orgNameValue;
				else if(tagNm=="INPUT")  ctrl.value = orgNameValue;
			}
			ctrl.focus();
		}	
	}
}
//-------------------------------------------------------------------
// 중복데이터 체크
// DB에서 동일데이터 있는지 있으면 입력안되게하고 에러메세지 출력
//-------------------------------------------------------------------
function checkDupDatasetCallCo(dataSetNm,colid,trName,dataSetNmChk,gubunName,userCodeObj,cls){
	var dataSetNameObj		= eval(dataSetNm);
	var dataSetNameChkObj	= eval(dataSetNmChk);
	var trNameObj			= eval(trName);
	var tagNm				= userCodeObj.tagName;
	if(tagNm=="OBJECT") userCodeVal	= userCodeObj.Text;
	else if(tagNm=="INPUT")userCodeVal	= userCodeObj.value;
	var orgNameValue		= dataSetNameObj.OrgNameValue(dataSetNameObj.RowPosition,colid);
	if(orgNameValue==userCodeVal && dataSetNameObj.SysStatus(dataSetNameObj.RowPosition)!= 1)return;
	if(userCodeVal != ""){		//값이 없을때에 에러메세지 나오지 않게
		dataSetCallCo(dataSetNmChk,trNameObj,gubunName,userCodeVal,cls);

		if(dataSetNameChkObj.NameValue(1,"name")>="1"){
			errorTextCo(duplicationCode);
			if(dataSetNameObj.SysStatus(dataSetNameObj.RowPosition)== 1){
				if(tagNm=="OBJECT") userCodeObj.Text = '';
				else if(tagNm=="INPUT") userCodeObj.value = '';
			}else{ 
				if(tagNm=="OBJECT") userCodeObj.Text = orgNameValue;
				else if(tagNm=="INPUT") userCodeObj.value = orgNameValue;
			}
			userCodeObj.focus();
			
			return false;
		}else if(dataSetNameChkObj.NameValue(1,"name")=="0"){
			return;
		}
		return;
	}
}
//-------------------------------------------------------------------
// 중복데이터 체크 (현재 체크할 DataSet이 호출만 있는 상태에서 AND Grid와 연동되어 있지는 않음)
// 호출예) checkDupNoGridCo(dastSetNm,columnNm, columnValue)
//-------------------------------------------------------------------
function checkDupNoGridCo(dataSetNm, columnNm, controlObj)  {
    var columnValue = trimCo(upperCaseCo(controlObj.value));
	if(dataSetNm.NameValueRow(columnNm, columnValue)==0){
		controlObj.value= columnValue;
		return;
	}
    if(dataSetNm.NameValueRow(columnNm, columnValue)) {
		alert(duplicationCode);
		initFocusSelectCo(controlObj);
		return false;
    }
}
function checkDupNoGridCo2(dataSetNm, columnNm, controlObj, orgDataSetNm, orgColumnNm)  {
    var columnValue = trimCo(upperCaseCo(controlObj.value));
	var orgNameValue = orgDataSetNm.OrgNameValue(orgDataSetNm.RowPosition,orgColumnNm);

	if(dataSetNm.NameValueRow(columnNm, columnValue)==0){
		controlObj.value= columnValue;
		return;
	}
    if(dataSetNm.NameValueRow(columnNm, columnValue)) {
		if(orgDataSetNm.SysStatus(orgDataSetNm.RowPosition)== 1) controlObj.value = "";
		else controlObj.value = orgNameValue;
		errorTextCo(duplicationCode);
		
		initFocusSelectCo(controlObj);
		return false;
    }
}
//-------------------------------------------------------------------
// 중복데이터 체크(luxecombo) (현재 체크할 DataSet이 호출되어 있는 상태에서)
// 호출예) checkDuplicationCo(dastSetNm,columnNm, columnValue)
//-------------------------------------------------------------------
function checkDupLuxecomboCo(dataSetNm, columnNm, luxeColumn, controlObj, removeColumn)  {
    var columnValue = controlObj.ValueOfIndex(luxeColumn, controlObj.Index);
    if(dataSetNm.NameValueRow(columnNm, columnValue)==0) return
    if(dataSetNm.NameValueRow(columnNm, columnValue) != dataSetNm.RowPosition) {
		alert("이미 등록 되어 있습니다");
		dataSetNm.NameValue(dataSetNm.RowPosition,columnNm) = "";
		dataSetNm.NameValue(dataSetNm.RowPosition,removeColumn) = "";
		controlObj.Select;
		controlObj.Focus();
   }
}
//-------------------------------------------------------------------
// 데이터셋 객체 생성
// 예) loadDataSetCreateCo('DataSetBaSawonCode','tr_sawon_cd_check');
//-------------------------------------------------------------------
//유효성 체크용 DataSet 로드
function loadDataSetCreateCo(dataSetNm, trNm) {
	document.write("<comment id='__NOSCRIPT_ID__'><object id="+dataSetNm+" classid=clsid:3267EA0D-B5D8-11D2-A4F9-00608CEBEE49 ></object></comment><SCRIPT>__ShowEmbedObject(__NOSCRIPT_ID__);</SCRIPT>");
	document.write("<comment id='__NOSCRIPT_ID__'><object id="+trNm+"   classid=clsid:0A2233AD-E771-11D2-973D-00104B15E56F >");
	document.write("	<param name=KeyName	 value=toinb_dataid4>");
	document.write("	<param name=KeyValue value=JSP(O:"+dataSetNm+"="+dataSetNm+")>");
	document.write("	<param name=Action	 value=/servlet/GateServlet>");
	document.write("</object></comment><SCRIPT>__ShowEmbedObject(__NOSCRIPT_ID__);</SCRIPT>");
}

//DataSet 로드
function loadDataSetCo(dataSetNm){
	document.write("<comment id='__NOSCRIPT_ID__'><object id="+dataSetNm+" classid=clsid:3267EA0D-B5D8-11D2-A4F9-00608CEBEE49 ></object></comment><SCRIPT>__ShowEmbedObject(__NOSCRIPT_ID__);</SCRIPT>");
}

//input Tr 로드
function loadInTrCo(trNm,dataSetNm){
	document.write("<comment id='__NOSCRIPT_ID__'><object id="+trNm+" classid='clsid:0A2233AD-E771-11D2-973D-00104B15E56F' >");
	document.write("	<param name=KeyName	  value=toinb_dataid4>");
	document.write("	<param name=KeyValue  value=JSP(I:"+dataSetNm+"="+dataSetNm+")>");
	document.write("	<param name=Action	  value=/servlet/GateServlet>");
	document.write("</object></comment><SCRIPT>__ShowEmbedObject(__NOSCRIPT_ID__);</SCRIPT>");
	document.write("<script language=javascript  for="+trNm+" event=OnSuccess()>");
	document.write("	search();");
	document.write("	trSuccessMsgCo();");
	document.write("</script>");
	document.write("<script language=javascript  for="+trNm+" event=OnFail()>");
	document.write("	alert(this.SrvErrMsg('ServerErrMsg', 0));");
	document.write("</script>");
}

//output Tr 로드
function loadOutTrCo(trNm,dataSetNm){
	document.write("<comment id='__NOSCRIPT_ID__'><object id="+trNm+"   classid=clsid:0A2233AD-E771-11D2-973D-00104B15E56F >");
	document.write("	<param name=KeyName	  value=toinb_dataid4>");
	document.write("	<param name=KeyValue  value=JSP(O:"+dataSetNm+"="+dataSetNm+")>");
	document.write("	<param name=Action	  value=/servlet/GateServlet>");
	document.write("	<param name=protocol  value=1>");
	document.write("</object></comment><SCRIPT>__ShowEmbedObject(__NOSCRIPT_ID__);</SCRIPT>");
	document.write("<script language=javascript  for="+trNm+" event=OnSuccess()>");
	document.write("	trSuccessMsgCo();");
	document.write("</script>");
	document.write("<script language=javascript  for="+trNm+" event=OnFail()>");
	document.write("	alert(this.SrvErrMsg('ServerErrMsg', 0));");
	document.write("</script>");
}

//input Tr 이벤트 로드	
function loadInTrEventCo(trNm){
	document.write("<script language=javascript  for="+trNm+" event=OnSuccess()>");
	document.write("	search();");
	document.write("	trSuccessMsgCo();");
	document.write("</script>");
	document.write("<script language=javascript  for="+trNm+" event=OnFail()>");
	document.write("	alert(this.SrvErrMsg('ServerErrMsg', 0));");
	document.write("</script>");
}

//output Tr 이벤트 로드
function loadOutTrEventCo(trNm){
	document.write("<script language=javascript  for="+trNm+" event=OnSuccess()>");
	document.write("	trSuccessMsgCo();");
	document.write("</script>");
	document.write("<script language=javascript  for="+trNm+" event=OnFail()>");
	document.write("	alert(this.SrvErrMsg('ServerErrMsg', 0));");
	document.write("</script>");
}
//-------------------------------------------------------------------
// filter를 사용할 DataSet이 필터링 되어있을결우 필터링을 초기화한다,.
//-------------------------------------------------------------------
function setFilterDefaultCo(DataSet){
	filterDefaultYn = true;
	DataSet.UseFilter="true";
	DataSet.Filter();
	filterDefaultYn = false;
}
//-------------------------------------------------------------------
// 거래기록(132) data 조회
//-------------------------------------------------------------------
function getGeoraeRegDataCo(param){
	tr_ba132r.Parameters = param;
	tr_ba132r.post();
}
//-------------------------------------------------------------------
// DataSet이 호출된 상태에서 코드 체크
// 호출예) checkDataSetCode(dataSetNm,row,columnNm,chkDataSetNm,chkColumnNm,changeColumnNm,chkColumnValue)
//-------------------------------------------------------------------
function checkDataSetCode(dataSetNm,row,columnNm,chkDataSetNm,chkColumnNm,changeColumnNm,chkColumnValue,popup) {
    if (chkColumnValue==""){
		dataSetNm.NameValue(row, columnNm) = "";
   	 	return true;
   	}	  
   var columnIndex = chkDataSetNm.NameValueRow(chkColumnNm, chkColumnValue);
   if(columnIndex==0){
		if(popup==""){
			alert("등록되지 않은 코드입니다.");
			return false;	
		}else{
			if (confirm('등록되지 않은 코드입니다.\n 검색하시겠습니까?') == false){
				return false;
			}else{ 
				eval(popup);
				return false;
			}
		}
	}else{
		dataSetNm.NameValue(row, columnNm) = chkDataSetNm.NameValue(columnIndex,changeColumnNm);
		return true;
	}
}

//-------------------------------------------------------------------
// craeteGridBgColor 그리드의 동일한 값의 bgcolor 설정
// craeteGridBgColor(데이터셋명-오브젝트,색을 결정하는 공통컬럼-string)
// 호출예) craeteGridBgColor(DataSetBa402,'cls')
//-------------------------------------------------------------------
function craeteGridBgColor(dataSetNm, fieldNm){
	var rowCount = dataSetNm.CountRow;
	if (rowCount==0) return;

	var bgColor   = "";
	var tempValue = "0";
	var str       = "bgcolor={decode("+fieldNm+",";
	var count = 0;
	for (var i=1;i<=rowCount;i++) {
		if(tempValue != dataSetNm.NameValue(i,fieldNm)){
			count++;
			tempValue = dataSetNm.NameValue(i,fieldNm);
			str+= "'"+tempValue +"','"+changeBgColor(count)+"',"
		}
	}
	str+="'#ffffff')}";
	return str;
}
//-------------------------------------------------------------------
// delEmptyRow() keycolumn이 설정되어 있는 빈로우 삭제
// 호출예) delEmptyRow(DataSetBa502,"u_acct_cd")
//-------------------------------------------------------------------
function delEmptyRow(dataSetNm, colunmNm){
	if(dataSetNm.NameValue(dataSetNm.CountRow,colunmNm)==""){
		dataSetNm.DeleteRow(dataSetNm.CountRow);
	}
}
//-------------------------------------------------------------------
//	같은 거래번호들 중 맨처음 row번호
//-------------------------------------------------------------------
function getFirstRowPosCo(DataSet){
	var uGeoraeSeq = DataSet.NameValue(DataSet.RowPosition,"u_georae_seq");
	var i = DataSet.RowPosition;
	while(true){
		i = i-1;
		if(i<1) return 1;
		else if(uGeoraeSeq != DataSet.NameValue(i,"u_georae_seq")) return (i+1);
	}
}
//-------------------------------------------------------------------
//	같은 거래번호들 중 맨 마지막 row번호
//-------------------------------------------------------------------
function getLastRowPosCo(DataSet){
	var uGeoraeSeq = DataSet.NameValue(DataSet.RowPosition,"u_georae_seq");
	var i = DataSet.RowPosition;
	while(true){
		i = i+1;
		if(uGeoraeSeq != DataSet.NameValue(i,"u_georae_seq")) return (i-1);
	}
}
//-------------------------------------------------------------------
//	분개창 -- 분개창 DataSetHeader 만들기
//-------------------------------------------------------------------
function makeBungaeWinDataSetHeadersCo(){
	var header = "dr_acct_nm:STRING(20)"
		+ ", dr_amt:DECIMAL(20.0)"
		+ ", cr_acct_nm:STRING(20)"
		+ ", cr_amt:DECIMAL(20.0)";
	DataSetBaDrCrAmt.setDataHeader(header);
}
//-------------------------------------------------------------------
//	분개창 --일렬로 되어 있는 대차변 분개를 분개창에 차대변으로 나누어 보여주기
//-------------------------------------------------------------------
function showDrCrAmtCo(srcDataSet, targetDataSet){
	if(srcDataSet.CountRow <1||isNullCo(srcDataSet.CountRow)){
		DataSetBaDrCrAmt.ClearData();
	 	return;
	} 	
	
	//소스 DataSet 조회 시작위치 와 종료위치
	var startPos = getFirstRowPosCo(srcDataSet);
	var endPos   = getLastRowPosCo(srcDataSet);
	//약식 분개창 row갯수 산정
	var drCnt  =0;  //차변 data갯수
	var crCnt  =0;  //대변 data갯수
	var rowCnt =0;
	for(var i=startPos;i<=endPos;i++){
		if     (srcDataSet.NameValue(i,"bungae_cls")=="1") drCnt++;
	    else if(srcDataSet.NameValue(i,"bungae_cls")=="2") crCnt++;
	}

	if(crCnt>drCnt) rowCnt = crCnt;
	else rowCnt = drCnt;

	//작업대상 DataSet에 row추가		
	targetDataSet.ClearData();
	for(var j=0; j<rowCnt; j++)	targetDataSet.AddRow();
	/** 작업대상 DataSet에 data추가 **/
	var drInputPos = 1;
	var crInputPos = 1;
	for(var k=startPos;k<=endPos;k++){
		if     (srcDataSet.NameValue(k,"bungae_cls")=="1"){
		    targetDataSet.NameValue(drInputPos,	"dr_acct_nm") = srcDataSet.NameValue(k,"acct_nm");
		    targetDataSet.NameValue(drInputPos,	"dr_amt")     = srcDataSet.NameValue(k,"amt");
			drInputPos++;
	    }else if(srcDataSet.NameValue(k,"bungae_cls")=="2"){
		    targetDataSet.NameValue(crInputPos,	"cr_acct_nm") = srcDataSet.NameValue(k,"acct_nm");
		    targetDataSet.NameValue(crInputPos,	"cr_amt")     = srcDataSet.NameValue(k,"amt");
	    	crInputPos++;
	    }
	}	
}
//-------------------------------------------------------------------
//  분개창 -- 차변계정 합계
//--------------------------------------------------------------------
function calcDrSumCo(DataSet){
	var sum = 0;
	for(var i=1; i<=DataSet.CountRow;i++){
		 sum = sum+DataSet.NameValue(i,"dr_amt"); 
	}
	return sum;
}
//-------------------------------------------------------------------
//  분개창 -- 대변계정 합계
//-------------------------------------------------------------------
function calcCrSumCo(DataSet){
	var sum = 0;
	for(var i=1; i<=DataSet.CountRow;i++){
		 sum = sum+DataSet.NameValue(i,"cr_amt"); 
	}
	return sum;
}
//-------------------------------------------------------------------
//  날짜 데이터의 길이가 맞지 않을때
//-------------------------------------------------------------------
function checkDateLength(objName){
	if((trimCo(objName.Text).length!=0)&&(trimCo(objName.Text).length!=8)){
		errorTextCo(errDateType);
		objName.Focus();
	}
}
//-------------------------------------------------------------------
//  날짜 format이 맞는지 check - grid cell에서 사용
//-------------------------------------------------------------------
function checkGridDateFormatCo(dateStr){
	//길이가 8이 아니면 에러
	if(trimCo(dateStr).length!=8){
		errorTextCo("20060407 형식으로 입력하세요");
		return false;
	}	
	//숫자이외의 값으로 입력되면 에러
	for (var i=0; i<dateStr.length;i++){
			var oneStr = dateStr.substring(i,i+1);
			if(isNaN(oneStr)){
				errorTextCo("20060407 형식으로 입력하세요");
				return false;
			}	
	}		
	return true;
}
//  윈도우 상태바 초기화
function initWindowStatusCo(){
	window.status=" ";
}
// 성공적으로 저장되었을때 윈도우 상태바에 메세지 뿌려주기 (추후 trSuccessMsgCo로 통일)
function trSuccessMsgCo(){
	window.status ="성공적으로 처리되었습니다.";
	setTimeout('initWindowStatusCo()',3000);      //3000은 3초, 3초후엔 window status 초기화
}
//-------------------------------------------------------------------
// 입력일자가 현재 회계기에 해당하는 일자인지 check
//-------------------------------------------------------------------
function isHoegyekiDateCo(inDate){
	if(commonSdd <= inDate && inDate <= commonEdd) return true;
	else return false;
}

function checkHoegyekiAndSearchCo(){
	if (isHoegyekiDateCo(em_work_date.Text)){
		if(commonToday==em_work_date.Text){
			saveWorkDateCo();
			init();
		}else search();
		tempWorkDate = em_work_date.Text;
	}else{
		alert("회계기의 범위를 벗어난 날짜입니다. 날짜를 확인하시기 바랍니다.");
		em_work_date.Text = tempWorkDate;
	}
}
// 현재 행의 삭제가능여부 체크 (거래번호가 null이나 0이아닌 행)
function canThisRowDeleteCo(DataSet){
	if(isNotNullCo(DataSet.NameValue(DataSet.RowPosition, "georae_seq"))&&
	   DataSet.NameValue(DataSet.RowPosition, "georae_seq")!=0){
	   	 return true;
	}else{
		 return false;
	}	 
}
// 삭제작업시 삽입모드인 행(insert mode row)을 삭제처리 -> 없애지 않으면 서버에서 Exception 발생
function deleteIModeRowsCo(DataSet){
	for(var i=1; i<=DataSet.CountRow; i++)
		if(DataSet.SysStatus(i)== 1) DataSet.DeleteRow(i);  //insert 모드가 있으면 삭제
}
// 화면 제목타이틀 라인에 회사 기본정보 뿌려주기
function menuBarInfoView(){
	common_title.style.color = "";
	common_title.style.fontWeight = "";
	common_title.innerText= commonDataView;
}
// 공통 에러메세지(alert대용)
function errorTextCo(errMsg){
	if(isNotNullCo(errMsg)){
		errorMessage.innerText      = errMsg;
		setTimeout('initErrorMessageCo()',2200);
	}
}
//타이틀바에 일정시간 에러메세지 출력 후 원상태로 복원
function errorMsgToTitleBarCo(errMsg){
	if(isNotNullCo(errMsg)){
		common_title.style.color = "red";
		common_title.style.fontWeight = "bold";
		common_title.innerText = errMsg;
		setTimeout('menuBarInfoView()',2200);
	}
}
//타이틀바에 일정시간 메세지 출력 후 원상태로 복원
function msgToTitleBarCo(msg){
	if(isNotNullCo(msg)){
		common_title.style.color = "blue";
		common_title.style.fontWeight = "bold";
		common_title.innerText = msg;
		setTimeout('menuBarInfoView()',2500);
	}
}
// 공통 에러메세지초기화
function initErrorMessageCo(){
	errorMessage.innerText="";
}
// 조회후 조회건수가 0이상일때 그리드로 포커스 이동
function moveGridFocusCo(gridNm,count){
	if(count>0) gridNm.Focus();
}
// 사용자가 입력한 날짜값을 MAIN.HTML에 선언된 전역변수에 저장 onunload에 호출
function saveWorkDateCo(){
	if(trimCo(em_work_date.Text).length==8)	parent.window.saveWorkDate = em_work_date.Text;
}
//main.html에 사원코드 저장(set) 및 호출(get)
function setUSawonCdCo(uSawonCd){
	parent.window.uSawonCd = uSawonCd;
}
function getUSawonCdCo(){
	return parent.window.uSawonCd;
}
//특정 컬럼값의 행번호 찾기 - 입력,수정,삭제 후 마지막 작업 위치에 focus 하는데 사용
function findRowPosByColValueCo(dataSet,colName,colValue){
	for(var i=1; i<=dataSet.CountRow; i++){
		if(dataSet.NameValue(i,colName)==colValue){
			dataSet.RowPosition = i;
			break;
		}
	}	
}		
// 현재 사업장코드가 1인 ROW Control을 false, 아니면 true
// 호출예) setControlByRowStatusCo(dataSetNm)   이벤트) OnRowPosChange
function setControlByRowStatusSysWpidCo(dataSetNm) {
	if(dataSetNm.NameValue(dataSetNm.RowPosition,"wp_id")==1){ 
		setControlStatusCo('disabled');
	}else{
		setControlStatusCo('enable');
	}
}
// 단가금액 계산
function getPoliticPrcCo(code,uClntCd,sellBuyCls){
	var params = "jobId=JobBaSelect2,daoId=getPoliticPrc";
    params =  params + ":jaegoCd="+code;
    params =  params + ":uClntCd="+uClntCd;
    params =  params + ":sellBuyCls="+sellBuyCls;
    tr_prc.Parameters = params;
    tr_prc.post();
}
// DataSet의 특정컬럼에 대한 row값이 같은 경우 마지막 row에만 출력 - 
//특히 같은 날짜가 계속될경우 마지막 row에만 값을 표시하기위해 -  compCol:동일여부를 비교하는 컬럼(주로 yyyymmdd),  valueCol:값이 있는 컬럼
function changeSameRowToSpace(dataset,compCol,valueCol){
	var currentRowValue = "";
	var afterRowValue   = "";
	for(i=1; i<dataset.CountRow; i++){
		currentRowValue = dataset.NameValue(i,compCol);
		afterRowValue   = dataset.NameValue(i+1,compCol);
		if(currentRowValue==afterRowValue)	dataset.NameValue(i, valueCol) = '';
	}
}
//세목콘트롤 초기화
function setSemokDefaultCo(span, ds, luxe){
	span.innerText = "";
	ds.ClearData();
	luxe.ResetData();
	luxe.enable=true;
}		
//대변 세목 세팅(행을 변경하며 데이터를 읽는 OnRowPosChanged 이벤트 발생 시)
function setCrSemokCo(span, ds, tr, luxe){
	span.innerText =ds.NameValue(ds.RowPosition,"cr_acct_nm");
	var crSemokCd = ds.NameValue(ds.RowPosition,"cr_semok_cd");
	tr.Parameters = "jobId=JobBaSemok,uAcctCd="+ds.NameValue(ds.RowPosition,"u_cr_acct_cd");
	tr.post();
	luxe.index=luxe.IndexOfColumn("semok_cd",crSemokCd);
	luxe.enable = false;
}	
//차변 세목 세팅(행을 변경하며 데이터를 읽는 OnRowPosChanged 이벤트 발생 시)
function setDrSemokCo(span, ds, tr, luxe){
	span.innerText =ds.NameValue(ds.RowPosition,"dr_acct_nm");
	var drSemokCd = ds.NameValue(ds.RowPosition,"dr_semok_cd");
	tr.Parameters = "jobId=JobBaSemok,uAcctCd="+ds.NameValue(ds.RowPosition,"u_dr_acct_cd");
	tr.post();
	luxe.index=luxe.IndexOfColumn("semok_cd",drSemokCd);
	luxe.enable = false;
}

//세목 세팅(일반분개거래 같은 계정 컨트롤이 있는 화면에서  OnRowPosChanged 이벤트 발생 시)
function setSemokCo(ds, tr, luxe){
	var semokCd = ds.NameValue(ds.RowPosition,"semok_cd");
	tr.Parameters = "jobId=JobBaSemok,uAcctCd="+ds.NameValue(ds.RowPosition,"u_acct_cd");
	tr.post();
	luxe.index=luxe.IndexOfColumn("semok_cd",semokCd);
	luxe.enable = false;
}

//세목리스트 가져오기	
function getSemokListCo(span, acctNm, tr, uAcctCd, luxe){
	span.innerText = acctNm;
	tr.Parameters = "jobId=JobBaSemok,uAcctCd="+uAcctCd;
	tr.post();
	luxe.index=-1;
}	

// 그리드 내역코드 check 및 내역정보 가져오기
function gCheckAndGetNaeyeokCo(dataSet,uSawonCd,cls,uNaeyeokCd,popUp){
	//alert(uSawonCd);
	uNaeyeokCd = trimCo(uNaeyeokCd);
	if(uNaeyeokCd==""){
		dataSet.NameValue(dataSet.RowPosition, "naeyeok_cd") = "";
		dataSet.NameValue(dataSet.RowPosition, "u_naeyeok_cd") = "";
		return true;		
	}else if(uNaeyeokCd!=""){
		if(isNullCo(cls)){
			alert(" 결의서구분이 없습니다. ");
			return false;
		}	
		var params = "jobId=JobBaSawonNaeyeok,johoeCls=oneNayeok";
		params = params + ",uSawonCd=0";
		params = params + ",cls="+cls;
		params = params + ",uNaeyeokCd="+uNaeyeokCd;
		tr_one_naeyeok.Parameters = params;
		tr_one_naeyeok.post();
	   
	   if(DataSetBa3Fields.CountRow==1){
			dataSet.NameValue(dataSet.RowPosition,"naeyeok_cd") = DataSetBa3Fields.NameValue(1,"code");
			dataSet.NameValue(dataSet.RowPosition,"naeyeok") = DataSetBa3Fields.NameValue(1,"name");
			return true;
		}else{
			if(popUp==""){
				alert(" 등록되지 않은 코드입니다. ");
				return false;	
			}else{
				if(confirm(" 등록되지 않은 코드입니다.\n 검색하시겠습니까?" )){
					eval(popUp);
					return false;
				}else return false;
			}
		}
	}
}

// 코드로 이름 가져와 setting 하기 (코드는 서버에서 trim되고 대문자로 적용됨)
loadDataSetCreateCo('DataSetBaElmtName' , 'tr_elmt_name_r');
function getNameCo(elmt, nameElmt){
	if(isNullCo(lrtrimCo(elmt.value))){
		nameElmt.value = "";
		return;
	}	
	DataSetBaElmtName.ClearData();
	tr_elmt_name_r.Parameters = "jobId=JobBaCodeChk, taskCls=getNameByElmtId, elmtId="+elmt.id+",uCode="+elmt.value;
	tr_elmt_name_r.post();
	var eName = DataSetBaElmtName.NameValue(DataSetBaElmtName.RowPosition,"name");
	if(isNullCo(eName)){
		errorMsgToTitleBarCo(" 등록되지 않은 코드입니다. ");
		nameElmt.value = "";
		elmt.value = "";
		elmt.focus();
	}else nameElmt.value = eName;
}