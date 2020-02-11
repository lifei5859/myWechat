
	const checkout = {
		checkNum(rule, val) {
			console.log(rule, val, '[[]===-=-=++++]')
			if (rule.max && rule.min) {
				return (val.length < rule.max && val.length > rule.min)
			} else if (rule.min) {
				return val.length > rule.min
			} else if (rule.max) {
				return val.length < rule.max
			}
			return false
		},
		checkReg(rule, val) {
			if (!rule.test) {
				return true
			}
			console.log(rule, val)
			let fleg = rule.test(val)
			console.log(rule.test(val), '[[[]]][][}{{{{}}}}]');
			return fleg
		},
		checkRequired(rule, val) {
			console.log(rule, val, '[[[[]]][][][打算打算的]]]]')
			if (!rule || val.length > 0) {
				return true
			}
			return false
		},
		checkInit(rules, value) {
			console.log(rules, value, '=====-----asdasdasd')
			let tempArr = Object.keys(rules)
			let ruleArr = this.rules.filter((val) => tempArr.indexOf(val) !== -1)
			ruleArr.forEach((item) => {
				this.rules.forEach((prop) => {
					let temp = tempArr.indexOf(prop) !== -1
					if (temp) {
						switch (prop) {
							case 'required':
								this.flog = this.checkRequired(rules[prop], value)
								break
							case 'max' || 'min':
								this.flog = this.checkNum(rules, value)
								break
							case 'reg':
								this.flog = this.checkReg(rules[prop], value)
								break
						}
					}
				})
			})
			return this.flog
		},
		rules: ['required', 'max', 'min', 'reg'],
		flog: false
	}

	export default checkout
