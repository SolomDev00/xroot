"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ChevronRight, Award, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface QuizQuestion {
  id: string
  question: string
  options: {
    id: string
    text: string
  }[]
  correctOptionId: string
  explanation: string
}

interface QuizEngineProps {
  title: string
  description: string
  questions: QuizQuestion[]
  onComplete?: (score: number, totalQuestions: number) => void
}

export function QuizEngine({ title, description, questions, onComplete }: QuizEngineProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleOptionSelect = (optionId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedOptionId(optionId)
    }
  }

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return

    setIsAnswerSubmitted(true)
    setUserAnswers({
      ...userAnswers,
      [currentQuestion.id]: selectedOptionId,
    })

    if (selectedOptionId === currentQuestion.correctOptionId) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOptionId(null)
      setIsAnswerSubmitted(false)
    } else {
      setQuizCompleted(true)
      if (onComplete) {
        onComplete(score, questions.length)
      }
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedOptionId(null)
    setIsAnswerSubmitted(false)
    setScore(0)
    setUserAnswers({})
    setQuizCompleted(false)
  }

  const isCorrectAnswer = selectedOptionId === currentQuestion?.correctOptionId
  const scorePercentage = Math.round((score / questions.length) * 100)

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            {!quizCompleted && (
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
            )}
          </div>
          {!quizCompleted && <Progress value={progress} className="h-2 mt-2" aria-label={`${progress}% complete`} />}
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            {!quizCompleted ? (
              <motion.div
                key={`question-${currentQuestionIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-medium mb-4">{currentQuestion.question}</h3>

                <RadioGroup value={selectedOptionId || ""} className="space-y-3" onValueChange={handleOptionSelect}>
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedOptionId === option.id
                    const isCorrect = option.id === currentQuestion.correctOptionId
                    const showCorrectStyle = isAnswerSubmitted && isCorrect
                    const showIncorrectStyle = isAnswerSubmitted && isSelected && !isCorrect

                    return (
                      <div
                        key={option.id}
                        className={cn(
                          "flex items-center space-x-2 rounded-md border p-4 transition-colors",
                          isSelected && !isAnswerSubmitted && "border-primary bg-primary/5",
                          showCorrectStyle && "border-green-500 bg-green-500/10",
                          showIncorrectStyle && "border-red-500 bg-red-500/10",
                        )}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          disabled={isAnswerSubmitted}
                          className={cn(
                            showCorrectStyle && "text-green-500 border-green-500",
                            showIncorrectStyle && "text-red-500 border-red-500",
                          )}
                        />
                        <Label
                          htmlFor={option.id}
                          className={cn(
                            "flex-grow cursor-pointer",
                            showCorrectStyle && "text-green-500",
                            showIncorrectStyle && "text-red-500",
                          )}
                        >
                          {option.text}
                        </Label>
                        {isAnswerSubmitted && isCorrect && <Check className="h-5 w-5 text-green-500" />}
                        {isAnswerSubmitted && isSelected && !isCorrect && <X className="h-5 w-5 text-red-500" />}
                      </div>
                    )
                  })}
                </RadioGroup>

                {isAnswerSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 p-4 rounded-md bg-primary/5 border border-primary/20"
                  >
                    <div className="flex items-start">
                      <div
                        className={cn(
                          "mr-2 mt-0.5 rounded-full p-1",
                          isCorrectAnswer ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500",
                        )}
                      >
                        {isCorrectAnswer ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{isCorrectAnswer ? "Correct!" : "Incorrect"}</p>
                        <p className="text-muted-foreground">{currentQuestion.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-6 mb-4">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                <p className="text-xl mb-6">
                  Your score: {score} out of {questions.length} ({scorePercentage}%)
                </p>

                <div className="mb-8">
                  <Progress value={scorePercentage} className="h-3" />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="text-left mb-6">
                  <h4 className="font-medium mb-2">Performance Assessment:</h4>
                  {scorePercentage >= 80 ? (
                    <p className="text-green-500">Excellent! You have a strong understanding of this topic.</p>
                  ) : scorePercentage >= 60 ? (
                    <p className="text-primary">
                      Good job! You have a solid grasp of the basics, but there's room for improvement.
                    </p>
                  ) : (
                    <p className="text-amber-500">
                      You might want to review this module again to strengthen your understanding.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>

        <CardFooter className="flex justify-between">
          {!quizCompleted ? (
            <>
              {!isAnswerSubmitted ? (
                <Button onClick={handleSubmitAnswer} disabled={!selectedOptionId} className="ml-auto">
                  Submit Answer
                </Button>
              ) : (
                <Button onClick={handleNextQuestion} className="ml-auto">
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next Question <ChevronRight className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    "See Results"
                  )}
                </Button>
              )}
            </>
          ) : (
            <div className="flex w-full gap-4">
              <Button variant="outline" onClick={handleRestartQuiz} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" /> Restart Quiz
              </Button>
              <Button className="flex-1">Continue Learning</Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
