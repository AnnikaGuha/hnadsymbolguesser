prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera')

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>'
    });
}
console.log('ml5.version:',ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LZvk_1zb0/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}
function speak(){
    var synth=window.speechSynthesis;
speak_data_1="the first prediction is"+ prediction1;
speak_data_2="the second prediction is"+prediction2;
var utterThis = new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterThis);
}
function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotresult);
}
function gotresult(error,results){
    if (error){
        console.error(error);
    }else{
        console.log(results)
        document.getElementById("emotion1").innerHTML=results[0].label;
        document.getElementById("emotion2").innerHTML=results[0].label;
        speak();
        if(results[0].label == "thumbsup"){
            document.getElementById("updateemoji1").innerHTML="&#128077;"
        }
        if(results[0].label == "thumbsdown"){
            document.getElementById("updateemoji1").innerHTML="&#128078;"
        }
        if(results[0].label == "peace"){
            document.getElementById("updateemoji1").innerHTML="&#9996;"
        }
if(results[0].label == "thumbsup"){
    document.getElementById("updateemoji2").innerHTML="&#128077;"
}
if(results[0].label == "thumbsdown"){
    document.getElementById("updateemoji2").innerHTML="&#128078;"
}
if(results[0].label == "peace"){
    document.getElementById("updateemoji2").innerHTML="&#9996;"
}
    }
}