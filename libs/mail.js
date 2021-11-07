const postmark = require("postmark");

const transport = new postmark.ServerClient(process.env.POST_MARK_API_KEY);

const mailTemp = text => `
Hello there!

${text}

From the team at THE LUNAR TOUR. 🚀
`;

exports.transport = transport;
exports.mailTemp = mailTemp;
