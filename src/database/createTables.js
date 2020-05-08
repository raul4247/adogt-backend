const { executeQuery } = require("./connection");

module.exports = async () => {
  sql = `
  CREATE TABLE IF NOT EXISTS \`User\` (
    \`id\` varchar(256) NOT NULL,
    \`name\` varchar(256) NOT NULL,
    \`surname\` varchar(45) NOT NULL,
    \`email\` varchar(256) NOT NULL,
    \`cellphone\` varchar(256) NOT NULL,
    \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (\`id\`),
    UNIQUE KEY \`email_UNIQUE\` (\`email\`),
    UNIQUE KEY \`cellphone_UNIQUE\` (\`cellphone\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;
  
  CREATE TABLE IF NOT EXISTS \`Pet\` (
    \`id\` varchar(256) NOT NULL,
    \`userId\` varchar(256) NOT NULL,
    \`name\` varchar(256) NOT NULL,
    \`age\` int,
    \`breed\` varchar(256),
    \`description\` varchar(512),
    \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`status\` varchar(45) NOT NULL,
    PRIMARY KEY (\`id\`),
    CONSTRAINT \`fk_PET_USER\` FOREIGN KEY (\`userId\`) REFERENCES \`User\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=UTF8MB4;`;

  await executeQuery(sql);
};
