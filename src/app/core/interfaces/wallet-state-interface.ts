import { Wallet } from "./wallet.interface";

export interface WalletState {
    wallets: Wallet[];
    loading: boolean;
};