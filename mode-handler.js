function selectMode(mode) {
    if (mode === 'mode1') {
        window.location.href = 'friend-connect.html';
    } else if (mode === 'mode2') {
        window.location.href = 'index.html?mode=random';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('mode1-btn').addEventListener('click', function() { selectMode('mode1'); });
    document.getElementById('mode2-btn').addEventListener('click', function() { selectMode('mode2'); });
});
