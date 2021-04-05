// 사용자 이름을 눌렀을떄 댓글 로딩. 
document.querySelectorAll('#user-list tr').forEach((el) => {
  el.addEventListener('click', function () {
    const id = el.querySelector('td').textContent;
    getComment(id);
  });
});

// 사용자 로딩