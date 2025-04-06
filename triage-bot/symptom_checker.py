import random

def triage(symptoms):
    severity_map = {
        "fever": 2,
        "chest pain": 5,
        "cough": 1,
        "shortness of breath": 4,
        "headache": 2,
        "dizziness": 3,
    }
    score = sum(severity_map.get(symptom.lower(), 1) for symptom in symptoms)
    if score >= 7:
        return "High Urgency"
    elif score >= 4:
        return "Medium Urgency"
    else:
        return "Low Urgency"
