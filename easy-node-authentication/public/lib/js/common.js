
// 숫자가 10보다 작을때 앞에 0 붙이는 함수
var leadingZero = (num) => (num<10) ? '0'+num : num;

// 지금 시간 구하는 함수 (yyyy-mm-dd hh:mm)
function getNow(){
    var now = new Date();
    var year = now.getFullYear();
    var month = leadingZero(now.getMonth()+1);
    var date = leadingZero(now.getDate());
    var hour = leadingZero(now.getHours());
    var minute = leadingZero(now.getMinutes());

    return year+'-'+month+'-'+date+' '+hour+':'+minute;
}

