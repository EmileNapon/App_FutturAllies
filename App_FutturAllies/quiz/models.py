from django.db import models

from Formation.models import Module




from django.db import models

class Module(models.Model):
    nom_module = models.CharField(max_length=255)

    def __str__(self):
        return self.nom_module


class Quiz(models.Model):
    title = models.CharField(max_length=255)
    besoin = models.TextField()  
    date = models.DateField()
    start_time = models.TimeField()
    duration_minutes = models.IntegerField()
    module = models.ForeignKey(Module, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Question(models.Model):
    QUESTION_TYPES = [
        ("multiple", "Choix multiples"),
        ("single", "Réponse unique"),
        ("truefalse", "Vrai/Faux"),
    ]

    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question = models.TextField()
    type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    explication = models.TextField(blank=True)

    def __str__(self):
        return self.question


class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    option_id = models.CharField(max_length=1)  
    option_text = models.TextField()

    def __str__(self):
        return f"{self.option_id.upper()}: {self.option_text[:50]}"

class Reponse(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='reponses')
    option = models.ForeignKey(Option, on_delete=models.CASCADE)

    def __str__(self):
        return f"Réponse à: {self.question.id} => {self.option.option_id}"
