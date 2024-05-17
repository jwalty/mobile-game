//initial game setup and global variables
let currentLanes = 3;
let playerCount = 1;
let enemyMovementSpeed = 1;

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
    newEnemyHealth.textContent = 100;
    newEnemy.appendChild(newEnemyHealth);

    lane.appendChild(newEnemy);
}

//TODO gates that enhance player amount? power? something?

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

//player 'shooting' functionality TODO generalize enemies for lane specificity
function playerAttack() {

    let player = document.querySelector('.player');
    let playersColumn = player.parentElement.getAttribute('data-bottom-column');
    let enemy = document.querySelector('.enemy');
    let enemysColumn = enemy.parentElement.getAttribute('data-top-column');
    let enemyHealth = parseInt(enemy.firstChild.textContent);

    if (playersColumn == enemysColumn) {
        if (enemyHealth - playerCount <= 0) {
            enemy.remove();
            playerCount++;
            player.textContent = playerCount;
            spawnEnemy();
        } else {
            enemyHealth -= playerCount;
            enemy.firstChild.textContent = enemyHealth;
        }
    }
}

function moveEnemy() {
    let enemy = document.querySelector('.enemy');
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

}


//gamerate
let ticksPerSecond = 20;
window.setInterval(function(){
    let enemy = document.querySelector('.enemy');
    if (enemy != null) {
        playerAttack();
        moveEnemy();
    }   
}, 1000 / ticksPerSecond);