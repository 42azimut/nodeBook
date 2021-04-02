//// p. 28
// function first() {
//     second();
//     console.log("첫번째");
// }


// function second() {
//     third();
//     console.log("두 번째");
// }

// function third() {
//     console.log("세번째");
// }
// first();

//// p. 29
// function run() {
//     console.log("3초 후 실행");
// }
// console.log("시작");
// setTimeout(run, 3000);
// console.log("끝");


// 자바스크립트 이벤트 루프 개념 훈련! 유튭 강의 2-2
function oneMore() {
    console.log('one more');
}
function run() {
    console.log('run rrun');
    setTimeout(() => {
        console.log("timeout 0 Wow");   //프로미스 우선순위에 밀린다! 
    }, 0)
    new Promise((resolve) => {   //프로미스는 동기 (리졸브는 동기 : 바로 구동)
        resolve("hi_resolve");
    })
    .then(console.log);   // 여기서 then 비동기  >백그라운드로 보냄! 
    oneMore();   //실행  --> 콘솔로그 실행!
}
setTimeout(run, 5000);

// 1) oneMore , run 선언
// 2) setTimeout(run, 5000) 실행 --> 백그라운드로 셋타이머(런, 5초) 보냄 5초카운팅!
// 3) --> 태스크 큐로 위의 run함수 보내짐! 
// 4)(호출 스택 비어있으면, 호출스택으로 런함수 보냄)

// 백그라운드 나오는 순서 없음! 먼저 끝나면 태스크 큐로 보냄! 
// 단 우선순위가 프로미스가 먼저! 익명함수 타임은 뒤이어 실행된다! 
