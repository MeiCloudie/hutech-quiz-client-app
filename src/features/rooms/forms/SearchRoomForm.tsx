import React from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { Box, Button, TextField } from "@mui/material"

interface SearchRoomFormProps {
  handleClose: () => void
}

const validationSchema = yup.object({
  roomCode: yup
    .string()
    .required("Hãy nhập code của phòng thi!")
    .matches(/^\d{1,6}$/, "Mã code phòng có tối đa 6 kí tự!"),
})

const initialValues = {
  roomCode: "",
}

const SearchRoomForm: React.FC<SearchRoomFormProps> = ({ handleClose }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // Handle your form submission logic here
      // For example, you can make an API call or perform other operations
      console.log("Form submitted with values:", values)

      // After handling the submission, close the form
      handleClose()
    },
  })

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="CODE phòng thi"
          fullWidth
          variant="outlined"
          margin="normal"
          id="roomCode"
          name="roomCode"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.roomCode}
          error={formik.touched.roomCode && Boolean(formik.errors.roomCode)}
          helperText={formik.touched.roomCode && formik.errors.roomCode}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            XÁC NHẬN
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default SearchRoomForm
