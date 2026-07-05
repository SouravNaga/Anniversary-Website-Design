import React, { useState } from 'react';
import { HelpCircle, Star, Award, CheckCircle, RefreshCw, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Question {
  id: string;
  text: string;
  options: string[];
  answerIdx: number;
  explanation: string;
}

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'q1',
    text: "Which of these is generally known as the ultimate relationship stabilizer?",
    options: ["Perfect communication", "Buying expensive jewelry", "Stealing their fries and laughing", "Nodding along while thinking of pizza"],
    answerIdx: 0,
    explanation: "Communication is key, but fry theft is a close honorary second!"
  },
  {
    id: 'q2',
    text: "On a spontaneous rainy Sunday afternoon, what is the ultimate couple activity?",
    options: ["Going jogging in the downpour", "Binge-watching a cozy series under a shared blanket", "Starting a 1000-piece puzzle that you won't finish", "Doing spring cleaning"],
    answerIdx: 1,
    explanation: "Shared blankets and a cozy show are universally scientifically proven to be the best!"
  },
  {
    id: 'q3',
    text: "If your partner says 'I'm fine, do whatever you want', what should you do?",
    options: ["Exactly what you wanted to do", "Run away immediately", "Gently ask what's wrong and make them tea", "Argue that they are being confusing"],
    answerIdx: 2,
    explanation: "They are definitely NOT fine! Gentle tea-making and checking in is the true soulmate protocol."
  },
];

