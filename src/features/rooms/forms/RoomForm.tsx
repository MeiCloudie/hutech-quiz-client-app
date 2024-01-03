import { Box, Typography } from "@mui/material";

import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import EntityForm from "../../common/forms/EntityForm";
import { Room, RoomFormValues } from "../../../app/models/Room";
import { useStore } from "../../../app/stores/store";

interface RoomFormProps {
  handleClose: () => void;
  room?: Room;
}

const RoomForm = (props: RoomFormProps) => {
  const { classroomId, roomId } = useParams<{
    classroomId: string;
    roomId: string;
  }>();
  const { roomStore, quizCollectionStore } = useStore();
  const [roomFormValues, setRoomFormValues] = useState<RoomFormValues>(
    new RoomFormValues()
  );
  const [quizCollectionOptions, setQuizCollectionOptions] = useState<
    { label: string; value: any }[]
  >([]);

  const loadRoomUsers = useCallback(() => {
    if (props.room) {
      if (roomStore.selectedItem) {
        const formValues = new RoomFormValues(roomStore.selectedItem);
        formValues.quizCollectionId = props.room.quizCollection?.id;
        setRoomFormValues(formValues);
      }
    } else if (roomId) {
      roomStore.get(roomId).then(() => {
        if (roomStore.selectedItem) {
          setRoomFormValues(new RoomFormValues(roomStore.selectedItem));
        }
      });
    }
  }, [roomId, roomStore, props.room]);

  // const loadQuizCollections = useCallback(() => {
  //   quizCollectionStore.load().then(() => {
  //     loadRoomUsers();
  //     setQuizCollectionOptions(
  //       classroomStore.classroomUsers
  //         .filter(
  //           (u) =>
  //             (roomId && u.rooms.some((g) => g.id === roomId)) ||
  //             (!roomId &&
  //               (
  //                 u.rooms.length === 0 ||
  //                 u.id === props.room?.leader?.id))
  //         )
  //         .map((c) => ({
  //           label: c.lastName + " " + c.firstName,
  //           value: c.id,
  //         }))
  //     );
  //   });
  // }, [classroomStore, roomId, loadRoomUsers, props.room?.leader?.id]);

  useEffect(() => {
    // if (!props.room && !roomId) {
    if (!roomStore.selectedItem) {
      if (roomId) {
        roomStore.get(roomId).then(() => {
          loadRoomUsers();
        });
      }
    } else {
      loadRoomUsers();
    }
  }, [
    roomId,
    roomStore,
    roomId,
    roomStore,
    props.room,
  ]);

  return (
    <Box
      sx={{
        bgcolor: "#f5f5f5",
        width: "100%",
        p: 2,
        border: "1px solid #e8e8e8",
        borderRadius: "5px",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: (theme) => theme.palette.primary.main,
          textAlign: "center",
        }}
      >
        THÔNG TIN NHÓM
      </Typography>
      <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
        <EntityForm<RoomFormValues>
          initialEntityFormValues={roomFormValues}
          selectionFields={[
            {
              fieldKey: "quizCollectionId",
              options: quizCollectionOptions,
            },
          ]}
          validateObject={{
            name: Yup.string()
              .required("Tên không được để trống!")
              .max(100, "Tên không được vượt quá 100 ký tự!"),
            description: Yup.string().max(
              3000,
              "Mô tả không được vượt quá 3000 ký tự!"
            ),
            quizCollectionId: Yup.string().required("Đề bài không được để trống!"),
          }}
          fieldConfigs={[
            {
              fieldKey: "code",
              props: {
                label: "Mã phòng",
                placeholder: "Hãy nhập mã phòng tại đây!",
              },
            },
            {
              fieldKey: "quizCollectionId",
              props: {
                label: "Đề",
                placeholder: "Hãy chọn đề tại đây!",
              },
            },
          ]}
          excludeFields={["code", "userIds"]}
          onSubmit={(entityFormValues) => {
            if (entityFormValues.id) {
              roomStore
                .update(entityFormValues.id, entityFormValues)
                .then(() => {
                  // if (entityFormValues.quizCollectionId)
                  //   roomStore.addLeader(entityFormValues.quizCollectionId).then(() => {
                  //     props.handleClose();
                  //   });
                });
            } else {
              roomStore.create(entityFormValues).then(() => {
                props.handleClose();
              });
            }
          }}
          onCancel={props.handleClose}
          onSetAdditionalValues={(roomFormValues) => {
            // roomFormValues.quizCollectionId = quizCollectionId;
          }}
        />
      </Box>
      
    </Box>
  );
};

export default observer(RoomForm);