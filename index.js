let enemy = document.querySelector('.enemy');

enemy.addEventListener('mousedown', (e) => {
    enemy.style.marginTop = "170px";
});

document.body.addEventListener(('keydown'), (e) => {
    if (e.key == "ArrowLeft") {
        changeLanes(document.getElementById('bottomLeft'));
    } else if (e.key == "ArrowRight") {
        changeLanes(document.getElementById('bottomRight'));
    }
});

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

function playerAttack() {
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

function spawnEnemy() {
    let newEnemy = document.createElement('div');   
    newEnemy.classList.add('enemy');
    let newEnemyHealth = document.createElement('span');
    enemyHealth = Math.floor(Math.random() * 50) + 100;
    newEnemyHealth.textContent = enemyHealth;
    newEnemy.appendChild(newEnemyHealth);
    document.getElementById('leftLane').appendChild(newEnemy);
}


window.setInterval(function(){
	playerAttack();
    console.log(enemyHealth);
}, 50);