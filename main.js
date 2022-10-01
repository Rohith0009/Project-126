score_left_wrist = "";
_status = "";

function preload() {
  Song1 = loadSound("song1.mp3");
  Song2 = loadSound("song2.mp3");
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
  _status = Song1.isPlaying();
  if (score_left_wrist <= 0.2) {
    circle(left_wrist_x, left_wrist_y, 20);
    Song2.stop();
    Song1.play();
    document.getElementById("song_name").innerHTML = "Song 1";
  }
}

function play() {
  song.play();
}

function modelloaded() {
  console.log("Model Is Loaded");
}

function gotposes(results) {
  if (results.length > 0) {
    ScoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log(results);
    left_wrist_x = results[0].pose.leftWrist.x;
    left_wrist_y = results[0].pose.leftWrist.y;
    console.log("Left Wrist X is " + left_wrist_x + " Left Wrist Y is " + left_wrist_y);
    right_wrist_x = results[0].pose.rightWrist.x;
    right_wrist_y = results[0].pose.rightWrist.y;
    console.log("Right Wrist X is " + right_wrist_x + " Right Wrist Y is " + right_wrist_y);
  }
}
