song = "";

function preload() {
  song = loadSound("music.mp3");
}

function setup() {
  canvas = createCanvas(600, 550);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  pose_net = ml5.poseNet(video, modelloaded);
  pose_net.on("pose", gotposes);
}

function draw() {
  image(video, 0, 0, 600, 550);
}

function play() {
  song.play();
}

function modelloaded() {
  console.log("Model Is Loaded");
}

function gotposes(results) {
  if (results.length > 0) {
    console.log(results);
    left_wrist_x = results[0].pose.leftWrist.x;
    left_wrist_y = results[0].pose.leftWrist.y;
    console.log("Left Wrist X is " + left_wrist_x + " Left Wrist Y is " + left_wrist_y);
    right_wrist_x = results[0].pose.rightWrist.x;
    right_wrist_y = results[0].pose.rightWrist.y;
    console.log("Right Wrist X is " + right_wrist_x + " Right Wrist Y is " + right_wrist_y);
  }
}