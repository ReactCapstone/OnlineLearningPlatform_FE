import apiClient from '../api/apiClient'

interface EnrollmentDto {
  id: number
  userId: number
  courseId: number
  status: string
}

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

class EnrollmentService {
  async enroll(courseId: number): Promise<EnrollmentDto> {
    const response = await apiClient<ApiResponse<EnrollmentDto>>('/Enrollment', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    })
    return response.data
  }
}

export default new EnrollmentService()
