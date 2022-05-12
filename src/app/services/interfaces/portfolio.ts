export interface PortfolioStake {
  startTimestamp: number;
  lockUpDurationInSec: number;
  stakedAmount: any;
}

export interface PortfolioDelegation {
  delegate: string;
  delegationStartTimestamp: number;
  delegatedBalance: number;
}

export interface PortfolioSentinel {
  registrationTimestamp: number;
  isRevocable: boolean;
  active: boolean;
}

export interface PortfolioPillar {
  name: string;
  spawnTimestamp: number;
  slotCostQsr: number;
  isRevocable: boolean;
  revokeCooldown: number;
  revokeTimestamp: number;
}

export interface PortfolioBalance {
  balance: any;
  name: string;
  symbol: string;
  decimals: number;
}

export interface Portfolio {
  address: string;
  stakes: PortfolioStake[];
  delegation: PortfolioDelegation;
  sentinel: PortfolioSentinel;
  pillar: PortfolioPillar;
  balances: PortfolioBalance[];
}
