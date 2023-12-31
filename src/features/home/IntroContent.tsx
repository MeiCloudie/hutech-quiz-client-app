import { Box, Button, Divider, Typography } from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import React from "react"
import { Link } from "react-router-dom"

const IntroContent = () => {
  return (
    <React.Fragment>
      <Box sx={{ pb: "30px" }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          GIỚI THIỆU HỆ THỐNG
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          HUTECH QUIZ là một phần mở rộng của hệ thống HUTECH CLASSROOM, tập
          trung đặc biệt vào quản lý và tổ chức các bài kiểm tra trắc nghiệm
          trực tuyến. Được phát triển bởi đội ngũ Sinh Viên Khoa Công nghệ thông
          tin tại Trường Đại học Công nghệ TPHCM HUTECH, hệ thống này mang lại
          cho Giảng Viên và Sinh Viên trải nghiệm học tập tối ưu và hiệu quả.
          <br />
          Với HUTECH QUIZ, Giảng Viên có khả năng tạo và quản lý các bài kiểm
          tra trắc nghiệm một cách linh hoạt, đồng thời theo dõi kết quả của
          Sinh Viên một cách tức thì. Hệ thống cung cấp giao diện thân thiện và
          dễ sử dụng, giúp Giảng Viên dễ dàng thiết lập các câu hỏi, đặt thời
          gian, và quản lý danh sách Sinh Viên tham gia kiểm tra.
          <br />
          Đối với Sinh Viên, HUTECH QUIZ tạo ra môi trường kiểm tra trực tuyến
          an toàn và minh bạch. Sinh Viên có thể truy cập bài kiểm tra từ bất kỳ
          đâu, đặc biệt là trong khuôn khổ của HUTECH CLASSROOM, giúp họ linh
          hoạt trong quá trình học tập. Kết quả được hiển thị ngay sau khi hoàn
          thành bài kiểm tra, cung cấp phản hồi chi tiết để Sinh Viên có thể tự
          đánh giá và cải thiện kiến thức của mình.
          <br />
          Với sự kết hợp hoàn hảo giữa HUTECH CLASSROOM và HUTECH QUIZ, hệ thống
          giúp tối ưu hóa quá trình học tập trực tuyến, tạo ra một môi trường
          học thuận lợi và hiệu quả cho cả Giảng Viên và Sinh Viên tại Trường
          Đại học Công nghệ TPHCM HUTECH.
        </Typography>
        <Button
          variant="contained"
          startIcon={<SchoolIcon />}
          component={Link}
          to="/rooms"
        >
          PHÒNG THI
        </Button>
      </Box>
      <Divider />
    </React.Fragment>
  )
}

export default IntroContent
