let i = 1;
setInterval(() => {
    if (i ===5) {
        console.log('end');
        process.exit();
    } else {
    console.log(i); 
    i += 1;
    }
}, 1000);

