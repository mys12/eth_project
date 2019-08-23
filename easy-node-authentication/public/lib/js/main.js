
// 전역변수 선언
var inputTitle = $('#inputTitle');
var inputContent = $('#inputContent');
var saveBtn = $('#saveColumn');
var colList = $('#colList');

// 배열 선언
var columnArr = [];

// 스토리지에서 마지막 시퀀스 번호 따기
function getLastSeq(key){
    var storedItems = getFromStorage(key);
    if (storedItems == null || storedItems.length == 0){
        return 0;
    }else if(storedItems.length > 0){
        return storedItems.pop().seq;
    }
}

// 스토리지에 배열 저장
function saveToStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value));
}

// 스토리지에서 아이템 로드
function getFromStorage(key){
    var storedItem = localStorage.getItem(key);
    if (storedItem == null){
        return null;
    }else if (storedItem !== null){
        return JSON.parse(localStorage.getItem(key));
    }
}


// 새 게시물 등록
function addNewColumn(){
    var titleVal = inputTitle.val();
    var contentVal = inputContent.val();

    if (titleVal == ''){
        alert('제목을 입력해주세요!');
    }else if(contentVal == ''){
        alert('내용을 입력해주세요!')
    }else if (titleVal !== '' && contentVal !== ''){
        var column = {
            seq: getLastSeq('columns')+1, // 마지막 시퀀스 번호 +1 부여
            title: titleVal,
            content: contentVal,
            date: getNow()
        };
        // 배열에 삽입
        columnArr.push(column);

        // 입력창 초기화하고 포커스 
        inputTitle.val('').focus();
        inputContent.val('');

        // 저장하고
        saveToStorage('columns', columnArr);

        // 렌더링
        renderCol();
    }
}

// 저장 버튼에 이벤트 바인딩
saveBtn.click(addNewColumn);

// DOM엘리먼트 템플릿 등록
// function getColumnTemplate(url, seq, title, date){
//     return '<li class="column-item"><a class="column-item-anchor" href="'+url+'"><div class="column-item-num"><span>'+seq+'</span></div><div class="column-item-title"><span>'+title+'</span></div><div class="column-item-date"><span>'+date+'</span></div></a><button class="btn btn-remove" data-index="'+seq+'">삭제</button></li>';
// }
function getColumnTemplate(url, seq, title, date){
    return '<li class="column-item"><a class="column-item-anchor" href="/column"><div class="column-item-num"><span>'+seq+'</span></div><div class="column-item-title"><span>'+title+'</span></div><div class="column-item-date"><span>'+date+'</span></div></a><button class="btn btn-remove" data-index="'+seq+'">삭제</button></li>';
}

// url주소 치환
function replaceUrl(num){
    var url = window.location.href;
    return (url.replace('board.html', 'column.html'))+'?seq='+num;
}

// 컬럼 렌더링
function renderCol(){
    colList.html('');
    var storedItems = getFromStorage('columns');
    if (storedItems !== null){
        columnArr = storedItems;

        storedItems.forEach(function(e){
            colList.append(getColumnTemplate(replaceUrl(e.seq), e.seq, e.title, e.date));
        });
    }
}

// 게시물 삭제
$(document).on('click', '.btn-remove', function(){
    var index = $(this).attr('data-index');
    for (var i=0; i<columnArr.length; i++){
        if (columnArr[i].seq == index){
            columnArr.splice(i, 1);
        }
    }

    saveToStorage('columns', columnArr);
    renderCol();
})

$(document).ready(function(){
    renderCol();
})

