Song1 = "";
Song2 = "";
song1_status = "";
song2_status = "";
ScoreRightWrist = 0;
ScoreLeftWrist = 0;
left_wrist_y = 0;
left_wrist_x = 0;
right_wrist_y = 0;
right_wrist_x = 0;

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

function modelloaded() {
  console.log("Model Is Loaded");
}

function gotposes(results) {
  if (results.length > 0) {
    ScoreLeftWrist = results[0].pose.keypoints[9].score;
    ScoreRightWrist = results[0].pose.keypoints[10].score;
    console.log("ScoreLeftWrist: " + ScoreLeftWrist + "ScoreRightWrist: " + ScoreRightWrist);
    console.log(results);
    left_wrist_x = results[0].pose.leftWrist.x;
    left_wrist_y = results[0].pose.leftWrist.y;
    console.log("Left Wrist X is " + left_wrist_x + " Left Wrist Y is " + left_wrist_y);
    right_wrist_x = results[0].pose.rightWrist.x;
    right_wrist_y = results[0].pose.rightWrist.y;
    console.log("Right Wrist X is " + right_wrist_x + " Right Wrist Y is " + right_wrist_y);
  }
}

function draw() {
  image(video, 0, 0, 600, 550);
  song1_status = Song1.isPlaying();
  song2_status = Song2.isPlaying();
  fill("#00000");
  stroke("#fffff");
  if (ScoreLeftWrist > 0.2) {
    circle(left_wrist_x, left_wrist_y, 20);
    Song2.stop();
    if (song1_status == false) {
      Song1.play();
      document.getElementById("song_name").innerHTML = "Song 1";
    }
  }
  if (ScoreRightWrist > 0.2) {
    circle(right_wrist_x, right_wrist_y, 20);
    Song1.stop();
    if (song2_status == false) {
      Song2.play();
      document.getElementById("song_name").innerHTML = "Song 2";
    }
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}
