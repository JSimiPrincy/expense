const PDFDocument = require('pdfkit');

exports.generateBalanceSheet = (expenses, users) => {
  const doc = new PDFDocument();

  doc.fontSize(18).text('Balance Sheet', { align: 'center' });
  doc.moveDown();

  users.forEach(user => {
    doc.fontSize(14).text(`${user.name}:`);
    let balance = 0;

    expenses.forEach(expense => {
      if (expense.paidBy._id.toString() === user._id.toString()) {
        balance += expense.amount;
      }
      if (expense.splitAmounts.has(user._id.toString())) {
        balance -= expense.splitAmounts.get(user._id.toString());
      }
    });

    doc.fontSize(12).text(`Balance: ${balance.toFixed(2)}`);
    doc.moveDown();
  });

  doc.end();

  return doc;
};
