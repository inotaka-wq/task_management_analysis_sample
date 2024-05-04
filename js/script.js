// Initialize schedule with time slots
const schedule = document.getElementById('schedule');
const slotHeight = 40; // Height of each hour slot in pixels
const startTime = 9; // Start time for the schedule
const endTime = 19; // End time for the schedule

// Generate hourly slots
for (let hour = startTime; hour < endTime; hour++) {
  const timeSlot = document.createElement('div');
  timeSlot.classList.add('time-slot');
  timeSlot.style.top = `${(hour - startTime) * slotHeight}px`; // Position slots
  timeSlot.dataset.time = `${hour}:00 - ${hour + 1}:00`;
  timeSlot.style.height = `${slotHeight}px`;
  timeSlot.textContent = `${hour}:00 - ${hour + 1}:00`;
  schedule.appendChild(timeSlot);
}

document.querySelectorAll('.task').forEach(task => {
  task.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text', e.target.id);
    e.dataTransfer.setData('duration', task.dataset.duration);
  });
});

schedule.addEventListener('dragover', (e) => {
  e.preventDefault();
});

schedule.addEventListener('drop', (e) => {
  e.preventDefault();
  const taskId = e.dataTransfer.getData('text');
  const task = document.getElementById(taskId);
  const duration = parseFloat(e.dataTransfer.getData('duration'));
  const mouseY = e.clientY - schedule.getBoundingClientRect().top;
  const startHour = Math.floor(mouseY / slotHeight) + startTime;
  const taskStartTop = (startHour - startTime) * slotHeight;
  const taskHeight = duration * slotHeight;

  // Check if the task overflows the schedule
  if (taskStartTop + taskHeight <= (endTime - startTime) * slotHeight) {
    task.style.position = 'absolute';
    task.style.top = `${taskStartTop}px`;
    task.style.height = `${taskHeight}px`;
    task.textContent = `${task.textContent.split(' - ')[0]} - ${startHour}:00 - ${startHour + duration}:00`;
    schedule.appendChild(task);
  } else {
    console.log('Task does not fit in the schedule.');
  }
});
