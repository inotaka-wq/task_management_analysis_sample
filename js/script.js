const tasks = document.querySelectorAll('.task');

tasks.forEach(task => {
  task.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
  });

  task.addEventListener('dragover', (e) => {
    e.preventDefault(); // デフォルトの処理を停止してドロップを許可
  });

  task.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    const dropzone = e.target;
    if (dropzone.className === 'task') {
      dropzone.parentNode.insertBefore(draggableElement, dropzone.nextSibling);
    }
  });
});
