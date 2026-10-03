import type { Wallet } from "./types";
import { makeHash } from "./format";

export const PLATFORM_FEE = 0.05;

export function quotedPrize(pool: number) {
  return Math.round(pool * (1 - PLATFORM_FEE));
}

export type SettlementError =
  | "insufficient_funds"
  | "challenge_full"
  | "challenge_expired"
  | "failed";

export type SettlementResult = {
  ok: boolean;
  error?: SettlementError;
  hash?: string;
  delta?: { available: number; locked: number };
};

export type JoinRequest = {
  wallet: Wallet;
  entryFee: number;
  players: number;
  maxPlayers: number;
  endsAt: number;
  now: number;
};

export type ClaimRequest = {
  wallet: Wallet;
  entryFee: number;
  prize: number;
};

export type CreateRequest = {
  wallet: Wallet;
  entryFee: number;
};

/**
 * UI talks only to this interface.
 * A future SolanaSettlementService can replace MockSettlementService
 * without changing screens.
 */
export interface SettlementService {
  joinChallenge(request: JoinRequest): Promise<SettlementResult>;
  claimReward(request: ClaimRequest): Promise<SettlementResult>;
  createChallenge(request: CreateRequest): Promise<SettlementResult>;
}

export class MockSettlementService implements SettlementService {
  async joinChallenge(request: JoinRequest): Promise<SettlementResult> {
    if (request.now >= request.endsAt) {
      return { ok: false, error: "challenge_expired" };
    }
    if (request.players >= request.maxPlayers) {
      return { ok: false, error: "challenge_full" };
    }
    if (request.wallet.available < request.entryFee) {
      return { ok: false, error: "insufficient_funds" };
    }
    return {
      ok: true,
      hash: makeHash(),
      delta: { available: -request.entryFee, locked: request.entryFee },
    };
  }

  async claimReward(request: ClaimRequest): Promise<SettlementResult> {
    if (request.wallet.locked < request.entryFee) {
      return { ok: false, error: "failed" };
    }
    return {
      ok: true,
      hash: makeHash(),
      delta: {
        available: request.prize,
        locked: -request.entryFee,
      },
    };
  }

  async createChallenge(request: CreateRequest): Promise<SettlementResult> {
    if (request.wallet.available < request.entryFee) {
      return { ok: false, error: "insufficient_funds" };
    }
    return {
      ok: true,
      hash: makeHash(),
      delta: { available: -request.entryFee, locked: request.entryFee },
    };
  }
}

/** Disabled placeholder. Not wired into the product. */
export class SolanaSettlementService implements SettlementService {
  async joinChallenge(): Promise<SettlementResult> {
    return { ok: false, error: "failed" };
  }

  async claimReward(): Promise<SettlementResult> {
    return { ok: false, error: "failed" };
  }

  async createChallenge(): Promise<SettlementResult> {
    return { ok: false, error: "failed" };
  }
}

export function createSettlementService(): SettlementService {
  return new MockSettlementService();
}
