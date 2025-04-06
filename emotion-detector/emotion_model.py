from deepface import DeepFace

def detect_emotion(img_path):
    result = DeepFace.analyze(img_path, actions=['emotion'])
    return result[0]['dominant_emotion']
