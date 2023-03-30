const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let animationFrameId;

  return (seconds) => {
    const endTime = Date.now() + seconds * 1000;
    let remainingTime = endTime - Date.now();
    let remainingSeconds = Math.floor(remainingTime / 1000);

    const updateTimer = () => {
      const hours = Math.floor(remainingSeconds / 3600);
      const minutes = Math.floor((remainingSeconds - hours * 3600) / 60);
      const seconds = remainingSeconds - hours * 3600 - minutes * 60;

      timerEl.textContent = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      remainingTime = endTime - Date.now();
      remainingSeconds = Math.max(0, Math.floor(remainingTime / 1000));

      if (remainingTime <= 0) {
        cancelAnimationFrame(animationFrameId);
        return;
      }

      animationFrameId = requestAnimationFrame(updateTimer);
    };

    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(updateTimer);
  };
};

const animateTimer = createTimerAnimator();

// Очистите input так, чтобы в значении
// оставались только числа
inputEl.addEventListener("input", () => {
  inputEl.value = inputEl.value.replace(/[^0-9]/g, "");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
