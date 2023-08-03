import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CustomLogger } from 'src/myLogger';

const logger = new CustomLogger('Crypto Connector');

export const getUserCryptoWalletAssetsList = async (
  email: string,
  wallet: string,
) => {
  // login
  const config = new ConfigService();
  const gatewayBaseUrl = config.get('GATEWAY_BASE_URL');
  const signInUrl = `${gatewayBaseUrl}/api/auth/signin`;
  const login = await axios.post(signInUrl, {
    email: config.get('WALLET_USERNAME'),
    password: config.get('WALLET_PASSWORD'),
  });
  const token = login.data.access_token;

  // get user crypto wallet assets
  const cryptoBaseUrl = config.get('CRYPTO_BASE_URL');
  const getUserWalletAssetsUrl = `${cryptoBaseUrl}/api/transactions/user_assets`;
  logger.log(
    `Getting crypto assets list for user with email ${email} and wallet ${wallet}`,
  );

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.post(getUserWalletAssetsUrl, { email, wallet, type: "CRYPTO" }, options);
};

export const getUserCoinTransactions = async (
  username: string,
  wallet: string,
  name: string,
) => {
  // login
  const config = new ConfigService();
  const gatewayBaseUrl = config.get('GATEWAY_BASE_URL');
  const signInUrl = `${gatewayBaseUrl}/api/auth/signin`;
  const login = await axios.post(signInUrl, {
    email: config.get('WALLET_USERNAME'),
    password: config.get('WALLET_PASSWORD'),
  });
  const token = login.data.access_token;

  // get user transactions
  const cryptoBaseUrl = config.get('CRYPTO_BASE_URL');
  const getUserTransactionsUrl = `${cryptoBaseUrl}/api/transactions/?username=${username}&wallet=${wallet}&name=${name}&type=CRYPTO`;
  logger.log(
    `Getting crypto Transactions list for user with email ${username} and wallet ${wallet} and coin ${name}`,
  );
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(getUserTransactionsUrl, options);
};

export const getUserWalletTransactions = async (
  username: string,
  wallet: string,
) => {
  // login
  const config = new ConfigService();
  const gatewayBaseUrl = config.get('GATEWAY_BASE_URL');
  const signInUrl = `${gatewayBaseUrl}/api/auth/signin`;
  const login = await axios.post(signInUrl, {
    email: config.get('WALLET_USERNAME'),
    password: config.get('WALLET_PASSWORD'),
  });
  const token = login.data.access_token;

  // get user transactions
  const cryptoBaseUrl = config.get('CRYPTO_BASE_URL');
  const getUserTransactionsUrl = `${cryptoBaseUrl}/api/transactions/?username=${username}&wallet=${wallet}&type=CRYPTO`;
  logger.log(
    `Getting crypto Transactions list for user with email ${username} and wallet ${wallet}`,
  );
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.get(getUserTransactionsUrl, options);
};

export const deleteTransaction = async (id: string) => {
  // login
  const config = new ConfigService();
  const gatewayBaseUrl = config.get('GATEWAY_BASE_URL');
  const signInUrl = `${gatewayBaseUrl}/api/auth/signin`;
  const login = await axios.post(signInUrl, {
    email: config.get('WALLET_USERNAME'),
    password: config.get('WALLET_PASSWORD'),
  });
  const token = login.data.access_token;

  // delet transaction
  const cryptoBaseUrl = config.get('CRYPTO_BASE_URL');
  const deleteTRansactionUrl = `${cryptoBaseUrl}/api/transactions/${id}`;
  logger.log(`Deleting Transaction with id ${id}`);
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios.delete(deleteTRansactionUrl, options);
};
