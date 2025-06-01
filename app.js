const express = require('express');
const { exec } = require('child_process');
const si = require('systeminformation');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));

// Default state for switches
let switchStates = {
    touchSensitivity: false,
    zeroLatency: false,
    fpsOptimization: false
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/status', (req, res) => {
    res.json(switchStates);
});

app.post('/api/toggle/:switchName', (req, res) => {
    const { switchName } = req.params;
    
    if (switchStates.hasOwnProperty(switchName)) {
        // Toggle the switch state
        switchStates[switchName] = !switchStates[switchName];
        
        // Apply the corresponding optimization
        applyOptimization(switchName, switchStates[switchName]);
        
        res.json({ 
            success: true, 
            state: switchStates[switchName],
            message: `${switchName} ${switchStates[switchName] ? 'enabled' : 'disabled'} successfully`
        });
    } else {
        res.status(400).json({ success: false, message: 'Invalid switch name' });
    }
});

function applyOptimization(switchName, enabled) {
    console.log(`Applying ${switchName}: ${enabled ? 'ON' : 'OFF'}`);
    
    switch(switchName) {
        case 'touchSensitivity':
            if (enabled) {
                // Increase touch sensitivity and response rate (simulated)
                console.log('Increasing touch sensitivity by 10x');
                // This would require platform-specific implementations
            } else {
                console.log('Restoring default touch sensitivity');
            }
            break;
            
        case 'zeroLatency':
            if (enabled) {
                // Attempt to reduce input lag (simulated)
                console.log('Reducing input lag to minimum');
            } else {
                console.log('Restoring default input settings');
            }
            break;
            
        case 'fpsOptimization':
            if (enabled) {
                // Optimize for 60 FPS (simulated)
                console.log('Optimizing for 60 FPS, clearing caches, and improving performance');
                
                // Clear caches (simplified example)
                if (process.platform === 'win32') {
                    exec('ipconfig /flushdns', (error) => {
                        if (error) console.error('Error clearing DNS cache:', error);
                    });
                }
                
                // Additional optimizations would go here
            } else {
                console.log('Restoring default performance settings');
            }
            break;
    }
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
