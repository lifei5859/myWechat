class Api {
	private url: string = 'https://fg.easy.echosite.cn'
	get (url: string, data?: any, header?: any) {
		console.log(url)
		return new Promise((res: Function, rej: Function) => {
			console.log(this.url, rej)
			uni.request({
				method: 'GET',
				data,
				url: this.url + url,
				header: {
					...header
				},
				success: (data) => {
					console.log(data)
					res(data)
				},
				fail(err) {
					console.log(err)
					rej(err)
				}
			})
		}).then((result: any) => {
			console.log(result)
			return result
		}, (error) => {
			return error
		})
	}
	post (url: string, data?: any, header?: any) {
		console.log(url, data)
		return new Promise((res, rej) => {
			uni.request({
				method: 'POST',
				data,
				url: this.url + url,
				header: {
					...header
				},
				success(data) {
					res(data)
				},
				fail(err) {
					console.log(err, '[[[][[[{{}{{{}}}}}}]]]]]')
					rej(err)
				}
			})
		}).then((result: any) => {
			return result
		}, (error) => {
			return error
		})
	}
}

export default new Api()

			