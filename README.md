# PETS
**이더리움 기반** 펫 용품 거래 및 소통, 기부모금 **웹 페이지** <br>
동물과 소셜네트워크서비스를 결합한 단어(PET + SNS)


## Team
* 권달형
* 고재현
* 김민선
* 김희재
* 문영선


## Background
> 1인 가구, 저출산·고령화 현상으로 매년 **반려동물**을 키우는 가구수가 늘어나면서 관련시장 규모가 확대되고 있습니다. <br>
최근에는 반려동물을 뜻하는 '펫(Pet)'과 가족을 의미하는 '패밀리(Family)'가 합쳐진 '**펫팸족**', 반려동물 관련시장 성장세를 반영한 <br>
'**펫코노미**(Pet+Economy)'라는 신조어까지 등장할 정도로 반려동물에 대한 관심도가 높아지고 있는 추세입니다. <br><br>
이러한 반려동물이라는 공감대를 **이더리움 기반**의 **블록체인 시스템**과 결합하여, <br>
참여할수록 보상받는 **인센티브 생태계 시스템** 형식의 **DApp**으로 구현하고자 하였습니다.


## Prerequisites
* Ubuntu - 16.04
* Solidity - ^0.5.1
* Node js - latest
* Express - latest
* Javascript
* Web3
* mongoDB - latest
* Socket.io - latest
* Git client - latest


## SmartContract: Solidity
```solidity
pragma solidity ^0.5.1;

contract PETS {

    struct myStruct {
        string petage;
        string breed;
        string gender;
        string location;
        uint timestamp;
    }
    
    event pet (
        string petage;
        string breed;
        string gender;
        string location;
        uint timestamp;
    );
        
    myStruct[] public pets;
    
    /* 사용자가 입력한 동물을 등록 */
    function addPet (uint256 _petage, string memory _breed, string memory _gender, string memory _location) public {
        pets.push(myStruct(_petage, _breed, _gender, _location, block.timestamp));
        emit pet(_petage, _breed, _gender, _location, block.timestamp);
    }
    
}
```
<br>


## Installation Process
### 1. 파일을 클론합니다.
```
git clone https://github.com/mys12/eth_project.git
```

### 2. 필요한 모듈을 설치합니다.
```
npm install
```

### 3. 서버를 실행시킵니다.
```
node server.js
```

### 4. 브라우저에서 해당 포트로 접속합니다.
```
http://127.0.0.1:8080/
```
<br>
