"use client";
import { generateQuiz } from '@/actions/interview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useFetch from '@/hooks/use-fetch';
import { useEffect, useState } from 'react';
import { BarLoader, PropagateLoader } from 'react-spinners';

const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showExplanation, setShowExplanation] = useState(false);


    const {
        loading: generatingQuiz,
        fn: generateQuizFn,
        data: quizData,
    } = useFetch(generateQuiz)

    useEffect(()=>{
        if(quizData){
            setAnswers(new Array(quizData.length).fill(null))
        }
    },[quizData])


    const handleAnswer = (answer)=>{
        const newAnswers=[...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers[newAnswers]
    }

    if (generatingQuiz) {
        return (
            <div className="w-full flex justify-center mt-4">
                <PropagateLoader color='gray' />
            </div>
        )
    }

    if (!quizData) {
        return (
            <Card className="mx-2">
                <CardHeader>
                    <CardTitle>Ready to test your Knowledge</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className='text-muted-foreground'>
                        This Quiz contains 10 questions specifically related to your industry and skills. Take your time and choose the best answer for each question.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={generateQuizFn}>Start Quiz</Button>
                </CardFooter>
            </Card>

        )
    }


    const question = quizData[currentQuestion];

    return (
        <Card className="mx-2">
            <CardHeader>
                <CardTitle>Question {currentQuestion + 1} of {quizData.length}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-lg font-medium'>{question.question}</p>

                <RadioGroup className="space-y-2" onValueChange={handleAnswer} value={answers[currentQuestion]}>
                    {question.options.map((option, index) => {
                        return <div className="flex items-center space-x-2" key={index}>
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                    })}


                </RadioGroup>

            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}

export default Quiz
