// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

const initialValue = 1000;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(initialValue);

    expect(account.getBalance()).toBe(initialValue);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const amountToWithdrow = 1100;

    const account = getBankAccount(initialValue);

    expect(() => {
      account.withdraw(amountToWithdrow);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const amountToTransfer = 1100;

    const account = getBankAccount(initialValue);
    const targetAccount = getBankAccount(initialValue);
    expect(() => {
      account.transfer(amountToTransfer, targetAccount);
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const amountToTransfer = 900;

    const account = getBankAccount(initialValue);
    expect(() => {
      account.transfer(amountToTransfer, account);
    }).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositValue = 900;

    const account = getBankAccount(initialValue);

    expect(account.deposit(depositValue)).toBe(account);
  });

  test('should withdraw money', () => {
    const amountToWithdrow = 900;

    const account = getBankAccount(initialValue);

    expect(account.withdraw(amountToWithdrow)).toBe(account);
  });

  test('should transfer money', () => {
    const amountToTransfer = 900;

    const account = getBankAccount(initialValue);
    const targetAccount = getBankAccount(initialValue);

    expect(account.transfer(amountToTransfer, targetAccount)).toBe(account);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(initialValue);

    const mockValue = 50;

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(mockValue);

    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeLessThanOrEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockValue = 50;

    const account = getBankAccount(initialValue);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(mockValue);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(mockValue);
    expect(account.fetchBalance).toHaveBeenCalled();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(initialValue);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
