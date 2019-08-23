// 스토리지에 있는거 뿌려주는 로직
var colTitle = $('#colTitle');
var colContent = $('#colContent');

function loadCol(){
    var storedItems = getFromStorage('columns');
    var url = window.location.href;
    var seqNum = url.split('?seq=')[1];
    for (var i=0; i<storedItems.length; i++){
        if (storedItems[i].seq == seqNum){
            colTitle.html(storedItems[i].title);
            colContent.html(storedItems[i].content);
        }
    }
}

$(document).ready(function(){
    loadCol();
});

