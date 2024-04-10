document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let brushSize = parseInt(document.getElementById('brush-size').value);
    let currentColor = document.getElementById('color-picker').value;
    let eraserActive = false;
    let timerActive = false;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    canvas.addEventListener('mousedown', (e) => {
        if (!timerActive) return;
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing || !timerActive) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = eraserActive ? 'white' : currentColor;
        ctx.lineWidth = brushSize; // Use brushSize for both drawing and erasing
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    document.getElementById('brush-size').addEventListener('input', function() {
        brushSize = parseInt(this.value);
        ctx.lineWidth = brushSize;
    });

    document.getElementById('color-picker').addEventListener('change', function() {
        currentColor = this.value;
        eraserActive = false;
        ctx.strokeStyle = currentColor;
    });

    document.getElementById('brush-btn').addEventListener('click', () => eraserActive = false);
    document.getElementById('eraser-btn').addEventListener('click', () => eraserActive = true);
    document.getElementById('clear-btn').addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height));
    document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);

    document.getElementById('start-btn').addEventListener('click', startTimer);

    function startTimer() {
        if (timerActive) return; // Prevent multiple timer starts
        timerActive = true;
        let timeLeft = 10 * 60; // 10 minutes in seconds
        updateTimerDisplay(timeLeft);

        const timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerActive = false;
                alert("Time's up! The session has ended.");
                return;
            }
            timeLeft--;
            updateTimerDisplay(timeLeft);
        }, 1000);
    }

    function updateTimerDisplay(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('timer').textContent = `Timer: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => {
                console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
            });
        }
    }
}

document.getElementById('fullscreen-btn').addEventListener('click', toggleFullScreen);

document.getElementById('download-btn').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.download = 'CenvasSwap.png';
    link.href = image;
    link.click();
});


});

