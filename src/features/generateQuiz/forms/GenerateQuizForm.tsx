import React, { useState } from "react"
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  CircularProgress,
} from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import QuizData from "./QuizData"

interface GenerateQuizFormProps {}

const GenerateQuizForm: React.FC<GenerateQuizFormProps> = () => {
  const [quizData, setQuizData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

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
    setIsLoading(true)
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
      setIsLoaded(true)
    } catch (error) {
      console.error("There was an error!", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Typography variant="h4" align="center" fontWeight={"bold"}>
        BIỂU MẪU
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        GENERATE QUIZ FORM
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
        {({ errors, touched, resetForm }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="topic"
                  label="Nội dung chủ đề"
                  variant="outlined"
                  multiline
                  rows={3}
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
                  label="Số lượng câu hỏi"
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
                  label="Số lượng câu trả lời / 1 câu hỏi"
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
                  label="Số lượng câu trả lời đúng / tổng câu trả lời"
                  variant="outlined"
                  fullWidth
                  error={
                    touched.correctAnswerText && !!errors.correctAnswerText
                  }
                  helperText={<ErrorMessage name="correctAnswerText" />}
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isLoading}
                      sx={{ mr: 1 }}
                    >
                      XÁC NHẬN
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      color="error"
                      onClick={() => resetForm()}
                      disabled={isLoading}
                    >
                      HUỶ
                    </Button>
                  </div>
                  {isLoading && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <CircularProgress size={24} sx={{ mr: 1 }} />
                      <Typography>
                        Đang phát sinh đề thi. Hãy chờ chút nhé!
                      </Typography>
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
            {/* Hiển thị dữ liệu quiz */}
            {isLoaded && <QuizData quizData={quizData} />}
          </Form>
        )}
      </Formik>

    </Container>
  )
}

export default GenerateQuizForm
