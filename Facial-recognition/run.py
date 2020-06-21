import sys
import cv2
import numpy as np
import os
import dlib
from imutils import face_utils
from imutils.face_utils import FaceAligner

detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")
face_aligner = FaceAligner(shape_predictor, desiredFaceWidth=200)

try:
	name=sys.argv[1]
except Exception as e:
	print('Expected name')
	sys.exit(1)

directory=f'uploads/{name}'
images = os.listdir(directory)

if(not os.path.exists(f'images/{name}')):
	os.mkdir(f'images/{name}')

count=0

for image in images:

	frame = cv2.imread(f'{directory}/{image}')
	frame = cv2.flip(frame, 1)

	frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
	faces = detector(frame_gray)
	if len(faces) == 1:
		face = faces[0]
		(x, y, w, h) = face_utils.rect_to_bb(face)
		face_img = frame_gray[y-50:y + h+100, x-50:x + w+100]
		face_aligned = face_aligner.align(frame, frame_gray, face)

		if count == 5:
			flag=cv2.imwrite(f'images/{name}/{image}', face_aligned)
			# print(flag)
			count = 0
		# print(count)
		count += 1
print('Success')