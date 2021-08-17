const convertDate = () => {
    var date = new Date;
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

module.exports = convertDate