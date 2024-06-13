//export const prerender = true
export const actions = {
  default: async ({request}) => {
    const data = await request.formData()
    return  { success: true }
  }
}