const webcamElement = document.getElementById('myVideo');

async function inference(){
    console.log("Loading coco SSD..");

    // Load the model.
    const model = await cocoSsd.load();
    console.log("Successfully loaded model");


    const webcam = await tf.data.webcam(webcamElement);
    const img = await webcam.capture();
    const prediction = await model.detect(img);

    document.getElementById("console").innerText = `
        prediction: ${prediction[0].class}\n
        probability: ${prediction[0].score}`;
    img.dispose();

}