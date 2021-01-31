var isSession = 0;
var sessionId = "";
var stopWatch = 0;

function onLoad() {
    if(localStorage.getItem("SystemManager") == null) {
        localStorage.clear();
        localStorage.setItem("SystemManager", "SystemManager#1234#시스템관리자#881111#1111111#010#1111#1111");
        localStorage.setItem("userMappingId0", "SystemManager");
        alert("SystemManager Storage Creation");
    }
    isSession = sessionStorage.length;
}

window.onLoad = onLoad();
if(isSession > 0) {
    sessionId = sessionStorage.getItem("tmpSession");
    $(document).ready(function(){
        $("#loginText").text("LogOut");
        $("#welcome").css("float", "right");
        $("#welcome").text("[" + sessionId + "]님 환영 합니다.");

        if(sessionStorage.getItem("SystemManager") == null) {
            $("#loginText").css("padding-left", "0px");
            $("#signUpText").text("Secession");
            $("#signUpText").css("margin-left", "110px");
            $("#systemManagerMenu").css("display", "none");
            $("#navi").css("margin-left", "130px");
        } else {
            $("#loginText").css("padding-left", "187px");
            $("#signUpText").css("display", "none");
            $("#footerBoder").css("margin-left", "55px");
            $("#footerBoder").css("width", "930px");
        }
        sessionChk();
    });
} else {
    $(document).ready(function(){
        $("#systemManagerMenu").css("display", "none");
        $("#navi").css("margin-left", "130px");
    });
}

function chgPage(url) {
    console.log("=====[RESET_STOPWATCH]=====");
    stopWatch = 0;
    if(sessionStorage.length > 0) {
        $("#i_frm").attr("src", url);
    } else {
        alert("로그인이 필요합니다.");
    }
}

function callPop() {
    console.log("=====[RESET_STOPWATCH]=====");
    stopWatch = 0;
    var p_width  = 300;
    var p_height = 180;
    var p_left   = Math.ceil((window.screen.width  - p_width )/2);
    var p_top    = Math.ceil((window.screen.height - p_height)/2);
    window.open("login.html", "a", "width = " + p_width + ",height = " + p_height + ",left = " + p_left + ",top = " + p_top);
}

function callSignUp(){
    if(sessionStorage.length > 0) {
        secession(); //회원탈퇴 function
    } else {
        console.log("=====[RESET_STOPWATCH]=====");
        stopWatch = 0;
        var p_width  = 410;
        var p_height = 400;
        var p_left   = Math.ceil((window.screen.width  - p_width )/2);
        var p_top    = Math.ceil((window.screen.height - p_height)/2);
        window.open("signup.html", "a", "width = " + p_width + ",height = " + p_height + ",left = " + p_left + ",top = " + p_top);
    }
}

function secession() {
    var confirmAlert = confirm("회원을 탈퇴하시겠습니까?");
    if(confirmAlert) {
        var tmpKey = sessionStorage.getItem("tmpSession");
        var tmpMappingKey = sessionStorage.getItem("tmpMappingIdSession");

        loginPage(); //세션을 끊는다.

        localStorage.removeItem(tmpKey);
        localStorage.removeItem(tmpMappingKey);
    }
}

function loginPage(){
    console.log("=====[RESET_STOPWATCH]=====");
    stopWatch = 0;
    if(isSession == 0) {  // 로그인 되어 있지않아 로그인한다.
        layerOpen();
    } else {              // 로그인 되어 있어 로그아웃한다.
        sessionStorage.clear(); 
        location.replace("main.html");
    }
}

function timer() {
    stopWatch += 1;
    console.log(stopWatch + " [SEC]");
    if(stopWatch == 300) {
        //session Out;
        loginPage();
        alert("아무런 동작을 하지 않아 세션이 만료되었습니다.");
    }
}

// 로그인 layout popup
function sessionChk() {
    setInterval(timer,1000); //1초마다 계속  호출 --> 타이머
}

function layerOpen() {
    $("#light").css("display", "block");
    $("#fade").css("display", "block");
}

function layerClose() {
    reset();
    $("#light").css("display", "none");
    $("#fade").css("display", "none");
}

//로그인 functions
function loginChk() {
    console.log("loginChk() FUNCTION IN");
    var userId = $("#loginUserId").val();
    var userPw = $("#loginUserPw").val();
    if(userId == "" || userId == null) {
        alert("아이디를 입력해 주세요.");
        return;
    } else if(userPw == "" || userPw == null) {
        alert("비밀번호를 입력해 주세요.");
        return;
    }
    var storagePw = getuserPw();
    if(localStorage.getItem(userId) == null) {
        alert("아이디가 존재하지 않습니다.");
    } else if (storagePw != userPw ) {
        alert("비밀번호가 올바르지 않습니다.");
    } else {
        alert("로그인 성공");
        layerClose();

        var tmpMappingId = mappingNumberSearch(userId); //userMappingId도 세션에 올림.
        location.replace("main.html");
        sessionStorage.setItem(userId, localStorage.getItem(userId));
        sessionStorage.setItem("tmpSession", userId);
        sessionStorage.setItem("tmpMappingIdSession", tmpMappingId);
    }
}

function mappingNumberSearch(userId) { //userMappingId 찾기
    var cnt = 0; 
    var incNum = 0;
    var mappingNumArray = new Array(localStorage.length/2);

    while(cnt < localStorage.length/2) {
        var mappingKeyNum = "userMappingId" + incNum;
        if(localStorage.getItem(mappingKeyNum) != null) {    
            mappingNumArray[cnt] = incNum;                       
            cnt++;
        } 
        incNum ++;
    }
    
    var tmpMappingId;
    for(var tmp = 0; tmp < localStorage.length / 2; tmp ++) {
        tmpMappingId = "userMappingId" + mappingNumArray[tmp];
        if(localStorage.getItem(tmpMappingId) == userId) {
            return tmpMappingId;
        }
    }
}

function reset() {
    $("#loginUserId").val(null);
    $("#loginUserPw").val(null); 
}

function getuserPw() {
    try {
        var tppw = localStorage.getItem($("#loginUserId").val());
        var pwNum = tppw.indexOf("#");
        var len = tppw.length;
        var tmpPw = tppw.substring(pwNum + 1, len);
        pwNum = tmpPw.indexOf("#");
        tmpPw = tmpPw.substring(0, pwNum);
        return tmpPw;
    } catch {
        console.log("아이디가 존재 하지 않음(대소문자 구별)");
    }
}

function keyUp() {
    if (window.event.keyCode == 13) {
        loginChk();
    }
}