# openproject-slack-node
Slack Push Process. 문자메시징을 DB에 저장하여 Slack 서비스로 전송하여 Slack으로 문자를 받음


Slack 채팅 프로그램을 활용한 메시징 푸쉬 서비스

### 개요
무료 채팅 프로그램인 Slack을 활용한 알람 서비스 제작
안내 문자, 장애 문자, 서비스 문자 등 다양한 패턴에 메시징을 상대방에게 전달하여 인지 목적

### 서비스 목적
자사에 시스템 장애 문자 혹은 공지사항, 부고문자 등을 빠르게 보내여 임직원에게 내용을 빠르게 전달하기 위한 서비스
사용자가 직접 보내는 것이 아닌 시스템에서 등록 혹은 인지하여 DB에 데이터 저장만 하면 바로 지정된 채널에 대상자에게 메시징을 보내는 시스템

## 사용법
1. 자사 서비스 DB에 MongoDB서비스를 설치 (무료)
2. config 폴더에 imnugu-mongo-config.json에서 DB Connection Setting
3. schema에 slack.js 파일 확인 후 mongoDB 스키마 구조 확인
<pre>
<code>
{
  channel:"channel-TEST"
  text:"TEST 메시징 확인. 알람 확인"
  sendFlag:"N"
}
</pre>
</code>
4. __https://api.slack.com/__ 접속하여 Messaging API를 만들어서 API Token 발급 후 index.js에 options -> Authorization -> setting 변경
<pre>
<code>
var options = {
  'method': 'POST',
  'url': 'https://slack.com/api/chat.postMessage',
  'headers': {
    'Authorization': 'Bearer xxxx-xxxxxxxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxxxx',
    'Content-Type': 'application/json'
  },
  body: ''
};
</pre>
</code>
