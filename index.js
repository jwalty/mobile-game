//initial game setup and global variables
let currentLanes = 3;
let playerCount = 1;
let enemyMovementSpeed = 1;
let gateMovementSpeed = 3;

createMap();

//TODO variable lane length
function createMap() {
    let newMap = document.createElement('table');
    let topRow = document.createElement('tr');
    let bottomRow = document.createElement('tr');
    newMap.appendChild(topRow);
    newMap.appendChild(bottomRow);

    for (let i=0; i < currentLanes; i++) {
        let newBottomRow = document.createElement('td');
        newBottomRow.setAttribute('data-bottom-column', i);
        bottomRow.appendChild(newBottomRow);
        let newTopRow = document.createElement('td');
        newTopRow.setAttribute('data-top-column', i);
        newTopRow.id = 'topRow';
        topRow.appendChild(newTopRow);
    }

    document.querySelector('.mapContainer').appendChild(newMap);

    //add new player
    document.querySelector('[data-bottom-column="0"]').appendChild(createPlayer());

    //spawnEnemy();
}


function spawnEnemy() {
    let laneValue = Math.floor(Math.random() * currentLanes);
    let lane = document.querySelector(`[data-top-column="${laneValue}"]`);

    let newEnemy = document.createElement('div');
    newEnemy.classList.add('enemy');
    newEnemy.setAttribute('data-distance', 0);
    let newEnemyHealth = document.createElement('span');
    newEnemyHealth.id = "enemyHealth";
    newEnemyHealth.textContent = (Math.floor(Math.random() * 5) * playerCount) + 100;
    newEnemy.appendChild(newEnemyHealth);

    lane.appendChild(newEnemy);
}
//TODO score system that tracks 'distance travelled', powerups, enemies killed,

//TODO unstoppable boss at the end??

//player control key listeners TODO switch to switch/case
document.body.addEventListener(('keydown'), (e) => {
    let player = document.querySelector('.player');
    let currentLane = parseInt(player.parentElement.getAttribute('data-bottom-column'));
    if (e.key == "ArrowLeft") {
        if (currentLane != 0) {
            changeLanes(currentLane - 1);
        }
    } else if (e.key == "ArrowRight") {
        if (currentLane != (currentLanes-1)) {
            changeLanes(currentLane + 1);
        }
    }
});

//lane changing functionality 
function changeLanes(targetLane) {
    //delete current player
    let player = document.querySelector('.player');
    player.remove();

    //move to desired lane
    let lane = document.querySelector(`[data-bottom-column="${targetLane}"]`);
    lane.appendChild(createPlayer());
}

function createPlayer() {
    let newPlayer = document.createElement('div');
    newPlayer.classList.add('player');
    let newPlayerCount = document.createElement('span');
    newPlayerCount.textContent = playerCount;
    newPlayer.appendChild(newPlayerCount);
    return newPlayer;
}

//player 'shooting' functionality TODO multi-enemy support, how would I target the first enemy in line?
function playerAttack() {

    let player = document.querySelector('.player');
    let playerColumn = player.parentElement.getAttribute('data-bottom-column');
    let enemy = document.querySelector(`[data-top-column="${playerColumn}"]`).querySelector('.enemy');
    //TODO feels sloppy null-checking this way
    if (enemy != null) {
        let enemyHealth = parseInt(enemy.firstChild.textContent);
        if (enemyHealth - playerCount <= 0) {
            enemy.remove();
            spawnEnemy();
        } else {
            enemyHealth -= playerCount;
            enemy.firstChild.textContent = enemyHealth;
        }
    }
}

function moveEnemies() {
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => {
        let currentDistance = parseInt(enemy.getAttribute('data-distance'));
        //remove if end of lane TODO: variable lane size    
        if (currentDistance > 170) {
            enemy.remove();
            spawnEnemy();
        }
        //update distance
        let newDistance = currentDistance + enemyMovementSpeed;
        enemy.setAttribute('data-distance', newDistance);
        enemy.style.transform = `translateY(${newDistance}px)`;
    
    })
}

function spawnGate() {
    let laneValue = Math.floor(Math.random() * currentLanes);
    let lane = document.querySelector(`[data-top-column="${laneValue}"]`);
    let newGate = document.createElement('div');
    newGate.classList.add('gate');
    newGate.setAttribute('data-distance', 0);
    let newGateValue = document.createElement('span');
    newGateValue.textContent = Math.floor(Math.random() * 10) - 5;
    newGate.appendChild(newGateValue);
    lane.appendChild(newGate);
}

function spawnMultigate() {
    for (let i=0; i < currentLanes; i++) {
        let lane = document.querySelector(`[data-top-column="${i}"]`);
        let newGate = document.createElement('div');
        newGate.classList.add('gate');
        newGate.setAttribute('data-distance', 0);
        let newGateValue = document.createElement('span');
        newGateValue.textContent = Math.floor(Math.random() * 10) - 5;
        newGate.appendChild(newGateValue);
        lane.appendChild(newGate);
    }
}

function moveGates() {

    let player = document.querySelector('.player');
    let playerColumn = player.parentElement.getAttribute('data-bottom-column');

    let gates = document.querySelectorAll('.gate');
    gates.forEach((gate) => {
        let currentDistance = parseInt(gate.getAttribute('data-distance'));
        let gateColumn = gate.parentElement.getAttribute('data-top-column');
    
        //remove if end of lane TODO: variable lane size    
        if (currentDistance > 180) {
            gate.remove();
            if (playerColumn == gateColumn) {
                playerCount += parseInt(gate.firstChild.textContent);
                player.firstChild.textContent = playerCount;
                if (playerCount <= 0) {
                    player.remove();
                }
            }
        }
    
        //update distance
        let newDistance = currentDistance + gateMovementSpeed;
        gate.setAttribute('data-distance', newDistance);
        gate.style.transform = `translateY(${newDistance}px)`;

    });

}


//gamerate
let ticksPerSecond = 20;
window.setInterval(function(){
    let enemy = document.querySelector('.enemy');
    if (enemy != null) {
        playerAttack();
        moveEnemies();
    }
    let gate = document.querySelector('.gate');
    if (gate != null) {
        moveGates();
    }
}, 1000 / ticksPerSecond);

window.setInterval(function(){
    spawnMultigate();
}, 5000);