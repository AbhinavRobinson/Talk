# Facial-Recognition-Using-FaceNet-Siamese-One-Shot-Learning

This program has been used to implement Facial Recognition using Siamese Network architecture.

### Prerequisites

    h5py==2.8.0
    Keras==2.2.4
    tensorflow==1.13.0rc2
    dlib==19.16.0
    opencv_python==3.4.3.18
    imutils==0.5.1
    numpy==1.15.2
    matplotlib==3.0.0
    scipy==1.1.0

Install the packages using `pip install -r requirements.txt`

### Usage

To use the facial recognition system, you need to have a database of images through which the model will calculate image embeddings and show the output vector.
The images which are in the database are stored as .jpg files in the directory `./images`.

To generate your own dataset and add more faces to the system, use the following procedure:

> Sit in front of your webcam.
> Use the Image_Dataset_Generator.py script to save 50 images of your face.
> Use this command: `python Image_Dataset_Generator.py` to generate images which will be saved in images folder.

To use the facial recognition system, run the command on your terminal :
`python face_recognizer.py ${Name}`

### To Check

`curl localhost:8080?name=Aniket`

`localhost:8080/register`
body.name = name
body.userPhoto = array of 50 images

### Note

if you encounter: a numpy error : ImportError: numpy.core.multiarray failed to import

run --> pip install -U numpy
