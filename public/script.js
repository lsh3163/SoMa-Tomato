const webcamElement = document.getElementById('myVideo');
var face_cnt = 0;
var time = 0;
data = new Array;
times = new Array;


async function inference(){
    console.log("Loading coco SSD..");

    // Load the model.
    const model = await cocoSsd.load();
    console.log("Successfully loaded model");
    time += 1;
    
    const webcam = await tf.data.webcam(webcamElement);
    const img = await webcam.capture();
    const prediction = await model.detect(img);

    console.log(prediction);
    
    if(prediction.length==0){
        data.push(0.1);
        times.push(time);
        document.getElementById("console").innerText = `None`;
    }
    else if(prediction.length > 0){
        face_cnt+=1;
        if(prediction[0].class=="person"){
            data.push(prediction[0].score);
            times.push(time);
            document.getElementById("console").innerText = `
            prediction: ${prediction[0].class}\n
            probability: ${prediction[0].score}`;
        }
        else{
            data.push(0.1);
            times.push(time);
            document.getElementById("console").innerText = `None`;
        }
        
        
    }
    document.getElementById("facecnt").innerText = face_cnt;
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: times,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: data
            }]
        },

        // Configuration options go here
        options: {}
    });
    img.dispose();

}