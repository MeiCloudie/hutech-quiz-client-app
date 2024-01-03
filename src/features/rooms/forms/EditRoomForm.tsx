import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useStore } from "../../../app/stores/store";
import { QuizCollectionFormValues } from "../../../app/models/QuizCollection";
import { Room, RoomFormValues } from "../../../app/models/Room";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface EditRoomFormProps {
  handleClose: () => void;
  room?: Room;
}

const EditRoomForm: React.FC<EditRoomFormProps> = (props: EditRoomFormProps) => {
  const { roomId } = useParams<{
    roomId: string;
  }>();
  const { roomStore, quizCollectionStore } = useStore();
  // Mock data for quiz collection names
  // const quizCollectionNames = []
  const [roomFormValues, setRoomFormValues] =
    useState<RoomFormValues>(new RoomFormValues());

  useEffect(() => {
    // if (room) setRoomFormValues(new RoomFormValues(room));
    // else if (roomId)
    //   roomStore.get(roomId).then(() => {
    //     if (roomStore.selectedItem) {
          
    //     }
    //   });
    quizCollectionStore.load().then(() => {
      console.log(new RoomFormValues(props.room))
      setRoomFormValues(new RoomFormValues(props.room));
    })
  }, []);

  // Validation schema using Yup
  const validationSchema = yup.object({
    quizCollectionId: yup.string().required("Hãy chọn 1 bộ đề thi!"),
    // Add other validation rules for additional form fields if needed
  });

  // Formik setup with default value for quizCollection
  const formik = useFormik({
    initialValues: roomFormValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => { 
      // console.log(values)
      // Your form submission logic here
      
      if (roomFormValues.id) {
        const id = roomFormValues.id;
        const { quizCollectionId, code, isStarted, startedAt } = roomFormValues;
        // roomFormValues.id = undefined;
        console.log("Form submitted with values:", values);

        // ! Cannot update
        await roomStore.update(id, {code, isStarted, startedAt, quizCollectionId,  });
      }
      else {
        toast.error("Không thấy id của phòng!")
      }

      // After handling the submission, close the form
      props.handleClose();
    },
  });

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
  );
};

export default EditRoomForm;
