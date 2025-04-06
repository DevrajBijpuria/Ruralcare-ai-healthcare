def voice_quiz():
    print("What should you do if a child has a fever?")
    
    response = input("Your answer: ")
    print("Correct!" if "paracetamol" in response.lower() else "Try again.")
