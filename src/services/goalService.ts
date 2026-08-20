import apiClient from '../api/apiClient'

export interface GoalDto {
  id: number
  title: string
  description: string
  requiredSkill: string
}

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

class GoalService {
  async getMyGoals(): Promise<GoalDto[]> {
    const response = await apiClient<ApiResponse<GoalDto[]>>('/Goals')
    return response.data ?? []
  }
}

export default new GoalService()
