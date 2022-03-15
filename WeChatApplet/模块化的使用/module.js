//工具脚本

//日期时间处理函数
const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()

	return `${[year,month,day].map(formatNumber).join('-')}`
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : `0${n}`
}

const uname = "小张";


export default {
	formatTime,
	uname
}
