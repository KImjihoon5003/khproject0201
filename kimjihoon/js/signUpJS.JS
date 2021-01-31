var g_dupChk = "None"; // 중복 체크에서 중복이 된 상태로 회원가입 성공으로 페이지가 이동하는 것을 방지 하기 위해 체크
                        // None = 중복체크 하지 않음, N = 중복아님;
var g_tmpDupId = "";   // 중복체크 후 중복 상태에서 중복되지 않는 아이디로 바꾼 후 중복체크를 하지 않으면 그 이전에 값으로 인해
                        // 중복으로 인식으로 인해 비교 할 변수 생성;
var g_userInfo;        // 모든 유저 정보를 담을 변수

var valiChk = 0;
function signup(){
    if(document.getElementById("userId").value != g_tmpDupId) {
        g_dupChk = "None";
    }
    
    if(g_dupChk == "None") {
        alert("중복체크를 하지 않았습니다.");
        return;
    }
    
    valChk(); //validation check;
    var key = document.getElementById("userId").value;
    var value = g_userInfo;

    if(valiChk == 1) {
        valiChk = 0;
        return; //validation check에 걸려서 그대로 종료;
    }

    localStorage.setItem(key,value); //실제 데이터 localStorage key = 실제 아이디, value = 데이터
    for(var i = 0; i < localStorage.length / 2 + 1; i ++) { //실제 아이디(위의 key값)과 매핑되는 key, value를 생성
        var userMappingId = "userMappingId";
        if(localStorage.getItem(userMappingId + i) == null) {
            localStorage.setItem(userMappingId + i, key);
            break;
        }
    }

    alert("회원가입에 성공 하였습니다.");
    valiChk = 0;
    window.close();
}

function duplicationChk() {
    var key = document.getElementById("userId").value;
    if(localStorage.getItem(key) != null) {
        alert("중복 된 아이디가 있습니다.");
        g_tmpDupId = key;
        g_dupChk = "None";
    } else {
        alert("사용 가능한 아이디 입니다.");
        g_tmpDupId = key;
        g_dupChk = "N";
    }
}

function valChk(){
    var userId      = document.getElementById("userId"     ).value;
    var userPw      = document.getElementById("userPw"     ).value;
    var userName    = document.getElementById("userName"   ).value;
    var userPinNum1 = document.getElementById("userPinNum1").value;
    var userPinNum2 = document.getElementById("userPinNum2").value;
    var userPhNum1  = document.getElementById("phNum1"     ).value;
    var userPhNum2  = document.getElementById("phNum2"     ).value;
    var userPhNum3  = document.getElementById("phNum3"     ).value;

    if((userId == g_tmpDupId && g_dupChk != "N") || userId == null || userId == "") {
        if(userId == g_tmpDupId && g_dupChk != "N") {
            alert("중복 된 아이디가 있습니다.");
        } else {
            alert("아이디를 입력 하지 않았습니다.");
        }
        valiChk = 1;
    } else if(userPw == "" || userPw == null) {
        alert("비밀번호를 입력하지 않았습니다. 비밀번호를 입력해 주세요");
        valiChk = 1;
    } else if(userName == "" || userName == null) {
        alert("이름을 입력하지 않았습니다. 이름을 입력해 주세요");
        valiChk = 1;
    } else if(userPinNum1 == "" || userPinNum1 == null) {
        alert("첫번째 주민등록번호를 입력하지 않았습니다. 첫번째 주민등록번호를 입력 해 주세요");
        valiChk = 1;
    } else if(userPinNum2 == "" || userPinNum2 == null) {
        alert("두번째 주민등록번호를 입력하지 않았습니다. 두번째 주민등록번호를 입력 해 주세요");
        valiChk = 1;
    } else if(userPw == "" || userPw == null) {
        alert("비밀번호를 입력하지 않았습니다. 비밀번호를 입력해 주세요.");
        valiChk = 1;
    } else if(userPhNum1 == "" || userPhNum1 == null) {
        alert("첫번째 전화번호를 입력하지 않았습니다.");
        valiChk = 1;
    } else if(userPhNum2 == "" || userPhNum2 == null) {
        alert("두번째 전화번호를 입력하지 않았습니다.");
        valiChk = 1;
    } else if(userPhNum3 == "" || userPhNum3 == null) {
        alert("세번째 전화번호를 입력하지 않았습니다.");
        valiChk = 1;
    }

    g_userInfo = userId + "#" + userPw + "#" + userName + "#" + userPinNum1 + "#" + userPinNum2
    + "#" + userPhNum1 + "#" + userPhNum2 + "#" + userPhNum3;
}