//TODO automatic lane creation, variable lane amounts, variable lane length

//TODO gates that enhance player amount? power? something?

//TODO score system that tracks 'distance travelled', powerups, enemies killed,

//TODO unstoppable boss at the end??

//player control key listeners TODO switch to switch/case
document.body.addEventListener(('keydown'), (e) => {
    if (e.key == "ArrowLeft") {
        changeLanes(document.getElementById('bottomLeft'));
    } else if (e.key == "ArrowRight") {
        changeLanes(document.getElementById('bottomRight'));
    }
});

//lane changing functionality 
function changeLanes(targetLane) {
    let currentPlayer = document.querySelector('.player');
    currentPlayer.remove();
    let newPlayer = document.createElement('div');
    newPlayer.classList.add('player');
    let newPlayerCount = document.createElement('span');
    newPlayerCount.textContent = playerCount;
    newPlayer.appendChild(newPlayerCount);
    targetLane.appendChild(newPlayer);
}

let playerCount = 1;
let enemyHealth = 100;

//player 'shooting' functionality TODO generalize enemies for lane specificity
function playerAttack() {
    let enemy = document.querySelector('.enemy');
    let player = document.querySelector('.player');
    enemy = document.querySelector('.enemy');
    if (enemyHealth > 0) {
        if (player.parentElement.id == "bottomRight") {
            enemyHealth -= playerCount;
            enemy.textContent = enemyHealth;
        }
    } else {
        enemy.remove();
        playerCount++;
        player.textContent = playerCount;
        spawnEnemy();
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
	playerAttack();
    moveEnemy();
}, 1000 / ticksPerSecond);