export default function TriviaQuiz() {
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  // Custom question form
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [customText, setCustomText] = useState('');
  const [opt0, setOpt0] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [correctOpt, setCorrectOpt] = useState(0);
  const [explanationText, setExplanationText] = useState('');

  const handleAnswerSelect = (optIdx: number) => {
    if (hasChecked) return;
    setSelectedAnswer(optIdx);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null || hasChecked) return;
    
    if (selectedAnswer === questions[currentIdx].answerIdx) {
      setScore(prev => prev + 1);
    }
    setHasChecked(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasChecked(false);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
    setHasChecked(false);
  };

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim() || !opt0.trim() || !opt1.trim() || !opt2.trim() || !opt3.trim()) return;

    const newQuestion: Question = {
      id: `q-${Date.now()}`,
      text: customText.trim(),
      options: [opt0.trim(), opt1.trim(), opt2.trim(), opt3.trim()],
      answerIdx: correctOpt,
      explanation: explanationText.trim() || "The perfect partner-tested answer!"
    };

    setQuestions(prev => [...prev, newQuestion]);
    setIsAddingQuestion(false);
    
    // Clear state
    setCustomText('');
    setOpt0('');
    setOpt1('');
    setOpt2('');
    setOpt3('');
    setCorrectOpt(0);
    setExplanationText('');
  };

  const getCuteVerdict = () => {
    const pct = Math.round((score / questions.length) * 100);
    if (pct === 100) return { title: "Absolute Soulmates! 💖", text: "You perfectly understand the intricacies of love. Your telepathy is unmatched!" };
    if (pct >= 60) return { title: "Adorable Cuties! 💞", text: "You have a beautiful connection and understand each other incredibly well. Keep growing together!" };
    return { title: "Work-in-Progress Cuties! 🌱", text: "Love is a journey, and you have so much fun learning more about each other every day!" };
  };

  const currentQuestion = questions[currentIdx];
  const verdict = getCuteVerdict();

  return (
    <div className="space-y-8" id="love-quiz">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-left">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <HelpCircle className="text-rose-500" />
            Love Connections Quiz
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Test your connection, play trivia, and write custom quizzes for each other!
          </p>
        </div>

        <button
          onClick={() => setIsAddingQuestion(true)}
          className="px-4 py-2 border border-rose-200 hover:bg-rose-50 text-rose-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
        >
          <Plus size={14} /> Add Quiz Question
        </button>
      </div>

      {/* Add Custom Question Modal */}
      <AnimatePresence>
        {isAddingQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-xl border border-rose-100 max-h-[90vh] overflow-y-auto text-left"
            >
              <div className="flex justify-between items-center border-b border-rose-50 pb-3 mb-4">
                <h3 className="font-serif text-lg font-bold text-gray-900">Create a Custom Trivia Question</h3>
                <button
                  type="button"
                  onClick={() => setIsAddingQuestion(false)}
                  className="p-1 hover:bg-rose-50 rounded-full text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleAddQuestionSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Your Question</label>
                  <input
                    type="text"
                    required
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="e.g., What is Alex's absolute favorite midnight snack?"
                    className="w-full px-3 py-2 border border-rose-100 rounded-lg text-xs focus:ring-2 focus:ring-rose-400 bg-rose-50/10"
                  />
                </div>

                {/* Option fields */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase">Options</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      value={opt0}
                      onChange={(e) => setOpt0(e.target.value)}
                      placeholder="Option 1"
                      className="px-3 py-2 border border-rose-100 rounded-lg text-xs bg-rose-50/10 focus:ring-2 focus:ring-rose-400"
                    />
                    <input
                      type="text"
                      required
                      value={opt1}
                      onChange={(e) => setOpt1(e.target.value)}
                      placeholder="Option 2"
                      className="px-3 py-2 border border-rose-100 rounded-lg text-xs bg-rose-50/10 focus:ring-2 focus:ring-rose-400"
                    />
                    <input
                      type="text"
                      required
                      value={opt2}
                      onChange={(e) => setOpt2(e.target.value)}
                      placeholder="Option 3"
                      className="px-3 py-2 border border-rose-100 rounded-lg text-xs bg-rose-50/10 focus:ring-2 focus:ring-rose-400"
                    />
                    <input
                      type="text"
                      required
                      value={opt3}
                      onChange={(e) => setOpt3(e.target.value)}
                      placeholder="Option 4"
                      className="px-3 py-2 border border-rose-100 rounded-lg text-xs bg-rose-50/10 focus:ring-2 focus:ring-rose-400"
                    />
                  </div>
                </div>

                {/* Correct option selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Correct Option</label>
                    <select
                      value={correctOpt}
                      onChange={(e) => setCorrectOpt(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-rose-100 rounded-lg text-xs focus:ring-2 focus:ring-rose-400 bg-white"
                    >
                      <option value={0}>Option 1</option>
                      <option value={1}>Option 2</option>
                      <option value={2}>Option 3</option>
                      <option value={3}>Option 4</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Quick Explanation (Optional)</label>
                    <input
                      type="text"
                      value={explanationText}
                      onChange={(e) => setExplanationText(e.target.value)}
                      placeholder="e.g., Alex is a certified pizza lover!"
                      className="w-full px-3 py-2 border border-rose-100 rounded-lg text-xs focus:ring-2 focus:ring-rose-400 bg-rose-50/10"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 text-xs font-semibold pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingQuestion(false)}
                    className="px-3 py-1.5 border border-gray-100 hover:bg-gray-50 rounded-lg text-gray-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-rose-600 text-white hover:bg-rose-700 rounded-lg shadow-sm cursor-pointer"
                  >
                    Save Question
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Quiz Area */}
      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div
              key="active-quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white p-6 md:p-8 rounded-3xl border border-rose-50/50 shadow-sm text-left space-y-6"
            >
              {/* Progress info */}
              <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider pb-3 border-b border-rose-50/40">
                <span>Question {currentIdx + 1} of {questions.length}</span>
                <span className="text-rose-500">Score: {score}</span>
              </div>

              {/* Question Text */}
              <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 leading-snug">
                {currentQuestion.text}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  let optStyle = 'border-gray-100 hover:border-rose-300 bg-rose-50/10 text-gray-700';
                  if (selectedAnswer === idx && !hasChecked) {
                    optStyle = 'border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-400';
                  } else if (hasChecked) {
                    if (idx === currentQuestion.answerIdx) {
                      optStyle = 'border-green-500 bg-green-50 text-green-800 ring-1 ring-green-300';
                    } else if (selectedAnswer === idx) {
                      optStyle = 'border-red-400 bg-red-50 text-red-700';
                    } else {
                      optStyle = 'border-gray-100 opacity-60 text-gray-400 bg-gray-50/30';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(idx)}
                      disabled={hasChecked}
                      className={`w-full p-4 rounded-2xl border-2 text-xs md:text-sm font-semibold transition-all text-left flex items-center justify-between cursor-pointer ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {hasChecked && idx === currentQuestion.answerIdx && (
                        <CheckCircle size={16} className="text-green-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation panel */}
              {hasChecked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-rose-50/40 p-4 rounded-xl text-xs text-rose-950 leading-relaxed italic border-l-2 border-rose-400"
                >
                  <strong>Why?</strong> {currentQuestion.explanation}
                </motion.div>
              )}

              {/* Action Button */}
              <div className="flex justify-end pt-3">
                {!hasChecked ? (
                  <button
                    onClick={checkAnswer}
                    disabled={selectedAnswer === null}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer ${
                      selectedAnswer === null
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-rose-600 hover:bg-rose-700 text-white'
                    }`}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    {currentIdx + 1 < questions.length ? 'Next Question' : 'View Results'}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz-finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-3xl border border-rose-50/50 shadow-sm text-center space-y-6"
            >
              <div className="inline-block p-4 bg-rose-50 rounded-full text-rose-500">
                <Award size={48} />
              </div>
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-widest block">Quiz Complete</span>
                <h3 className="font-serif text-2xl font-bold text-gray-900">{verdict.title}</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">{verdict.text}</p>
              </div>

              <div className="bg-rose-50/30 p-4 rounded-2xl border border-rose-100/50 max-w-xs mx-auto">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider block">Your Score</span>
                <span className="text-3xl font-serif font-black text-rose-600">{score} / {questions.length}</span>
              </div>

              <div className="flex justify-center gap-3 pt-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <RefreshCw size={14} /> Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
