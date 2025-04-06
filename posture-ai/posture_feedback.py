def give_posture_feedback(shoulder_angle):
    if shoulder_angle < 70:
        return "You're slouching. Please sit upright."
    return "Good posture!"
