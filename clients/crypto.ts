import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CustomLogger } from 'src/myLogger';

class CryptoClient {
  private baseUrl: string;
  private config: ConfigService;
  private logger;

  constructor() {
    this.config = new ConfigService();
    this.baseUrl = this.config.get('BASE_URL');
    this.logger = new CustomLogger('Crypto Connector');
  }

  async getUserCryptoWalletAssetsList(email: string, wallet: string) {
    // login
    const signInUrl = `${this.baseUrl}/api/auth/signin`;
    const login = await axios.post(signInUrl, {
      email: this.config.get('WALLET_USERNAME'),
      password: this.config.get('WALLET_PASSWORD'),
    });
    const token = login.data.access_token;

    // get user crypto wallet assets
    const getUserWalletAssetsUrl = `${this.baseUrl}/trade-crypto/api/transactions/user_assets`;
    this.logger.log(
      `Getting crypto assets list for user with email ${email} and wallet ${wallet}`,
    );

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.post(
      getUserWalletAssetsUrl,
      { email, wallet, type: 'CRYPTO' },
      options,
    );
  }

  async getUserCoinTransactions(
    username: string,
    wallet: string,
    name: string,
  ) {
    // login
    const signInUrl = `${this.baseUrl}/api/auth/signin`;
    const login = await axios.post(signInUrl, {
      email: this.config.get('WALLET_USERNAME'),
      password: this.config.get('WALLET_PASSWORD'),
    });
    const token = login.data.access_token;

    // get user transactions
    const getUserTransactionsUrl = `${this.baseUrl}/trade-crypto/api/transactions/?username=${username}&wallet=${wallet}&name=${name}&type=CRYPTO`;
    this.logger.log(
      `Getting crypto Transactions list for user with email ${username} and wallet ${wallet} and coin ${name}`,
    );
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(getUserTransactionsUrl, options);
  }

  async getUserWalletTransactions(username: string, wallet: string) {
    // login
    const signInUrl = `${this.baseUrl}/api/auth/signin`;
    const login = await axios.post(signInUrl, {
      email: this.config.get('WALLET_USERNAME'),
      password: this.config.get('WALLET_PASSWORD'),
    });
    const token = login.data.access_token;

    // get user transactions
    const getUserTransactionsUrl = `${this.baseUrl}/trade-crypto/api/transactions/?username=${username}&wallet=${wallet}&type=CRYPTO`;
    this.logger.log(
      `Getting crypto Transactions list for user with email ${username} and wallet ${wallet}`,
    );
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.get(getUserTransactionsUrl, options);
  }

  async deleteTransaction(id: string) {
    // login
    const signInUrl = `${this.baseUrl}/api/auth/signin`;
    const login = await axios.post(signInUrl, {
      email: this.config.get('WALLET_USERNAME'),
      password: this.config.get('WALLET_PASSWORD'),
    });
    const token = login.data.access_token;

    // delet transaction
    const deleteTRansactionUrl = `${this.baseUrl}/trade-crypto/api/transactions/${id}`;
    this.logger.log(`Deleting Transaction with id ${id}`);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios.delete(deleteTRansactionUrl, options);
  }
}

export default CryptoClient;
