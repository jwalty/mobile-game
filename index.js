//initial game setup and global variables
let currentLanes = 3;
let playerCount = 1;
let enemyHealth = 100;
createMap();

//TODO automatic lane creation, variable lane amounts, variable lane length
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

    document.body.appendChild(newMap);

    //add new player
    document.querySelector('[data-bottom-column="0"]').appendChild(createPlayer());

    spawnEnemy();
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
    let enemy = document.querySelector('.enemy');
    let player = document.querySelector('.player');
    if (enemyHealth > 0) {
        if (player.getAttribute('[data-bottom-column]') == enemy.getAttribute('[data-top-column]')) {
            enemyHealth -= playerCount;
            enemy.textContent = enemyHealth;
        }
    } else {
        enemy.remove();
        playerCount++;
        player.textContent = playerCount;
        }
}

function moveEnemy() {
    let enemy = document.querySelector('.enemy');
    let movementSpeed = 1;
    let currentDistance = parseInt(enemy.getAttribute('data-distance'));

    //remove if end of lane TODO: variable lane size    
    if (currentDistance > 170) {
        enemy.remove();
    }

    //update distance
    let newDistance = currentDistance + movementSpeed;
    enemy.setAttribute('data-distance', newDistance);
    enemy.style.transform = `translateY(${newDistance}px)`;

}


//gamerate
let ticksPerSecond = 20;
window.setInterval(function(){
	//playerAttack();
    //moveEnemy();
}, 1000 / ticksPerSecond);