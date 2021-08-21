const convertDate = () => {
    return {
        now: function () {
            return Date.now()
        },
        toLocaleString: function (date) {
            return date.toLocaleString('en-US')
        },
        toLocaleDateString: function (date) {
            return date.toLocaleDateString('en-US')
        }
    }
}
convertDate().now()//?
convertDate().toLocaleDateString(new Date)//?
Date //?
module.exports = convertDate