const achievementList = {
    "lazy": {
        achievementName: 'Lazy',
        achievementDescrption: "Don't move for 5 consecutive turns",
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 5
    },
    "crowded": {
        achievementName: 'Crowded',
        achievementDescrption: 'Have 10 pieces on the board at the same time',
        achievementStatus: 'Locked'
    },
    "10slay": {
        achievementName: '10 Slayer',
        achievementDescrption: 'Kill 10 opposing pieces ',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 10
    },
    "100slay": {
        achievementName: 'Centurion',
        achievementDescrption: 'Kill 100 opposing pieces',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 100
    },
    "500slay": {
        achievementName: 'Mountains of Ivory',
        achievementDescrption: 'Kill 500 opposing pieces',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 500
    },
    "1000steps": {
        achievementName: 'Journey of 1000 Steps',
        achievementDescrption: 'Walk a 1000 steps',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 1000
    },
    "threatened": {
        achievementName: 'Living Dangerously',
        achievementDescrption: "End your turn on a threatened square 5 times in a row.",
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 5
    },
    "lucky": {
        achievementName: 'Your Lucky Day',
        achievementDescrption: 'Evade potential capture three times in a row in drunk mode',
        achievementStatus: 'Locked',
        achievementProgress: 0,
        achievementGoal: 3
    }
}

let playerLazyMoves = 0;
let playerLazyLastSquare = -1;
let totalKills = 0;
let playerTotalSteps = 0;
let playerThreatenedMoves = 0;

function clearAchievementProgressAfterReset() {
    // When the game resets, this function is called
    playerLazyMoves = 0;
    playerLazyLastSquare = -1;
}

function checkAchievements() {

    //lazy achievement
    if (playerIndex === playerLazyLastSquare) {
        playerLazyMoves++;
    } else {
        playerLazyMoves = 0;
    }
    playerLazyLastSquare = playerIndex;

    if (highscoreDict.achievementProgress['lazy'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['lazy'].achievementProgress = playerLazyMoves;
    }

    if (playerLazyMoves >= 5 && highscoreDict.achievementProgress['lazy'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['lazy'].achievementStatus = 'Unlocked';
        achievementUnlock(highscoreDict.achievementProgress['lazy'].achievementName,
            highscoreDict.achievementProgress['lazy'].achievementDescrption);
    }

    // your lucky day achievement
    if (gameMode == "drunk") {
        if(highscoreDict.achievementProgress['lucky'].achievementStatus === 'Locked') {
            highscoreDict.achievementProgress['lucky'].achievementProgress = evadedMoves;
        }

        if (evadedMoves >= 3 && highscoreDict.achievementProgress['lucky'].achievementStatus === 'Locked') {
            highscoreDict.achievementProgress['lucky'].achievementStatus = 'Unlocked';
            achievementUnlock(highscoreDict.achievementProgress['lucky'].achievementName,
                highscoreDict.achievementProgress['lucky'].achievementDescrption);
        }
    }


    //crowded achievement
    if (pieces.length >= 10 && highscoreDict.achievementProgress['crowded'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['crowded'].achievementStatus = 'Unlocked';
        achievementUnlock(highscoreDict.achievementProgress['crowded'].achievementName,
            highscoreDict.achievementProgress['crowded'].achievementDescrption);
    }

    //slayer achievementStatus
    if (totalKills === 10 && highscoreDict.achievementProgress['10slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['10slay'].achievementStatus = 'Unlocked';
        highscoreDict.achievementProgress['10slay'].achievementProgress = totalKills;
        achievementUnlock(highscoreDict.achievementProgress['10slay'].achievementName,
            highscoreDict.achievementProgress['10slay'].achievementDescrption);
    }

    if (highscoreDict.achievementProgress['10slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['10slay'].achievementProgress = totalKills;
    }

    if (totalKills === 100 && highscoreDict.achievementProgress['100slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['100slay'].achievementStatus = 'Unlocked';
        highscoreDict.achievementProgress['100slay'].achievementProgress = totalKills;
        achievementUnlock(highscoreDict.achievementProgress['100slay'].achievementName,
            highscoreDict.achievementProgress['100slay'].achievementDescrption);
    }

    if (highscoreDict.achievementProgress['100slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['100slay'].achievementProgress = totalKills;
    }

    if (totalKills === 500 && highscoreDict.achievementProgress['500slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['500slay'].achievementStatus = 'Unlocked';
        highscoreDict.achievementProgress['500slay'].achievementProgress = totalKills;
        achievementUnlock(highscoreDict.achievementProgress['500slay'].achievementName,
            highscoreDict.achievementProgress['500slay'].achievementDescrption);
    }

    if (highscoreDict.achievementProgress['500slay'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['500slay'].achievementProgress = totalKills;
    }

    if (playerTotalSteps === 1000 && highscoreDict.achievementProgress['1000steps'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['1000steps'].achievementStatus = 'Unlocked';
        highscoreDict.achievementProgress['1000steps'].achievementProgress = playerTotalSteps;
        achievementUnlock(highscoreDict.achievementProgress['1000steps'].achievementName,
            highscoreDict.achievementProgress['1000steps'].achievementDescrption);
    }

    if (highscoreDict.achievementProgress['1000steps'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['1000steps'].achievementProgress = playerTotalSteps;
    }

    //test for is square safe
    if (isSquareSafe(playerIndex, pieces) == false) {
        playerThreatenedMoves++;
    } else {
        playerThreatenedMoves = 0;
    };

    if (highscoreDict.achievementProgress['threatened'].achievementStatus == 'Locked') {
        highscoreDict.achievementProgress['threatened'].achievementProgress = playerThreatenedMoves;
    }

    if (playerThreatenedMoves === 5 && highscoreDict.achievementProgress['threatened'].achievementStatus === 'Locked') {
        highscoreDict.achievementProgress['threatened'].achievementStatus = 'Unlocked';
        highscoreDict.achievementProgress['threatened'].achievementProgress = totalKills;
        achievementUnlock(highscoreDict.achievementProgress['threatened'].achievementName,
            highscoreDict.achievementProgress['threatened'].achievementDescrption);
    }

    updateAchievements();
}

function achievementUnlock(name, descr) {
    document.querySelector(".ach_modal").style.visibility = "visible";
    document.querySelector("#ach_modal_name").innerText = name;
    document.querySelector("#ach_modal_descr").innerText = descr;

    updateAchievements();
    fade(document.querySelector(".ach_modal"));
    setTimeout(function() { document.querySelector(".ach_modal").style.visibility = "hidden"; }, 2100);

}

function fade(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function() {
        if (op <= 0.1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.05;

    }, 200);
}

function dismissAchvModal() {
    document.querySelector(".ach_modal").style.visibility = "hidden";
}