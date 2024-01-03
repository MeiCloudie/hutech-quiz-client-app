import React, { useEffect } from "react"
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
import { useStore } from "../../../app/stores/store"
import { observer } from "mobx-react-lite"
import { RoomFormValues } from "../../../app/models/Room"

interface CreateRoomFormProps {
  handleClose: () => void
}

const CreateRoomForm: React.FC<CreateRoomFormProps> = ({ handleClose }) => {
  
  const { roomStore, quizCollectionStore, userStore } = useStore();

  // Validation schema using Yup
  const validationSchema = yup.object({
    quizCollectionId: yup.string().required("Hãy chọn 1 bộ đề thi!"),
    // Add other validation rules for additional form fields if needed
  })

  useEffect(() => {
    quizCollectionStore.load().then(() => {
    })
  }, [])

  // Formik setup
  const formik = useFormik({
    initialValues: {
      quizCollectionId: "",
      // Add other initial values for additional form fields if needed
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Your form submission logic here
      console.log("Form submitted with values:", values)

      const createRoomFormValues = new RoomFormValues();
      createRoomFormValues.quizCollectionId = values.quizCollectionId
      createRoomFormValues.ownerId = userStore.user?.id;
      roomStore.create(createRoomFormValues)
      .then(handleClose)

      // After handling the submission, close the form
      // handleClose()
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
            name="quizCollectionId"
            value={formik.values.quizCollectionId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {quizCollectionStore.items.map((collection, index) => (
              <MenuItem key={index} value={collection.id}>
                {collection.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.quizCollectionId && formik.errors.quizCollectionId ? (
            <div style={{ color: "red", fontSize: 12 }}>
              {formik.errors.quizCollectionId}
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

export default observer(CreateRoomForm)
