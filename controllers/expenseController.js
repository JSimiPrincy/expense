const Expense = require('../models/Expense');
const User = require('../models/User');
const pdfGenerator = require('../utils/pdfGenerator');

exports.addExpense = async (req, res) => {
  try {
    const { description, amount, splitMethod, participants } = req.body;
    const paidBy = req.user.id;

    let splitAmounts = new Map();
    let participantIds = [];

    switch (splitMethod) {
      case 'equal':
        const equalShare = amount / participants.length;
        participants.forEach(participant => {
          splitAmounts.set(participant, equalShare);
          participantIds.push(participant);
        });
        break;
      case 'exact':
        participants.forEach(participant => {
          splitAmounts.set(participant.id, participant.amount);
          participantIds.push(participant.id);
        });
        break;
      case 'percentage':
        const totalPercentage = participants.reduce((sum, participant) => sum + participant.percentage, 0);
        if (totalPercentage !== 100) {
          return res.status(400).json({ message: 'Percentages must add up to 100%' });
        }
        participants.forEach(participant => {
          splitAmounts.set(participant.id, (amount * participant.percentage) / 100);
          participantIds.push(participant.id);
        });
        break;
      default:
        return res.status(400).json({ message: 'Invalid split method' });
    }

    const expense = new Expense({
      description,
      amount,
      paidBy,
      splitMethod,
      splitAmounts,
      participants: participantIds,
    });

    await expense.save();

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      $or: [
        { paidBy: req.user.id },
        { participants: req.user.id }
      ]
    }).populate('paidBy', 'name').populate('participants', 'name');
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.downloadBalanceSheet = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('paidBy', 'name');
    const users = await User.find();

    const balanceSheet = pdfGenerator.generateBalanceSheet(expenses, users);

    res.contentType('application/pdf');
    res.send(balanceSheet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
