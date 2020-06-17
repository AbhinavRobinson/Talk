# Talk!


## Start Recognition Server:

This program has been used to implement Facial Recognition using Siamese Network architecture One Shot Learning
```
Prerequisites
h5py==2.8.0
Keras==2.2.4
tensorflow==1.13.0rc2
dlib==19.16.0
opencv_python==3.4.3.18
imutils==0.5.1
numpy==1.15.2
matplotlib==3.0.0
scipy==1.1.0
```
<<<<<<< HEAD

## Step1 
=======
### Step 0
```
cd Facial-recognition
```
### Step 1 
>>>>>>> 7a77e8be9592e44505eb356065afd33e551d3af9

Install the packages using 
```
pip install -r requirements.txt
```
Usage
To use the facial recognition system, you need to have a database of images through which the model will calculate image embeddings and show the output vector. The images which are in the database are stored as .jpg files in the directory ./images.

<<<<<<< HEAD
## Step2
=======
### Step 2
>>>>>>> 7a77e8be9592e44505eb356065afd33e551d3af9
To generate your own dataset and add more faces to the system, use the following procedure:

Sit in front of your webcam. Use the Image_Dataset_Generator.py script to save 50 images of your face. Use this command: 
```
python Image_Dataset_Generator.py 
```
to generate images which will be saved in images folder.

<<<<<<< HEAD
## Step3
=======
### Step 3
>>>>>>> 7a77e8be9592e44505eb356065afd33e551d3af9
To use the facial recognition system, run the command on your terminal :
```
python face_recognizer.py ${Name}
```

<<<<<<< HEAD
## Step4

Check
```

=======
### Step 4

Check
```
>>>>>>> 7a77e8be9592e44505eb356065afd33e551d3af9
curl localhost:8080?name={Name}
```

localhost:8080/register body.name = name body.userPhoto = array of 50 images

#### Note
if you encounter: a numpy error : ImportError: numpy.core.multiarray failed to import
```
run --> pip install -U numpy
```

## To Run Calling Interface

<<<<<<< HEAD
### Step1 
=======
Working example : https://talk-sem-4.github.io/Talk/

### Step 0
```
Calling
```
### Step 1 
>>>>>>> 7a77e8be9592e44505eb356065afd33e551d3af9
```
cd client
yarn
yarn start
```

<<<<<<< HEAD
### Step2
=======
### Step 2
>>>>>>> 7a77e8be9592e44505eb356065afd33e551d3af9
```

cd server
npm i peer
node peerjs
```

<<<<<<< HEAD
### Step3: Talk!
=======
### Step 3: Talk!
>>>>>>> 7a77e8be9592e44505eb356065afd33e551d3af9

###Good to go

