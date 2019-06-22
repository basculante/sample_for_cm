const validate = values => {
  const errors = {}
  if (!values.surveyName) {
    errors.surveyName = 'Required'
  }
  if (!values.questions || !values.questions.length) {
    errors.questions = { _error: 'At least one member must be entered' }
  } else {
    const questionsArrayErrors = []
    values.questions.forEach((question, questionIndex) => {
      const questionErrors = {}
      if (!question || !question.question) {
        questionErrors.question = 'Required'
        questionsArrayErrors[questionIndex] = questionErrors
      }
      if (question && question.questions && question.questions.length) {
        const answerArrayErrors = []
        question.questions.forEach((answer, answerIndex) => {
          if (!answer || !answer.length) {
            answerArrayErrors[answerIndex] = 'Required'
          }
        })
        if (answerArrayErrors.length) {
          questionErrors.questions = answerArrayErrors
          questionsArrayErrors[questionIndex] = questionErrors
        }
        if (question.questions.length > 5) {
          if (!questionErrors.questions) {
            questionErrors.questions = []
          }
          questionErrors.questions._error = 'No more than five questions allowed'
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