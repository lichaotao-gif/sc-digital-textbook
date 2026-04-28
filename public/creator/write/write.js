(function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('book') || '';
  var title = '';
  try {
    var raw = sessionStorage.getItem('cr_write_book');
    if (raw) {
      var o = JSON.parse(raw);
      if (o && o.id && (!id || o.id === id)) {
        id = o.id;
        title = o.title || '';
      }
    }
  } catch (e) {}
  var h = document.getElementById('writePageTitle');
  var s = document.getElementById('writePageSub');
  if (h) {
    h.textContent = title || (id ? '教材编写' : '教材编写');
  }
  if (s) {
    s.textContent = id
      ? '图书 ID：' + id + ' · 演示占位'
      : '未指定图书，请从「我的图书」中点击「撰写图书」进入本页。';
  }
})();
