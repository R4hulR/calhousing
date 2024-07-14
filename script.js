const form = document.getElementById('prediction-form');
const inputMedInc = document.getElementById('medInc');
const inputHouseAge = document.getElementById('houseAge');
const inputAveRooms = document.getElementById('aveRooms');
const inputAveBedrms = document.getElementById('aveBedrms');
const inputPopulation = document.getElementById('population');
const inputAveOccup = document.getElementById('aveOccup');
const inputLatitude = document.getElementById('latitude');
const inputLongitude = document.getElementById('longitude');
const predictionResult = document.getElementById('prediction-result');

form.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const medInc = parseFloat(inputMedInc.value);
    const houseAge = parseFloat(inputHouseAge.value);
    const aveRooms = parseFloat(inputAveRooms.value);
    const aveBedrms = parseFloat(inputAveBedrms.value);
    const population = parseFloat(inputPopulation.value);
    const aveOccup = parseFloat(inputAveOccup.value);
    const latitude = parseFloat(inputLatitude.value);
    const longitude = parseFloat(inputLongitude.value);

    // Validate the inputs
    if (isNaN(medInc) || isNaN(houseAge) || isNaN(aveRooms) || 
        isNaN(aveBedrms) || isNaN(population) || isNaN(aveOccup) || 
        isNaN(latitude) || isNaN(longitude)) {
        predictionResult.textContent = 'Error: Please enter valid numbers for all fields.';
        return; 
    }

    const data = {
        data: [medInc, houseAge, aveRooms, aveBedrms, population, aveOccup, latitude, longitude]
    };

    try {
        const response = await fetch('https://rahulray.us-east-1.modelbit.com/v1/predict_median_house_value/latest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const prediction = await response.json();
        //console.log(prediction); 
        const predictedValue = prediction.data * 100000; 
        predictionResult.textContent = `Predicted Median House Value: $${predictedValue.toFixed(2)}`; // Format as currency
    } catch (error) {
        console.error('Error:', error);
        predictionResult.textContent = 'Error: Could not make prediction.';
    } finally {
        form.reset();
    }
});
