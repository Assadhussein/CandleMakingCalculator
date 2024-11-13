function calculate() {
    const totalFill = parseFloat(document.getElementById("totalFill").value) || 0;
    const fragranceOil = parseFloat(document.getElementById("fragranceOil").value) || 0;

    const totalWax = totalFill / (1 + (fragranceOil/100));
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

    document.getElementById("totalFOAmount").textContent = totalFO.toFixed(2);
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', calculate);
});

calculate();