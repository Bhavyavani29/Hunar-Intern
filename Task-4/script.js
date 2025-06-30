let currentUnit = 'metric';

function switchUnit(unit) {
  currentUnit = unit;

  document.getElementById('metricInputs').style.display = unit === 'metric' ? 'block' : 'none';
  document.getElementById('usInputs').style.display = unit === 'us' ? 'block' : 'none';
  document.getElementById('metricBtn').classList.toggle('active', unit === 'metric');
  document.getElementById('usBtn').classList.toggle('active', unit === 'us');
  document.getElementById("result").innerHTML = "";
}

function calculateBMI() {
  let height, weight, bmi;

  if (currentUnit === 'metric') {
    height = parseFloat(document.getElementById("heightMetric").value) / 100;
    weight = parseFloat(document.getElementById("weightMetric").value);
    if (!height || !weight) return showError();
    bmi = weight / (height * height);
  } else {
    height = parseFloat(document.getElementById("heightUS").value) * 0.0254;
    weight = parseFloat(document.getElementById("weightUS").value) * 0.453592;
    if (!height || !weight) return showError();
    bmi = weight / (height * height);
  }
  const category = getBMICategory(bmi);
  const { tips, risks } = getAdvice(category);

  document.getElementById("result").innerHTML = `
    <div class="bmi-result-box">
      <h3>Your BMI Results</h3>
      <p><strong>BMI:</strong> ${bmi.toFixed(1)}</p>
      <p><strong>Category:</strong> ${category}</p>
    </div>
    <div class="bmi-tips">
      <h4>Tips to Stay Fit</h4>
      <ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>
    <div class="bmi-risks">
      <h4>Risks to Watch For</h4>
      <ul>${risks.map(r => `<li>${r}</li>`).join('')}</ul>
    </div>
  `;
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  else if (bmi < 25) return "Normal";
  else if (bmi < 30) return "Overweight";
  else return "Obese";
}

function getAdvice(category) {
  const advice = {
    "Underweight": {
      tips: [
        "Include calorie-dense foods in meals.",
        "Add healthy snacks like nuts and dried fruits.",
        "Do strength training to build muscle."
      ],
      risks: [
        "Weak immune system",
        "Fatigue and dizziness",
        "Nutrient deficiency"
      ]
    },
    "Normal": {
      tips: [
        "Maintain a balanced diet.",
        "Stay active regularly.",
        "Keep monitoring weight yearly."
      ],
      risks: [
        "Minimal risk — keep it up!"
      ]
    },
    "Overweight": {
      tips: [
        "Avoid sugary and processed foods.",
        "Exercise for at least 30 minutes daily.",
        "Add more vegetables and fiber to diet."
      ],
      risks: [
        "Risk of high blood pressure",
        "Increased chance of Type 2 diabetes",
        "Joint pain"
      ]
    },
    "Obese": {
      tips: [
        "Consult a healthcare provider.",
        "Start structured weight-loss programs.",
        "Focus on portion control and low-cal meals."
      ],
      risks: [
        "Heart disease and stroke",
        "Type 2 diabetes",
        "Mobility issues"
      ]
    }
  };

  return advice[category] || { tips: [], risks: [] };
}

function showError() {
  document.getElementById("result").innerText = "Please enter valid height and weight.";
}

function openModal() {
  document.querySelector('.container').style.display = 'none'; 
  document.getElementById('aboutBMIBox').style.display = 'block'; 
}

function goBack() {
  document.querySelector('.container').style.display = 'block'; 
  document.getElementById('aboutBMIBox').style.display = 'none'; 
}

function clearInputs() {
  document.getElementById("heightMetric").value = "";
  document.getElementById("weightMetric").value = "";
  document.getElementById("heightUS").value = "";
  document.getElementById("weightUS").value = "";
  document.getElementById("result").innerHTML = "";
}
