# 아이템 시뮬레이터

Node.js와 Express.js를 활용한 나만의 게임 아이템 시뮬레이터 서비스 만들기 개인과제입니다.

사용한 기술 :
Node.js, Express.js, yarn, MongoDB / mongoose, AWS EC2, PM2

> URL<br>http://bluehydrangea.store:3000/

> 과제 발제 문서<br>https://teamsparta.notion.site/Node-js-c97fbe7a14194cd592b71a0019c4b4ad

<br><br><br>

## API 명세서
|기능|API URL|Method|Request|Response|
|---|---|---|---|---|
|캐릭터 생성|/api/character|POST|{<br>&emsp;"name": "엘다하르"<br>}|{<br>&emsp;"characterId": 7<br>}|
|캐릭터 삭제|/api/character/:characterId|DELETE|{ }|{ }|
|캐릭터 조회|/api/character/:characterId|GET|{ }|{<br>&emsp;"name": "엘다하르",<br>&emsp;"health": 500,<br>&emsp;"power": 100<br>}|
|아이템 생성|/api/item|POST|{<br>&emsp;"name": "온전한 수정 하니와",<br>&emsp;"code": 6,<br>&emsp;"stat": {<br>&emsp;&emsp;"health": 30,<br>&emsp;&emsp;"power": 2<br>&emsp;}<br>}|{<br>&emsp;"name": "온전한 수정 하니와",<br>&emsp;"code": 6,<br>&emsp;"stat": {<br>&emsp;&emsp;"health": 30,<br>&emsp;&emsp;"power": 2<br>&emsp;}<br>}|
|아이템 수정|/api/item/:itemCode|PATCH|{<br>&emsp;"name": "인피니티 건틀렛 (+1)",<br>&emsp;"stat": {<br>&emsp;&emsp;"health": 100,<br>&emsp;&emsp;"power": 202<br>&emsp;}<br>}|{ }|
|아이템 목록 조회|/api/item|GET|{ }|\[<br>&emsp;{<br>&emsp;&emsp;"code": 1,<br>&emsp;&emsp;"name": "인피니티 건틀렛 (+1)"<br>&emsp;},<br>&emsp;&emsp;...<br>&emsp;{<br>&emsp;&emsp;"code": 6,<br>&emsp;&emsp;"name": "온전한 수정 하니와"{<br>&emsp;}<br>\]|
|특정 아이템 조회|/api/item/:itemCode|GET|{ }|{<br>&emsp;"code": 1,<br>&emsp;"name": "인피니티 건틀렛 (+1)",<br>&emsp;"stat": {<br>&emsp;&emsp;"health": 100,<br>&emsp;&emsp;"power": 202<br>&emsp;}<br>}|
|캐릭터가 장착중인 아이템 조회|/api/character/:characterId/equipment|GET|{ }|\[<br>&emsp;{<br>&emsp;&emsp;"item_code": 2,<br>&emsp;&emsp;"item_name": "파워 스톤"<br>&emsp;},<br>&emsp;{<br>&emsp;&emsp;"item_code": 5,<br>&emsp;&emsp;"item_name": "다이아몬드 도끼"<br>&emsp;}<br>\]|
|캐릭터에 아이템 장착|/api/character/:characterId/equipment|POST|{<br>&emsp;"item_code": 6<br>}|{<br>&emsp;"equipment": \[<br>&emsp;&emsp;2,<br>&emsp;&emsp;5,<br>&emsp;&emsp;6<br>&emsp;\]<br>}|
|캐릭터에서 아이템 해제|/api/character/:characterId/equipment|DELETE|{<br>&emsp;"item_code": 6<br>}|{<br>&emsp;"equipment": \[<br>&emsp;&emsp;2,<br>&emsp;&emsp;5<br>&emsp;\]<br>}|
