var srchContent;

function srchAllUser() {
    try{
        var tagEa = localStorage.length;
        for(var i = 0; i < tagEa; i ++) {
            console.log("=====[REMOVE ELEMENTS]=====")
            $("#userIdPTag").remove();
            $("#userNamePTag").remove();
            $("#userPinNumberPTag").remove();
            $("#userPhNumberPTag").remove();
            console.log("=====[REMOVE ELEMENTS DONE]=====");
        }
    } catch {
        console.log("PARENT ELEMENT DOES NOT EXIST");
    }

    createList(document.getElementById("searchId").value);
}

function mappingNumberSearch() { //누락 userMappingId 찾기
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
    return mappingNumArray;
}

function createList(inputID) { 
    console.log("=======[START]======");
    var listLength = 0;
    var lengthFlag = 0;

    if(inputID == null || inputID == "") {
        listLength = localStorage.length;
    } else {
        listLength = 2;
        lengthFlag = 1;
        if(localStorage.getItem(inputID) == null) {
            createBorder(0);
            alert("찾으시는 아이디가 존재하지 않습니다.");
            $("#searchId").val(null);
            return;
        }
    }

    var mappingNumArray;
    if(lengthFlag == 0) {
        mappingNumArray = mappingNumberSearch();
        console.log("mappingNumArray_LENGTH : " + mappingNumArray);
        for(var tmp = 0; tmp < mappingNumArray.length; tmp ++) {
            console.log(tmp + 1 + " : " + mappingNumArray[tmp]);
        }
    }

    for(var k = 0; k < listLength / 2; k ++) {
        var idTitle;
        var userId;
        var tmpId;
        if(lengthFlag == 0) {
            userId   = "userMappingId";
            userId   += mappingNumArray[k]; //
            tmpId    = localStorage.getItem(userId);
        } else {
            userId   = $("#searchId").val();
            tmpId    = userId;
        }
        
        var newPTag1 = document.createElement("p");
        var newPTag2 = document.createElement("p");
        var newPTag3 = document.createElement("p");
        var newPTag4 = document.createElement("p");
        
        var tmpValue = localStorage.getItem(tmpId);
        var trueVal  = localStorage.getItem(tmpId);
        var tmpVal   = localStorage.getItem(tmpId);
        var val;
        var tmpArr   = new Array(7);
        var tmpNum   = 0;

        for(var t = 0; t < 7; t ++) {
            tmpNum    = tmpValue.indexOf("#");
            tmpArr[t] = tmpNum;
            tmpValue  = tmpValue.substring(tmpNum + 1, tmpValue.length);
        }

        var plus = 0;
        for(var b = 0; b < tmpArr.length + 1; b ++) {
            if(b == 0) {
                trueVal = trueVal.substr(0, tmpArr[b]);
                val     = trueVal;
                idTitle = document.getElementById("userId");
                //==========================================
                newPTag1.innerText = val;
                newPTag1.style.fontSize = "12px";
                newPTag1.style.paddingLeft = "30px";
                newPTag1.setAttribute("id", "userIdPTag");
                idTitle.appendChild(newPTag1);
                //==========================================
                //$("#userId").append("<p></p>").text(val).css("font-size", "12px").css("padding-left", "30px").attr("id", "userIdPTag");
            } else if(b == 7) {
                trueVal = tmpVal.substr(plus);
                val     = val + incoding(b, trueVal);
                idTitle = document.getElementById("userPhNumber");
                //==========================================
                newPTag4.innerText = val;
                newPTag4.style.fontSize = "12px";
                newPTag4.style.textAlign = "center";
                newPTag4.setAttribute("id", "userPhNumberPTag");
                idTitle.appendChild(newPTag4);
                //==========================================
                // newPTag4.append(idTitle);
                // newPTag4.text(val);
                // newPTag4.css("font-size", "12px");
                // newPTag4.css("text-align", "center");
                // newPTag4.attr("id", "userPhNumberPTag");
            } else {
                trueVal = tmpVal.substr(plus, tmpArr[b]);
                if(b == 2) {
                    val     = trueVal;
                    idTitle = document.getElementById("userName");
                    //==========================================
                    newPTag2.innerText = val;
                    newPTag2.style.fontSize = "12px";
                    newPTag2.style.paddingLeft = "30px";
                    newPTag2.setAttribute("id", "userNamePTag");
                    idTitle.appendChild(newPTag2);
                    //==========================================
                    // newPTag2.append(idTitle);
                    // newPTag2.text(val);
                    // newPTag2.css("font-size", "12px");
                    // newPTag2.css("padding-left", "30px");
                    // newPTag2.attr("id", "userNamePTag");
                } else if (b == 3) {
                    val = trueVal + "-";
                } else if(b == 4) {
                    val     = val + incoding(b, trueVal);
                    idTitle = document.getElementById("userPinNumber");
                    //==========================================
                    newPTag3.innerText = val;
                    newPTag3.style.fontSize = "12px";
                    newPTag3.style.textAlign = "center";
                    newPTag3.setAttribute("id", "userPinNumberPTag");
                    idTitle.appendChild(newPTag3);
                    //==========================================
                    // newPTag3.append(idTitle);
                    // newPTag3.text(val);
                    // newPTag3.css("font-size", "12px");
                    // newPTag3.css("text-align", "center");
                    // newPTag3.attr("id", "userPinNumberPTag");
                } else if(b == 5) {
                    val     = trueVal + "-";
                } else if(b == 6) {
                    val     = val + trueVal + "-";
                }
            }
            plus += 1 + tmpArr[b];
        }
    }
    createBorder();
    console.log("=======[DONE]======");
}

function createBorder(borderFlag = 1) {
    if(borderFlag == 1) {
        $("#dynamicDiv0").css("border-bottom", "1px solid #000000");
        $("#dynamicDiv0").css("margin", "0px 20px");

        $("#dynamicDiv1").css("border-right", "1px solid #000000");
        $("#dynamicDiv1").css("margin", "4px 0px");

        $("#dynamicDiv2").css("border-right", "1px solid #000000");
        $("#dynamicDiv2").css("margin", "4px 0px");

        $("#dynamicDiv3").css("border-right", "1px solid #000000");
        $("#dynamicDiv3").css("margin", "4px 0px");
    } else {
        $("#dynamicDiv0").css("border-bottom", "0px");
        $("#dynamicDiv0").css("margin", "0px 20px");

        $("#dynamicDiv1").css("border-right", "0px");
        $("#dynamicDiv1").css("margin", "4px 0px");

        $("#dynamicDiv2").css("border-right", "0px");
        $("#dynamicDiv2").css("margin", "4px 0px");

        $("#dynamicDiv3").css("border-right", "0px");
        $("#dynamicDiv3").css("margin", "4px 0px");
    }
}

function incoding(kind, og) {
    console.log("=====[INCODING-" + kind + "]=====");
    var tran;
    if(kind == 4) {
        tran = og.substr(1, 1) + "******";
    } else if(kind == 7) {
        tran = "****";
    }
    console.log("=====[INCODING_DONE-" + kind + "]=====");
    
    return tran;
}

function keyUp() {
    console.log("=====[KEY_UP-" + window.event.keyCode + "]=====");
    if (window.event.keyCode == 13) {
        srchAllUser();
    }
    console.log("=====[KEY_UP_DONE-" + window.event.keyCode + "]=====");
}