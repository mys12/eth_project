typeof web3 !== 'undefined'
  ? (web3 = new Web3(web3.currentProvider))
  : (web3 = new Web3(new Web3.providers.HttpProvider('http://101.101.166.164:8545')));


/* 이더리움 테스트넷 노드 rpc (infura) 
   컨트랙트 배포
*/ 

const contractAddress = '0xf2aa3d66c8871308da8fd86ab95e4bdcc41de6c4';
const smartContract = web3.eth.contract(abi).at(contractAddress);

function init() {
  // 첫번째 계정으로 주소 설정
  document.getElementById('address').value = web3.eth.accounts[0];

}

function showList() {
  const table = document.getElementById('table1');
  //const length = smartContract.methods.getTotal();
  console.log(length);
  
  smartContract.pet().watch((err, res) => {
    if (!err) {
      console.dir(res);
      const row = table.insertRow();
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      cell1.innerHTML = res.args.petage.c[0];
      cell2.innerHTML = res.args.breed;
      cell3.innerHTML = res.args.gender;
      cell4.innerHTML = res.args.location;
      cell5.style.width = '60%';
      cell5.innerHTML = new Date(res.args.timestamp.c[0]);
    }
  });

  for (let i = 0; i < length; i++) {
    const pet = smartContract.methods.getPet(i);
    const toString = pet.toString();
    const strArray = toString.split(',');

    const timestamp = new Date(strArray[4] * 1000);
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    cell1.innerHTML = strArray[0];
    cell2.innerHTML = strArray[1];
    cell3.innerHTML = strArray[2];
    cell4.innerHTML = strArray[3];
    cell5.style.width = '60%';
    cell5.innerHTML = timestamp;
  }
  
}


function addPet() {
  var petage = document.getElementById('petage').value;
  var breed = document.getElementById('breed').value;
  var gender = document.getElementById('gender').value;
  var location = document.getElementById('location').value;
  var address = document.getElementById('address').value;
  //var pass = document.getElementById('pass').value;
  //if (web3.personal.unlockAccount(address, pass)) {
    smartContract.addPet(
      petage,
      breed,
      gender,
      location,
      { from: address, gas: 2000000 },
      (err, result) => {
        if (!err) alert('트랜잭션이 성공적으로 전송되었습니다.\n' + result);
      }
    );
}

$(document).ready(function() {
  init();
  showList();
});