import React, { useState } from "react"
import { TextField, Button, Typography, Container, Grid } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"

interface GenerateQuizFormProps {}

const GenerateQuizForm: React.FC<GenerateQuizFormProps> = () => {
  const [quizData, setQuizData] = useState<any[]>([])

  const validationSchema = yup.object({
    topic: yup
      .string()
      .required("Không được để trống!")
      .max(1000, "Tối đa 1000 ký tự!"),
    quizCount: yup
      .number()
      .required("Không được để trống!")
      .typeError("Phải là kiểu số!"),
    answerCount: yup
      .number()
      .required("Không được để trống!")
      .typeError("Phải là kiểu số!"),
    correctAnswerText: yup.string().required("Không được để trống!"),
  })

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      setQuizData(data)
    } catch (error) {
      console.error("There was an error!", error)
    }
  }

  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Form Generate Quiz
      </Typography>
      <Formik
        initialValues={{
          topic: "",
          quizCount: "",
          answerCount: "",
          correctAnswerText: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="topic"
                  label="Topic"
                  variant="outlined"
                  fullWidth
                  error={touched.topic && !!errors.topic}
                  helperText={<ErrorMessage name="topic" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  type="number"
                  name="quizCount"
                  label="Quiz Count"
                  variant="outlined"
                  fullWidth
                  error={touched.quizCount && !!errors.quizCount}
                  helperText={<ErrorMessage name="quizCount" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  type="number"
                  name="answerCount"
                  label="Answer Count"
                  variant="outlined"
                  fullWidth
                  error={touched.answerCount && !!errors.answerCount}
                  helperText={<ErrorMessage name="answerCount" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="correctAnswerText"
                  label="Correct Answer Text"
                  variant="outlined"
                  fullWidth
                  error={
                    touched.correctAnswerText && !!errors.correctAnswerText
                  }
                  helperText={<ErrorMessage name="correctAnswerText" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {/* Hiển thị dữ liệu quiz */}
      <div>
        {quizData.map((quiz, index) => (
          <div key={index}>
            <p>{quiz.content}</p>
            <p>{quiz.explaination}</p>
            <ul>
              {quiz.answers.map((answer: any, i: number) => (
                <li key={i}>
                  {answer.content} -{" "}
                  {answer.isCorrect ? "Correct" : "Incorrect"}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default GenerateQuizForm
