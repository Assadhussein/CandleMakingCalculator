function calculate() {
    const totalFill = parseFloat(document.getElementById("totalFill").value) || 0;
    const fragranceOil = parseFloat(document.getElementById("fragranceOil").value) || 0;

    const totalWax = totalFill / (1 + (fragranceOil / 100));
    const totalFO = totalFill - totalWax;

    document.getElementById("totalFO").textContent = totalFO.toFixed(2);
    document.getElementById("totalWax").textContent = totalWax.toFixed(2);

    const foPercentages = [
        parseFloat(document.getElementById("fo1Percentage").value) || 0,
        parseFloat(document.getElementById("fo2Percentage").value) || 0,
        parseFloat(document.getElementById("fo3Percentage").value) || 0,
        parseFloat(document.getElementById("fo4Percentage").value) || 0,
        parseFloat(document.getElementById("fo5Percentage").value) || 0,
    ];

    const totalFOPercentage = foPercentages.reduce((a, b) => a + b, 0);
    document.getElementById("totalFOPercentage").textContent = totalFOPercentage.toFixed(2);

    for (let i = 0; i < 5; i++) {
        const foAmount = (foPercentages[i] / 100) * totalFO;
        document.getElementById(`fo${i + 1}Amount`).textContent = foAmount.toFixed(2);
    }

    // Sum up all calculated FO amounts
    const fo1Amount = parseFloat(document.getElementById("fo1Amount").textContent) || 0;
    const fo2Amount = parseFloat(document.getElementById("fo2Amount").textContent) || 0;
    const fo3Amount = parseFloat(document.getElementById("fo3Amount").textContent) || 0;
    const fo4Amount = parseFloat(document.getElementById("fo4Amount").textContent) || 0;
    const fo5Amount = parseFloat(document.getElementById("fo5Amount").textContent) || 0;

    const totalFOAmountSum = parseFloat((fo1Amount + fo2Amount + fo3Amount + fo4Amount + fo5Amount).toFixed(2));

    // Display the accumulated FO amount in totalFOAmount
    document.getElementById("totalFOAmount").textContent = totalFOAmountSum.toFixed(2);
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculate);
});

calculate();

// --- Timer Section ---
let timerInterval;
let remainingSeconds = 0;
let isPaused = false;

function startTimer(minutes) {
    clearInterval(timerInterval);
    remainingSeconds = minutes * 60;
    isPaused = false;
    updateCountdownDisplay(remainingSeconds);

    timerInterval = setInterval(() => {
        if (!isPaused) {
            remainingSeconds--;
            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                const sound = document.getElementById("timerSound");
                sound.currentTime = 0;
                sound.play().catch((err) => console.log("Playback failed:", err));
                alert("Time's up!");
                document.getElementById("countdown").textContent = "--:--";
                return;
            }
            updateCountdownDisplay(remainingSeconds);
        }
    }, 1000);
}

function startCustomTimer() {
    const minutes = parseFloat(document.getElementById("customTimer").value);
    if (!isNaN(minutes) && minutes > 0) {
        startTimer(minutes);
    }
}

function updateCountdownDisplay(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    document.getElementById("countdown").textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function pauseTimer() {
    isPaused = true;
}

function resumeTimer() {
    if (remainingSeconds > 0 && isPaused) {
        isPaused = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    remainingSeconds = 0;
    isPaused = false;
    document.getElementById("countdown").textContent = "--:--";
}
