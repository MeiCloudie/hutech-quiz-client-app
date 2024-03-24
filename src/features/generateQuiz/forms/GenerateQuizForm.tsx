import React from "react"
import { TextField, Button, Typography, Container, Grid } from "@mui/material"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useFormik } from "formik"
import * as yup from "yup"

interface GenerateQuizFormProps {
  //   handleClose: () => void
}

const GenerateQuizForm: React.FC<GenerateQuizFormProps> = () => {
  //store

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

  const formik = useFormik({
    initialValues: {},
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("GenerateQuiz Form submitted with values:", values)

      //TODO: Handle submit
      //   const createRoomFormValues = new RoomFormValues()
      //   createRoomFormValues.quizCollectionId = values.quizCollectionId
      //   createRoomFormValues.ownerId = userStore.user?.id
      //   roomStore.create(createRoomFormValues).then(handleClose)

      //   handleClose()
    },
  })

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
        onSubmit={(values) => {
          console.log(values)
        }}
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
    </Container>
  )
}

export default GenerateQuizForm
