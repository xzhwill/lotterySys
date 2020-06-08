var numList = [];
var totalNum = 200;
var hasNumList = localStorage.getItem("numList");
if (hasNumList && hasNumList.length > 0) {
    console.log("有缓存");
    console.log("hasNumList===", hasNumList)
    numList = JSON.parse(hasNumList);
} else {
    console.log("无缓存");
    for (var i = 1; i <= totalNum; i++) {
        if (i < 10) {
            numList.push("00" + i);
        } else if (i >= 10 && i < 100) {
            numList.push("0" + i);
        } else {
            numList.push("" + i);
        }
    }
    localStorage.setItem("numList", JSON.stringify(numList));
}

console.log("numList===", numList)
var setId = null;
var setTimeoutId = null;
var lotteryNum = 0;

function setIntervalRandom() {
    $(".lottery-bg-clone").removeClass("cloneanimation");
    setId = setInterval(function() {
        var numListLength = numList.length;
        var num = Math.floor(Math.random() * numListLength);
        num = numList[num];
        var numStr = num + "";
        var numStr1 = numStr.substring(0, 1)
        var numStr2 = numStr.substring(1, 2)
        var numStr3 = numStr.substring(2, 3)
        $(".lottery-bg-num1").html(numStr1);
        $(".lottery-bg-num2").html(numStr2);
        $(".lottery-bg-num3").html(numStr3);
    }, 30)
}

function setTimeoutRandom() {
    lotteryNum--;
    if (lotteryNum == 0) {
        $(".lottery-but").show();
        $(".lottery-but-no").hide();
        $(".lottery-num input").attr("disabled", false);
        $(".lottery-num input").removeClass("cursornot");
        return false;
    } else {
        setTimeout(function() {
            setIntervalRandom();
            setTimeout(function() {
                setNumList();
                setTimeoutRandom();
            }, 2000)
        }, 2000)
    }
}

function setNumList() {
    $(".lottery-bg-clone").addClass("cloneanimation");
    var numStr1 = $(".lottery-bg-num1").html();
    var numStr2 = $(".lottery-bg-num2").html();
    var numStr3 = $(".lottery-bg-num3").html();
    $(".lottery-bg-num1-clone").html(numStr1);
    $(".lottery-bg-num2-clone").html(numStr2);
    $(".lottery-bg-num3-clone").html(numStr3);
    var numStr = numStr1 + numStr2 + numStr3;
    //抽到的缓存
    // var lotterynumList =JSON.parse(localStorage.getItem("lotterynumList"));
    // if (!lotterynumList) {
    //     lotterynumList = [];
    // } else {
    //     lotterynumList.split(",");
    // }
    // lotterynumList.push(numStr);
    // localStorage.setItem("lotterynumList",JSON.stringify(lotterynumList));
    var numStrWhichNum = numList.indexOf(numStr);
    numList.splice(numStrWhichNum, 1);
    localStorage.setItem("numList", JSON.stringify(numList));
    var animatedList = ["flipInX", "flipInY", "bounceIn", "zoomIn"];
    var animatedListStr = animatedList[Math.floor(Math.random() * 4)];
    console.log("animatedListStr===", animatedListStr);
    var numStrdom = "<div class='lottery-num-list animated " + animatedListStr + "'>" + numStr + "</div>";
    setTimeout(function() {
        $(".lottery-num-bg").append(numStrdom);
    }, 1000)
    clearInterval(setId);
}

window.onload = function() {
    $(".lottery-but").click(function() {
        // 如果没了的缓存
        // var hasNumListlength = JSON.parse(localStorage.getItem("numList"));
        // if (hasNumListlength.length == 0) {
        //     for (var i = 1; i <= totalNum; i++) {
        //         if (i < 10) {
        //             numList.push("00" + i);
        //         } else if (i >= 10 && i < 100) {
        //             numList.push("0" + i);
        //         } else {
        //             numList.push("" + i);
        //         }
        //     }
        //     localStorage.setItem("numList", JSON.stringify(numList));
        // }

        if ($(this).hasClass("lottery-but-beg")) { //开始
            lotteryNum = $(".lottery-num input").val();
            if (lotteryNum == "" || lotteryNum == 0) {
                alert("请填写一个本轮抽奖的个数！");
                return false;
            }
            $(".lottery-num input").attr("disabled", true);
            $(".lottery-num input").addClass("cursornot");
            lotteryNum = parseInt($(".lottery-num input").val());
            $(".lottery-num-bg").html("");
            $(this).removeClass("lottery-but-beg");
            $(this).addClass("lottery-but-sto");
            setIntervalRandom();
        } else { //停止
            if (lotteryNum > 0) {
                $(".lottery-but-no").show();
                $(".lottery-but").hide();
            }
            setNumList();
            setTimeoutRandom();
            $(this).removeClass("lottery-but-sto");
            $(this).addClass("lottery-but-beg");
        }
    })

    document.onkeydown = function(event) {
        console.log("event.keyCode===", event.keyCode)
        var keyCode = event.keyCode;
        if (keyCode == 13) {

        }

    }
}