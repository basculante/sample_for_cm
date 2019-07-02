const validate = values => {
  const errors = {}
  if (!values.surveyName) {
    errors.surveyName = 'Required'
  }
  if (!values.questions || !values.questions.length) {
    errors.questions = { _error: 'At least one question must be entered' }
  } else {
    const questionsArrayErrors = []
    values.questions.forEach((question, questionIndex) => {
      const questionErrors = {}
      if (!question || !question.question) {
        questionErrors.question = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      }
      if (question && question.answers && question.answers.length) {
        const answerArrayErrors = []
        question.answers.forEach((answer, answerIndex) => {
          if (!answer || !answer.length) {
            answerArrayErrors[answerIndex] = 'Required'
          }
        })
        if (answerArrayErrors.length) {
          questionErrors.answers = answerArrayErrors
          questionsArrayErrors[questionIndex] = questionErrors
        }
        if (question.answers.length > 4) {
          if (!questionErrors.answers) {
            questionErrors.answers = []
          }
          questionErrors.answers._error = 'No more than four answers allowed'
          questionsArrayErrors[questionIndex] = questionErrors
        }
      }
    })
    if (questionsArrayErrors.length) {
      errors.questions = questionsArrayErrors
    }
  }
  return errors
}

export default validate