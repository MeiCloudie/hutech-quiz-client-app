import React from "react"
import GenerateQuizForm from "./forms/GenerateQuizForm"
import { Container, Divider, Typography } from "@mui/material"

const GenerateQuizPage = () => {
  return (
    <Container>
      <Typography variant="h2" fontWeight={"bold"} align="left">
        ĐỀ THI
      </Typography>

      <Typography variant="h6" fontStyle={"italic"} align="left" gutterBottom>
        Tạo Đề Thi - phát sinh tự động ngẫu nhiên
      </Typography>

      <Divider sx={{ my: 2 }} />

      <GenerateQuizForm />
    </Container>
  )
}

export default GenerateQuizPage
