// Global variables
let timetableData = null;
let currentRoute = 'orange';
let currentTimeInterval = null;

// Load timetable data
async function loadTimetableData() {
    try {
        const response = await fetch('./timetable_data.json');
        timetableData = await response.json();
        displayTimetable(currentRoute);
        startClock();
    } catch (error) {
        console.error('Error loading timetable data:', error);
        document.getElementById('timetableContainer').innerHTML = 
            '<div class="loading">データの読み込みに失敗しました</div>';
    }
}

// Display timetable for selected route
function displayTimetable(route) {
    const container = document.getElementById('timetableContainer');
    
    if (!timetableData || !timetableData[route]) {
        container.innerHTML = '<div class="loading">データがありません</div>';
        return;
    }
    
    const routeData = timetableData[route];
    const busNumbers = routeData.bus_numbers;
    const stops = routeData.stops;
    
    // Create table
    let html = '<table class="timetable">';
    
    // Header
    html += '<thead><tr>';
    html += '<th class="stop-name">バス停</th>';
    busNumbers.forEach((busNum, index) => {
        html += `<th class="time-cell">便${index + 1}</th>`;
    });
    html += '</tr></thead>';
    
    // Body
    html += '<tbody>';
    stops.forEach(stop => {
        html += `<tr data-stop="${stop.name}">`;
        html += `<td class="stop-name">${stop.name}</td>`;
        stop.times.forEach(time => {
            const timeClass = getTimeClass(time);
            html += `<td class="time-cell ${timeClass}">${formatTime(time)}</td>`;
        });
        html += '</tr>';
    });
    html += '</tbody></table>';
    
    container.innerHTML = html;
    updateNextBus();
}

// Format time string
function formatTime(timeStr) {
    if (!timeStr || timeStr === '--') return '--';
    // Extract HH:MM from HH:MM:SS
    return timeStr.substring(0, 5);
}

// Get time class based on current time
function getTimeClass(timeStr) {
    if (!timeStr || timeStr === '--') return '';
    
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const [hours, minutes] = timeStr.split(':').map(Number);
    const busMinutes = hours * 60 + minutes;
    
    if (busMinutes < currentMinutes) {
        return 'passed';
    }
    
    return '';
}

// Update current time display
function updateCurrentTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ja-JP', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('currentTime').textContent = timeStr;
}

// Find and display next bus
function updateNextBus() {
    if (!timetableData || !timetableData[currentRoute]) return;
    
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    const routeData = timetableData[currentRoute];
    let nextBusTime = null;
    let minDiff = Infinity;
    
    // Check all stops and all times
    routeData.stops.forEach(stop => {
        stop.times.forEach(time => {
            if (!time || time === '--') return;
            
            const [hours, minutes] = time.split(':').map(Number);
            const busMinutes = hours * 60 + minutes;
            const diff = busMinutes - currentMinutes;
            
            if (diff > 0 && diff < minDiff) {
                minDiff = diff;
                nextBusTime = formatTime(time);
            }
        });
    });
    
    const nextBusElement = document.getElementById('nextBus');
    if (nextBusTime) {
        nextBusElement.textContent = `${nextBusTime} (${minDiff}分後)`;
    } else {
        nextBusElement.textContent = '本日の運行は終了しました';
    }
}

// Start clock
function startClock() {
    updateCurrentTime();
    updateNextBus();
    
    if (currentTimeInterval) {
        clearInterval(currentTimeInterval);
    }
    
    currentTimeInterval = setInterval(() => {
        updateCurrentTime();
        updateNextBus();
        // Refresh timetable display to update passed times
        displayTimetable(currentRoute);
    }, 1000);
}

// Route button click handler
function setupRouteButtons() {
    const routeButtons = document.querySelectorAll('.route-btn');
    
    routeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            routeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Update current route
            currentRoute = button.dataset.route;
            
            // Display new timetable
            displayTimetable(currentRoute);
            
            // Clear search
            document.getElementById('stopSearch').value = '';
        });
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('stopSearch');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const rows = document.querySelectorAll('.timetable tbody tr');
        
        rows.forEach(row => {
            const stopName = row.dataset.stop.toLowerCase();
            if (stopName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupRouteButtons();
    setupSearch();
    loadTimetableData();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (currentTimeInterval) {
        clearInterval(currentTimeInterval);
    }
});
