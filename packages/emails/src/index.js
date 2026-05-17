import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const renderVerifyOtpEmail = (validationCode) => {
  const templatePath = path.join(__dirname, '../out/VerifyOtp.html');

  let htmlString = fs.readFileSync(templatePath, 'utf8');

  htmlString = htmlString.replace('{{OTP_CODE}}', validationCode);

  return htmlString;
};

export const renderWelcomeEmail = (userName, dashboardUrl) => {
  const templatePath = path.join(__dirname, '../out/Welcome.html');
  let htmlString = fs.readFileSync(templatePath, 'utf8');
  htmlString = htmlString.replaceAll('{{USER_NAME}}', userName);
  htmlString = htmlString.replaceAll('{{DASHBOARD_URL}}', dashboardUrl);
  return htmlString;
};

export const renderResetPasswordEmail = (userName, resetLink) => {
  const templatePath = path.join(__dirname, '../out/ResetPassword.html');
  let htmlString = fs.readFileSync(templatePath, 'utf8');
  htmlString = htmlString.replaceAll('{{USER_NAME}}', userName);
  htmlString = htmlString.replaceAll('{{RESET_LINK}}', resetLink);
  return htmlString;
}; 

export const renderTaskReminderEmail = (userName, taskTitle, dueDate, taskUrl) => {
  const templatePath = path.join(__dirname, '../out/TaskReminder.html');
  let htmlString = fs.readFileSync(templatePath, 'utf8');
  htmlString = htmlString.replaceAll('{{USER_NAME}}', userName);
  htmlString = htmlString.replaceAll('{{TASK_TITLE}}', taskTitle);
  htmlString = htmlString.replaceAll('{{DUE_DATE}}', dueDate);
  htmlString = htmlString.replaceAll('{{TASK_URL}}', taskUrl);
  return htmlString;
};
