
const scribbleCanvas = document.getElementById('scribblePad')
const scribbleCtx = scribbleCanvas.getContext('2d');
const miniMapCanvas = document.getElementById('miniMapView');
const miniMapCtx = miniMapCanvas.getContext('2d');
const mouseIndicator = document.getElementById('mouseIndicator');
const trackerContainer = document.getElementById('trackerContainer');

let drawing = false;

Set canvas dimensions (can also be done in CSS)
scribbleCanvas.width = scribbleCanvas.offsetWidth;
scribbleCanvas.height = scribbleCanvas.offsetHeight;
miniMapCanvas.width = trackerContainer.offsetWidth; // Mini map width based on its container
miniMapCanvas.height = trackerContainer.offsetHeight; // Mini map height based on its container


// Drawing Functions (same as before)
function startDrawing(e) {
	drawing = true;
	draw(e);
}

function stopDrawing() {
	drawing = false;
	scribbleCtx.beginPath();
}

function draw(e) {
	if (!drawing) return;

	const rect = scribbleCanvas.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	// Draw on the scribble pad
	scribbleCtx.lineWidth = 5;
	scribbleCtx.lineCap = 'round';
	scribbleCtx.strokeStyle = 'black';

	scribbleCtx.lineTo(x, y);
	scribbleCtx.stroke();
	scribbleCtx.beginPath();
	scribbleCtx.moveTo(x, y);

	// Update the tracker view
	updateTracker(x, y);
}

// Tracker Functionality
function updateTracker(mouseX, mouseY) {
	// Calculate scaling factors
	const scaleX = miniMapCanvas.width / scribbleCanvas.width;
	const scaleY = miniMapCanvas.height / scribbleCanvas.height;

	// Calculate the corresponding position in the mini map
	const miniMapX = mouseX * scaleX;
	const miniMapY = mouseY * scaleY;

	// Position the mouse indicator
	mouseIndicator.style.left = `${miniMapX}px`;
	mouseIndicator.style.top = `${miniMapY}px`;
	mouseIndicator.style.display = 'block'; // Show the indicator
}

// Hide the indicator when the mouse leaves the scribble pad
scribbleCanvas.addEventListener('mouseout', () => {
	stopDrawing();
	mouseIndicator.style.display = 'none';
});


// Event Listeners for Drawing
scribbleCanvas.addEventListener('mousedown', startDrawing);
scribbleCanvas.addEventListener('mouseup', stopDrawing);
scribbleCanvas.addEventListener('mousemove', draw);
