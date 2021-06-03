object = [];
img = "";
status = "";
function setup()
{
    canvas = createCanvas(620, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function preload()
{
    img = loadImage("guestroom.png");
}

function draw()
{
    image(img, 0, 0, 620, 420);

    if(status != "")
    {
        for(i = 0; i < object.length; i++)
            {
                document.getElementById("status").innerHTML = "Status : Object Detected";

                fill('#FF000');
                percent = floor(object[i].confidence * 100);
                text(object[i].label + "" + percent + "%", object[i].x + 15, object[i].y + 15);
                noFill();
                stroke("#FF000");
                rect(object[i].x, object[i].y, object[i].width, object[i].height);
            }
    }
}

function modelLoaded()
{
    console.log("modelLoaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error,results)
{
      if(error)
      {
          console.log(error);
      }
      console.log(results);
      object = results;
}
