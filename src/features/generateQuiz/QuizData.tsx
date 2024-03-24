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
} from "@mui/material"
import React from "react"
import { Field, Form, Formik } from "formik"

interface QuizDataProps {
  quizData: any[]
}

const QuizData: React.FC<QuizDataProps> = ({ quizData }) => {
  return (
    <Box>
      {quizData.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography
            variant="h4"
            align="center"
            fontWeight={"bold"}
            gutterBottom
          >
            KẾT QUẢ{" "}
          </Typography>
        </>
      )}
      <Box>
        {quizData.map((quiz, index) => (
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
              onSubmit={(values) => {
                console.log(values)
                // Handle form submission here
              }}
            >
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
                          select
                          variant="outlined"
                          margin="normal"
                        >
                          <InputLabel
                            id="select-label"
                            htmlFor={`answers.${i}.isCorrect`}
                          >
                            Đúng / Sai
                          </InputLabel>
                          <Field
                            as={Select}
                            name={`answers.${i}.isCorrect`}
                            labelId="select-label"
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
              </Form>
            </Formik>
            <Divider sx={{ my: 2 }} />
          </div>
        ))}
      </Box>
    </Box>
  )
}

export default QuizData
