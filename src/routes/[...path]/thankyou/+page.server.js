//export const prerender = true
export const actions = {
  default: async ({request, url}) => {
    const formData = await request.formData()
    let origin = url.origin;
		if (url.origin.includes('localhost')) origin = 'https://urosystem.netlify.app';

    try {
			const response = await fetch(`${origin}/en/contact`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams(formData).toString()
			});

      const data = await response.text();
			if (response.status !== 200) return { err: data }
      return  { success: true }
		} catch (err) {
			console.log('error: ', err)
			return { err: err }
		}
  }
}