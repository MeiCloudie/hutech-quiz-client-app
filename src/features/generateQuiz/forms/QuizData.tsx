import React, { useState } from "react"
import {
  Box,
  Divider,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  TextField,
  Button,
} from "@mui/material"
import { Field, Form, Formik } from "formik"
import * as yup from "yup"

interface QuizDataProps {
  quizData: any[]
}

const validationSchema = yup.object({
  content: yup.string().required("Nội dung không được để trống"),
  explaination: yup.string().required("Giải thích không được để trống"),
  answers: yup.array().of(
    yup.object().shape({
      content: yup.string().required("Câu trả lời không được để trống"),
      isCorrect: yup.string().required("Vui lòng chọn đúng/sai"),
    })
  ),
})

const QuizData: React.FC<QuizDataProps> = ({ quizData }) => {
  const [quizCollectionTemp, setQuizCollectionTemp] = useState<any[]>(quizData)

  const updateQuizAtIndex = (index: number, newQuiz: any) => {
    setQuizCollectionTemp((prevState) => {
      const updatedQuizCollection = [...prevState]
      updatedQuizCollection[index] = newQuiz
      console.log(updatedQuizCollection)
      return updatedQuizCollection
    })
  }

  const handleQuizCollectionTemp = () => {
    console.log("Collection:")
    console.log(quizCollectionTemp)
  }

  return (
    <Box>
      {quizData.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h4" align="center" fontWeight={"bold"}>
              KẾT QUẢ{" "}
            </Typography>
            <Button variant="contained" onClick={handleQuizCollectionTemp}>
              TẠO ĐỀ THI
            </Button>
          </Box>
        </>
      )}
      <Box>
        {quizData.map((quiz, index) => {
          return (
            <div key={index}>
              <Typography
                variant="h5"
                fontWeight={"bold"}
                align="left"
                gutterBottom
              >
                Câu {index + 1}:
              </Typography>
              <Formik
                initialValues={{
                  content: quiz.content,
                  explaination: quiz.explaination,
                  answers: quiz.answers.map((answer: any) => ({
                    content: answer.content,
                    isCorrect: answer.isCorrect ? "correct" : "incorrect",
                  })),
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                  updateQuizAtIndex(index, values)
                }}
              >
                {({ errors, touched, resetForm, isSubmitting }) => (
                  <Form>
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      label="Nội dung"
                      name="content"
                      margin="normal"
                      multiline
                      rows={3}
                      error={touched.content && !!errors.content}
                      helperText={touched.content && errors.content}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      variant="outlined"
                      label="Giải thích"
                      name="explaination"
                      margin="normal"
                      multiline
                      rows={3}
                      error={touched.explaination && !!errors.explaination}
                      helperText={touched.explaination && errors.explaination}
                    />
                    <Grid container spacing={2}>
                      {quiz.answers.map((answer: any, i: number) => (
                        <React.Fragment key={i}>
                          <Grid item xs={6}>
                            <Field
                              as={TextField}
                              fullWidth
                              variant="outlined"
                              label={`Câu trả lời ${i + 1}`}
                              name={`answers.${i}.content`}
                              margin="normal"
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <Field
                              as={FormControl}
                              fullWidth
                              variant="outlined"
                              margin="normal"
                            >
                              <InputLabel
                                id={`select-label-${i}`}
                                htmlFor={`answers.${i}.isCorrect`}
                              >
                                Đúng / Sai
                              </InputLabel>
                              <Field
                                as={Select}
                                name={`answers.${i}.isCorrect`}
                                labelId={`select-label-${i}`}
                                label="Đúng / Sai"
                                defaultValue={
                                  answer.isCorrect ? "correct" : "incorrect"
                                }
                              >
                                <MenuItem value="correct">Correct</MenuItem>
                                <MenuItem value="incorrect">Incorrect</MenuItem>
                              </Field>
                            </Field>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ mr: 1 }}
                        >
                          CẬP NHẬT
                        </Button>
                        <Button
                          type="button"
                          variant="contained"
                          color="error"
                          onClick={() => resetForm()}
                        >
                          HUỶ
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <Divider sx={{ my: 2 }} />
            </div>
          )
        })}
      </Box>
    </Box>
  )
}

export default QuizData
