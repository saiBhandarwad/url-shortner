const formatAnalytics = (data, key) => {
    return data.map(item => ({
        name: item._id || "Unknown",
        value: item[key],
    }));
};

module.exports = {
    formatAnalytics,
};