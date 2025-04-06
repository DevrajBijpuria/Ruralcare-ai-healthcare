import librosa
import numpy as np

def extract_pitch(audio_path):
    y, sr = librosa.load(audio_path)
    pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
    return np.mean(pitches[pitches > 0])
