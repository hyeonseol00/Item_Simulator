# 아이템 시뮬레이터

Node.js와 Express.js를 활용해 나만의 게임 아이템 시뮬레이터 서비스를 만들어 봤습니다.

<br><br><br>

# 목표

<br>


## 필수 요구 사항

### 프로젝트 관리
1. `dotenv`를 이용해 비밀을 분리하여 관리합니다.

1. 완성된 프로젝트를 AWC EC2를 사용해 배포합니다.

### API 구현
1. 캐릭터 생성 API
	1. 캐릭터 명을 `request`로 전달받습니다.
    1. 중복된 캐릭터명일 시 생성을 거부합니다.
    1. 캐릭터 생성 시 `character_id`를 순차적으로 부여합니다.
    1. 캐릭터의 스탯을 다음과 같이 설정합니다.
		1. health : 500
		1. power : 100
	1. 생성 성공 시 캐릭터의 ID를 `response`로 전달합니다.
1. 캐릭터 삭제 API
	1. 삭제할 캐릭터의 ID를 URI의 `parameter`로 전달받습니다.
1. 캐릭터 상세 조회 API
	1. 조회할 캐릭터의 ID를 URI의 `parameter`로 전달받습니다.
    1. 캐릭터의 이름, 스탯 및 아이템 목록을 `response`로 전달합니다.
1. 아이템 생성 API
	1. 아이템 코드, 아이템명, 아이템 스탯을 `request`로 전달받습니다.
    1. 아이템 스탯은 JSON 포맷으로 전달합니다.
1. 아이템 수정 API
	1. 아이템 코드를 URI의 `parameter`로 전달받습니다.
    1. 아이템명, 아이템 능력을 `request`롤 전달받습니다.
1. 아이템 목록 조회 API
	1. 아이템 코드, 아이템명만 조회합니다.
    1. 아이템 생성 API를 통해 생성된 모든 아이템을 목록으로 조회할 수 있어야 합니다.
1. 아이템 상세 조회 API

	1. 아이템 코드를 `parameter`로 전달받습니다.
    1. 해당 아이템의 아이템 코드, 아이템명, 아이템 스탯을 조회합니다.

<br><br>


## 도전 요구 사항

### API 추가 구현
1. 특정 캐릭터에 장착된 아이템 목록 조회 API
	1. 캐릭터 ID를 `parameter`로 전달받습니다.
1. 아이템 장착 API
	1. 아이템을 장착할 캐릭터의 ID를 URI의 `parameter`로 전달받습니다.
    1. 장착할 아이템 코드를 `request`로 전달받습니다.
    1. 이미 장착된 아이템일 경우 장착을 거부합니다.
    1. 아이템 장착 시 아이템 스탯만큼 캐릭터의 스탯이 올라야 합니다.
1. 아이템 장착 해제 API

	1. 아이템을 장착 해제할 캐릭터의 ID를 URI의 `parameter`로 전달받습니다.
    1. 장착 해제할 아이템 코드를 `request`로 전달받습니다.
    1. 아이템 장착 해제 시 아이템 스탯만큼 캐릭터의 스탯이 떨어져야 합니다.
    
<br><br><br>

# 사용 기술
1. 베이스 : Node.js
1. 웹 프레임워크 : Express.js
1. 패키지 매니저 : yarn
1. 모듈 시스템 : ES6 모듈 시스템
1. 데이터베이스 : MongoDB Atlas
1. ODM : mongoose

1. 배포 : AWS EC2 / PM2

<br><br><br>

# API 명세서
|기능|API URL|Method|Request|Response|
|---|---|---|---|---|
|캐릭터 생성|/api/character|POST|{<br>&emsp;"name": "엘다하르"<br>}|{<br>&emsp;"characterId": 7<br>}|
|캐릭터 삭제|/api/character/:characterId|DELETE|{ }|{ }|
|캐릭터 조회|/api/character/:characterId|GET|{ }|{<br>&emsp;"name": "엘다하르",<br>&emsp;"health": 500,<br>&emsp;"power": 100<br>}|
|아이템 생성|/api/item|POST|{<br>&emsp;"name": "온전한 수정 하니와",<br>&emsp;"code": 6,<br>&emsp;"stat": {<br>&emsp;&emsp;"health": 30,<br>&emsp;&emsp;"power": 2<br>&emsp;}<br>}|{<br>&emsp;"name": "온전한 수정 하니와",<br>&emsp;"code": 6,<br>&emsp;"stat": {<br>&emsp;&emsp;"health": 30,<br>&emsp;&emsp;"power": 2<br>&emsp;}<br>}|
|아이템 수정|/api/item/:itemCode|PATCH|{<br>&emsp;"name": "인피니티 건틀렛 (+1)",<br>&emsp;"stat": {<br>&emsp;&emsp;"health": 100,<br>&emsp;&emsp;"power": 202<br>&emsp;}<br>}|{ }|
|아이템 목록 조회|/api/item|GET|{ }|\[<br>&emsp;{<br>&emsp;&emsp;"code": 1,<br>&emsp;&emsp;"name": "인피니티 건틀렛 (+1)"<br>&emsp;},<br>&emsp;&emsp;...<br>&emsp;{<br>&emsp;&emsp;"code": 6,<br>&emsp;&emsp;"name": "온전한 수정 하니와"<br>&emsp;}<br>\]|
|특정 아이템 조회|/api/item/:itemCode|GET|{ }|{<br>&emsp;"code": 1,<br>&emsp;"name": "인피니티 건틀렛 (+1)",<br>&emsp;"stat": {<br>&emsp;&emsp;"health": 100,<br>&emsp;&emsp;"power": 202<br>&emsp;}<br>}|
|캐릭터가 장착중인 아이템 조회|/api/character/:characterId/equipment|GET|{ }|\[<br>&emsp;{<br>&emsp;&emsp;"item_code": 2,<br>&emsp;&emsp;"item_name": "파워 스톤"<br>&emsp;},<br>&emsp;{<br>&emsp;&emsp;"item_code": 5,<br>&emsp;&emsp;"item_name": "다이아몬드 도끼"<br>&emsp;}<br>\]|
|캐릭터에 아이템 장착|/api/character/:characterId/equipment|POST|{<br>&emsp;"item_code": 6<br>}|{<br>&emsp;"equipment": \[<br>&emsp;&emsp;2,<br>&emsp;&emsp;5,<br>&emsp;&emsp;6<br>&emsp;\]<br>}|
|캐릭터에서 아이템 해제|/api/character/:characterId/equipment|DELETE|{<br>&emsp;"item_code": 6<br>}|{<br>&emsp;"equipment": \[<br>&emsp;&emsp;2,<br>&emsp;&emsp;5<br>&emsp;\]<br>}|

<br><br><br>

# 링크

> ### 배포 링크
http://bluehydrangea.store:3000/

> ### 블로그
https://velog.io/@hyeonseol22/Item-Simulator

> ### 과제 발제 문서
https://teamsparta.notion.site/Node-js-c97fbe7a14194cd592b71a0019c4b4ad

<br><br><br>
