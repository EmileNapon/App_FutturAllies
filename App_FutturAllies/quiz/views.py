import logging
from django.conf import settings
from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import Quiz, Question, Options, Reponse
from .serializers import QuizSerializer, QuestionSerializer, OptionsSerializer, ReponseSerializer
# from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# --------------------
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from .models import Quiz
from .serializers import QuizSerializer



import google.generativeai as genai
import json


import logging
from django.conf import settings
from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import Quiz, Question, Options, Reponse
from .serializers import QuizSerializer, QuestionSerializer, OptionsSerializer, ReponseSerializer
# from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

# --------------------
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from .models import Quiz
from .serializers import QuizSerializer



import google.generativeai as genai
import json


# ----------------- Quiz --------------------------
@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Permet seulement aux utilisateurs authentifiés de lister les offres
def list_quiz(request):
    quiz = Quiz.objects.all()  # Récupérer toutes les offres
    serializer = QuizSerializer(quiz, many=True)  # Sérialiser les données
    return Response(serializer.data, status=status.HTTP_200_OK)
# --------------- Fin quiz ----------------------

class QuizViewSet(ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer


class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class OptionsViewSet(ModelViewSet):
    queryset = Options.objects.all()
    serializer_class = OptionsSerializer


class ReponseViewSet(ModelViewSet):
    queryset = Reponse.objects.all()
    serializer_class = ReponseSerializer

from rest_framework.generics import get_object_or_404

class QuizDetailView(APIView):
    def get(self, request, pk):
        quiz = get_object_or_404(Quiz, pk=pk)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def GenerateQuizQuestions(request):
    description = request.data.get("description", "")
    if not description:
        return Response({"error": "La description est obligatoire."}, status=status.HTTP_400_BAD_REQUEST)

    # Appel au modèle génératif
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(description)
    generated_text = response.text

    # Retourner le texte brut généré
    return Response({"generated_text": generated_text}, status=status.HTTP_200_OK)


# def format_quiz_to_json(text):
#     questions = []
#     current_question = None
#     question_id = 0

#     for line in text.splitlines():
#         line = line.strip()

#         # Détecter une question
#         if line.startswith("**Question"):
#             if current_question:
#                 questions.append(current_question)
#             question_id += 1
#             question_text = line.split(":**")[1].strip()
#             question_type = "multiple" if "(Plusieurs réponses possibles)" in line else "single"
#             current_question = {
#                 "id": question_id,
#                 "question": question_text,
#                 "type": question_type,
#                 "options": [],
#                 "reponses": [],
#                 "explication": "Pas d'explication fournie"  # Valeur par défaut
#             }

#         # Détecter les options
#         elif line[:2] in ("a)", "b)", "c)", "d)", "e)") and current_question:
#             option_id = line[0]  # Exemple: "a)" => "a"
#             option_text = line[3:].strip()  # Supprime "a) "
#             current_question["options"].append({
#                 "option_id": option_id,
#                 "option_text": option_text
#             })

#         # Détecter une réponse
#         elif line.startswith("**Réponse:**") and current_question:
#             reponses = line.split("**Réponse:**")[1].strip().split(",")
#             current_question["reponses"] = [rep.strip()[0] for rep in reponses if rep.strip()]

#         # Détecter une explication
#         elif line.startswith("**Explication:**") and current_question:
#             explanation = line.split("**Explication:**")[1].strip()
#             current_question["explication"] = explanation

#     # Ajouter la dernière question
#     if current_question:
#         questions.append(current_question)

#     return questions


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def SaveQuiz(request):
#     try:
#         title = request.data.get("title")
#         date = request.data.get("date")
#         start_time = request.data.get("start_time")
#         duration_minutes = request.data.get("duration_minutes")
#         module_id = request.data.get("module_id")
#         generated_text = request.data.get("description")

#         formatted_data = format_quiz_to_json(generated_text)

#         print("=== Données JSON formatées ===")
#         print(json.dumps(formatted_data, indent=4, ensure_ascii=False))

#         # Création du quiz
#         quiz = Quiz.objects.create(
#             besoin=generated_text,
#             title=title,
#             date=date,
#             start_time=start_time,
#             duration_minutes=duration_minutes,
#             module_id=module_id
#         )

#         # Insérer les questions, options et réponses
#         for question_data in formatted_data:
#             question_obj = Question.objects.create(
#                 quiz=quiz,
#                 question=question_data["question"],
#                 type=question_data["type"],
#                 explication=question_data.get("explication", "")
#             )

#             for option_data in question_data["options"]:
#                 Options.objects.create(
#                     question=question_obj,
#                     option_id=option_data["option_id"],
#                     option_text=option_data["option_text"]
#                 )

#             for reponse_id in question_data["reponses"]:
#                 Reponse.objects.create(
#                     question=question_obj,
#                     reponse=reponse_id
#                 )

#         return Response({
#             "message": "Quiz enregistré avec succès",
#             "quiz_id": quiz.id
#         }, status=status.HTTP_201_CREATED)

#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


def format_quiz_to_json(text):
    import re

    questions = []
    current_question = None
    question_id = 0
    collecting_options = False

    lines = text.splitlines()
    i = 0

    while i < len(lines):
        line = lines[i].strip()
        print(f"Ligne {i}: {line}")  # Ajouté pour le debug

        if not line or line.startswith("##") or line.startswith("**Instructions:"):
            i += 1
            continue

        qcm_match = re.match(r"\*\*Question \d+ \(QCM\):\*\*", line)
        unique_match = re.match(r"\*\*Question \d+ \(Réponse unique\):\*\*", line)
        vf_match = re.match(r"\*\*Question \d+ \(Vrai/Faux\):\*\*", line)


        if qcm_match or unique_match or vf_match:
            if current_question:
                questions.append(current_question)

            question_id += 1
            q_type = (
                "multiple" if qcm_match else
                "single" if unique_match else
                "truefalse"
            )

            # La ligne suivante contient le texte de la question
            i += 1
            question_text = lines[i].strip()

            current_question = {
                "id": question_id,
                "question": question_text,
                "type": q_type,
                "options": [],
                "reponses": [],
                "explication": "Pas d'explication fournie"
            }
            collecting_options = True
            i += 1
            continue


        if collecting_options and re.match(r"[a-e]\)", line[:3]):
            print(f"→ Option détectée : {line}")  # Debug

            option_id = line[0]
            option_text = line[3:].strip()
            current_question["options"].append({
                "option_id": option_id,
                "option_text": option_text
            })
            i += 1
            continue

        if line.startswith("**Réponse:**") and current_question:
            print(f"→ Réponse détectée : {line}")  # Debug

            rep_content = line.split("**Réponse:**")[1].strip()
            if current_question["type"] == "truefalse":
                current_question["reponses"] = [rep_content.lower() == "vrai"]
            else:
                current_question["reponses"] = [r.strip()[0] for r in rep_content.split(",") if r.strip()]
            i += 1
            continue

        if line.startswith("**Explication:**") and current_question:
            print(f"→ Explication détectée : {line}")  # Debug

            explanation = line.split("**Explication:**")[1].strip()
            current_question["explication"] = explanation
            i += 1
            continue

        i += 1

    if current_question:
        questions.append(current_question)

    return questions




# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def SaveQuiz(request):
#     try:
#         title = request.data.get("title")
#         date = request.data.get("date")
#         start_time = request.data.get("start_time")
#         duration_minutes = request.data.get("duration_minutes")
#         module_id = request.data.get("module_id")
#         generated_text = request.data.get("description")

#         formatted_data = format_quiz_to_json(generated_text)

#         print("=== Données JSON formatées ===")
#         print(json.dumps(formatted_data, indent=4, ensure_ascii=False))

#         # Création du quiz
#         quiz = Quiz.objects.create(
#             besoin=generated_text,
#             title=title,
#             date=date,
#             start_time=start_time,
#             duration_minutes=duration_minutes,
#             module_id=module_id
#         )

#         # Insérer les questions, options et réponses
#         for question_data in formatted_data:
#             question_obj = Question.objects.create(
#                 quiz=quiz,
#                 question=question_data["question"],
#                 type=question_data["type"],
#                 explication=question_data.get("explication", "")
#             )

#             # Ajouter les options (seulement pour les types autre que truefalse)
#             if question_data["type"] != "truefalse":
#                 for option_data in question_data["options"]:
#                     Options.objects.create(
#                         question=question_obj,
#                         option_id=option_data["option_id"],
#                         option_text=option_data["option_text"]
#                     )

#             # Enregistrer les réponses
#             for reponse in question_data["reponses"]:
#                 if question_data["type"] == "truefalse":
#                     reponse_str = "Vrai" if reponse else "Faux"
#                     Reponse.objects.create(
#                         question=question_obj,
#                         reponse=reponse_str
#                     )
#                 else:
#                     Reponse.objects.create(
#                         question=question_obj,
#                         reponse=reponse
#                     )

#         return Response({
#             "message": "Quiz enregistré avec succès",
#             "quiz_id": quiz.id
#         }, status=status.HTTP_201_CREATED)

#     except Exception as e:
#         return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def SaveQuiz(request):
    try:
        title = request.data.get("title")
        date = request.data.get("date")
        start_time = request.data.get("start_time")
        duration_minutes = request.data.get("duration_minutes")
        module_id = request.data.get("module_id")
        generated_text = request.data.get("description")
        print("============================================")
        # print("=== Texte brut reçu ===")
        # print(generated_text)

        formatted_data = format_quiz_to_json(generated_text)
        print("=====================================================")
        # print("=== Texte brut reçu ===")
        # print("=== Texte brut reçu ===")


        print(json.dumps(formatted_data, indent=4, ensure_ascii=False))

        # Création du quiz
        quiz = Quiz.objects.create(
            besoin=generated_text,
            title=title,
            date=date,
            start_time=start_time,
            duration_minutes=duration_minutes,
            module_id=module_id
        )

        # Insérer les questions, options et réponses
        for question_data in formatted_data:
            question_obj = Question.objects.create(
                quiz=quiz,
                question=question_data["question"],
                type=question_data["type"],
                explication=question_data.get("explication", "")
            )

            print(f"\n--- Question enregistrée (ID: {question_obj.id}) ---")
            print(f"Texte       : {question_data['question']}")
            print(f"Type        : {question_data['type']}")
            print(f"Explication : {question_data.get('explication', '')}")
            print("Options     :")

            # Ajouter les options (seulement pour les types autre que truefalse)
            if question_data["type"] != "truefalse":
                for option_data in question_data["options"]:
                    Options.objects.create(
                        question=question_obj,
                        option_id=option_data["option_id"],
                        option_text=option_data["option_text"]
                    )
                    print(f"   {option_data['option_id']}) {option_data['option_text']}")
            else:
                print("   (Question de type vrai/faux, pas d'options)")

            print("Réponses    :")
            for reponse in question_data["reponses"]:
                if question_data["type"] == "truefalse":
                    reponse_str = "Vrai" if reponse else "Faux"
                    Reponse.objects.create(
                        question=question_obj,
                        reponse=reponse_str
                    )
                    print(f"   {reponse_str}")
                else:
                    Reponse.objects.create(
                        question=question_obj,
                        reponse=reponse
                    )
                    print(f"   {reponse}")

            print("------------------------------------")

        return Response({
            "message": "Quiz enregistré avec succès",
            "quiz_id": quiz.id
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class QuizDetailSubmitView(APIView):
    def get(self, request, quiz_id):
        quiz = get_object_or_404(Quiz, pk=quiz_id)
        serializer = QuizSerializer(quiz)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, quiz_id):
        quiz = get_object_or_404(Quiz, pk=quiz_id)
        answers = request.data.get("answers", {})  # Format attendu : {question_id: [option_ids]}
        score = 0

        for question in quiz.questions.all():
            correct_answers = set(question.reponse_set.values_list('reponse', flat=True))
            user_answers = set(answers.get(str(question.id), []))
            if correct_answers == user_answers:
                score += 1

        return Response({"score": score, "total": quiz.questions.count()}, status=status.HTTP_200_OK)



 