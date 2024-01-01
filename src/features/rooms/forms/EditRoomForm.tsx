import React from "react"
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"

interface EditRoomFormProps {
  handleClose: () => void
}

const EditRoomForm: React.FC<EditRoomFormProps> = ({ handleClose }) => {
  // Mock data for quiz collection names
  const quizCollectionNames = ["Collection 1", "Collection 2", "Collection 3"]

  // Validation schema using Yup
  const validationSchema = yup.object({
    quizCollection: yup.string().required("Hãy chọn 1 bộ đề thi!"),
    // Add other validation rules for additional form fields if needed
  })

  // Formik setup with default value for quizCollection
  const formik = useFormik({
    initialValues: {
      quizCollection: quizCollectionNames[0], // Set the default value here
      // Add other initial values for additional form fields if needed
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Your form submission logic here
      console.log("Form submitted with values:", values)

      // After handling the submission, close the form
      handleClose()
    },
  })

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="quiz-collection">Chọn Bộ Đề Thi</InputLabel>
          <Select
            label="Chọn Bộ Đề Thi"
            id="quiz-collection"
            name="quizCollection"
            value={formik.values.quizCollection}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {quizCollectionNames.map((collectionName, index) => (
              <MenuItem key={index} value={collectionName}>
                {collectionName}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.quizCollection && formik.errors.quizCollection ? (
            <div style={{ color: "red", fontSize: 12 }}>
              {formik.errors.quizCollection}
            </div>
          ) : null}
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            XÁC NHẬN
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default EditRoomForm
