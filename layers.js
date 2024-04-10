document.addEventListener('DOMContentLoaded', () => {
    const mainCanvas = document.getElementById('canvas');
    const mainCtx = mainCanvas.getContext('2d');
    let layers = [];
    let offscreenCanvases = [];
    let currentLayerIndex = 0;

    function createLayer() {
        if (layers.length >= 5) return;

        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = mainCanvas.width;
        offscreenCanvas.height = mainCanvas.height;
        const offscreenCtx = offscreenCanvas.getContext('2d');

        layers.push({ canvas: offscreenCanvas, ctx: offscreenCtx });
        updateLayerList();
        redrawMainCanvas();
    }

    function redrawMainCanvas() {
        mainCtx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
        layers.forEach(layer => {
            mainCtx.drawImage(layer.canvas, 0, 0);
        });
    }

    function switchToLayer(index) {
        currentLayerIndex = index;
    }

    function updateLayerList() {
        const layerList = document.getElementById('layer-list');
        layerList.innerHTML = '';
        layers.forEach((_, index) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = `Layer ${index + 1}`;
            button.onclick = () => switchToLayer(index);
            li.appendChild(button);
            layerList.appendChild(li);
        });
    }

    function initializeDrawing() {
        let isDrawing = false;

        mainCanvas.onmousedown = (e) => {
            isDrawing = true;
            const { ctx } = layers[currentLayerIndex];
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        };

        mainCanvas.onmousemove = (e) => {
            if (isDrawing) {
                const { ctx } = layers[currentLayerIndex];
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }
        };

        mainCanvas.onmouseup = () => {
            isDrawing = false;
            redrawMainCanvas();
        };
    }

    document.getElementById('add-layer-btn').addEventListener('click', createLayer);
    createLayer(); // Erstellt initial einen Layer
    initializeDrawing();
});
