'''Face Recognition Main File'''

import sys
import cv2
import numpy as np
import glob
from scipy.spatial import distance
from imutils import face_utils
from keras.models import load_model
import tensorflow as tf

from fr_utils import *
from inception_blocks_v2 import *
arr1 = []

FR_model = load_model('nn4.small2.v1.h5')

face_cascade = cv2.CascadeClassifier('haarcascades/haarcascade_frontalface_default.xml')

threshold = 0.25

face_database = {}

for name in os.listdir('images'):
	for image in os.listdir(os.path.join('images',name)):
		identity = os.path.splitext(os.path.basename(image))[0]
		face_database[identity] = fr_utils.img_path_to_encoding(os.path.join('images',name,image), FR_model)


from PIL import Image
import os

list_images = []
for name in (os.listdir('uploads/'+str(sys.argv[1]))):
	list_images.append(np.asarray(Image.open(os.path.join('uploads/'+str(sys.argv[1]),name))))
	

for frame in list_images:

	faces = face_cascade.detectMultiScale(frame, 1.3, 5)

	for(x,y,w,h) in faces:
		cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 0), 2)
		roi = frame[y:y+h, x:x+w]
		encoding = img_to_encoding(roi, FR_model)
		min_dist = 100
		identity = None

		for(name, encoded_image_name) in face_database.items():
			dist = np.linalg.norm(encoding - encoded_image_name)
			if(dist < min_dist):
				min_dist = dist
				identity = name

		if min_dist < 0.1:
			arr1.append(identity[:-1])

print(set(arr1),end="")


# video_capture.release()
# cv2.destroyAllWindows()
# releasing to ensure safety
