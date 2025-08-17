// Random data for filtering
const people = [
    'Beck, Glenn',
    'Becker, Carl', 
    'Beckett, Samuel',
    'Beddoes, Mick',
    'Beecher, Henry',
    'Beethoven, Ludwig',
    'Begin, Menachem',
    'Belloc, Hilaire',
    'Bellow, Saul',
    'Benchley, Robert',
    'Benenson, Peter',
    'Ben-Gurion, David',
    'Benjamin, Walter',
    'Benn, Tony',
    'Bennington, Chester',
    'Benson, Leana',
    'Bent, Silas',
    'Bentsen, Lloyd',
    'Berger, Ric',
    'Bergman, Ingmar',
    'Berio, Luciano',
    'Berle, Milton',
    'Berlin, Irving',
    'Berne, Eric',
    'Bernhard, Sandra',
    'Berra, Yogi',
    'Berry, Halle',
    'Berry, Wendell',
    'Bethea, Erin',
    'Bevan, Aneurin',
    'Bevel, Ken',
    'Biden, Joseph',
    'Bierce, Ambrose',
    'Biko, Steve',
    'Billings, Josh',
    'Biondo, Frank',
    'Birrell, Augustine',
    'Black, Elk',
    'Blair, Robert',
    'Blair, Tony',
    'Blake, William'
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Random JS project loaded successfully!');
    
    // Create the HTML structure for the filtering interface
    const container = document.createElement('div');
    container.innerHTML = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="text-align: center; color: #333; margin-bottom: 30px;">Random Data Filter</h1>
            
            <div style="margin-bottom: 30px;">
                <input type="text" id="searchInput" placeholder="Search people..." 
                       style="width: 100%; padding: 12px; font-size: 16px; border: 2px solid #ddd; border-radius: 8px; outline: none;">
            </div>
            
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button id="sortBtn" style="padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Sort A-Z
                </button>
                <button id="reverseBtn" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Sort Z-A
                </button>
                <button id="shuffleBtn" style="padding: 10px 20px; background: #ffc107; color: #333; border: none; border-radius: 5px; cursor: pointer;">
                    Shuffle
                </button>
                <button id="clearBtn" style="padding: 10px 20px; background: #dc3545; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Clear
                </button>
            </div>
            
            <div id="results" style="background: #f8f9fa; border-radius: 8px; padding: 20px; min-height: 200px;">
                <p style="text-align: center; color: #666;">Start typing to search or use the buttons above</p>
            </div>
            
            <div style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
                <span id="count">0</span> items found
            </div>
        </div>
    `;
    
    // Replace the existing content
    document.body.innerHTML = '';
    document.body.appendChild(container);
    
    // Get DOM elements
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    const countSpan = document.getElementById('count');
    const sortBtn = document.getElementById('sortBtn');
    const reverseBtn = document.getElementById('reverseBtn');
    const shuffleBtn = document.getElementById('shuffleBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    let currentData = [...people];
    let isReversed = false;
    
    // Function to display results
    function displayResults(data) {
        if (data.length === 0) {
            resultsDiv.innerHTML = '<p style="text-align: center; color: #666;">No results found</p>';
        } else {
            const resultsHTML = data.map((person, index) => `
                <div style="padding: 10px; margin: 5px 0; background: white; border-radius: 5px; border-left: 4px solid #007bff; cursor: pointer; transition: all 0.2s ease;"
                     onmouseover="this.style.transform='translateX(5px)'" 
                     onmouseout="this.style.transform='translateX(0)'"
                     onclick="highlightPerson(this)">
                    <strong>${index + 1}.</strong> ${person}
                </div>
            `).join('');
            resultsDiv.innerHTML = resultsHTML;
        }
        countSpan.textContent = data.length;
    }
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredData = people.filter(person => 
            person.toLowerCase().includes(searchTerm)
        );
        currentData = filteredData;
        displayResults(filteredData);
    });
    
    // Sort functionality
    sortBtn.addEventListener('click', function() {
        currentData.sort();
        isReversed = false;
        displayResults(currentData);
    });
    
    // Reverse sort functionality
    reverseBtn.addEventListener('click', function() {
        currentData.sort().reverse();
        isReversed = true;
        displayResults(currentData);
    });
    
    // Shuffle functionality
    shuffleBtn.addEventListener('click', function() {
        for (let i = currentData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentData[i], currentData[j]] = [currentData[j], currentData[i]];
        }
        displayResults(currentData);
    });
    
    // Clear functionality
    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        currentData = [...people];
        displayResults(people);
    });
    
    // Highlight person on click
    window.highlightPerson = function(element) {
        // Remove previous highlights
        document.querySelectorAll('.highlighted').forEach(el => {
            el.classList.remove('highlighted');
            el.style.background = 'white';
        });
        
        // Add highlight to clicked element
        element.classList.add('highlighted');
        element.style.background = '#e3f2fd';
        
        // Show alert with person name
        const personName = element.textContent.split('. ')[1];
        alert(`Selected: ${personName}`);
    };
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'f':
                    e.preventDefault();
                    searchInput.focus();
                    break;
                case 's':
                    e.preventDefault();
                    sortBtn.click();
                    break;
                case 'r':
                    e.preventDefault();
                    reverseBtn.click();
                    break;
            }
        }
    });
    
    // Initial display
    displayResults(people);
    
    // Add some CSS for better styling
    const style = document.createElement('style');
    style.textContent = `
        body {
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        button:hover {
            opacity: 0.8;
            transform: translateY(-2px);
            transition: all 0.2s ease;
        }
        
        #searchInput:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
        }
        
        .highlighted {
            animation: pulse 0.3s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});

