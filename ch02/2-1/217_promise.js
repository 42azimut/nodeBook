 const condition = true;
 const promise = new Promise((resolve, reject) => {
     if (condition) {
         resolve('성공 리졸브');
     } else {
         reject("실패 리젝트");
     }
 });
 promise
    .then((msg) => {
        console.log(msg);
    })
    .then (() => {
        console.log('who wow');
    })
    .catch((err) => {
        console.error(err);
    })
    .finally(() => {
        console.log("무조건 실행 파이널리!");
    })
